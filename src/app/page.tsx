import { createCheckoutSession } from '@/app/actions/checkout';
import Image from 'next/image';

// This would ideally come from your Printful sync service we discussed
async function getProducts() {
  return [
    {
      id: 'prod_bauhaus_001',
      name: 'Geometric Vision T-Shirt',
      price: 3000,
      image: 'https://files.cdn.printful.com/example-item.jpg',
      storeSource: 'RGRMStoreA001',
    },
    {
      id: 'prod_bauhaus_002',
      name: 'Constructivist Poster',
      price: 2500,
      image: 'https://files.cdn.printful.com/example-item-2.jpg',
      storeSource: 'RGRMStoreA002',
    }
  ];
}

export default async function BauhausStore() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#F2F2F2] text-black font-sans selection:bg-red-500 selection:text-white">
      {/* HEADER: Bauhaus Grid */}
      <header className="border-b-8 border-black grid grid-cols-1 md:grid-cols-3">
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center justify-center bg-yellow-400">
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">RaGuiRoMo</h1>
        </div>
        <div className="p-8 border-r-0 md:border-r-8 border-black flex items-center justify-center uppercase font-bold tracking-widest text-center">
          Geometric Logic <br /> Functional Art
        </div>
        <div className="p-8 flex items-center justify-center bg-red-600 text-white font-black text-2xl uppercase underline decoration-4 underline-offset-8">
          Store A001 + A002
        </div>
      </header>

      {/* MISSION SECTION */}
      <section className="p-12 border-b-8 border-black grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white">
        <div>
          <h2 className="text-4xl font-black uppercase mb-6 underline decoration-yellow-400">The Vision</h2>
          <p className="text-xl leading-relaxed font-medium">
            RaGuiRoMo is a constructivist experiment in automated retail. We bridge the gap between 
            **Primary Forms** and **Modern Logistics**. Every piece is a calculated unit of design.
          </p>
        </div>
        <div className="bg-black text-white p-8 flex flex-col justify-center border-l-0 lg:border-l-8 border-yellow-400">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 opacity-70">Logistics Protocol</p>
          <p className="text-2xl font-bold tracking-tight">
            Direct API Tunnel to Printful Centers. <br /> Secure Encryption via Stripe Live.
          </p>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-8 border-black">
        {products.map((product) => (
          <div key={product.id} className="border-r-0 md:border-r-8 last:border-r-0 border-black p-0 group">
            <div className="relative aspect-square overflow-hidden border-b-8 border-black bg-white">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-500 p-8"
              />
            </div>
            <div className="p-8 bg-white group-hover:bg-yellow-50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-3xl font-black uppercase leading-none">{product.name}</h3>
                <span className="text-2xl font-bold bg-black text-white px-2 italic">
                  ${(product.price / 100).toFixed(2)}
                </span>
              </div>
              
              {/* AUTOMATED CHECKOUT FORM */}
              <form action={createCheckoutSession}>
                <input type="hidden" name="name" value={product.name} />
                <input type="hidden" name="storeSource" value={product.storeSource} />
                <button 
                  type="submit"
                  className="w-full bg-red-600 text-white py-6 text-2xl font-black uppercase hover:bg-black transition-all active:translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                >
                  Acquire Now →
                </button>
              </form>
              <p className="mt-4 text-xs font-bold uppercase opacity-50 tracking-tighter">
                Origin: {product.storeSource} // Fulfilled via Printful Global
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="p-12 bg-black text-white flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <p className="font-black text-3xl italic uppercase">RaGuiRoMo.Studio</p>
          <p className="opacity-50 uppercase text-xs tracking-widest mt-2">© 2025 All Systems Operational</p>
        </div>
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-none"></div>
          <div className="w-12 h-12 bg-red-600 rounded-full"></div>
          <div className="w-12 h-12 bg-blue-600 border-4 border-white"></div>
        </div>
      </footer>
    </main>
  );
}
