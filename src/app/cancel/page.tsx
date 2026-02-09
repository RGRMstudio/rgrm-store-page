'use client';

import Link from 'next/link';

/**
 * RGRM STUDIO: ACQUISITION SUSPENDED
 * Component: Cancel Page
 * Phase: 01 (Brutalist Lineage)
 */

export default function CancelPage() {
  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen font-[Montserrat] flex flex-col items-center justify-center p-6 text-center">
      {/* Structural Geometry - Static Red Square */}
      <div className="w-12 h-12 border-2 border-[#BC2026] mb-8" />

      <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
        Acquisition Suspended
      </h1>
      
      <p className="text-[#BC2026] font-bold tracking-[0.2em] uppercase mb-10 text-xs">
        System Status: Awaiting Instructions
      </p>

      <div className="max-w-md border border-[#FFFFFF]/10 p-8 font-[Lato] mb-12">
        <p className="text-sm opacity-60 leading-relaxed">
          The transaction for **Phase 01: Brutalist Lineage** was not finalized. 
          No funds have been transferred. The integrity of your registry remains unchanged.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Link 
          href="/" 
          className="bg-[#FFFFFF] text-[#000000] px-10 py-4 font-bold uppercase hover:bg-[#BC2026] hover:text-[#FFFFFF] transition-all duration-300 text-sm"
        >
          Return to Registry
        </Link>
        
        <p className="text-[10px] opacity-30 uppercase tracking-[0.3em]">
          RaGuiRoMo Studio Integrity Protocol
        </p>
      </div>
    </main>
  );
}
