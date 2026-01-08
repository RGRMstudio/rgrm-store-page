import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ STRIPE_SECRET_KEY is missing in Environment Variables');
}

export const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
