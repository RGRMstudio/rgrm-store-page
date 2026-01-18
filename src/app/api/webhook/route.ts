import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

/**
 * RGRMstore - Unified Fulfillment Webhook
 * Processes Stripe payments and automates Printful Store 002.
 */

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  let event;

  try {
    // Verify the event came from Stripe using your whsec_ secret
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`[RGRM ERROR] Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    
    // Store 002 Identification (17181557)
    const storeId = process.env.PRINTFUL_STORE_ID || '17181557';

    console.log(`[RGRM INFO] Payment Verified. Syncing order with Printful Store ${storeId}`);

    try {
      const printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_STORE_A002_KEY}`,
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
          items: [], // Map your products from the session metadata here
          draft: false, // Set to true if you want to manually approve orders in Printful
        }),
      });

      if (!printfulResponse.ok) {
        const errorData = await printfulResponse.json();
        throw new Error(`Printful API Error: ${errorData.error.message}`);
      }

      console.log(`[RGRM SUCCESS] Order successfully dispatched to Store 002.`);
    } catch (err: any) {
      console.error(`[RGRM ERROR] Fulfillment Sync Failed: ${err.message}`);
      // Note: You can add an email notification trigger here
    }
  }

  return NextResponse.json({ received: true });
}
