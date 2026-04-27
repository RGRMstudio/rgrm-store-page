export const dynamic = 'force-dynamic';

async function getProducts() {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    
    if (!projectId) {
      return { error: 'Missing Sanity Project ID' };
    }
    
    // Use direct fetch with simple query
    const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=*[_type%3D%3D%22product%22]|{_id,name,slug,thumbnail,price,description}`;
    
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.SANITY_READ_TOKEN || ''}`
      },
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.error('Sanity API error:', res.status);
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
          <div className="border border-white/10 p-8 rounded-lg text-center">
            <p className="text-gray-300 font-mono mb-2">Products coming soon...</p>
            <p className="text-gray-500 text-xs font-mono">
              {result.error}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {result.products?.map((product: any) => (
              <a
                key={product._id}
                href={`/selection/${product.slug?.current || product._id}`}
                className="block bg-white/5 border border-white/10 hover:border-[#BC2026] transition-all"
              >
                <div className="aspect-square bg-[#0a0a0a] relative">
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-full h-full object-contain p-8"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600 text-xs">
                      NO IMAGE
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black uppercase mb-2">{product.name}</h2>
                  {product.price && (
                    <p className="text-2xl font-mono">${product.price}</p>
                  )}
                  {product.description && (
                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
