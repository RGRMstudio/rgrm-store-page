import Stripe from "stripe";

// Prioritizes the Vercel-integrated "RGRMStore" Secret Key
const stripeSecret = 
  process.env.RGRMStore_STRIPE_SECRET_KEY || 
  process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  throw new Error("STRIPE_SECRET_KEY is missing from environment variables.");
}

export const stripe = new Stripe(stripeSecret, {
  apiVersion: "2024-12-18.acacia", // Updated to latest stable version
  typescript: true,
});
