import Stripe from 'stripe';

/**
 * RaGuiRoMo Stripe Singleton
 * This client handles all payment communication.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('CRITICAL: STRIPE_SECRET_KEY is missing from Vercel.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16', // Locked for stability
  typescript: true,
  appInfo: {
    name: 'RaGuiRoMo Bauhaus Store',
    version: '1.0.0',
  },
});
