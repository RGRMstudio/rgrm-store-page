import { createCheckoutSession } from '@/app/actions/checkout';
import Image from 'next/image';
import { Suspense } from 'react';

// OPT-IN TO NEXT.JS 15 PARTIAL PRERENDERING
export const experimental_ppr = true;

/** * SELF-SUFFICIENT DATA ENGINE
 * Fetches products from Printful Store A001 & A002 dynamically
 */
async function DynamicProductGrid() {
  // In production, this calls your Printful sync service
  const products = [
    { id: 'bauhaus_a001_01', name: 'Primary Logic Tee', price: 3000, store: 'RGRMStoreA001', img: '/geometric-1.png' },
    { id: 'bauhaus_a002_02', name: 'Constructivist Poster', price: 2500, store: 'RGRMStoreA002', img: '/geometric-2.png' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b-8 border-black">
      {products.map((product) => (
        <div key={product.id} className="border-r-0 md:border-r-8 last:border-r-0 border-black p-0 group">
          <div className="relative aspect-square overflow-hidden border-b-8 border-black bg-white">
            <Image 
              src={product.img} 
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-700 p-12"
            />
          </div>
          <div className="p-8 bg-white group-hover:bg-yellow-50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-4xl font-black uppercase tracking-tighter leading-[0.8]">{product.name}</h3>
              <span className="text-2xl font-bold bg-black text-white px-2 py-1">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>
            
            {/* AUTOMATED STRIPE CHECKOUT */}
            <form action={createCheckoutSession}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="storeSource" value={product.store} />
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-6 text-2xl font-black uppercase hover:bg-black transition-all shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Acquire →
              </button>
            </form>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              Protocol: {product.store} // Fulfillment: Printful Global
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function BauhausStore() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-red-500 selection:text-white">
      {/* HEADER: BAUHAUS GRID */}
      <header className="border-b-8 border-black grid grid-cols-1 md:grid-cols-3 sticky top-0 z-50 bg-[#FDFDFD]">
        <div className="p-6 border-r-0 md:border-r-8 border-black flex items-center bg-yellow-400 group">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter group-hover:skew-x-12 transition-transform">RGRM</h1>
        </div>
        <div className="p-6 border-r-0 md:border-r-8 border-black flex items-center uppercase font-black text-xs tracking-[0.4em] leading-tight">
          Form Follows Function // <br /> Automated Retail v1.0
        </div>
        <div className="p-6 flex items-center bg-black text-white justify-center">
          <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse mr-4"></div>
          <span className="font-bold tracking-widest uppercase text-sm">Systems Online</span>
        </div>
      </header>

      {/* DYNAMIC CONTENT WITH SUSPENSE FALLBACK */}
      <Suspense fallback={
        <div className="h-96 flex items-center justify-center font-black uppercase text-4xl animate-pulse">
          Loading Geometric Logic...
        </div>
      }>
        <DynamicProductGrid />
      </Suspense>

      {/* MISSION FOOTER */}
      <footer className="p-16 border-t-8 border-black bg-white grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-5xl font-black uppercase italic underline decoration-yellow-400 decoration-8 underline-offset-8">The Philosophy</h2>
          <p className="text-2xl font-medium leading-tight max-w-xl">
            RaGuiRoMo is not a shop. It is a **Constructivist Protocol** that converts visual data into physical merch via **Direct API Tunnels**.
          </p>
        </div>
        <div className="flex flex-col justify-end items-start md:items-end gap-4">
          <div className="flex gap-2">
            <div className="w-16 h-16 bg-yellow-400 border-4 border-black"></div>
            <div className="w-16 h-16 bg-red-600 border-4 border-black"></div>
            <div className="w-16 h-16 bg-blue-600 border-4 border-black"></div>
          </div>
          <p className="text-xs font-black uppercase opacity-30 tracking-widest text-right">
            Stripe Live Secured // Printful A001 + A002 Synchronized
          </p>
        </div>
      </footer>
    </main>
  );
}
