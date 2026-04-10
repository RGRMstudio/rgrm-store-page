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
    <main className="min-h-screen bg-black px-4 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <p className="text-center text-white/30 mt-12 text-xs font-mono">
        RECORDS_FOUND: {products.length}
      </p>
    </main>
  )
}
