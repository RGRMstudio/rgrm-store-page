import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID,
  dataset: process.env.SANITY_API_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
})

const PRINTFUL_API = 'https://api.printful.com'
const PRINTFUL_TOKEN = process.env.PRINTFUL_API_KEY

async function getPrintfulProducts() {
  const res = await fetch(`${PRINTFUL_API}/store/products?limit=100`, {
    headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` }
  })
  const data = await res.json()
  if (!data.result) throw new Error('Failed to fetch Printful products')
  return data.result
}

async function getPrintfulProductDetail(syncProductId: string) {
  const res = await fetch(`${PRINTFUL_API}/store/products/${syncProductId}`, {
    headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` }
  })
  const data = await res.json()
  if (!data.result) throw new Error(`Failed to fetch product ${syncProductId}`)
  return data.result
}

async function uploadImageFromUrl(url: string) {
  try {
    const res = await fetch(url)
    const buffer = await res.arrayBuffer()
    const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
      filename: url.split('/').pop() || 'product-image.png'
    })
    return asset._id
  } catch {
    return null
  }
}

async function upsertSanityProduct(syncProduct: any, syncVariants: any[]) {
  const existing = await sanity.fetch(
    `*[_type == "product" && printfulId == $id][0]`,
    { id: String(syncProduct.id) }
  )

  const prices = syncVariants.map(v => parseFloat(v.retail_price ?? 0)).filter(Boolean)
  const price = prices.length ? Math.min(...prices) : 0

  const slug = syncProduct.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  let mainImage = existing?.mainImage
  if (!mainImage?.asset && syncProduct.thumbnail_url) {
    const assetId = await uploadImageFromUrl(syncProduct.thumbnail_url)
    if (assetId) {
      mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: assetId }
      }
    }
  }

  if (existing) {
    await sanity.patch(existing._id).set({
      name: syncProduct.name,
      price,
      printfulId: String(syncProduct.id),
      ...(mainImage && !existing.mainImage?.asset ? { mainImage } : {})
    }).commit()
    return { action: 'updated', name: syncProduct.name }
  } else {
    await sanity.create({
      _type: 'product',
      name: syncProduct.name,
      slug: { _type: 'slug', current: slug },
      price,
      printfulId: String(syncProduct.id),
      mainImage,
      inventory: 0,
    })
    return { action: 'created', name: syncProduct.name }
  }
}

async function handleSync(req: Request) {
  const authHeader = req.headers.get('authorization')
  const url = new URL(req.url)
  const secretParam = url.searchParams.get('secret')

  if (
    authHeader !== `Bearer ${process.env.SYNC_SECRET}` &&
    secretParam !== process.env.SYNC_SECRET
  ) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const products = await getPrintfulProducts()
    const results = []

    for (const p of products) {
      const { sync_product, sync_variants } = await getPrintfulProductDetail(p.id)
      const result = await upsertSanityProduct(sync_product, sync_variants)
      results.push(result)
    }

    return Response.json({ success: true, synced: results.length, results })
  } catch (err: any) {
    console.error('Sync error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  return handleSync(req)
}

export async function GET(req: Request) {
  return handleSync(req)
}
