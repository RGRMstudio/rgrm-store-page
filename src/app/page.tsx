import Image from "next/image";

// 1. Define your product data
const PRODUCTS = [
  { id: 1, name: "Essential Tee", price: "$45", image: "/window.svg" },
  { id: 2, name: "Studio Hoodie", price: "$85", image: "/window.svg" },
  { id: 3, name: "Canvas Tote", price: "$30", image: "/window.svg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto px-8 py-20 flex flex-col items-center">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-4">
            RGRM<span className="text-zinc-500">STORE</span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-zinc-800"></span>
            <p className="text-zinc-400 font-mono text-xs tracking-[0.3em] uppercase">
              Collection 01 // 2025
            </p>
            <span className="h-px w-8 bg-zinc-800"></span>
          </div>
        </header>

        {/* 2. Product Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col items-center">
              <div className="relative aspect-[3/4] w-full bg-zinc-900 rounded-2xl mb-6 flex items-center justify-center overflow-hidden border border-zinc-800 transition-colors group-hover:border-zinc-500">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={100} 
                  height={100} 
                  className="opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 invert"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] bg-white text-black px-2 py-1 rounded font-bold uppercase tracking-widest">
                    New
                  </span>
                </div>
              </div>
              
              <div className="text-center w-full">
                <h3 className="font-bold text-xl uppercase tracking-tighter mb-1">{product.name}</h3>
                <p className="text-zinc-500 font-mono text-sm mb-6">{product.price}</p>
                <button className="w-full py-3 bg-white text-black text-xs font-black uppercase rounded-full hover:bg-zinc-300 transition-colors tracking-widest">
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 text-center border-t border-zinc-900">
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em]">
          © RGRM STUDIO // Global Essentials
        </p>
      </footer>
    </div>
  );
}
