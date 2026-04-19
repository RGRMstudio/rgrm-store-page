import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use the latest stable version compatible with your setup
});

export async function POST(req: NextRequest) {
  try {
    // 1. Parse Request Body
    const body = await req.json();
    const { 
      productName, 
      price, 
      quantity = 1, 
      variantId, 
      image, 
      email 
    } = body;

    // 2. Validate Required Fields
    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: productName and price' },
        { status: 400 }
      );
    }

    // 3. Format Price (Stripe expects integers in cents)
    const unitAmount = Math.round(parseFloat(price) * 100);
    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // 4. Generate Internal Tracking ID
    const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 5. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      
      // Product Line Items
      line_items: [
        {
          quantity,
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name: productName,
              ...(image ? { images: [image] } : {}),
              metadata: {
                ...(variantId ? { variantId } : {}),
              },
            },
          },
        },
      ],

      // ✅ CRITICAL: Enable Cart Recovery (Abandoned Checkout)
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true, // Allows users to use coupons during recovery
        },
      },

      // ✅ CRITICAL: Collect Marketing Consent
      // This allows Stripe to track if the user opted in for emails
      consent_collection: {
        promotions: 'auto', 
      },

      // Customer Info
      customer_email: email || undefined,

      // ✅ Metadata for Analytics & Webhooks
      metadata: {
        cart_id: cartId,
        item_count: quantity.toString(),
        store: 'raguiromo',
        source: 'web',
      },

      // Redirect URLs
      success_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/selection`,
    });

    console.log(`[CHECKOUT_CREATED] Session: ${session.id}, Cart: ${cartId}`);

    // 6. Return Success Response
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
