import Stripe from 'stripe';

/**
 * RaGuiRoMo Store - Stripe Singleton
 * This client handles all payment communication for RGRMstore.
 * It ensures only one instance of Stripe is created.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('CRITICAL: STRIPE_SECRET_KEY is missing from Vercel Environment Variables.');
}

// Global augmentation for the Stripe instance to survive HMR in development
const globalForStripe = global as unknown as { stripe: Stripe };

export const stripe =
  globalForStripe.stripe ||
  new Stripe(process.env.STRIPE_SECRET_KEY, {
    typescript: true,
    appInfo: {
      name: 'RaGuiRoMo Store Registry',
      version: '1.0.0',
    },
  });

if (process.env.NODE_ENV !== 'production') globalForStripe.stripe = stripe;
