import Link from "next/link";
import Image from "next/image";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  apiVersion: "2026-03-25",
});

async function getProducts() {
  return client.fetch(`
    *[_type == "product"] | order(name asc) {
      _id,
      name,
      thumbnail,
      "slug": slug.current,
      "price": variants[0].price,
      "category": variants[0].name,
      variants
    }
  `);
}

export default async function SelectionPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#050505] text-rgrm-light pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-16 pt-8">
          <div className="flex items-end justify-between border-b border-white/5 pb-6">
            <div>
              <p className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase mb-3">
                RGRM // STRUCTURAL STUDIES // PHASE_01
              </p>
              <h1 className="font-sans font-black text-[clamp(3rem,8vw,6rem)] uppercase leading-none tracking-[-0.04em]">
                Selection
              </h1>
            </div>
            <p className="font-mono text-xs text-white/20 tracking-widest pb-2">
              {products.length}_ITEMS DEPLOYED
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {products.map((product: any, index: number) => (
            <Link
              key={product._id}
              href={`/selection/${product.slug}`}
              className="group block bg-[#050505] relative overflow-hidden"
            >
              <div className="aspect-[3/4] relative bg-rgrm-gray overflow-hidden">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-[1.03] group-hover:brightness-75"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-rgrm-gray">
                    <span className="font-black text-white/10 text-4xl">—</span>
                  </div>
                )}
                <span className="absolute top-3 left-3 font-mono text-[10px] text-white/30 tracking-widest">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span
                    className="w-full text-center font-mono text-xs uppercase tracking-[0.2em] bg-rgrm-red text-white py-3"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 93% 100%, 0 100%)" }}
                  >
                    Acquire
                  </span>
                </div>
              </div>
              <div className="p-4 border-t border-white/5">
                <h2 className="font-sans font-black text-sm uppercase tracking-tight leading-tight mb-2 group-hover:text-white/60 transition-colors duration-200 line-clamp-2">
                  {product.name}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-white/40">
                    ${product.price} <span className="text-white/20">USD</span>
                  </p>
                  {product.category && (
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                      {product.category}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
