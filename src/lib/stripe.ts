import Stripe from 'stripe';

/**
 * Stripe Client Initialization
 * Using the Singleton pattern to prevent multiple instances
 * during Next.js Hot Module Replacement (HMR) in development.
 */

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Please add it to your Vercel Environment Variables.');
}

// Singleton instance to be used across the server
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Ensure the apiVersion matches your Stripe Dashboard's current version
  apiVersion: '2023-10-16',
  typescript: true,
  appInfo: {
    name: 'RaGuiRoMo Bauhaus Store',
    version: '1.0.0',
  },
});
