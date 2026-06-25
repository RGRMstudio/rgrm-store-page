import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia', // Corrected API version based on error message
});

export async function POST(req: Request) {
  try {
    const { variantId, quantity = 1, successUrl, cancelUrl } = await req.json();

    if (!variantId) {
      return NextResponse.json(
        { error: 'Missing required parameter: variantId' },
        { status: 400 }
      );
    }

    // Optional: Fetch product name/price from Sanity or hardcode for now
    // For simplicity, we'll use a default price. Replace with dynamic fetch later.
    const unitAmountCents = 3500; // $35.00 — adjust per product!
    const productName = 'FACE SERIES T-SHIRT'; // You can make this dynamic

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmountCents,
            product_data: {
              name: productName,
              // description: 'Geometric facial mapping. Diagnostic overlay.', // optional
            },
          },
          quantity: parseInt(quantity as string, 10) || 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        variantId: variantId.toString(),
        quantity: quantity.toString(),
        // You can add more here later: customer_id, product_slug, etc.
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
