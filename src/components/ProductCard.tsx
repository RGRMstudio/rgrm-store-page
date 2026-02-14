'use client';

import React, { useState } from 'react';

// RGRM Studio - Phase 01: Brutalist Lineage
const studies = [
  { 
    id: 1, 
    name: "Study 001: Brutalist Tee", 
    priceDisplay: "45.00", 
    priceId: "price_1SzoioDVc7z8RC9IwwYzowLH",
    category: "Phase 01" 
  },
  { 
    id: 2, 
    name: "Study 002: Geometry Poster", 
    priceDisplay: "30.00", 
    priceId: "price_1SzoioDVc7z8RC9IwwYzowLH",
    category: "Phase 01" 
  },
];

const ProductGrid = () => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleAcquisition = async (priceId: string, studyId: number) => {
    setLoadingId(studyId);
    
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
        window.location.href = data.url; // Redirect to Stripe Acquisition Vault
      } else {
        console.error('Structural Error:', data.error);
        alert('Acquisition failed. Consult Studio Support.');
      }
    } catch (error) {
      console.error('Network Error:', error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-t border-black bg-black">
      {studies.map((study) => (
        <div key={study.id} className="bg-white p-8 aspect-square flex flex-col justify-between group hover:bg-[#BC2026] hover:text-white transition-colors duration-300">
          <div className="flex justify-between items-start">
            <span className="text-[10px] uppercase font-bold tracking-tighter">{study.category}</span>
            <span className="text-[10px] uppercase font-bold tracking-tighter">Status: Ready</span>
          </div>
          
          <div className="flex flex-col">
            <h3 className="text-4xl font-black uppercase leading-none mb-2 font-[family-name:var(--font-headline)]">
              {study.name}
            </h3>
            <p className="text-sm font-medium font-[family-name:var(--font-body)]">
              Form follows function. Architectural precision in every thread.
            </p>
          </div>
          
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black">${study.priceDisplay}</span>
            <button 
              onClick={() => handleAcquisition(study.priceId, study.id)}
              disabled={loadingId === study.id}
              className="text-[10px] font-bold border-b-2 border-current uppercase hover:opacity-70 disabled:opacity-50"
            >
              {loadingId === study.id ? "CALIBRATING..." : "ACQUIRE STUDY →"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
