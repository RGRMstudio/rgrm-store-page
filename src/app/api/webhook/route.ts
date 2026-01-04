import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Ensures compatibility with the latest Stripe features
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    // Verify the event came from Stripe to prevent fraudulent requests
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the successful checkout event for RaGuiRoMo Store
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Organic Marketing: Post real-time sales alert to Discord
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🚀 **New Identity Acquisition!**\n` +
                     `Total: **$${(session.amount_total! / 100).toFixed(2)}**\n` +
                     `Customer: ${session.customer_details?.email || 'Anonymous'}\n` +
                     `View Dashboard: https://dashboard.stripe.com/payments/${session.payment_intent}`,
          }),
        });
      } catch (discordError) {
        console.error('Failed to send Discord notification:', discordError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
