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
      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20">
        <header className="flex flex-col items-center mb-16 text-center">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-4">
            RGRM<span className="text-zinc-500">STORE</span>
          </h1>
          <p className="text-zinc-400 font-mono text-sm tracking-widest uppercase">
            Elevated Essentials // Collection 01
          </p>
        </header>

        {/* 2. Product Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900 transition-all">
              <div className="aspect-square bg-zinc-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  width={80} 
                  height={80} 
                  className="opacity-50 group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg uppercase tracking-tight">{product.name}</h3>
              <p className="text-zinc-500 font-mono">{product.price}</p>
              <button className="mt-4 w-full py-2 border border-white text-white text-xs font-bold uppercase rounded-full hover:bg-white hover:text-black transition-colors">
                Coming Soon
              </button>
            </div>
          ))}
        </section>
      </main>

      <footer className="py-10 text-center text-zinc-600 border-t border-zinc-900">
        <p className="text-[10px] uppercase tracking-widest">© 2025 RGRM STUDIO</p>
      </footer>
    </div>
  );
}
