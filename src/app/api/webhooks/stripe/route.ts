import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-10-29.clover',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: 'Invalid Signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // 1. RETRIEVE FULL SESSION WITH SHIPPING
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items'],
    });

    const shipping = fullSession.shipping_details;
    const customer = fullSession.customer_details;
    const variantId = fullSession.metadata?.printful_variant_id;

    // 2. CREATE PRINTFUL ORDER
    if (shipping?.address && customer?.email && variantId) {
      try {
        const printfulOrder = await fetch('https://api.printful.com/orders', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            recipient: {
              name: shipping.name || customer.name || 'RGRM Customer',
              email: customer.email,
              address1: shipping.address.line1,
              address2: shipping.address.line2 || '',
              city: shipping.address.city,
              state_code: shipping.address.state,
              country_code: shipping.address.country,
              zip: shipping.address.postal_code,
            },
            items: [
              {
                sync_variant_id: variantId,
                quantity: 1,
                retail_price: ((fullSession.amount_total || 0) / 100).toFixed(2),
              },
            ],
            confirm: true,
            store_id: process.env.PRINTFUL_STORE_ID,
          }),
        });

        const printfulData = await printfulOrder.json();

        if (!printfulOrder.ok) {
          console.error('Printful Order Failed:', JSON.stringify(printfulData));
        } else {
          console.log(`✅ Printful order created: ${printfulData.result?.id} for ${customer.email}`);
        }
      } catch (printfulErr) {
        console.error('Printful fetch error:', printfulErr);
      }
    } else {
      console.warn('⚠️ Printful order skipped. Missing data:', {
        hasShipping: !!shipping?.address,
        hasEmail: !!customer?.email,
        hasVariantId: !!variantId,
      });
    }

    // 3. SEND LOOPS CONFIRMATION EMAIL
    if (customer?.email) {
      try {
        const loopsRes = await fetch('https://app.loops.so/api/v1/events/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customer.email,
            eventName: 'Acquisition Confirmed',
            contactProperties: {
              firstName: customer.name?.split(' ')[0] || '',
              lastName: customer.name?.split(' ').slice(1).join(' ') || '',
              lastPurchaseDate: new Date().toISOString(),
            },
          }),
        });

        if (!loopsRes.ok) {
          const loopsError = await loopsRes.json();
          console.error('Loops email failed:', loopsError);
        } else {
          console.log(`✅ Loops email sent to ${customer.email}`);
        }
      } catch (loopsErr) {
        console.error('Loops fetch error:', loopsErr);
      }
    }

    console.log(`✅ Webhook processed for session: ${session.id}`);
  }

  return NextResponse.json({ received: true });
}
