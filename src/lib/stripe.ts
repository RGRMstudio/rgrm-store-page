import Stripe from 'stripe';

const key = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(key, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});
