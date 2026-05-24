import { notFound } from 'next/navigation';
import ProductGallery from '@/components/ProductGallery';
import VariantSelector from '@/components/VariantSelector';
import BuyButton from '@/components/BuyButton';

async function getProduct(id: string) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

  if (!projectId) return null;

  const query = `*[_type == "product" && slug.current == "${id}"][0]{
    _id, 
    name, 
    slug, 
    "mainImage": mainImage.asset->url,
    "images": images[].asset->url,
    price, 
    description,
    variants[] {
      _key,
      size,
      printfulVariantId,
      inStock,
      price
    }
  }`;
  
  const url = new URL(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}`);
  url.searchParams.append('query', query);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result || null;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  // Combine main image + additional images
  const allImages = [
    product.mainImage,
    ...(product.images || [])
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-black pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Image Gallery */}
          <div className="lg:sticky lg:top-28">
            <ProductGallery 
              images={allImages} 
              productName={product.name} 
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center lg:py-8">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blood-red">
              Brutalist Lineage
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[0.9]">
              {product.name}
            </h1>

            <p className="text-2xl font-light mb-8 text-gray-300">
              ${product.price?.toFixed(2) || '0.00'}
            </p>

            <div className="mb-10 max-w-prose">
              <p className="text-base text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selector */}
            <VariantSelector
              variants={product.variants || []}
              onSelectVariant={(variant) => {
                console.log('Selected:', variant);
              }}
            />

            {/* Buy Button */}
            <BuyButton
              productId={product._id}
              variantId={product.variants?.[0]?.printfulVariantId || ''}
              price={product.price}
              name={product.name}
              thumbnail={allImages[0]}
              size={product.variants?.[0]?.size || 'One Size'}
            />

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">Shipping</p>
                <p className="text-xs text-gray-400">Free over $100</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">Returns</p>
                <p className="text-xs text-gray-400">30-day window</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-1">Security</p>
                <p className="text-xs text-gray-400">Encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
