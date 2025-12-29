'use server';
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(formData: FormData) {
  const productId = formData.get('productId') as string;
  const storeSource = formData.get('storeSource') as string;

  const session = await stripe.checkout.sessions.create({
    // EXPLICIT V2 PREVIEW VERSIONING
    stripeVersion: '2025-12-15.preview',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { 
            name: `RGRM Asset: ${productId}`,
            metadata: { 
              storeSource,
              // V2 INTEROP: Tagging for account-level visibility
              customer_account: storeSource 
            }
          },
          unit_amount: 3000, 
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    // RGRM BLUEPRINT REDIRECTS
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
  });

  redirect(session.url!);
}
