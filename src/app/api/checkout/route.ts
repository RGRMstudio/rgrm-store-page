import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe engine with the latest RGRM compatibility
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/selection`,
      metadata: {
        project: 'RGRM_STORE',
        printful_variant_id: process.env.PRINTFUL_VARIANT_ID || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('RGRM API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
