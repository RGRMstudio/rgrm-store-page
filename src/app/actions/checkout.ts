'use server';
import Stripe from 'stripe';
import { redirect } from 'next/navigation';

// Initialize two separate Stripe clients for RGRM
const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY_A001!, { apiVersion: '2025-12-15.preview' as any });
const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY_A002!, { apiVersion: '2025-12-15.preview' as any });

export async function createCheckoutSession(formData: FormData) {
  const productId = formData.get('productId') as string;
  const storeSource = formData.get('storeSource') as string; // 'RGRMStoreA001' or 'RGRMStoreA002'

  // LOGICAL SWITCH: Select the account based on storeSource
  const activeStripe = storeSource === 'RGRMStoreA001' ? stripeA001 : stripeA002;

  const session = await activeStripe.checkout.sessions.create({
    stripeVersion: '2025-12-15.preview',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `RGRM Acquisition: ${productId}`,
            metadata: { storeSource } 
          },
          unit_amount: 3000, 
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
