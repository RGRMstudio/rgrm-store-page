import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  // ✅ Initialize Stripe inside the handler so env var is always available at runtime
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20',
  });

  try {
    const body = await req.json();
    const { productName, price, quantity = 1, variantId, image } = body;

    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: productName and price' },
        { status: 400 }
      );
    }

    const unitAmount = Math.round(parseFloat(price) * 100);

    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          quantity,
          price_ {
            currency: 'usd',
            unit_amount: unitAmount,
            product_ {
              name: productName,
              ...(image ? { images: [image] } : {}),
              ...(variantId ? { meta { variantId } } : {}),
            },
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_SITE}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE}/selection`,
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: unknown) {
    console.error('[checkout] Stripe error:', error);
    const message =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
