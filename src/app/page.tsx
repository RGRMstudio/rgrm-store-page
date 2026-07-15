import { client } from '@/sanity/lib/client';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  thumbnail: string;
  price: number;
  status: 'AVAILABLE' | 'LOW STOCK' | 'SOLD OUT';
};

async function getProducts(): Promise<Product[]> {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    price,
    thumbnail,
    "status": coalesce(status, "AVAILABLE")
  }`;
  return client.fetch(query, {}, { next: { tags: ['product'] } });
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <div className="brutalist-noise" aria-hidden="true" />
      <Hero />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl mb-20 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-accentRed">Phase 01</p>
          <h2 className="text-4xl font-black uppercase md:text-6xl">Structural<br />Artifacts</h2>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
