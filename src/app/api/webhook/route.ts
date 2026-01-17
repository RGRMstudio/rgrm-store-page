import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const storeId = session.metadata?.printful_store_id || process.env.PRINTFUL_STORE_002_ID;

    // Trigger Printful Order Fulfillment
    try {
      await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_STORE_002_KEY}`,
          'X-PF-Store-Id': storeId, // Mandatory for Store 002 targeting
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: session.shipping_details?.name,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code,
          },
          items: [], // Map your cart items here
        }),
      });
      console.log('Bauhaus Order Sent to Printful Store 002');
    } catch (err: any) {
      console.error('Printful Sync Failure:', err.message);
    }
  }

  return NextResponse.json({ received: true });
}
