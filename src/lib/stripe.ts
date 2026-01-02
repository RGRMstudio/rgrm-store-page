import Stripe from 'stripe';

// Initialize the primary Stripe account (Store A001)
// We use the '!' to tell TypeScript we have verified these keys in Vercel.
export const stripeA001 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.preview', // API version is set globally here.
  typescript: true,
});

// Initialize the secondary Stripe account (Store A002)
// This allows the MegaMenu to route collectors to the correct financial engine.
export const stripeA002 = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.preview',
  typescript: true,
});

/**
 * RGRM Studio Note: 
 * If you use the same Stripe account for both stores, 
 * stripeA001 and stripeA002 will use the same key. 
 * If you separate them later, update your .env.local accordingly.
 */
