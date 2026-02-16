'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

// --- CONFIGURATION ---
// ⚠️ ACTION REQUIRED: Replace the strings below with your REAL Stripe Price IDs ⚠️
const PRODUCTS = [
  { 
    id: 1, 
    name: "Bauhaus Tee No. 1", 
    priceDisplay: "45.00", 
    // 👇 DELETE THIS PLACEHOLDER AND PASTE YOUR REAL ID INSIDE THE QUOTES
    priceId: "price_1SzoioDVc7z8RC9IwwYzowLH", 
    category: "Apparel",
    description: "Heavyweight cotton. 240gsm. Screen printed in Brooklyn.",
    color: "bg-red-600"
  },
  { 
    id: 2, 
    name: "Manifesto Poster", 
    priceDisplay: "30.00", 
    // 👇 DELETE THIS PLACEHOLDER AND PASTE YOUR REAL ID INSIDE THE QUOTES
    priceId: "price_1SzoioDVc7z8RC9IwwYzowLH", 
    category: "Print",
    description: "A2 Matte Finish. The principles of modern identity.",
    color: "bg-blue-600"
  },
  { 
    id: 3, 
    name: "Geometric Study", 
    priceDisplay: "120.00", 
    // 👇 DELETE THIS PLACEHOLDER AND PASTE YOUR REAL ID INSIDE THE QUOTES
    priceId: "price_1SzoioDVc7z8RC9IwwYzowLH", 
    category: "Digital",
    description: "Limited edition digital asset + Physical key.",
    color: "bg-yellow-400"
  },
];

export default function SelectionPage() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCheckout = async (priceId: string, productId: number) => {
    setLoadingId(productId);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ priceId: priceId, quantity: 1 }]
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // This will now tell you exactly what Stripe is complaining about!
        console.error('Checkout error:', data.error);
        alert(`Stripe Error: ${data.error || 'Check Vercel Logs for details'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network Error: Please check your connection.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-yellow-400">
      
      {/* HEADER: Navigation & Identity */}
      <header className="sticky top-0 z-50 bg-white border-b-8 border-black p-6 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2 font-black text-xs tracking-widest uppercase hover:text-red-600 transition-colors">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Origin</span>
        </Link>
        
        <h1 className="text-2xl font-black uppercase tracking-tighter">
          RGRM<span className="text-blue-600">/SELECT</span>
        </h1>
      </header>

      {/* HERO SECTION */}
      <section className="bg-black text-white p-12 border-b-8 border-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-6">
            Artifact<br /><span className="text-transparent stroke-white stroke-2 md:stroke-4" style={{ WebkitTextStroke: '2px white' }}>Acquisition</span>
          </h2>
          <p className="text-sm font-bold tracking-[0.2em] uppercase opacity-70 max-w-lg border-l-4 border-red-600 pl-4">
            Authorized for public distribution. <br/> 
            Identity verification tokens included with all physical goods.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group relative bg-white border-4 border-black transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Category Tag */}
              <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                {product.category}
              </div>

              {/* Product Visual Placeholder */}
              <div className={`h-64 w-full border-b-4 border-black flex items-center justify-center ${product.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                <ShoppingBag className="w-12 h-12 opacity-20" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h3 className="text-2xl font-black uppercase leading-none mb-2">
                    {product.name}
                  </h3>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-wide">
                    {product.description}
                  </p>
                </div>

                <div className="h-0.5 w-full bg-black opacity-10" />

                <div className="flex items-center justify-between mt-auto">
                  <span className="text-3xl font-black tracking-tighter">
                    ${product.priceDisplay}
                  </span>
                  
                  <button
                    onClick={() => handleCheckout(product.priceId, product.id)}
                    disabled={loadingId === product.id}
                    className="bg-black text-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingId === product.id ? "Processing..." : "Acquire"}
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-8 border-black p-12 bg-gray-50 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">
          SECURE TRANSACTION PROTOCOL • STRIPE ENCRYPTED
        </p>
      </footer>

    </main>
  );
}
