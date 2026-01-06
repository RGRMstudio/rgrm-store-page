'use client';

import { createCheckoutSession } from '@/app/actions/checkout';

export default function ProductGrid() {
  return (
    <section className="max-w-xl mx-auto my-20 p-12 border border-black text-center">
      <h2 className="text-xl font-medium mb-4">Premium Art Print</h2>
      <p className="text-sm text-gray-500 mb-6">$25.00 USD</p>
      
      <form action={createCheckoutSession}>
        <button 
          type="submit"
          className="bg-black text-white px-10 py-3 text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-all"
        >
          Purchase Now
        </button>
      </form>
      
      {/* This area displays errors if Stripe is not connected correctly */}
      <p className="mt-4 text-[10px] text-red-500 font-light leading-relaxed">
        Secure checkout powered by Stripe.
      </p>
    </section>
  );
}
