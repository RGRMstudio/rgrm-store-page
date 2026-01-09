'use client';

import React from 'react';

// This is the Price ID you copied (e.g., price_1Qw9...)
// We pass it to the server logic so the client never "guesses" the price.
const PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || ''; 

export default function ProductGrid() {
  const artifacts = [
    {
      id: 'rgrm-01',
      name: 'RGRM Registry Print — Edition 01',
      description: 'Bauhaus-minimalist artifact for digital identity registration.',
      price: '$45.00',
      image: '/artifact-01.jpg' // Ensure this matches your public folder
    }
  ];

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Call your backend API to create the Stripe session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: PRICE_ID }), 
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Secure Page
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
      {artifacts.map((item) => (
        <div key={item.id} className="border border-black p-8 group hover:bg-black transition-all duration-500">
          <div className="h-64 bg-gray-50 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
             <span className="text-[10px] uppercase tracking-widest text-gray-400">Artifact Visualizing...</span>
          </div>
          
          <h3 className="text-xl font-bold uppercase tracking-tighter group-hover:text-white">{item.name}</h3>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-2 mb-8 group-hover:text-gray-400">
            {item.description}
          </p>
          
          <form onSubmit={handleCheckout}>
            <button 
              type="submit"
              className="w-full border border-black py-4 text-[10px] font-bold uppercase tracking-[0.3em] group-hover:border-white group-hover:text-white hover:bg-white hover:text-black transition-all"
            >
              Register Identity — {item.price}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
