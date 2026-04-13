import { notFound } from 'next/navigation';
import { createClient } from '@sanity/client';
import ProductDetail from '@/components/ProductDetail';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product" && isActive == true]{ "slug": slug.current }`);
  return products.map((p: any) => ({ id: p.slug }));
}

async function getProduct(slug: string) {
  return client.fetch(`*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    thumbnail,
    "slug": slug.current,
    printfulId,
    variants[]{
      _key,
      variantId,
      name,
      size,
      price,
      inStock,
      stripePriceId,
      previewImage
    }
  }`, { slug });
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  // Map Sanity product to RGRMProduct shape for ProductDetail
  const mapped = {
    id: product.printfulId,
    name: product.name,
    description: '',
    price: product.variants?.[0]?.price ?? 0,
    stripePriceId: product.variants?.[0]?.stripePriceId ?? '',
    image: product.variants?.[0]?.previewImage ?? product.thumbnail ?? '',
    status: 'AVAILABLE' as const,
    category: '',
    variants: (product.variants ?? []).map((v: any) => ({
      size: v.size ?? v.name,
      variantId: v.variantId,
      inStock: v.inStock,
    })),
  };

  return <ProductDetail product={mapped} />;
}
