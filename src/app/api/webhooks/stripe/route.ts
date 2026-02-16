import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
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

  // Handle the "Acquisition Confirmed" event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // INTEGRITY CHECK: Trigger Loops 'Acquisition' Event
    if (session.customer_details?.email) {
      await fetch('https://app.loops.so/api/v1/events/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: session.customer_details.email,
          eventName: 'Acquisition Confirmed',
          contactProperties: {
            firstName: session.customer_details.name || '',
            lastPurchaseDate: new Date().toISOString(),
          }
        }),
      });
    }
    
    console.log(`Acquisition successful for Session: ${session.id}`);
  }

  return NextResponse.json({ received: true });
}
