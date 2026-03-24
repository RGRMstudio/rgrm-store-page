// app/api/verify-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.clover',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session ID' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      status: session.payment_status === 'paid' ? 'complete' : 'pending',
      email: session.customer_details?.email || null,
    });

  } catch (err: any) {
    console.error('Session verify error:', err);
    return NextResponse.json({ error: 'Invalid session' }, { status: 400 });
  }
}
