import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        // price_id should match your Stripe Dashboard entries
        price: item.priceId || process.env.STRIPE_PRICE_ID,
        quantity: item.quantity || 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      
      // Metadata allows the Webhook to identify the Printful target
      metadata: {
        printful_store_id: process.env.PRINTFUL_STORE_002_ID,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Checkout Failure:', err.message);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}
