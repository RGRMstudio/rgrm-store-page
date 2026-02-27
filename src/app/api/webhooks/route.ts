import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

/**
 * RGRM // AUTOMATION WEBHOOK
 * Handshakes: Stripe ➔ Printful ➔ Loops.so
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`❌ WEBHOOK_SIG_FAILURE: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // 1. HANDLE SUCCESSFUL ACQUISITION
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // --- A. PRINTFUL FULFILLMENT TRIGGER ---
    try {
      await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: session.customer_details?.name,
            email: session.customer_details?.email,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code,
          },
          items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
          external_id: session.id,
        }),
      });
      console.log('✅ PRINTFUL: Manufacturing order generated.');
    } catch (error) {
      console.error('❌ PRINTFUL_SYNC_ERROR:', error);
    }

    // --- B. LOOPS.SO IDENTITY REGISTRATION ---
    try {
      await fetch('https://loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.customer_details?.email,
          eventName: 'Identity Registered',
          contactProperties: {
            fullName: session.customer_details?.name,
            acquisitionModule: 'Registry_002',
          },
        }),
      });
      console.log('✅ LOOPS: Identity module registered.');
    } catch (error) {
      console.error('❌ LOOPS_SYNC_ERROR:', error);
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
