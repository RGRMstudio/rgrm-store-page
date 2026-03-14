import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize the Stripe engine with the latest RGRM compatibility
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // TRIGGER: Create the high-end Acquisition Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      
      // LOGISTICS: Collect physical coordinates for shipping
      shipping_address_collection: {
        allowed_countries: ['US', 'PR', 'CA', 'ES', 'MX'], 
      },

      line_items: [
        {
          price: priceId, // Cleaned: only one price key
          quantity: 1,
        },
      ],

      mode: 'payment',

      // REDIRECTS: Dynamic origin detection for Success/Cancel
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/selection`,

      // THE MANUFACTURING SIGNAL: This triggers Printful and Loops
      metadata: {
        project: 'RGRM_STORE',
        brand: 'RaGuiRoMo Studio',
        study_phase: 'Phase 01: Brutalist Lineage',
        printful_variant_id: process.env.PRINTFUL_VARIANT_ID || '',
      },
    });

    // Return the Session ID and URL to the "Acquire" button
    return NextResponse.json({ sessionId: session.id, url: session.url });
    
  } catch (err: any) {
    console.error('RGRM API Error:', err);
    return NextResponse.json(
      { error: `Structural error in checkout: ${err.message}` }, 
      { status: 500 }
    );
  }
}
