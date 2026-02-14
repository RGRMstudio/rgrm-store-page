'use client';

import React from 'react';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center selection:bg-[#BC2026]">
      {/* RGRM DYNAMIC LOADER */}
      <div className="relative w-32 h-32 mb-12">
        <div className="absolute inset-0 border-[1px] border-white/5"></div>
        <div className="absolute inset-0 border-t-[1px] border-[#BC2026] animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[8px] uppercase tracking-widest text-[#BC2026] font-bold">RGRM</span>
        </div>
      </div>

      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-headline)]">
          Establishing <br />Secure Bridge
        </h1>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 leading-loose">
          Synchronizing with financial registry... <br />
          Do not close the architectural window.
        </p>
      </div>

      {/* METADATA FOOTER */}
      <div className="fixed bottom-8 w-full px-12 flex justify-between items-end opacity-20 text-[8px] uppercase tracking-widest">
        <p>Terminal: RGRM-001</p>
        <p>Protocol: SSL/Stripe</p>
        <p>Location: Studio Registry</p>
      </div>
    </main>
  );
}
