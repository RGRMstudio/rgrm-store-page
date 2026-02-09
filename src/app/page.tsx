'use client';

import { useState } from 'react';

/**
 * RGRM STUDIO: THE GALLERY
 * Phase: 01 (Brutalist Lineage)
 * Logic: Maps studies to the grid and dispatches acquisition requests.
 */

const STUDIES = [
  {
    id: 'RGRM-001-B',
    name: 'Study 001: Brutalist Tee',
    price: '$45.00',
    description: 'Heavyweight architectural cotton. Studio Black.',
    sizes: ['S', 'M', 'L', 'XL']
  }
];

export default function Home() {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAcquisition = async (artifactId: string, size: string) => {
    setLoadingId(artifactId);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artifactId, size }),
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Registry sync failed.');
      }
    } catch (err) {
      console.error('[STUDIO ERROR]:', err);
      alert('Acquisition Failed: Check Studio Connection.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen font-[Montserrat] p-6 md:p-16">
      {/* Header: Structural Blueprint */}
      <header className="mb-24 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4">
          RGRM STUDIO
        </h1>
        <div className="flex items-center gap-4">
          <span className="bg-[#BC2026] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
            Live Phase
          </span>
          <p className="text-[#BC2026] font-bold tracking-[0.3em] uppercase text-sm italic">
            01: Brutalist Lineage
          </p>
        </div>
      </header>

      {/* The Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {STUDIES.map((study) => (
          <div key={study.id} className="group flex flex-col gap-8 border border-white/10 p-8 hover:border-white/40 transition-colors">
            {/* Visual Canvas */}
            <div className="bg-[#111111] aspect-[4/5] relative flex items-center justify-center overflow-hidden">
               <span className="text-white/5 text-9xl font-bold rotate-90 select-none">RGRM</span>
               {/* When you have images, replace the span above with:
               <img src="/path-to-image.jpg" alt={study.name} className="object-cover w-full h-full" /> 
               */}
            </div>

            {/* Architectural Data */}
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[#BC2026] text-xs font-bold uppercase tracking-widest mb-1">{study.id}</p>
                  <h2 className="text-3xl font-bold uppercase tracking-tight">{study.name}</h2>
                </div>
                <span className="text-2xl font-light font-[Lato]">{study.price}</span>
              </div>
              
              <p className="text-sm opacity-50 max-w-xs font-[Lato] leading-relaxed">
                {study.description}
              </p>

              {/* Action: The Acquisition Button */}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex gap-2">
                  {study.sizes.map(size => (
                    <button key={size} className="border border-white/20 px-4 py-2 text-xs hover:bg-white hover:text-black transition-all">
                      {size}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleAcquisition(study.id, 'M')} // Defaulting to M for now
                  disabled={loadingId === study.id}
                  className={`w-full py-5 font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    loadingId === study.id 
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#FFFFFF] text-[#000000] hover:bg-[#BC2026] hover:text-[#FFFFFF]'
                  }`}
                >
                  {loadingId === study.id ? 'Syncing Registry...' : 'Acquire Study'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Footer: Integrity Protocol */}
      <footer className="mt-32 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] opacity-30 uppercase tracking-[0.4em]">
        <p>© 2026 RaGuiRoMo Studio</p>
        <p>Form Follows Function</p>
      </footer>
    </main>
  );
}
