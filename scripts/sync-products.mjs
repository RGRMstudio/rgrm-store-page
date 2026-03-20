import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const PRINTFUL_API_KEY = process.env.PRINTFUL_API_KEY;
const SANITY_PROJECT_ID = process.env.SANITY_API_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_API_DATASET;
const SANITY_TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!PRINTFUL_API_KEY || !SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_TOKEN) {
  console.error('❌ Missing environment variables. Check your .env.local');
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// ─── Printful API helper ───────────────────────────────────────────────────────
async function printfulFetch(endpoint) {
  const res = await fetch(`https://api.printful.com${endpoint}`, {
    headers: {
      Authorization: `Bearer ${PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Printful API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  return data.result;
}

// ─── Sync a single product to Sanity ──────────────────────────────────────────
async function syncProduct(product) {
  const detail = await printfulFetch(`/store/products/${product.id}`);
  const { sync_product, sync_variants } = detail;

  const variants = sync_variants.map((v) => ({
    _type: 'variant',
    _key: String(v.id),
    variantId: String(v.id),
    name: v.name,
    sku: v.sku,
    price: parseFloat(v.retail_price),
    currency: v.currency,
    size: v.size || null,
    color: v.color || null,
    colorCode: v.color_code || null,
    inStock: v.availability_status === 'active',
    printfulVariantId: String(v.variant_id),
    stripeProductId: v.product?.stripe_product_id || null,
    stripePriceId: v.product?.stripe_price_id || null,
    previewImage: v.files?.find((f) => f.type === 'preview')?.preview_url || null,
  }));

  const doc = {
    _type: 'product',
    _id: `printful-${sync_product.id}`,
    printfulId: String(sync_product.id),
    name: sync_product.name,
    slug: {
      _type: 'slug',
      current: sync_product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    },
    thumbnail: sync_product.thumbnail_url,
    isActive: true,
    variants,
    updatedAt: new Date().toISOString(),
  };

  await sanity.createOrReplace(doc);
  console.log(`✅ Synced: ${sync_product.name} (${variants.length} variants)`);
}

// ─── Mark deleted products as inactive ────────────────────────────────────────
async function deactivateMissingProducts(activePrintfulIds) {
  const sanityProducts = await sanity.fetch(
    `*[_type == "product" && isActive == true]{ _id, printfulId, name }`
  );

  for (const product of sanityProducts) {
    if (!activePrintfulIds.includes(product.printfulId)) {
      await sanity.patch(product._id).set({ isActive: false }).commit();
      console.log(`⚠️  Deactivated missing product: ${product.name}`);
    }
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting Printful → Sanity sync...\n');

  const products = await printfulFetch('/store/products?limit=100');

  if (!products || products.length === 0) {
    console.log('No products found in Printful store.');
    return;
  }

  console.log(`📦 Found ${products.length} products in Printful\n`);

  const activePrintfulIds = products.map((p) => String(p.id));

  for (const product of products) {
    try {
      await syncProduct(product);
    } catch (err) {
      console.error(`❌ Failed to sync product ${product.id}:`, err.message);
    }
  }

  await deactivateMissingProducts(activePrintfulIds);

  console.log('\n✅ Sync complete!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
