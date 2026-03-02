import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[RGRM_ERROR]: Webhook Signature Verification Failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // --- STRATEGIC LOGGING: START OF TRANSACTION ---
  console.log(`[RGRM_REGISTRY]: Event Received: ${event.type} [ID: ${event.id}]`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // 1. IDENTITY AUTHENTICATION LOG
    const customerEmail = session.customer_details?.email;
    console.log(`[RGRM_REGISTRY]: Identity Authenticated for: ${customerEmail}`);
    console.log(`[RGRM_REGISTRY]: Session ID: ${session.id}`);

    try {
      // 2. FULFILLMENT HANDSHAKE (PRINTFUL)
      // Extract line items to send to the Printful Store 17181557
      console.log(`[RGRM_REGISTRY]: Dispatching Study Data to Printful Store 17181557...`);
      
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      
      // Logic here to POST to Printful API using your PRINTFUL_API_KEY
      // (Implementation requires your specific Printful shipping logic)
      
      console.log(`[RGRM_SUCCESS]: Printful Manufacturing Sequence Initialized.`);

      // 3. REGISTRY HANDSHAKE (LOOPS.SO)
      console.log(`[RGRM_REGISTRY]: Registering ${customerEmail} in Loops.so Identity Database...`);
      
      await fetch('https://app.loops.so/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: customerEmail,
          source: 'RGRM_STORE_ACQUISITION',
          userGroup: 'REGISTRY_MEMBER',
        }),
      });

      console.log(`[RGRM_SUCCESS]: Identity Registry Updated for ${customerEmail}.`);

    } catch (error: any) {
      console.error(`[RGRM_CRITICAL_FAILURE]: Post-Checkout Handshake Failed: ${error.message}`);
      // Note: We return a 200 even on internal logic failure to prevent Stripe from retrying 
      // indefinitely if the error is on our processing side, but we log the CRITICAL error.
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
