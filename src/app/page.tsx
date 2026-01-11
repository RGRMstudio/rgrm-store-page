'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';
import IdentityStory from '@/components/IdentityStory';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // We use a small timeout to ensure the first paint completes.
    // This resolves the "cascading render" fatal error in React 19.
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Hydration Guard: Prevents mismatched HTML between server and client
  if (!isMounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <main className="min-h-screen bg-white text-black selection:bg-red-500 selection:text-white">
      <Navbar />
      <IdentityPop />
      
      <div className="max-w-7xl mx-auto py-12">
        <header className="mb-20 px-6">
          <h1 className="text-8xl font-black uppercase tracking-tighter leading-none">
            RGRM<br />Registry
          </h1>
          <p className="text-xs uppercase tracking-[0.5em] mt-4 text-gray-400">
            Edition 2026 — Bauhaus Digital Protocol
          </p>
        </header>

        <ProductGrid />
      </div>

      <IdentityStory />
    </main>
  );
}
