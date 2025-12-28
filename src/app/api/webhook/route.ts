import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.text(); // Stripe webhooks must use raw body text
  const signature = (await headers()).get('Stripe-Signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Verification Failed: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;

    // Send Real-Time Discord Notification
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: "⬛️🟨🟥 **RaGuiRoMo SUCCESS** 🟥🟨⬛️",
        embeds: [{
          title: "New Geometric Acquisition!",
          description: `**Value:** $${session.amount_total / 100} ${session.currency.toUpperCase()}\n**Customer:** ${session.customer_details.email}`,
          color: 0x000000 // Bauhaus Black
        }]
      })
    });
  }

  return NextResponse.json({ received: true });
}
