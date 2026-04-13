import Link from 'next/link';
import Image from 'next/image';
import { RGRM_PRODUCTS } from '@/lib/products';

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12 border-b border-white/10 pb-6">
          <p className="text-[10px] font-mono tracking-widest text-white/40 uppercase mb-2">
            RGRM // Q4_2026
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Selection
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RGRM_PRODUCTS.map((product) => (
            <Link key={product.id} href={`/selection/${product.id}`} className="group block">
              <div className="aspect-[3/4] relative bg-neutral-900 border border-white/10 overflow-hidden mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/10 font-black text-4xl">NO_IMG</span>
                  </div>
                )}
                {product.status !== 'AVAILABLE' && (
                  <div className="absolute top-3 left-3 bg-black/80 px-2 py-1">
                    <span className="text-rgrm-red text-[9px] font-mono tracking-widest uppercase">
                      {product.status}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-[9px] font-mono tracking-widest text-white/40 uppercase mb-1">
                  {product.id} // {product.category}
                </p>
                <h2 className="text-sm font-black uppercase tracking-tight leading-tight mb-1 group-hover:text-white/70 transition-colors">
                  {product.name}
                </h2>
                <p className="text-sm font-mono text-white/60">${product.price}.00 USD</p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
