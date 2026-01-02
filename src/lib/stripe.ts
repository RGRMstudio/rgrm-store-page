import Stripe from 'stripe';

// Initialize the primary Stripe account (Store A001)
// The 'as any' bypasses strict versioning for the current build environment.
export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

// Initialize the secondary Stripe account (Store A002)
// Using the same key ensures consistent transaction flow for RGRM Studio.
export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});
