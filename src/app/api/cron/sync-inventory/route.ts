import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.SANITY_API_PROJECT_ID!,
  dataset: process.env.SANITY_API_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function printfulFetch(endpoint: string) {
  const res = await fetch(`https://api.printful.com${endpoint}`, {
    headers: { Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Printful API error: ${res.status}`);
  const data = await res.json();
  return data.result;
}

async function syncProduct(product: any) {
  const detail = await printfulFetch(`/store/products/${product.id}`);
  const { sync_product, sync_variants } = detail;

  const variants = sync_variants.map((v: any) => ({
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
    previewImage: v.files?.find((f: any) => f.type === 'preview')?.preview_url || null,
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
}

async function deactivateMissingProducts(activePrintfulIds: string[]) {
  const sanityProducts = await sanity.fetch(
    `*[_type == "product" && isActive == true]{ _id, printfulId }`
  );
  for (const product of sanityProducts) {
    if (!activePrintfulIds.includes(product.printfulId)) {
      await sanity.patch(product._id).set({ isActive: false }).commit();
    }
  }
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const products = await printfulFetch('/store/products?limit=100');
    const activePrintfulIds = products.map((p: any) => String(p.id));

    for (const product of products) {
      await syncProduct(product);
    }

    await deactivateMissingProducts(activePrintfulIds);

    return NextResponse.json({
      synced: true,
      count: products.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
