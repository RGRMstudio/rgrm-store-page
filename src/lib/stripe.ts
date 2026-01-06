import Stripe from 'stripe';

// This ensures the app fails early if you forgot to add the key to Vercel
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing. Add it to Vercel Environment Variables.');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia', // Latest stable version
  typescript: true,
});
