import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const priceId = process.env.STRIPE_PRICE_ID;
    
    // Safety check: If this fails, look at your Vercel Env Variables
    if (!priceId) {
      throw new Error('STRIPE_PRICE_ID is not defined in Vercel settings');
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
