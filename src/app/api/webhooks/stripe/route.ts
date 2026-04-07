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

      // 1. Trigger Printful Order via Native Fetch
      await fetch('https://api.printful.com/orders', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}` },
        body: JSON.stringify({
          recipient: { name: session.customer_details.name, email: session.customer_details.email },
          items: [{ variant_id: 69ae86fb786ec2, quantity: 1 }] // Your variant
        })
      });

      // 2. Trigger Loops Email via Native Fetch
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
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
