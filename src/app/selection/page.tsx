export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    
    if (!projectId) {
      return { error: 'Missing Sanity Project ID' };
    }

    // 1. Use standard GROQ syntax (easier to debug than URL encoding)
    const query = '*[_type == "product"] { _id, name, slug, thumbnail, price, description }';
    
    // 2. Construct the URL cleanly
    const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
    url.searchParams.append('query', query);

    // 3. Fetch without headers (since dataset is Public, no Auth header needed)
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Revalidate every minute
    });

    if (!res.ok) {
      console.error('Sanity API Error:', res.status, await res.text());
      return { error: `Failed to load products (${res.status})` };
    }

    const data = await res.json();
    const products = data.result || [];

    if (products.length === 0) {
      return { error: 'No products found in Sanity' };
    }

    return { products };
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return { error: error.message };
  }
}

export default async function SelectionPage() {
  const result = await getProducts();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center">
          Structural Studies
        </h1>
        <p className="text-gray-400 font-mono text-sm uppercase tracking-widest mb-12 text-center">
          Q4_2026_COLLECTION_LIVE
        </p>

        {result.error ? (
          <div className="border border-red-500/30 bg-red-900/10 p-8 rounded-lg text-center">
            <p className="text-red-400 font-mono mb-2">⚠️ Unable to load products</p>
            <p className="text-gray-400 text-xs font-mono">
              {result.error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {result.products?.map((product: any) => (
              <a
                key={product._id}
                href={`/selection/${product.slug?.current || product._id}`}
                className="group block bg-white/5 border border-white/10 hover:border-[#BC2026] transition-all duration-300"
              >
                <div className="aspect-square bg-[#0a0a0a] relative overflow-hidden">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 text-xs font-mono">
                      NO IMAGE
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black uppercase mb-2 group-hover:text-[#BC2026] transition-colors">
                    {product.name}
                  </h2>
                  <div className="flex justify-between items-end">
                    {product.price && (
                      <p className="text-2xl font-mono text-white">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    )}
                    {product.description && (
                      <p className="text-gray-400 text-sm line-clamp-2 max-w-[70%]">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
