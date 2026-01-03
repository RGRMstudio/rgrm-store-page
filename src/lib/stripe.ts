import Stripe from 'stripe';

/**
 * RaGuiRoMo Store: Stripe Engine
 * Optimized for API version '2025-02-24.acacia'
 */

// We use 'as any' to satisfy strict TypeScript version pinning in Vercel
export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});

export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
  typescript: true,
});
