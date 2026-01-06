'use server'

import { stripe } from '@/lib/stripe'; 
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createCheckoutSession() {
  const priceId = process.env.STRIPE_PRICE_ID; 
  const origin = (await headers()).get('origin');

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'payment',
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/`,
  });

  redirect(session.url!);
}
