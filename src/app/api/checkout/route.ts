import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    const { priceId, printfulVariantId, productName, size } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    if (!printfulVariantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
        allowed_countries: ['US', 'PR', 'CA', 'ES', 'MX'],
      },
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/selection`,
      metadata: {
        project: 'RGRM_STORE',
        brand: 'RaGuiRoMo Studio',
        printful_variant_id: printfulVariantId,  // ← dynamic per size
        product_name: productName || '',
        size: size || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });

  } catch (err: any) {
    console.error('RGRM Checkout Error:', err);
    return NextResponse.json(
      { error: `Checkout failed: ${err.message}` },
      { status: 500 }
    );
  }
}
