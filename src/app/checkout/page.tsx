'use client';

import { Suspense } from 'react';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <div className="pt-40 px-6 text-center">
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">Secure Checkout</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500">
            Connecting to RGRM Registry...
          </p>
          {/* Your Stripe redirect logic should be called here */}
        </div>
      </Suspense>
    </main>
  );
}
