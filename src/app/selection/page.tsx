'use client';

import React from 'react';
import ProductGrid from '@/components/ProductCard';
import Link from 'next/link';

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#BC2026]">
      {/* NAVIGATION OVERLAY */}
      <nav className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-[#BC2026] transition-colors">
          ← Return to Manifesto
        </Link>
        <span className="text-[10px] uppercase font-bold text-white/40">
          Registry Index // Phase 01
        </span>
      </nav>

      {/* HEADER SECTION */}
      <header className="p-12 md:p-24 border-b border-white/10">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none font-[family-name:var(--font-headline)]">
          Study <br />Selection
        </h1>
        <p className="mt-8 text-sm md:text-base max-w-xl text-white/60 uppercase tracking-widest leading-relaxed">
          The following artifacts have been cleared for acquisition. Each piece represents a specific phase in our structural evolution.
        </p>
      </header>

      {/* PRODUCT GRID SECTION */}
      <section className="bg-white/5">
        <ProductGrid />
      </section>

      {/* TECHNICAL SPECIFICATIONS FOOTER */}
      <section className="p-12 md:p-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10">
        <div className="space-y-4">
          <h3 className="text-[#BC2026] text-xs font-bold uppercase tracking-widest">01. Materials</h3>
          <p className="text-[10px] text-white/50 uppercase leading-loose">
            High-density fabrics sourced for structural longevity. Precision weight for architectural drape.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-[#BC2026] text-xs font-bold uppercase tracking-widest">02. Fulfillment</h3>
          <p className="text-[10px] text-white/50 uppercase leading-loose">
            Global logistics handled via RGRM Manufacturing Bridge. Real-time tracking enabled upon acquisition.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-[#BC2026] text-xs font-bold uppercase tracking-widest">03. Integrity</h3>
          <p className="text-[10px] text-white/50 uppercase leading-loose">
            Designed for durability. Form follows function. Maintained through the Preservation Protocol.
          </p>
        </div>
      </section>

      <footer className="p-12 text-center border-t border-white/10">
        <p className="text-[9px] uppercase tracking-[0.5em] text-white/20">
          RaGuiRoMo Studio Structural Registry // 2026
        </p>
      </footer>
    </main>
  );
}
