import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion removed - Stripe will use the default version for your SDK
});

export async function POST(request: Request) {
  try {
    const { productId, price, name, thumbnail } = await request.json();

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              images: thumbnail ? [thumbnail] : [],
              metadata: {
                productId: productId,
              },
            },
            unit_amount: Math.round(parseFloat(price) * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL}`,
      metadata: {
        productId: productId,
        storeId: '17181557', // Your Printful store ID
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
