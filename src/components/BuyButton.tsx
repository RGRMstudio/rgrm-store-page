// src/components/BuyButton.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';

export default function BuyButton({ 
  productId, 
  variantId, 
  price, 
  name, 
  thumbnail, 
  size 
}: { 
  productId: string; 
  variantId: string; 
  price: number; 
  name: string; 
  thumbnail: string;
  size: string;
}) {
  const handleBuyNow = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          variantId,
          price,
          name,
          thumbnail,
          size,
        }),
      });

      const data = await res.json();
      
      if (data.id) {
        // ✅ Correct: Use `data.id` with stripe.redirectToCheckout
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: data.id });
        } else {
          alert('Stripe failed to load.');
        }
      } else {
        alert('Error: ' + (data.error || 'No session ID returned'));
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-[#BC2026] hover:bg-red-700 text-white px-8 py-4 uppercase font-bold cursor-pointer transition-colors w-full md:w-auto"
    >
      Buy Now
    </button>
  );
}
