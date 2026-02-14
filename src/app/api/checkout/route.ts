import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items = body.items || [];

    // Structural Integrity Check: Ensure items exist before proceeding
    if (items.length === 0) {
      return NextResponse.json({ error: 'No studies selected for acquisition' }, { status: 400 });
    }

    // Creating the Stripe Acquisition Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      
      // CRUCIAL FOR PRINTFUL: Collect shipping address so Printful knows where to send the study
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'PR'], // Add countries you intend to ship to
      },

      line_items: items.map((item: any) => ({
        price: item.priceId, // This MUST match the API ID in your Stripe Dashboard
        quantity: item.quantity,
      })),

      mode: 'payment',
      
      // Redirects back to your Studio domain
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,

      // Metadata helps identify the order in your logs
      metadata: {
        brand: 'RGRM Studio',
        phase: '01: Brutalist Lineage',
        studio_contact: 'Raul Guillermo Rosario Morales'
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('STRUCTURAL_FAILURE:', error);
    return NextResponse.json({ error: 'Acquisition process interrupted' }, { status: 500 });
  }
}
