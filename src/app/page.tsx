// src/app/page.tsx
"use client";

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

// Optional: Add basic error boundary if needed later
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const [activeSpectrum, setActiveSpectrum] = useState<'structure' | 'disruption' | 'expression'>('structure');

  // For now, use static example data (replace with Sanity fetch later)
  const exampleProducts = {
    structure: [
      { id: 1, title: 'FACE SERIES T-SHIRT', price: '$35.00', module: 'MODULE 01', description: 'Geometric facial mapping.' },
      { id: 2, title: 'LOGOS HOODIE', price: '$85.00', module: 'MODULE 01', description: 'Primary color constraint.' },
    ],
    disruption: [
      { id: 3, title: 'DECAY JACKET', price: '$145.00', module: 'MODULE 02', description: 'Brutalist architecture subjected to digital weathering.' },
    ],
    expression: [
      { id: 5, title: 'KOI DRESS', price: '$120.00', module: 'MODULE 04', description: 'Mathematical mappings of botanical life.' },
    ],
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="brutalist-noise" aria-hidden="true" />
      <Hero />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl mb-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">Phase 01</p>
          <h2 className="text-4xl font-black uppercase md:text-6xl">Structural<br />Artifacts</h2>
        </div>
        <ProductGrid products={exampleProducts.structure} />
      </section>
    </main>
  );
}
