import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
// Uses the API version compatible with your installed stripe library
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: Request) {
  try {
    // Parse the request body to get the necessary data
    const { variantId, quantity = 1, successUrl, cancelUrl } = await req.json();

    // Validate that the required variantId is provided
    if (!variantId) {
      return NextResponse.json(
        { error: 'Missing required parameter: variantId' },
        { status: 400 }
      );
    }

    // --- IMPORTANT: Replace these with dynamic values based on the selected product ---
    // For now, using defaults. You should fetch the correct price and name from Sanity or your product DB based on variantId.
    const unitAmountCents = 3500; // Example: $35.00
    const productName = 'Default Product Name'; // Example: Fetch from Sanity based on variantId
    // ----------------------------------------------------------------------------------

    // Create the Stripe Checkout Session
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

    // Return the session ID so the frontend can redirect the user to Stripe Checkout
    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    // Log the error for debugging
    console.error('Error creating checkout session:', error);
    // Return a 500 error response
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
