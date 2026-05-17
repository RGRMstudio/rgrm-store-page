import { notFound } from 'next/navigation';
import BuyButton from '@/components/BuyButton';

async function getProduct(id: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) {
    console.error('❌ Missing Sanity Project ID');
    return null;
  }

  // Try multiple query approaches
  const queries = [
    // Query 1: By slug (most common)
    `*[_type == "product" && slug.current == "${id}"][0]{
      _id, name, "slug": slug.current, thumbnail, price, description,
      variants[] { _key, printfulVariantId, size, price, inStock }
    }`,
    // Query 2: By _id
    `*[_type == "product" && _id == "${id}"][0]{
      _id, name, "slug": slug.current, thumbnail, price, description,
      variants[] { _key, printfulVariantId, size, price, inStock }
    }`,
    // Query 3: Fallback - get all RGRM products
    `*[_type == "product" && name match "RGRM*"][0]{
      _id, name, "slug": slug.current, thumbnail, price, description,
      variants[] { _key, printfulVariantId, size, price, inStock }
    }`,
  ];

  for (let i = 0; i < queries.length; i++) {
    const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
    url.searchParams.append('query', queries[i]);

    try {
      console.log(`🔍 Trying query ${i + 1}...`);
      const res = await fetch(url.toString(), { next: { revalidate: 0 } });
      
      if (!res.ok) {
        console.error(`Query ${i + 1} failed:`, res.status, await res.text());
        continue;
      }
      
      const data = await res.json();
      const product = data.result?.[0];
      
      if (product) {
        console.log('✅ Found product:', product.name);
        console.log('Product data:', JSON.stringify(product, null, 2));
        return product;
      }
      
      console.log(`Query ${i + 1} returned no results`);
    } catch (error: any) {
      console.error(`Query ${i + 1} error:`, error.message);
      continue;
    }
  }

  console.error('❌ Product not found after all queries');
  return null;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  console.log('🔍 Looking for product with ID/slug:', params.id);
  
  const product = await getProduct(params.id);

  if (!product) {
    console.error('❌ Product not found:', params.id);
    notFound();
  }

  const selectedVariant = product.variants?.[0] || {
    printfulVariantId: product._id,
    size: 'One Size',
    price: product.price,
    inStock: true,
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-contain p-8" />
          ) : (
            <p className="text-gray-600 font-mono">NO IMAGE</p>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">{product.name}</h1>
          
          {selectedVariant.price && (
            <p className="text-2xl font-mono text-[#BC2026] mb-6">${Number(selectedVariant.price).toFixed(2)}</p>
          )}
          
          {product.description && (
            <p className="text-gray-400 mb-8">{product.description}</p>
          )}

          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2">SIZE</p>
            <p className="text-white font-mono">{selectedVariant.size || 'One Size'}</p>
          </div>

          <BuyButton
            productId={product._id}
            variantId={selectedVariant.printfulVariantId}
            price={selectedVariant.price}
            name={product.name}
            thumbnail={product.thumbnail}
            size={selectedVariant.size || 'One Size'}
          />

          <p className="mt-6 text-xs text-gray-500">
            Secure checkout powered by Stripe • Free shipping over $100
          </p>
        </div>
      </div>
    </main>
  );
}
