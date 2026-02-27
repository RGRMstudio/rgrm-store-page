import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { RGRM_PROTOCOL } from '@/lib/constants';

/**
 * RGRM // ACQUISITION GATEWAY
 * Secure server-side protocol for Stripe Checkout initialization.
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // 1. TRANSFORM MANIFEST INTO STRIPE LINE ITEMS
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: RGRM_PROTOCOL.currency.toLowerCase(),
        product_data: {
          name: item.name,
          images: [item.image],
          metadata: {
            studyId: item.id,
            printfulStore: RGRM_PROTOCOL.storeId, // 17181557
          },
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    // 2. INITIALIZE SECURE SESSION
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/registry/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/selection`,
      // Essential for Printful/Loops identification
      metadata: {
        origin: 'RGRM_IDENTITY_REGISTRY_002',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('❌ ACQUISITION_FAILURE:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
