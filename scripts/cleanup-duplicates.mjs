import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

async function cleanup() {
  const products = await sanity.fetch(`*[_type == "product"]{_id, name, printfulId, mainImage}`)
  console.log(`Total: ${products.length}`)

  // Keep only printful-* IDs, delete everything else
  const toDelete = products.filter(p => !p._id.startsWith('printful-'))
  console.log(`Deleting ${toDelete.length} duplicates`)

  for (const p of toDelete) {
    await sanity.delete(p._id)
    console.log(`Deleted: ${p._id} - ${p.name}`)
  }

  console.log('Done!')
}

cleanup().catch(console.error)
