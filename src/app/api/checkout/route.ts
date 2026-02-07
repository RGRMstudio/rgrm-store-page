import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

/**
 * RGRM STUDIO: ACQUISITION DISPATCHER
 * Phase: 01 (Brutalist Lineage)
 * Logic: Creates a Stripe Checkout session with metadata for Printful fulfillment.
 */

export async function POST(req: Request) {
  try {
    const { artifactId, size } = await req.json();

    // 1. Validation: Ensure the blueprint is complete before initiating
    if (!artifactId || !size) {
      return NextResponse.json(
        { error: 'Missing Structural Data: artifactId or size is required.' },
        { status: 400 }
      );
    }

    // 2. Session Creation: Bridging the Gallery to the Vault
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Ensure STRIPE_PRICE_ID_STUDY_001 is defined in your Vercel/Local env
          price: process.env.STRIPE_PRICE_ID_STUDY_001, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      
      // CRITICAL: Metadata that the Webhook (Fulfillment Foreman) uses to trigger Printful
      metadata: {
        artifactId: artifactId, // e.g., 'RGRM-001-B'
        size: size,             // e.g., 'M', 'L', 'XL'
        founder: 'Raul Guillermo Rosario Morales'
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[STRIPE DISPATCH ERROR]:', err.message);
    return NextResponse.json(
      { error: 'Acquisition Session Failed. Check Studio Logs.' }, 
      { status: 500 }
    );
  }
}
