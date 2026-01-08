'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import IdentityPop from '@/components/IdentityPop';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Safety check to prevent the "White Screen" on slow loads
  if (!hasMounted) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white relative">
      <Navbar />
      <IdentityPop />
      
      <section className="pt-32 pb-20 px-6 text-center">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
          RGRM STUDIO
        </h1>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-20">
          Bauhaus Minimalist Registry — Edition 2026
        </p>

        {/* This component pulls from your src/app/actions folder logic */}
        <div className="max-w-6xl mx-auto">
          <ProductGrid />
        </div>
      </section>

      {/* Bauhaus Decorative Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-[#e63946] rounded-full opacity-5 -z-10" />
      <div className="fixed bottom-20 right-10 w-40 h-10 bg-[#457b9d] opacity-5 -z-10" />
    </main>
  );
}
