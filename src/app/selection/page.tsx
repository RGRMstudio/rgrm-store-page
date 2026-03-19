// app/selection/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { RGRM_PRODUCTS } from '@/lib/products';

export const metadata = {
  title: 'Studies | RaGuiRoMo Studio',
  description: 'Acquire structured garments from the RGRM identity series.',
};

export default function SelectionPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* ── HEADER ── */}
      <div className="px-6 md:px-12 pt-12 pb-8 border-b border-white/10">
        <p className="text-rgrm-red text-[10px] font-mono tracking-widest uppercase mb-3">
          RaGuiRoMo Studio // Active Studies
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          The Gallery
        </h1>
        <p className="text-white/40 text-xs uppercase tracking-widest mt-4 font-mono">
          {RGRM_PRODUCTS.filter(p => p.status !== 'SOLD OUT').length} pieces available
        </p>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
          {RGRM_PRODUCTS.map((product) => {
            const isSoldOut = product.status === 'SOLD OUT';
            const isLowStock = product.status === 'LOW STOCK';

            return (
              <Link
                key={product.id}
                href={`/selection/${product.id}`}
                className={`group relative block bg-black overflow-hidden transition-all duration-300 hover:z-10 ${
                  isSoldOut ? 'opacity-50 grayscale' : ''
                }`}
              >
                {/* Image */}
                <div className="aspect-[3/4] relative w-full overflow-hidden bg-neutral-900">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/10 font-black text-4xl rotate-[-45deg] select-none">
                        NO_IMG
                      </span>
                    </div>
                  )}

                  {/* Status badge */}
                  {product.status !== 'AVAILABLE' && (
                    <div className="absolute top-3 right-3 bg-black/90 border border-white/20 px-2 py-1">
                      <span className={`text-[9px] font-bold tracking-widest uppercase ${
                        isLowStock ? 'text-yellow-500' : 'text-white/40'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Hover CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rgrm-red">
                      {isSoldOut ? 'ARCHIVED' : 'ACQUIRE >>'}
                    </span>
                  </div>
                </div>

                {/* Data panel */}
                <div className="p-4 bg-black border-t border-white/5">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-[9px] text-rgrm-red font-mono tracking-widest uppercase">
                      {product.id}
                    </p>
                    <p className="text-xs font-bold font-mono text-white">
                      ${product.price}.00
                    </p>
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-tighter text-white/90 mt-1">
                    {product.name}
                  </h3>
                  <p className="text-[9px] text-white/30 font-mono uppercase tracking-widest mt-1">
                    {product.variants.filter(v => v.inStock).length} sizes available
                  </p>
                </div>

                {/* Corner detail */}
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-rgrm-red transition-colors duration-300" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER NOTE ── */}
      <div className="px-6 md:px-12 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <p className="text-white/20 text-[9px] uppercase tracking-widest font-mono">
          All pieces made to order · Shipped via Printful · No returns on custom items
        </p>
        <Link
          href="/"
          className="text-[9px] uppercase tracking-widest font-bold text-white/40 hover:text-rgrm-red transition-colors duration-300"
        >
          ← Back to Studio
        </Link>
      </div>

    </main>
  );
}
