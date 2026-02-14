'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      {/* RGRM STRUCTURAL LOADER */}
      <div className="relative w-24 h-24 mb-12">
        <div className="absolute inset-0 border-2 border-white/10"></div>
        <div className="absolute inset-0 border-t-2 border-[#BC2026] animate-spin"></div>
      </div>

      <div className="space-y-4 max-w-md">
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-headline)]">
          Initiating <br />Acquisition
        </h1>
        <div className="h-[1px] w-full bg-white/10 my-4"></div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 leading-relaxed">
          Connecting to Secure RGRM Financial Bridge. <br />
          Please do not refresh the blueprint.
        </p>
      </div>

      {/* BACKGROUND ELEMENTS */}
      <div className="fixed bottom-12 left-12 opacity-20 hidden md:block">
        <p className="text-[9px] uppercase tracking-widest leading-loose">
          Terminal: RGRM_ST_001<br />
          Status: Handshaking...<br />
          Security: Encrypted
        </p>
      </div>
    </main>
  );
}
