import { loadStripe } from '@stripe/stripe-js';

// Prioritizes the Vercel-integrated "RGRMStore" Publishable Key
const publishableKey = 
  process.env.NEXT_PUBLIC_RGRMStore_STRIPE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!publishableKey) {
  console.warn("Stripe Publishable Key is missing.");
}

export const getStripe = () => loadStripe(publishableKey!);
