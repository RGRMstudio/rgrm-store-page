import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;

    // 1. Send the "Identity Certificate" via Resend
    if (customerEmail) {
      await resend.emails.send({
        from: 'RaGuiRoMo Store <studio@raguiromo.store>',
        to: customerEmail,
        subject: 'Certificate of Identity // Acquisition Confirmed',
        html: `<h1>CERTIFICATE OF IDENTITY</h1><p>This document confirms your acquisition of a limited-run object from the inaugural collection.</p>`
      });
    }

    // 2. Alert Discord
    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `🚀 **New Identity Acquisition!** Total: $${(session.amount_total! / 100).toFixed(2)}` }),
      });
    }
  }
  return NextResponse.json({ received: true });
}
