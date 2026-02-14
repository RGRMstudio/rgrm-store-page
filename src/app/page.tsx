'use client'; // <--- 1. This is required for useState/useEffect

import React, { useState, useEffect, Suspense } from 'react'; // <--- 2. Added missing imports
import dynamic from 'next/dynamic'; // <--- 3. Fixed dynamic import
import Link from 'next/link';

// Make sure this file exists at: src/components/ProductCard.tsx
import ProductGrid from '@/components/ProductCard'; 

const IdentityPop = dynamic(() => import('@/components/IdentityPop'), { 
  ssr: false,
  loading: () => <div className="h-40 animate-pulse bg-gray-100 border-4 border-black mb-8" /> 
});

const IdentityStory = dynamic(() => import('@/components/IdentityStory'), { 
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-gray-50 border-2 border-black" />
});

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-black border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-white text-black font-sans selection:bg-yellow-400">
      {/* RGRM Global Header */}
      <header className="p-6 border-b-8 border-black flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">
            RaGuiRoMo <span className="text-red-600">Store</span>
          </h1>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">
            Authenticated Identity Registry
          </span>
        </div>
        <nav className="hidden md:flex gap-10 font-black text-xs tracking-widest">
          <a href="#registry" className="hover:text-blue-600 transition-colors underline decoration-4 underline-offset-4">REGISTRY</a>
          <a href="#shop" className="hover:text-green-600 transition-colors underline decoration-4 underline-offset-4">SHOP</a>
          <a href="#narrative" className="hover:text-red-600 transition-colors underline decoration-4 underline-offset-4">STORY</a>
        </nav>
      </header>

      {/* Main Layout Grid */}
      <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-20">
        
        {/* Section 1: Interaction & Identity */}
        <section id="registry" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
          <div className="space-y-8">
            <Suspense fallback={<div>Initializing...</div>}>
              <IdentityPop />
            </Suspense>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <div className="relative border-8 border-black p-8 bg-red-600">
               <div className="bg-white p-10 border-4 border-black">
                 <h2 className="text-8xl font-black uppercase leading-[0.8] mb-6 tracking-tighter">
                   RGRM<br/><span className="text-blue-600">REG</span>
                 </h2>
                 <p className="text-xl font-black border-t-8 border-black pt-6 uppercase">
                   Module 002: Authentication
                 </p>
                 <p className="text-sm font-bold opacity-70 mt-4 leading-relaxed">
                   Verification of design lineage and production origin for RGRMstore artifacts.
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* --- NEW SECTION: SHOP --- */}
        <section id="shop" className="mb-24 border-8 border-black">
          <div className="bg-black text-white p-4">
            <h2 className="text-xl font-black uppercase tracking-widest">
              Artifact Collection
            </h2>
          </div>
          {/* This loads the Product Grid we built earlier */}
          <ProductGrid />
        </section>

        {/* Section 2: Brand Narrative */}
        <section id="narrative" className="border-t-8 border-black pt-20">
          <div className="bg-yellow-400 border-8 border-black p-1 translate-x-[-10px]">
            <div className="bg-white p-8 md:p-16 border-4 border-black">
              <Suspense fallback={<div>Loading Narrative...</div>}>
                <IdentityStory />
              </Suspense>
            </div>
          </div>
        </section>

      </div>

      {/* RGRM Footer */}
      <footer className="mt-20 p-16 bg-black text-white border-t-[12px] border-red-600 flex flex-col items-center gap-6">
        <p className="text-3xl font-black uppercase tracking-[0.3em] text-center">
          RGRMstore <span className="text-red-600">•</span> 2026
        </p>
        <div className="h-1 w-24 bg-blue-600" />
        <p className="text-[10px] font-bold tracking-[0.5em] opacity-40">
          IDENTITY IS THE ULTIMATE LUXURY
        </p>
      </footer>
    </main>
  );
}
