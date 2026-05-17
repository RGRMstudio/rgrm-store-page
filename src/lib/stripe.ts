import Stripe from 'stripe';

// Use a global variable to cache the Stripe instance across hot reloads in development
const globalForStripe = global as unknown as { stripe: Stripe | undefined };

export const stripe =
  globalForStripe.stripe ||
  new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // No apiVersion - Stripe will use the default version for your SDK
    typescript: true,
    appInfo: {
      name: 'RaGuiRoMo Store Registry',
      version: '1.0.0',
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForStripe.stripe = stripe;
}
