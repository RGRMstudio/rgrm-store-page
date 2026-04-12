import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function uploadImageFromUrl(url) {
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
    filename: url.split('/').pop()
  })
  return asset._id
}

async function migrate() {
  const products = await sanity.fetch(`*[_type == "product" && !defined(mainImage.asset) && defined(thumbnail)]`)
  console.log(`Found ${products.length} products needing images`)

  for (const product of products) {
    try {
      const imageUrl = product.thumbnail
      const assetId = await uploadImageFromUrl(imageUrl)
      await sanity.patch(product._id).set({
        mainImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId }
        }
      }).commit()
      console.log(`✓ Done: ${product.name}`)
    } catch (err) {
      console.log(`✗ Failed: ${product.name} — ${err.message}`)
    }
  }

  console.log('All done!')
}

migrate().catch(console.error)
