'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe outside of the component to avoid re-initialization
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function ProductCard({ product }: { product: any }) {
  const [loading, setLoading] = useState(false);

  const handleAcquire = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // We pass the price ID from our environment variables
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error("Acquisition Error:", error);
        setLoading(false);
        return;
      }

      const stripe = await stripePromise;
      const { error: stripeError } = await stripe!.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error("Stripe Redirect Error:", stripeError.message);
      }
    } catch (err) {
      console.error("Critical System Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blueprint-border p-6 space-y-4 bg-black">
      <div className="aspect-square bg-white/5 relative overflow-hidden">
        {/* Product Image placeholder */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-rgrm-red mb-1">
            Study {product.id}
          </p>
          <h3 className="font-black uppercase tracking-tighter text-xl leading-none">
            {product.name}
          </h3>
        </div>
        <p className="font-bold text-sm tracking-widest">${product.price}</p>
      </div>

      <button 
        onClick={handleAcquire}
        disabled={loading}
        className="w-full btn-acquire disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Acquire Study"}
      </button>
    </div>
  );
}
