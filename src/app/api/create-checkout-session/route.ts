import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Use default API version from SDK
});

export async function POST(request: Request) {
  try {
    const { productId, variantId, price, name, thumbnail, size, description } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_ {
            currency: 'usd',
            product_ {
              name: `${name}${size ? ` - Size: ${size}` : ''}`,
              description: description || '',
              images: thumbnail ? [thumbnail] : [],
              meta {
                productId,
                variantId,
              },
            },
            unit_amount: Math.round(parseFloat(price) * 100), // Convert to cents
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
        storeId: process.env.PRINTFUL_STORE_ID,
      },
      // Optional: Add customer email collection
      customer_email: 'auto',
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
