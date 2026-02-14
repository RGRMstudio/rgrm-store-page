'use server';

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createCheckoutSession(priceId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://raguiromo.store';
  let session;

  try {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/selection`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'PR'], // Added PR for your local reach
      },
    });
  } catch (error) {
    console.error('Stripe Session Error:', error);
    throw new Error('Failed to initiate acquisition.');
  }

  // Redirects the user to the Stripe hosted checkout
  redirect(session.url!);
}
