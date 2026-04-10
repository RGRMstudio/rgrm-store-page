export const dynamic = 'force-dynamic'
import { createClient } from '@sanity/client'
import ProductCard from '@/components/ui/ProductCard'

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

export default async function Home() {
  const products = await sanity.fetch(
    `*[_type == "product"] | order(_createdAt desc) {
      _id,
      name,
      price,
      slug,
      "image": mainImage.asset->url,
      description,
      stripeProductId
    }`
  )

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            id={product.slug?.current || product._id}
            name={product.name}
            price={product.price}
            status="AVAILABLE"
            image={product.image}
          />
        ))}
      </div>
      <p style={{ textAlign: 'center', opacity: 0.3, marginTop: '3rem', fontSize: '0.8rem' }}>
        RECORDS_FOUND: {products.length}
      </p>
    </main>
  )
}
