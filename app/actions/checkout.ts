'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession(formData: FormData) {
  const productName = formData.get('name') as string;
  const storeSource = formData.get('storeSource') as string;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { 
            name: productName,
            metadata: { storeSource } // Tagging which Printful store this came from
          },
          unit_amount: 2500, // Replace with dynamic price from your Printful service
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  });

  redirect(session.url!);
}
