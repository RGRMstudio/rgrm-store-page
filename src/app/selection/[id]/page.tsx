import { notFound } from 'next/navigation';
import { createClient } from 'next-sanity';
import BuyButton from '@/components/BuyButton';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function getProduct(id: string) {
  try {
    console.log('🔍 Searching for product with ID/slug:', id);

    // Query 1: Try by slug.current
    const product = await client.fetch(`
      *[_type == "product" && slug.current == $id][0]{
        _id, 
        name, 
        "slug": slug.current,
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
      }
    `, { id });

    if (product) {
      console.log('✅ Found product:', product.name);
      console.log('Product data:', JSON.stringify(product, null, 2));
      return product;
    }

    // Query 2: Try by _id
    const productById = await client.fetch(`
      *[_type == "product" && _id == $id][0]{
        _id, 
        name, 
        "slug": slug.current,
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
      }
    `, { id });

    if (productById) {
      console.log('✅ Found product by ID:', productById.name);
      return productById;
    }

    // Debug: Show all available products
    const allProducts = await client.fetch(`
      *[_type == "product"]{
        _id, 
        name, 
        "slugValue": slug.current
      }
    `);
    
    console.log('📋 All products in Sanity:');
    allProducts.forEach((p: any) => {
      console.log(`  - ${p.name}: slug="${p.slugValue}", _id="${p._id}"`);
    });

    console.log('❌ Product not found for:', id);
    return null;
  } catch (error: any) {
    console.error('❌ Sanity error:', error.message);
    return null;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
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
