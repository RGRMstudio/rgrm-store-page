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

  // Combine main image and additional images
  const allImages = [
    product.mainImage,
    ...(product.images || [])
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <ProductGallery 
              images={allImages} 
              productName={product.name} 
            />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-blood-red">
              Brutalist Lineage
            </p>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-2xl font-light mb-8 text-gray-300">
              ${product.price?.toFixed(2) || '0.00'}
            </p>

            {/* Description */}
            <div className="prose prose-invert mb-12 max-w-none">
              <p className="text-lg text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <VariantSelector
                variants={product.variants}
                onSelectVariant={(variant) => {
                  // This will be handled by the BuyButton
                  console.log('Selected variant:', variant);
                }}
              />
            )}

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
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Shipping
                </p>
                <p className="text-sm text-gray-400">
                  Free over $100
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Returns
                </p>
                <p className="text-sm text-gray-400">
                  30-day returns
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-1">
                  Security
                </p>
                <p className="text-sm text-gray-400">
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
