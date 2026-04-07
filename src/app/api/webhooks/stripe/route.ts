import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initializing the "Cashier" with the latest stable API
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  try {
    // 1. Authenticate the Signal
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // 2. Execute on Success
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      console.log(`[STRIPE_SIGNAL]: Payment confirmed for ${session.customer_details.email}`);

      // A. Trigger the Factory (Printful)
      const printfulResponse = await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          recipient: { 
            name: session.shipping_details?.name || session.customer_details.name, 
            email: session.customer_details.email,
            address1: session.shipping_details?.address?.line1,
            city: session.shipping_details?.address?.city,
            state_code: session.shipping_details?.address?.state,
            country_code: session.shipping_details?.address?.country,
            zip: session.shipping_details?.address?.postal_code,
          },
          items: [{ variant_id: 14065, quantity: 1 }], // Your specific Artifact variant
          confirm: false // Set to false to review orders in Printful dashboard first
        })
      });

      if (!printfulResponse.ok) console.error('[FACTORY_ERROR]: Failed to relay order to Printful');

      // B. Trigger the Messenger (Loops)
      await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.customer_details.email,
          eventName: 'Order_Success',
          contactProperties: { 
            status: 'SIGNAL_DEPLOYED',
            order_id: session.id 
          }
        })
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[WEBHOOK_CRITICAL]: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
