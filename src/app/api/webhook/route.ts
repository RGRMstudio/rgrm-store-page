import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

/**
 * RaGuiRoMo Bauhaus Webhook Handler
 * This listens for 'checkout.session.completed' from Stripe 
 * and triggers the Printful fulfillment for Store 002.
 */

export async function POST(req: Request) {
  // 1. Get the raw body for Stripe signature verification
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    // 2. Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  // 3. Handle the successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Retrieve the Store 002 ID we passed in the checkout metadata
    const storeId = session.metadata?.printful_store_id || process.env.PRINTFUL_STORE_002_ID;

    console.log(`--- Bauhaus Order Success ---`);
    console.log(`Fulfilling via Printful Store: ${storeId}`);
    console.log(`Customer: ${session.customer_details?.email}`);

    try {
      /**
       * TRIGGER PRINTFUL ORDER
       * Here you would fetch(https://api.printful.com/orders) 
       * using your PRINTFUL_STORE_002_KEY.
       */
      const printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_STORE_002_KEY}`,
          'X-PF-Store-Id': storeId,
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
          items: [], // You would map session items here
        }),
      });

      if (!printfulResponse.ok) throw new Error('Printful order creation failed');

    } catch (error: any) {
      console.error(`Printful Sync Error: ${error.message}`);
      // Even if Printful fails, we return 200 to Stripe so it stops retrying
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
