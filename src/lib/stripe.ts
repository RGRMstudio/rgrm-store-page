import Stripe from 'stripe';

// Initialize Store A001
export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Updated to match the expected version from your Vercel logs
  apiVersion: '2025-02-24.acacia' as any, 
  typescript: true,
});

// Initialize Store A002
export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});
