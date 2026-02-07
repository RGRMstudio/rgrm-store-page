// src/app/page.tsx
'use client';

import Image from 'next/image';

const PHASE_01_STUDIES = [
  {
    id: 'RGRM-001-B',
    name: 'Study 001: Brutalist Tee',
    price: 4500, // In cents for Stripe ($45.00)
    displayPrice: '$45',
    description: 'Heavyweight architectural cotton. Studio Black.',
    image: '/tee-placeholder.jpg' // Ensure an image exists in /public/
  }
];

export default function Home() {
  const handleAcquisition = async (studyId: string) => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          artifactId: studyId,
          size: 'M' // Defaulting to M for the test
        }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error('[STUDIO ERROR]: Acquisition failed', error);
    }
  };

  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen p-6 md:p-12 font-[Montserrat]">
      {/* Header Section */}
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2">
          RGRM STUDIO
        </h1>
        <p className="text-[#BC2026] font-medium tracking-[0.2em] uppercase">
          Phase 01: Brutalist Lineage
        </p>
      </header>

      {/* Gallery Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {PHASE_01_STUDIES.map((study) => (
          <div key={study.id} className="group border border-[#FFFFFF]/20 p-6 flex flex-col gap-6">
            <div className="bg-[#111111] aspect-[3/4] relative overflow-hidden">
               {/* Image placeholder */}
               <div className="absolute inset-0 flex items-center justify-center text-[#FFFFFF]/10 text-9xl font-bold">
                 RGRM
               </div>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs text-[#BC2026] font-bold uppercase tracking-widest">
                  {study.id}
                </span>
                <h2 className="text-2xl font-bold uppercase mt-1">{study.name}</h2>
                <p className="text-sm opacity-60 mt-2 max-w-xs font-[Lato]">
                  {study.description}
                </p>
              </div>
              <span className="text-2xl font-bold">{study.displayPrice}</span>
            </div>

            <button 
              onClick={() => handleAcquisition(study.id)}
              className="w-full bg-[#FFFFFF] text-[#000000] py-4 font-bold uppercase hover:bg-[#BC2026] hover:text-[#FFFFFF] transition-all duration-300"
            >
              Acquire Study
            </button>
          </div>
        ))}
      </section>

      <footer className="mt-20 pt-10 border-t border-[#FFFFFF]/10 text-[10px] opacity-40 uppercase tracking-widest">
        © 2026 RaGuiRoMo Studio | Form Follows Function | Founder: Raul Guillermo Rosario Morales
      </footer>
    </main>
  );
}
