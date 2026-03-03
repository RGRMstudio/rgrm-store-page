import { client, urlFor } from '@/lib/sanity';
import AddToCartButton from '@/components/product/AddToCartButton';
import Link from 'next/link';

/**
 * RGRM // SELECTION_ARCHIVE_INTERFACE
 * Protocol: ISR_REVALIDATION (60s)
 */

export const revalidate = 60; // Recheck Sanity every 60 seconds

async function getProducts() {
  const query = `*[_type == "study"] | order(_createdAt desc)`;
  const data = await client.fetch(query);
  return data;
}

export default async function SelectionPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-12 relative z-10">
      {/* 1. SECTION HEADER */}
      <header className="max-w-7xl mx-auto mb-20 border-b border-white/5 pb-12">
        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
          Structural_Studies
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <p className="text-xs font-mono text-white/40 uppercase tracking-widest max-w-md">
            Archive of physical artifacts and digital manifestations. 
            Acquisition registers identity to the RGRM core database.
          </p>
          <span className="text-[10px] font-mono text-rgrm-red bg-rgrm-red/10 px-3 py-1 border border-rgrm-red/20 uppercase">
            Records_Found: [{products.length}]
          </span>
        </div>
      </header>

      {/* 2. PRODUCT GRID */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {products.map((product: any) => (
            <div key={product._id} className="group relative flex flex-col">
              
              {/* Product Visual Container */}
              <Link href={`/selection/${product._id}`} className="block relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10 mb-6">
                <img 
                  src={urlFor(product.image).url()} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-4 right-4 text-[9px] font-mono text-white/40 bg-black/80 px-2 py-1 uppercase">
                  Ref_{product._id.substring(0, 4)}
                </div>
              </Link>

              {/* Product Info */}
              <div className="flex-1 mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-black uppercase tracking-tight group-hover:text-rgrm-red transition-colors">
                    <Link href={`/selection/${product._id}`}>{product.name}</Link>
                  </h2>
                  <span className="text-sm font-mono text-white/80">${product.price}</span>
                </div>
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mb-4 line-clamp-1">
                  {product.category || 'Structural_Study'}
                </p>
              </div>

              {/* Acquisition Protocol Button */}
              <AddToCartButton product={{
                id: product._id,
                name: product.name,
                price: product.price,
                image: urlFor(product.image).url()
              }} />
            </div>
          ))}
        </div>
      </section>

      {/* 3. TERMINAL FOOTER */}
      <footer className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex justify-between items-center opacity-20 text-[9px] font-mono uppercase tracking-tighter">
        <span>RGRM // STUDIO_M_002</span>
        <span>SYSTEM_STATUS: [NOMINAL]</span>
        <span>{new Date().getFullYear()} ©</span>
      </footer>
    </main>
  );
}
