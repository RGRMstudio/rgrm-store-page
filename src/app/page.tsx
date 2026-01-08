'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  // Guard against white screen during hydration
  if (!isReady) return <div className="min-h-screen bg-white" />;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 text-center">
        <h1 className="text-8xl font-bold uppercase tracking-tighter">RGRM STUDIO</h1>
        <ProductGrid />
      </div>
    </main>
  );
}
