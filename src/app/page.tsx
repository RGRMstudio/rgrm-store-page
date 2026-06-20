// src/app/page.tsx

"use client"; // <-- Add this line at the very top

import { useState } from 'react'; // Need this for the interactive spectrum nav

export default function HomePage() {
  const [activeSpectrum, setActiveSpectrum] = useState<'structure' | 'disruption' | 'expression'>('structure');

  // Placeholder for products fetched from Sanity
  // const products = await getProducts(); // Uncomment and integrate if you want to pull from Sanity

  // Example product data matching your new design
  const exampleProducts = {
    structure: [
      { id: 1, title: 'FACE SERIES T-SHIRT', price: '$35.00', module: 'MODULE 01', description: 'Geometric facial mapping. Diagnostic overlay.' },
      { id: 2, title: 'LOGOS HOODIE', price: '$85.00', module: 'MODULE 01', description: 'Primary color constraint. Semi-circle anchor motif.' },
    ],
    disruption: [
      { id: 3, title: 'DECAY JACKET', price: '$145.00', module: 'MODULE 02', description: 'Brutalist architecture subjected to digital weathering.' },
      { id: 4, title: 'SURREALISM BAG', price: '$65.00', module: 'MODULE 03', description: 'Solid forms liquify. Boundaries dissolve into circuitry.' },
    ],
    expression: [
      { id: 5, title: 'KOI DRESS', price: '$120.00', module: 'MODULE 04', description: 'Mathematical mappings of botanical and aquatic life.' },
      { id: 6, title: 'ORGANIC TOTE', price: '$45.00', module: 'MODULE 04', description: 'Rigid-organic hybrid. Geometric flora pattern.' },
    ]
  };

  // Example module data
  const modulesData = [
    { num: '01', title: 'THE FACE SERIES', desc: 'Geometric facial mapping. Diagnostic overlay.', pillar: 'expression' },
    { num: '02', title: 'INDUSTRIAL DECAY', desc: 'Calculated entropy. Digital weathering.', pillar: 'disruption' },
    { num: '03', title: 'SURREALISM & DIGITAL EXPRESSION', desc: 'Solid forms liquify. Boundaries dissolve.', pillar: 'expression' },
    { num: '04', title: 'LUSH ORGANIC', desc: 'Biological chaos through industrial lens.', pillar: 'expression' },
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* GRID OVERLAY - Utilizes the .brutalist-noise class defined in globals.css */}
      <div className="brutalist-noise" aria-hidden="true" />

      {/* NEW HERO SECTION - Replaces the old Hero component */}
      <section className="py-16 md:py-24 px-6 text-center max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter">
          WEARABLE ARCHITECTURE
        </h1>
        <p className="text-lg text-[#b0b0b0] mb-10 max-w-2xl mx-auto">
          STRUCTURAL • FUNCTIONAL • EXPRESSIONIST
        </p>
        <div className="flex justify-center gap-4">
          {(['structure', 'disruption', 'expression'] as const).map((pillar) => (
            <button
              key={pillar}
              onClick={() => setActiveSpectrum(pillar)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeSpectrum === pillar
                  ? 'bg-gradient-to-r from-[#0c2461] via-[#ff6b35] to-[#c44569] text-white'
                  : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#b0b0b0]'
              }`}
            >
              {pillar.charAt(0).toUpperCase() + pillar.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* SPECTRUM SECTIONS - Replaces the old Product section */}
      <section id="the-spectrum" className="py-16 px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">NAVIGATE THE SPECTRUM</h2>

        {/* Structure Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-[#0c2461] text-white text-xs font-bold rounded-full mb-3">
              PILLAR: STRUCTURE
            </span>
            <h3 className="text-2xl font-bold mb-3">THE FOUNDATION</h3>
            <p className="text-[#b0b0b0] max-w-2xl mx-auto">
              Architectural precision. Calculated form. Bauhaus geometry meets monolithic mass.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {(exampleProducts.structure).map((p) => (
              <div 
                key={p.id} 
                className="bg-[#121212] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="h-64 bg-[#0d0d0d] flex items-center justify-center">
                  <span className="text-[#b0b0b0] text-center px-4">PRODUCT PREVIEW</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-[#b0b0b0] text-sm mb-3">{p.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{p.price}</span>
                    <button className="bg-gradient-to-r from-[#0c2461] to-[#ff6b35] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disruption Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-[#ff6b35] text-white text-xs font-bold rounded-full mb-3">
              PILLAR: DISRUPTION
            </span>
            <h3 className="text-2xl font-bold mb-3">INDUSTRIAL DECAY</h3>
            <p className="text-[#b0b0b0] max-w-2xl mx-auto">
              Calculated entropy. Digital weathering. Structural compromise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {(exampleProducts.disruption).map((p) => (
              <div 
                key={p.id} 
                className="bg-[#121212] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="h-64 bg-[#0d0d0d] flex items-center justify-center">
                  <span className="text-[#b0b0b0] text-center px-4">PRODUCT PREVIEW</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-[#b0b0b0] text-sm mb-3">{p.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{p.price}</span>
                    <button className="bg-gradient-to-r from-[#ff6b35] to-[#c44569] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expression Section */}
        <div>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-1 bg-[#c44569] text-white text-xs font-bold rounded-full mb-3">
              PILLAR: EXPRESSION
            </span>
            <h3 className="text-2xl font-bold mb-3">LUSH ORGANIC</h3>
            <p className="text-[#b0b0b0] max-w-2xl mx-auto">
              Biological chaos processed through industrial lens. Total fluid expression.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {(exampleProducts.expression).map((p) => (
              <div 
                key={p.id} 
                className="bg-[#121212] border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:border-[rgba(255,255,255,0.15)]"
              >
                <div className="h-64 bg-[#0d0d0d] flex items-center justify-center">
                  <span className="text-[#b0b0b0] text-center px-4">PRODUCT PREVIEW</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-[#b0b0b0] text-sm mb-3">{p.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{p.price}</span>
                    <button className="bg-gradient-to-r from-[#c44569] to-[#0c2461] text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90">
                      ADD TO_CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES SECTION */}
      <section id="modules" className="py-20 px-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">ACTIVE MODULES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {modulesData.map((m, i) => (
            <div 
              key={i}
              className="bg-[#121212] border border-[rgba(255,255,255,0.08)] rounded-xl p-6 transition-all hover:border-[rgba(255,255,255,0.15)]"
            >
              <div className="text-[#b0b0b0] text-sm mb-2">MODULE {m.num}</div>
              <h3 className="text-xl font-bold mb-3">{m.title}</h3>
              <p className="text-[#b0b0b0] text-sm mb-4">{m.desc}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                m.pillar === 'structure' ? 'bg-[#0c2461] text-white' :
                m.pillar === 'disruption' ? 'bg-[#ff6b35] text-white' :
                'bg-[#c44569] text-white'
              }`}>
                {m.pillar}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
