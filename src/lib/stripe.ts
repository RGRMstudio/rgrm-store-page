import Stripe from 'stripe';

export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Use exactly this string to clear the Vercel type error
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});
