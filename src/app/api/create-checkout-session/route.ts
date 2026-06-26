import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: Request) {
  try {
    // Log the raw request for debugging
    console.log('📥 Received POST to /api/create-checkout-session');
    
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      console.error('❌ Request is not JSON');
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log('📦 Request body:', body);

    const { variantId, quantity = 1, successUrl, cancelUrl } = body;

    if (!variantId) {
      console.error('❌ Missing variantId in request body');
      return NextResponse.json(
        { error: 'Missing required parameter: variantId' },
        { status: 400 }
      );
    }

    // Validate Stripe key is present
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY is missing from environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Stripe key missing' },
        { status: 500 }
      );
    }

    // Use hardcoded defaults for now (replace with dynamic fetch later)
    const unitAmountCents = 3500; // $35.00
    const productName = 'FACE SERIES T-SHIRT';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmountCents,
            product_data: { name: productName },
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
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error('💥 Critical error in create-checkout-session:', error.message, error.stack);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
