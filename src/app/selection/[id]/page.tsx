// app/selection/[id]/page.tsx
import { notFound } from 'next/navigation';
import { getProductById, RGRM_PRODUCTS } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

// Generate static pages for all products at build time
export async function generateStaticParams() {
  return RGRM_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: { id: string };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
