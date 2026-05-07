import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) return null;

  // Query Sanity for product by slug
  const query = `*[_type == "product" && slug.current == "${id}"][0]`;
  const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
  url.searchParams.append('query', query);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.result?.[0] || null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="aspect-square bg-[#0a0a0a] relative overflow-hidden border border-white/10">
          {product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600 font-mono text-sm">
              NO IMAGE
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            {product.name}
          </h1>

          {product.price && (
            <p className="text-2xl font-mono text-[#BC2026] mb-6">
              ${Number(product.price).toFixed(2)}
            </p>
          )}

          {product.description && (
            <p className="text-gray-400 leading-relaxed mb-8 max-w-lg">
              {product.description}
            </p>
          )}

          {/* Placeholder for Size/Color Selectors */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">SIZE</p>
            <select className="bg-transparent border border-white/20 px-4 py-2 w-full max-w-xs focus:outline-none focus:border-[#BC2026]">
              <option>Select a size</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <button 
            onClick={() => alert('Checkout coming soon!')}
            className="bg-[#BC2026] hover:bg-red-700 text-white px-8 py-4 uppercase tracking-wider font-bold transition-colors cursor-pointer"
          >
            Add to Cart
          </button>

          <p className="mt-6 text-xs text-gray-500">
            Free shipping on orders over $100 • Returns within 30 days
          </p>
        </div>
      </div>
    </main>
  );
}
