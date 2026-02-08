'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * RGRM STUDIO: ACQUISITION SUCCESS
 * Component: Certificate of Acquisition
 * Phase: 01 (Brutalist Lineage)
 */

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-20 px-6">
      {/* Structural Indicator */}
      <div className="w-12 h-12 bg-[#BC2026] mb-8 animate-pulse" />

      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4">
        Acquisition Validated
      </h1>
      
      <p className="text-[#BC2026] font-bold tracking-[0.3em] uppercase mb-12">
        Registry Status: Confirmed
      </p>

      <div className="border border-[#FFFFFF]/20 p-8 w-full text-left font-[Lato] space-y-6">
        <div>
          <h2 className="text-xs opacity-40 uppercase tracking-widest mb-2">Study Phase</h2>
          <p className="text-lg font-bold">Phase 01: Brutalist Lineage</p>
        </div>

        <div>
          <h2 className="text-xs opacity-40 uppercase tracking-widest mb-2">Acquisition ID</h2>
          <p className="text-sm font-mono opacity-80 break-all">
            {sessionId || 'RGRM-PENDING-SYNC'}
          </p>
        </div>

        <div className="pt-6 border-t border-[#FFFFFF]/10">
          <p className="text-sm opacity-60 leading-relaxed">
            Your study is currently undergoing the **Preservation Protocol**. 
            Once architectural integrity is verified at the studio (Printful), 
            shipping logistics will be dispatched to your coordinates.
          </p>
        </div>
      </div>

      <Link href="/" className="mt-12 group flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[#BC2026] transition-colors">
          Return to Studio Registry
        </span>
        <span className="text-xl">→</span>
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="bg-[#000000] text-[#FFFFFF] min-h-screen font-[Montserrat]">
      <Suspense fallback={<div className="p-20 text-center opacity-50">Loading Registry...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
