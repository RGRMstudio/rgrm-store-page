import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { priceId, productName, price } = body

    const lineItem = priceId
      ? { price: priceId, quantity: 1 }
      : {
          price_data: {
            currency: 'usd',
            product_data: { name: productName || 'RGRM Product' },
            unit_amount: Math.round((price || 45) * 100),
          },
          quantity: 1,
        }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://raguiromo.store'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://raguiromo.store'}/`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Checkout error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
