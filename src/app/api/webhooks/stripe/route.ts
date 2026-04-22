import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.expired':
      const session = event.data.object as Stripe.Checkout.Session;
      await sendCartRecoveryEmail(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function sendCartRecoveryEmail(session: Stripe.Checkout.Session) {
  if (!session.customer_email) {
    console.log('No customer email found');
    return;
  }

  const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : '0';
  const currency = session.currency?.toUpperCase() || 'USD';

  try {
    const loopsResponse = await fetch('https://app.loops.so/api/v1/transactional', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transactionalId: process.env.LOOPS_TRANSACTIONAL_ID,
        email: session.customer_email,
        dataVariables: {
          amount: amount,
          currency: currency,
        },
      }),
    });

    if (!loopsResponse.ok) {
      const errorText = await loopsResponse.text();
      console.error('Failed to send Loops email:', errorText);
    } else {
      console.log(`✅ Recovery email sent to ${session.customer_email} for $${amount} ${currency}`);
    }
  } catch (error) {
    console.error('Error sending Loops email:', error);
  }
}
