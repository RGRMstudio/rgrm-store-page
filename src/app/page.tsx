import { createCheckoutSession } from '@/app/actions/checkout';
import Image from 'next/image';
import { Suspense } from 'react';

// OPT-IN TO NEXT.JS 15 PARTIAL PRERENDERING (PPR)
export const experimental_ppr = true;

/** * RGRM AUTOMATED PRODUCT ENGINE
 * Parallel fetching logic for Store A001 and A002
 */
async function DynamicProductGrid() {
  // In a real-world scenario, this function would call your Printful Sync Service
  // which uses the keys PRINTFUL_STORE_A001_KEY and PRINTFUL_STORE_A002_KEY
  const products = [
    { id: 'rgrm_001', name: 'RGRM: A001 Logic', price: 3000, store: 'RGRMStoreA001', img: '/rgrm-art-1.png' },
    { id: 'rgrm_002', name: 'RGRM: A002 Form', price: 2500, store: 'RGRMStoreA002', img: '/rgrm-art-2.png' },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b-8 border-black">
      {products.map((product) => (
        <div key={product.id} className="border-r-0 md:border-r-8 last:border-r-0 border-black group">
          <div className="relative aspect-square border-b-8 border-black bg-white overflow-hidden">
            <Image 
              src={product.img} 
              alt={product.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-1000 p-12"
            />
          </div>
          <div className="p-10 bg-white group-hover:bg-yellow-50 transition-colors">
            <div className="flex justify-between items-baseline mb-8">
              <h3 className="text-5xl font-black uppercase tracking-tighter leading-none">{product.name}</h3>
              <span className="text-2xl font-bold bg-black text-white px-2 py-1 italic">
                ${(product.price / 100).toFixed(2)}
              </span>
            </div>
            
            {/* RGRM CHECKOUT BUTTON: TRIGGERS SERVER ACTION */}
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
              Protocol: {product.store} // Global Fulfillment Enabled
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default function RGRMStudio() {
  return (
    <main className="min-h-screen bg-[#FDFDFD] text-black font-sans selection:bg-red-500 selection:text-white">
      {/* RGRM HEADER: THE ARTISTIC EXPRESSION */}
      <header className="border-b-8 border-black grid grid-cols-1 md:grid-cols-3 sticky top-0 z-50 bg-[#FDFDFD]">
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center bg-yellow-400">
          <h1 className="text-7xl font-black uppercase italic tracking-tighter">RGRM</h1>
        </div>
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center uppercase font-black text-xs tracking-[0.5em] leading-tight">
          Geometric Rigor // <br /> Automated Fulfillment
        </div>
        <div className="p-8 flex items-center bg-black text-white justify-center">
          <div className="w-10 h-10 bg-red-600 rounded-full animate-pulse mr-6"></div>
          <span className="font-bold tracking-[0.2em] uppercase text-sm italic">Production Active</span>
        </div>
      </header>

      {/* MISSION & VISION */}
      <section className="p-20 border-b-8 border-black grid grid-cols-1 lg:grid-cols-2 gap-20 bg-white">
        <div className="space-y-8">
          <h2 className="text-6xl font-black uppercase italic underline decoration-yellow-400 decoration-[16px] underline-offset-8">Vision</h2>
          <p className="text-3xl font-bold leading-tight max-w-xl italic">
            Converting mathematical calculation into physical art through **Direct API Tunnels**.
          </p>
        </div>
        <div className="space-y-8 border-l-0 lg:border-l-8 border-black pl-0 lg:pl-20">
          <h2 className="text-6xl font-black uppercase italic underline decoration-red-600 decoration-[16px] underline-offset-8">Mission</h2>
          <p className="text-3xl font-bold leading-tight max-w-xl italic">
            Eliminating artistic friction by synchronizing global logistics with primary form.
          </p>
        </div>
      </section>

      {/* DYNAMIC PRODUCT CONTENT */}
      <Suspense fallback={
        <div className="h-[60vh] flex items-center justify-center font-black uppercase text-5xl italic animate-pulse tracking-tighter bg-white">
          Fetching RGRM Assets...
        </div>
      }>
        <DynamicProductGrid />
      </Suspense>

      {/* RGRM FOOTER */}
      <footer className="p-20 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="text-center md:text-left">
          <p className="font-black text-5xl italic uppercase">RGRM.Studio</p>
          <p className="opacity-30 uppercase text-[10px] tracking-[0.5em] mt-4">© 2025 All Endpoints Synchronized</p>
        </div>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-yellow-400 border-4 border-white"></div>
          <div className="w-20 h-20 bg-red-600 border-4 border-white rounded-full"></div>
          <div className="w-20 h-20 bg-blue-600 border-4 border-white transform -rotate-12"></div>
        </div>
      </footer>
    </main>
  );
}
