import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { priceId, productName, price, variantId, quantity = 1 } = body;

    if (!productName) {
      return NextResponse.json({ error: 'Missing product name' }, { status: 400 });
    }

    if (!price && !priceId) {
      return NextResponse.json({ error: 'Missing price or priceId' }, { status: 400 });
    }

    const lineItem = priceId
      ? { price: priceId, quantity }
      : {
          price_ {
            currency: 'usd',
            product_ {
              name: productName,
              meta { variantId: variantId || '' },
            },
            unit_amount: Math.round((parseFloat(price) || 45) * 100),
          },
          quantity,
        };

    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.NEXT_PUBLIC_BASE_URL ||
      'https://raguiromo.store';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/selection`,
      meta {
        productName,
        variantId: variantId || '',
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: any) {
    console.error('Checkout error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
