'use client';

import React from 'react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center selection:bg-[#BC2026]">
      {/* THE ARCHITECTURAL SEAL */}
      <div className="w-24 h-24 border-2 border-[#BC2026] flex items-center justify-center mb-12 animate-pulse">
        <span className="text-[#BC2026] font-black text-4xl">RGRM</span>
      </div>

      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-[family-name:var(--font-headline)]">
          Acquisition <br />Confirmed
        </h1>
        
        <div className="h-[1px] w-full bg-white/10 my-8"></div>
        
        <p className="text-sm md:text-lg text-white/70 font-[family-name:var(--font-body)] leading-relaxed uppercase tracking-widest">
          Your study has been logged into the Studio Registry. 
          The preservation protocol has begun. You will receive a 
          digital blueprint of your acquisition via email shortly.
        </p>

        <div className="pt-12 space-y-4">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
            Fulfillment Phase: 01 // Manufacturing in Progress
          </p>
          
          <Link href="/">
            <button className="btn-acquire">
              Return to Studio
            </button>
          </Link>
        </div>
      </div>

      {/* BACKGROUND WATERMARK */}
      <h2 className="fixed -bottom-10 -left-10 text-[20rem] font-black text-white/[0.02] uppercase pointer-events-none">
        Integrity
      </h2>
    </main>
  );
}
