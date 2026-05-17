import { notFound } from 'next/navigation';
import BuyButton from '@/components/BuyButton';

async function getProduct(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) {
    console.error('Missing Sanity Project ID');
    return null;
  }

  // Sanitize slug for GROQ query (escape special characters)
  const safeSlug = slug.replace(/"/g, '\\"');

  const query = `*[_type == "product" && slug.current == "${safeSlug}"][0]{
    _id, 
    name, 
    slug, 
    thumbnail, 
    price, 
    description,
    variants[] {
      _key,
      printfulVariantId,
      size,
      price,
      inStock
    }
  }`;
  
  const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
  url.searchParams.append('query', query);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    
    if (!res.ok) {
      console.error('Sanity API error:', res.status, await res.text());
      return null;
    }
    
    const data = await res.json();
    const product = data.result?.[0];
    
    if (product) {
      console.log('✅ Found product:', product.name);
      return product;
    }
    
    console.error('❌ Product not found for slug:', slug);
    return null;
  } catch (error: any) {
    console.error('Fetch error:', error.message);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  console.log('🔍 Looking for product with slug:', params.id);
  
  const product = await getProduct(params.id);

  if (!product) {
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
        {/* Product Image */}
        <div className="aspect-square bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
          {product.thumbnail ? (
            <img src={product.thumbnail} alt={product.name} className="w-full h-full object-contain p-8" />
          ) : (
            <p className="text-gray-600 font-mono">NO IMAGE</p>
          )}
        </div>

        {/* Product Details */}
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

          {/* Buy Button */}
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
