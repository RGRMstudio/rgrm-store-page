'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Fix line 13: Using dynamic imports with ssr: false to stop the cascading render loop
const IdentityPop = dynamic(() => import('@/components/IdentityPop'), { 
  ssr: false,
  loading: () => <div className="h-20 animate-pulse bg-gray-200 border-2 border-black" /> 
});

const IdentityStory = dynamic(() => import('@/components/IdentityStory'), { 
  ssr: false 
});

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  // The Mounting Guard: Prevents hydration mismatch and cascading errors
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-16 h-16 border-8 border-black border-t-red-600 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white text-black font-sans selection:bg-yellow-400">
      {/* Bauhaus Sticky Header */}
      <header className="p-6 border-b-4 border-black flex justify-between items-center bg-white sticky top-0 z-50">
        <h1 className="text-3xl font-black tracking-tighter uppercase">
          RaGuiRoMo <span className="text-blue-600">Studio</span>
        </h1>
        <nav className="hidden md:flex gap-8 font-bold text-sm tracking-widest">
          <a href="#registry" className="hover:bg-black hover:text-white px-2 py-1 transition-all">REGISTRY</a>
          <a href="#story" className="hover:bg-black hover:text-white px-2 py-1 transition-all">STORY</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Registry Interaction */}
        <section id="registry" className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="order-2 lg:order-1">
            <Suspense fallback={<div className="h-64 bg-gray-100 border-2 border-black animate-pulse" />}>
              <IdentityPop />
            </Suspense>
          </div>
          
          <div className="order-1 lg:order-2 border-8 border-black p-4 bg-red-600 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
             <div className="bg-white p-8 border-4 border-black h-full">
               <h2 className="text-7xl font-black mb-4 uppercase leading-none tracking-tighter">
                 Verified<br/><span className="text-blue-600">Design</span>
               </h2>
               <p className="text-xl font-bold border-t-4 border-black pt-4">
                 Bauhaus Registry Authentication Module 002.
               </p>
             </div>
          </div>
        </section>

        {/* Section 2: Narrative Story */}
        <section id="story" className="mt-12 border-t-4 border-black bg-yellow-400">
          <div className="bg-white m-4 md:m-12 border-4 border-black p-8 md:p-16">
            <Suspense fallback={<div>Loading Narrative...</div>}>
              <IdentityStory />
            </Suspense>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-20 p-12 bg-black text-white border-t-8 border-red-600 text-center">
        <p className="text-xl font-black uppercase tracking-[0.2em]">
          Identity is the Ultimate Luxury • RGRM 2024
        </p>
      </footer>
    </main>
  );
}
