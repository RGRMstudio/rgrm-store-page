import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe engine with the secret key from your Vercel Environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  try {
    // STRUCTURAL INTEGRITY: Use the Vercel variable, or fallback to the verified Study 001 ID
    const activePriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || 'price_1SzoioDVc7z8RC9IwwYzowLH';

    // TRIGGER: Create the high-end Acquisition Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      
      // LOGISTICS: Collect physical coordinates for the Printful manufacturing node
      // We focus on your core shipping zones for Phase 01
      shipping_address_collection: {
        allowed_countries: ['US', 'PR', 'CA', 'ES', 'MX'], 
      },

      line_items: [
        {
          price: activePriceId, 
          quantity: 1,
        },
      ],

      mode: 'payment',

      // REDIRECTS: Ensure the user reaches the Registry with their unique Session ID
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/selection`,

      // THE MANUFACTURING SIGNAL: This metadata is what your Webhook will send to Printful
      metadata: {
        // REPLACE 'YOUR_PRINTFUL_SYNC_ID' with the 9-digit ID you found in Printful
        printful_variant_id: "YOUR_PRINTFUL_SYNC_ID",
        study_phase: "Phase 01: Brutalist Lineage",
        brand: "RaGuiRoMo Studio"
      }
    });

    // Return the Session ID to the "Acquire" button in your ProductCard.tsx
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("Stripe Acquisition Failure:", err.message);
    return NextResponse.json(
      { error: `Structural error in checkout: ${err.message}` }, 
      { status: 500 }
    );
  }
}
