// src/app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('🔍 Checkout request body:', body);

    const { variantId, price, quantity = 1, successUrl, cancelUrl } = body;

    // ✅ Validate required fields
    if (!variantId) {
      return NextResponse.json({ error: 'Missing required parameter: variantId' }, { status: 400 });
    }
    if (typeof price !== 'number' && typeof price !== 'string') {
      return NextResponse.json({ error: 'Invalid price format' }, { status: 400 });
    }

    // ✅ Safely parse price to cents
    const priceNum = parseFloat(price as string);
    if (isNaN(priceNum) || priceNum <= 0) {
      return NextResponse.json({ error: 'Invalid price value' }, { status: 400 });
    }
    const unitAmountCents = Math.round(priceNum * 100);

    // ✅ Validate base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_BASE_URL not configured' }, { status: 500 });
    }

    // Create session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: unitAmountCents,
          product_data: { name: 'RGRM Product' },
        },
        quantity: parseInt(quantity as string, 10) || 1,
      }],
      mode: 'payment',
      success_url: successUrl || `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${baseUrl}/cancel`,
      metadata: {
        variantId: variantId.toString(),
        quantity: quantity.toString(),
      },
    });

    console.log(`✅ Session created: ${session.id}, URL: ${session.url}`);
    // Return both the session ID and the URL
    return NextResponse.json({ id: session.id, url: session.url });

  } catch (error: any) {
    console.error('💥 Checkout API Error:', error.message, error.stack);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
