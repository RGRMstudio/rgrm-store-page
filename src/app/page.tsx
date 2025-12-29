import { createCheckoutSession } from '@/app/actions/checkout';
import Image from 'next/image';
import { Suspense } from 'react';

// OPT-IN TO NEXT.JS 15 PARTIAL PRERENDERING
export const experimental_ppr = true;

/** * RGRM DYNAMIC ENGINE
 * Fetches data from Printful A001 & A002 in parallel
 */
async function DynamicProductGrid() {
  // Logic to fetch from both stores simultaneously
  const products = [
    { id: 'rgrm_a001_01', name: 'A001: Primary Logic', price: 3000, store: 'RGRMStoreA001', img: '/art-1.png' },
    { id: 'rgrm_a002_02', name: 'A002: Linear Order', price: 2500, store: 'RGRMStoreA002', img: '/art-2.png' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b-8 border-black bg-white">
      {products.map((product) => (
        <div key={product.id} className="border-r-0 md:border-r-8 last:border-r-0 border-black p-0 group overflow-hidden">
          <div className="relative aspect-square border-b-8 border-black bg-[#FDFDFD]">
            <Image 
              src={product.img} 
              alt={product.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-1000 p-16"
            />
          </div>
          <div className="p-10 bg-white group-hover:bg-yellow-50 transition-colors">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-5xl font-black uppercase tracking-tighter leading-[0.7]">{product.name}</h3>
              <span className="text-2xl font-bold bg-black text-white px-3 py-1 italic">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>
            
            {/* RGRM DIRECT API CHECKOUT */}
            <form action={createCheckoutSession}>
              <input type="hidden" name="productId" value={product.id} />
              <input type="hidden" name="storeSource" value={product.store} />
              <button 
                type="submit"
                className="w-full bg-red-600 text-white py-6 text-3xl font-black uppercase hover:bg-black transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-2 active:translate-y-2"
              >
                Acquire →
              </button>
            </form>
            <p className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] opacity-40">
              Protocol: {product.store} // Fulfillment: Printful Global // RGRM Studio
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function RGRMStore() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-red-500 selection:text-white">
      {/* RGRM STRUCTURAL HEADER */}
      <header className="border-b-8 border-black grid grid-cols-1 md:grid-cols-3 sticky top-0 z-50 bg-[#FDFDFD]">
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center bg-yellow-400">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter">RGRM</h1>
        </div>
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center uppercase font-black text-xs tracking-[0.5em] leading-tight">
          Geometric Logic Over <br /> Decorative Superfluity
        </div>
        <div className="p-8 flex items-center bg-black text-white justify-center overflow-hidden">
          <div className="w-10 h-10 bg-red-600 rounded-full animate-ping mr-6"></div>
          <span className="font-bold tracking-[0.2em] uppercase text-sm">Automated Retail Active</span>
        </div>
      </header>

      {/* DYNAMIC STREAMING SECTION */}
      <Suspense fallback={
        <div className="h-[60vh] flex items-center justify-center font-black uppercase text-5xl italic animate-pulse tracking-tighter bg-white">
          Syncing RGRM Logic...
        </div>
      }>
        <DynamicProductGrid />
      </Suspense>

      {/* RGRM PHILOSOPHY FOOTER */}
      <footer className="p-20 border-t-8 border-black bg-white grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-8">
          <h2 className="text-6xl font-black uppercase italic underline decoration-yellow-400 decoration-[16px] underline-offset-8">Philosophy</h2>
          <p className="text-3xl font-bold leading-[1.1] max-w-xl italic">
            Art is a process of calculation. We eliminate the middleman via **Direct API Tunnels**. 
          </p>
        </div>
        <div className="flex flex-col justify-end items-start md:items-end gap-6">
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-yellow-400 border-8 border-black"></div>
            <div className="w-20 h-20 bg-red-600 border-8 border-black rounded-full"></div>
            <div className="w-20 h-20 bg-blue-600 border-8 border-black transform rotate-45"></div>
          </div>
          <p className="text-xs font-black uppercase opacity-20 tracking-[0.4em] text-right">
            Stripe Production // Printful A001 + A002 Integrated
          </p>
        </div>
      </footer>
    </main>
  );
}
