import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // No apiVersion - Stripe will use the default version for your SDK
});

export async function POST(req: Request) {
  try {
    const { productId, variantId, price, name, thumbnail, size } = await req.json();

    // Determine the base URL based on environment
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://www.raguiromo.store'
      : 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: name,
              images: thumbnail ? [thumbnail] : [],
            },
            unit_amount: Math.round(Number(price) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/selection/${productId}`,
      metadata: {
        productId: productId,
        variantId: variantId,
        size: size || 'One Size',
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'ES', 'IT'],
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
