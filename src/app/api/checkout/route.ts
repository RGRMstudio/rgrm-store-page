import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    // Structural Fix: Priority check for the environment variable, 
    // with a direct fallback to your verified Study 001 Price ID.
    const activePriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_1SzoioDVc7z8RC9IwwYzowLH';

    console.log("Initiating Session for Price:", activePriceId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: activePriceId, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Ensure these match your Vercel BASE_URL exactly
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/selection`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Stripe Studio Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
