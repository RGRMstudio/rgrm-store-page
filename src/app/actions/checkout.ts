'use server';

import { stripe } from '@/lib/stripe'; // Use the verified lib instance
import { redirect } from 'next/navigation';

export async function createCheckoutSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Ensure this Price ID matches your Stripe Dashboard exactly
          price: process.env.STRIPE_PRICE_ID, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    if (session.url) {
      redirect(session.url);
    }
  } catch (error: any) {
    console.error('Checkout Error:', error.message);
    throw new Error('Failed to create checkout session.');
  }
}
