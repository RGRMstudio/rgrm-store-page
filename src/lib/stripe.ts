import Stripe from 'stripe';

// We use 'as any' to satisfy the strict Acacia type check in Vercel.
// Use the exact date format required by your SDK (2025-02-24.acacia).
export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});
