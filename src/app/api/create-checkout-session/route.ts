import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the incoming request body
    const body = await req.json();
    const { 
      productName, 
      price, 
      quantity = 1, 
      variantId, 
      image, 
      email 
    } = body;

    // 2. Validate required fields
    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: productName and price' },
        { status: 400 }
      );
    }

    // 3. Convert price to cents (Stripe requires integer)
    const unitAmount = Math.round(parseFloat(price) * 100);
    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // 4. Generate unique cart ID for tracking
    const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 5. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      
      // Product line items
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

      // ✅ CRITICAL: Enable Cart Recovery (Abandoned Checkout)
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },

      // ✅ CRITICAL: Collect marketing consent for email recovery
      consent_collection: {
        promotions: 'auto',
      },

      // Customer email for receipt and recovery
      customer_email: email || undefined,

      // ✅ Metadata for analytics, webhooks, and tracking
      meta {
        cart_id: cartId,
        item_count: quantity.toString(),
        store: 'raguiromo',
        source: 'web',
      },

      // Redirect URLs after checkout
      success_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/selection`,
    });

    // Log for debugging/monitoring
    console.log(`[CHECKOUT_CREATED] Session: ${session.id}, Cart: ${cartId}`);

    // Return success response to frontend
    return NextResponse.json({ 
      id: session.id, 
      url: session.url,
      cartId,
      message: 'Checkout session created successfully'
    });
    
  } catch (error: any) {
    // Log error for debugging
    console.error('[CHECKOUT_ERROR]:', error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create checkout session',
        code: error.code || 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the incoming request body
    const body = await req.json();
    const { 
      productName, 
      price, 
      quantity = 1, 
      variantId, 
      image, 
      email 
    } = body;

    // 2. Validate required fields
    if (!productName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: productName and price' },
        { status: 400 }
      );
    }

    // 3. Convert price to cents (Stripe requires integer)
    const unitAmount = Math.round(parseFloat(price) * 100);
    if (isNaN(unitAmount) || unitAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      );
    }

    // 4. Generate unique cart ID for tracking
    const cartId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 5. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      
      // Product line items
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

      // ✅ CRITICAL: Enable Cart Recovery (Abandoned Checkout)
      after_expiration: {
        recovery: {
          enabled: true,
          allow_promotion_codes: true,
        },
      },

      // ✅ CRITICAL: Collect marketing consent for email recovery
      consent_collection: {
        promotions: 'auto',
      },

      // Customer email for receipt and recovery
      customer_email: email || undefined,

      // ✅ Metadata for analytics, webhooks, and tracking
      meta {
        cart_id: cartId,
        item_count: quantity.toString(),
        store: 'raguiromo',
        source: 'web',
      },

      // Redirect URLs after checkout
      success_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE || 'https://raguiromo.store'}/selection`,
    });

    // Log for debugging/monitoring
    console.log(`[CHECKOUT_CREATED] Session: ${session.id}, Cart: ${cartId}`);

    // Return success response to frontend
    return NextResponse.json({ 
      id: session.id, 
      url: session.url,
      cartId,
      message: 'Checkout session created successfully'
    });
    
  } catch (error: any) {
    // Log error for debugging
    console.error('[CHECKOUT_ERROR]:', error);
    
    // Return user-friendly error message
    return NextResponse.json(
      { 
        error: error.message || 'Failed to create checkout session',
        code: error.code || 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}
