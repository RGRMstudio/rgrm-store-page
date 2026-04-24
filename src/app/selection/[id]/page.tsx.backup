export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { createClient } from '@sanity/client';
import ProductDetail from '@/components/ProductDetail';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2026-03-25',
});

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`
  );
  return products.map((p: { slug: string }) => ({ id: p.slug }));
}

async function getProduct(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
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
    }`,
    { slug }
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Guard: if slug is missing or undefined, show 404 instead of crashing
  if (!id || id === 'undefined') notFound();

  const product = await getProduct(id);
  if (!product) notFound();

  const mapped = {
    id: product.printfulId ?? '',
    name: product.name ?? '',
    description: '',
    price: product.variants?.[0]?.price ?? 0,
    stripePriceId: product.variants?.[0]?.stripePriceId ?? '',
    image: product.variants?.[0]?.previewImage ?? product.thumbnail ?? '',
    status: 'AVAILABLE' as const,
    category: '',
    variants: (product.variants ?? []).map((v: {
      size?: string;
      name?: string;
      variantId: string;
      inStock: boolean;
    }) => ({
      size: v.size ?? v.name ?? '',
      variantId: v.variantId,
      inStock: v.inStock,
    })),
  };

  return <ProductDetail product={mapped} />;
}
