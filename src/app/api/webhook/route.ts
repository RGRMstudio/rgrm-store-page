import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { LoopsClient } from "loops";

/**
 * RGRMstore - Unified Fulfillment & Communication Webhook
 * 2026 Production Standard
 */

// Initialize Loops with your secret API key
const loops = new LoopsClient(process.env.LOOPS_API_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature') as string;

  let event;

  try {
    // 1. Verify the Stripe Signature
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`[RGRM ERROR] Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 2. Process Successful Checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const storeId = process.env.PRINTFUL_STORE_ID || '17181557';
    
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'RGRM Client';

    console.log(`[RGRM INFO] Processing Store 002 Order for: ${customerEmail}`);

    try {
      // A. TRIGGER PRINTFUL (Store 002)
      const printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PRINTFUL_STORE_A002_KEY}`,
          'X-PF-Store-Id': storeId,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: {
            name: customerName,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code,
          },
          items: [], // Map your Registry Module SKU here
          draft: false, 
        }),
      });

      if (!printfulResponse.ok) throw new Error('Printful Sync Failed');

      // B. TRIGGER LOOPS EMAIL
      // This sends the "Identity_Registered" event to your Loops dashboard
      await loops.sendEvent({
        email: customerEmail,
        eventName: "Identity_Registered",
        contactProperties: {
          firstName: customerName.split(' ')[0],
          userId: session.id, // Links the stripe session to the Loops contact
        },
        eventProperties: {
          orderId: session.id,
          registryNode: "17181557",
        }
      });

      console.log(`[RGRM SUCCESS] Fulfillment and Communication Synced.`);

    } catch (err: any) {
      console.error(`[RGRM ERROR] Automation chain failed: ${err.message}`);
    }
  }

  return NextResponse.json({ received: true });
}
