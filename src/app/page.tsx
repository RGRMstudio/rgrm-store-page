import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';

async function getProducts() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) return [];

  const query = `*[_type == "product"]{
    _id, 
    name, 
    "slug": slug.current, 
    "thumbnail": mainImage.asset->url,
    price
  }`;
  
  const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
  url.searchParams.append('query', query);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.result || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#BC2026]">
              Phase 01
            </p>
            <h2 className="text-4xl font-black uppercase md:text-6xl">
              Structural<br />Artifacts
            </h2>
          </div>

          {/* Product Grid - No Suspense needed! Server already waits for data. */}
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
