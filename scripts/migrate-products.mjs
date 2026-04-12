import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function migrate() {
  const products = await sanity.fetch(`*[_type == "product"]`)
  console.log(`Found ${products.length} products to migrate`)

  for (const product of products) {
    const thumbnail = product.thumbnail
    const price = product.basePrice ?? product.variants?.[0]?.price ?? 0
    const name = product.title ?? product.name

    const patch = sanity.patch(product._id)

    if (product.title && !product.name) {
      patch.set({ name: product.title })
    }
    if (price && !product.price) {
      patch.set({ price })
    }
    if (thumbnail && !product.mainImage) {
      patch.set({ mainImage: { _type: 'image', url: thumbnail } })
    }

    await patch.commit()
    console.log(`✓ Migrated: ${name}`)
  }

  console.log('Migration complete!')
}

migrate().catch(console.error)
