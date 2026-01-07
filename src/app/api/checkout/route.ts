import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    // 1. Ensure the Price ID is pulled from your Vercel Environment Variables
    const priceId = process.env.STRIPE_PRICE_ID;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://raguiromo.store';

    if (!priceId) {
      console.error('❌ CONFIG ERROR: STRIPE_PRICE_ID is missing in Vercel.');
      return NextResponse.json(
        { error: 'Store configuration error: Missing Price ID' },
        { status: 500 }
      );
    }

    // 2. Initiate the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Using the API ID from your Stripe Product Catalog
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/`,
      // Collect shipping info so Printful can fulfill the physical item
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE'], 
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('❌ STRIPE API ERROR:', error.message);
    return NextResponse.json(
      { error: `Checkout failed: ${error.message}` },
      { status: 500 }
    );
  }
}
