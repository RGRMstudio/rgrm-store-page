import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

/**
 * RGRM STUDIO: ACQUISITION DISPATCHER
 * Phase: 01 (Brutalist Lineage)
 * Final State: v1.0.0
 */

export async function POST(req: Request) {
  try {
    const { artifactId, size } = await req.json();

    // Verification of architectural data
    if (!artifactId || !size) {
      return NextResponse.json(
        { error: 'Incomplete Acquisition Data: artifactId and size required.' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_STUDY_001, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      
      // CRITICAL: Metadata for the Webhook to trigger Printful Store 002
      metadata: {
        artifactId: artifactId, // e.g., 'RGRM-001-B'
        size: size,             // e.g., 'L'
        founder: 'Raul Guillermo Rosario Morales'
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('[STRIPE DISPATCH ERROR]:', err.message);
    return NextResponse.json({ error: 'Acquisition Failed' }, { status: 500 });
  }
}
