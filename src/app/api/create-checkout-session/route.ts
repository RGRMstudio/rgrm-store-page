// src/app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
// Uses the API version compatible with your installed stripe library
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

    const { variantId, quantity = 1, successUrl, cancelUrl, price, name } = body;

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

    // Validate NEXT_PUBLIC_BASE_URL is present
    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error('❌ NEXT_PUBLIC_BASE_URL is missing from environment variables');
      return NextResponse.json(
        { error: 'Server configuration error: Base URL missing' },
        { status: 500 }
      );
    }

    // Use the price and name from the request body if provided, otherwise use defaults
    // These should ideally come from your product database/Sanity based on productId/variantId
    const unitAmountCents = typeof price === 'number' ? Math.round(price * 100) : 3500; // Default to $35.00 if not provided
    const productName = typeof name === 'string' ? name : 'Default Product Name'; // Default name if not provided

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Accept card payments
      line_items: [
        {
          price_data: {
            currency: 'usd', // Set currency
            unit_amount: unitAmountCents, // Price in cents
            product_data: {
              name: productName, // Product name
              // description: 'Brief description', // Optional
            },
          },
          quantity: parseInt(quantity as string, 10) || 1, // Ensure quantity is a number
        },
      ],
      mode: 'payment', // Single payment mode
      // Use provided URLs or fallback to default success/cancel pages on your site
      success_url: successUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      // Crucially, pass the Printful variantId and quantity in metadata
      metadata: {
        variantId: variantId.toString(), // Pass the Printful variant ID
        quantity: quantity.toString(), // Pass the quantity
        // Add other relevant data here if needed, e.g., customer_email if collected elsewhere
      },
    });

    console.log(`✅ Checkout session created: ${session.id}`);
    // Return the session ID so the frontend can redirect the user to Stripe Checkout
    return NextResponse.json({ id: session.id, url: session.url }); // Include URL for convenience if needed on frontend
  } catch (error: any) {
    // Log the error for debugging
    console.error('💥 Critical error in create-checkout-session:', error.message, error.stack);
    // Return a 500 error response
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
