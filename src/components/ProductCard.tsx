'use client';

import React from 'react';
import { createCheckoutSession } from '@/app/actions/checkout';

const studies = [
  {
    id: '001',
    name: 'Study 001: Brutalist Essential',
    price: '$45.00',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID || '', // Ties to your Vercel key
    description: 'Phase 01 Structural Garment. Studio Black.',
    image: '/study-001.jpg'
  },
  // Add more studies as they are cleared for acquisition
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {studies.map((study) => (
        <div key={study.id} className="border-r border-b border-white/10 p-8 group hover:bg-white/[0.02] transition-colors">
          <div className="aspect-[3/4] bg-white/5 mb-8 relative overflow-hidden">
             {/* Study Image Placeholder */}
             <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/10 uppercase tracking-[0.5em]">
               Image_Ref: {study.id}
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-black uppercase tracking-tighter leading-none font-[family-name:var(--font-headline)]">
                {study.name}
              </h3>
              <span className="text-[#BC2026] font-bold text-xs">{study.price}</span>
            </div>
            
            <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">
              {study.description}
            </p>

            <button 
              onClick={() => createCheckoutSession(study.priceId)}
              className="w-full mt-6 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#BC2026] hover:text-white transition-all"
            >
              Acquire Study
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
