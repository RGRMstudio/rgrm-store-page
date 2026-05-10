import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const { productId, variantId, price, name, thumbnail, size } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_ {
            currency: 'usd',
            product_ {
              name: `${name} ${size ? `- Size: ${size}` : ''}`,
              images: thumbnail ? [thumbnail] : [],
              meta {
                productId,
                variantId,
              },
            },
            unit_amount: Math.round(parseFloat(price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL}`,
      meta {
        productId,
        variantId,
        price,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
