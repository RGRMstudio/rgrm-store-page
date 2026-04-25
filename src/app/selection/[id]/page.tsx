import { notFound } from 'next/navigation';
import Image from 'next/image';
import CheckoutButton from '@/components/CheckoutButton';

// Use direct fetch instead of Sanity client to avoid query issues
async function getProduct(slug: string) {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    const apiVersion = '2024-01-01';
    
    if (!projectId || !slug) {
      console.error('Missing projectId or slug');
      return null;
    }
    
    // Properly encode the query parameter
    const query = encodeURIComponent(`*[_type == "product" && slug.current == "${slug}"][0]{
      _id, name, thumbnail, "slug": slug.current,
      printfulId, description,
      variants[]{ _key, variantId, name, size, price, inStock, stripePriceId, previewImage }
    }`);
    
    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.SANITY_READ_TOKEN || ''}`,
      },
      next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      console.error('Sanity fetch failed:', response.status);
      return null;
    }
    
    const data = await response.json();
    return data.result?.[0] || null;
  } catch (error: any) {
    console.error('Error fetching product:', error.message);
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Validate the id/slug
  if (!id || typeof id !== 'string') {
    notFound();
  }
  
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price ?? 0;
  const priceId = firstVariant?.stripePriceId ?? null;

  return (
    <main style={{ backgroundColor: '#050505', minHeight: '100vh', color: '#f5f5f5' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '7rem 1.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
        {/* Image */}
        <div style={{ position: 'relative', aspectRatio: '1/1', backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.06)' }}>
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              style={{ objectFit: 'contain', padding: '2rem' }}
              priority
            />
          )}
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              RGRM // STRUCTURAL STUDY // {product.printfulId || 'UNREGISTERED'}
            </p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, letterSpacing: '-0.03em', margin: 0 }}>
              {product.name}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.5rem 0' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 300, fontFamily: 'monospace' }}>${price}</span>
            <span style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 8px', fontFamily: 'monospace', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.4)' }}>USD // TAX INCLUDED</span>
          </div>

          {product.description && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.7, maxWidth: '40ch' }}>
              {product.description}
            </p>
          )}

          <CheckoutButton
            productName={product.name}
            price={price}
            priceId={priceId}
            variantId={firstVariant?.variantId}
          />
        </div>
      </div>
    </main>
  );
}
