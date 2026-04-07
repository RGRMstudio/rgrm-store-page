import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // Pull the specific variant from the metadata we set earlier
      const variantId = session.metadata.printful_variant_id || '69ae86fb786ec2';

      // A. TRIGGER FACTORY (PRINTFUL)
      await fetch('https://api.printful.com/orders', {
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
          items: [{ 
            variant_id: variantId, // RGRM_STUDY_001 / M
            quantity: 1 
          }],
          confirm: false // Set to true only after you've tested once manually
        })
      });

      // B. TRIGGER MESSENGER (LOOPS)
      await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.customer_details.email,
          eventName: 'Order_Success',
          contactProperties: { status: 'SIGNAL_DEPLOYED' }
        })
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error(`[WEBHOOK_ERROR]: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
