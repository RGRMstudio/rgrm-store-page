import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function getProducts() {
  return client.fetch(`*[_type == "product" && isActive == true] | order(name asc) {
    _id,
    name,
    thumbnail,
    "slug": slug.current,
    "price": variants[0].price,
    "category": variants[0].name,
    variants
  }`);
}

export default async function SelectionPage() {
  const products = await getProducts();

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
          <p className="text-white/40 font-mono text-xs mt-2">{products.length} ITEMS DEPLOYED</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <Link key={product._id} href={`/selection/${product.slug}`} className="group block">
              <div className="aspect-[3/4] relative bg-neutral-900 border border-white/10 overflow-hidden mb-4">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
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
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tight leading-tight mb-1 group-hover:text-white/70 transition-colors">
                  {product.name}
                </h2>
                {product.price && (
                  <p className="text-sm font-mono text-white/60">${product.price} USD</p>
                )}
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
