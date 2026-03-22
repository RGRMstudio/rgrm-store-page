// app/api/sync/printful/route.js
// Trigger manually: POST /api/sync/printful
// Or call from a Vercel Cron Job (see vercel.json below)

import { createClient } from ‘@sanity/client’

const sanity = createClient({
projectId: process.env.SANITY_PROJECT_ID,
dataset: process.env.SANITY_DATASET,
token: process.env.SANITY_API_TOKEN, // needs write access
apiVersion: ‘2024-01-01’,
useCdn: false
})

const PRINTFUL_API = ‘https://api.printful.com’
const PRINTFUL_TOKEN = process.env.PRINTFUL_API_TOKEN

// Fetch all sync products from Printful
async function getPrintfulProducts() {
const res = await fetch(`${PRINTFUL_API}/store/products?limit=100`, {
headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` }
})
const data = await res.json()
if (!data.result) throw new Error(‘Failed to fetch Printful products’)
return data.result // array of { id, name, thumbnail_url, … }
}

// Fetch full product detail (with variants) from Printful
async function getPrintfulProductDetail(syncProductId) {
const res = await fetch(`${PRINTFUL_API}/store/products/${syncProductId}`, {
headers: { Authorization: `Bearer ${PRINTFUL_TOKEN}` }
})
const data = await res.json()
if (!data.result) throw new Error(`Failed to fetch product ${syncProductId}`)
return data.result // { sync_product, sync_variants }
}

// Map Printful variant to Sanity variant shape
function mapVariant(sv) {
// sv = sync_variant from Printful
const opts = sv.product?.options ?? []
const size = opts.find(o => o.id === ‘size’)?.value ?? sv.name
const color = opts.find(o => o.id === ‘color’)?.value ?? ‘’
const colorHex = opts.find(o => o.id === ‘color’)?.colors?.[0] ?? ‘’

return {
_type: ‘variant’,
_key: String(sv.id),
printfulVariantId: sv.variant_id,
printfulSyncVariantId: sv.id,
size,
color,
colorHex,
price: parseFloat(sv.retail_price ?? 0),
sku: sv.sku ?? ‘’,
inStock: sv.availability_status === ‘active’
}
}

// Upsert a product into Sanity
async function upsertSanityProduct(syncProduct, syncVariants) {
const existingQuery = `*[_type == "product" && printfulSyncProductId == ${syncProduct.id}][0]`
const existing = await sanity.fetch(existingQuery)

const variants = syncVariants.map(mapVariant)
const prices = variants.map(v => v.price).filter(Boolean)
const basePrice = prices.length ? Math.min(…prices) : 0

const doc = {
_type: ‘product’,
printfulSyncProductId: syncProduct.id,
printfulProductId: syncProduct.external_id ? parseInt(syncProduct.external_id) : null,
variants,
basePrice,
lastSyncedAt: new Date().toISOString(),
isActive: true
}

if (existing) {
// Patch existing — preserve title, description, images set in Sanity
await sanity
.patch(existing._id)
.set({
printfulSyncProductId: doc.printfulSyncProductId,
printfulProductId: doc.printfulProductId,
variants: doc.variants,
basePrice: doc.basePrice,
lastSyncedAt: doc.lastSyncedAt
})
.commit()
return { action: ‘updated’, id: existing._id, title: existing.title }
} else {
// Create new — use Printful name as default title (edit in Sanity Studio)
const created = await sanity.create({
…doc,
title: syncProduct.name,
slug: {
_type: ‘slug’,
current: syncProduct.name
.toLowerCase()
.replace(/[^a-z0-9]+/g, ‘-’)
.replace(/(^-|-$)/g, ‘’)
}
})
return { action: ‘created’, id: created._id, title: syncProduct.name }
}
}

// — Route Handler —
export async function POST(req) {
// Protect with a secret token
const authHeader = req.headers.get(‘authorization’)
if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
return Response.json({ error: ‘Unauthorized’ }, { status: 401 })
}

try {
const products = await getPrintfulProducts()
const results = []

```
for (const p of products) {
  const { sync_product, sync_variants } = await getPrintfulProductDetail(p.id)
  const result = await upsertSanityProduct(sync_product, sync_variants)
  results.push(result)
}

return Response.json({
  success: true,
  synced: results.length,
  results
})
```

} catch (err) {
console.error(‘Sync error:’, err)
return Response.json({ error: err.message }, { status: 500 })
}
}

// Allow GET for Vercel Cron (cron calls GET by default)
export async function GET(req) {
return POST(req)
}
