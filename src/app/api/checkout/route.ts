import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    });

    const body = await req.json();
    const { productName, price, quantity = 1, variantId, image, email } = body;

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

    const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

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
              meta {
                ...(variantId ? { variantId } : {}),
              },
            },
          },
        },
      ],
      
      // ✅ CART RECOVERY FEATURES
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },
      
      consent_collection: {
        promotions: 'auto',
      },
      
      customer_email: email || undefined,
      
      meta {
        cart_id: cartId,
        item_count: quantity.toString(),
        store: 'raguiromo',
      },
      
      success_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/selection`,
    });

    console.log(`[CHECKOUT_CREATED] Session: ${session.id}, Cart: ${cartId}`);

    return NextResponse.json({ 
      id: session.id, 
      url: session.url,
      cartId 
    });
    
  } catch (error: any) {
    console.error('[CHECKOUT_ERROR]:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
