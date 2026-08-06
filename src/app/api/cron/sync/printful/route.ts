import { createClient } from '@sanity/client';
import { type NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const PRINTFUL_API = 'https://api.printful.com';

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

  if (!projectId) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
  }
  if (!token) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN');
  }

  return createClient({ projectId, dataset, token, useCdn: false, apiVersion: '2026-03-25' });
}

function getPrintfulToken() {
  const token = process.env.PRINTFUL_API_KEY || process.env.PRINTFUL_ACCESS_TOKEN;
  if (!token) {
    throw new Error('Missing PRINTFUL_API_KEY');
  }
  return token;
}

async function getPrintfulProducts() {
  const res = await fetch(`${PRINTFUL_API}/store/products?limit=100`, {
    headers: { Authorization: `Bearer ${getPrintfulToken()}` },
  });
  const data = await res.json();
  if (!data.result) throw new Error('Failed to fetch Printful products');
  return data.result;
}

async function getPrintfulProductDetail(syncProductId: number) {
  const res = await fetch(`${PRINTFUL_API}/store/products/${syncProductId}`, {
    headers: { Authorization: `Bearer ${getPrintfulToken()}` },
  });
  const data = await res.json();
  if (!data.result) throw new Error(`Failed to fetch product ${syncProductId}`);
  return data.result;
}

function mapVariant(sv: any) {
  const opts = sv.product?.options ?? [];
  const size = opts.find((o: any) => o.id === 'size')?.value ?? sv.name;
  const color = opts.find((o: any) => o.id === 'color')?.value ?? '';
  const colorHex = opts.find((o: any) => o.id === 'color')?.colors?.[0] ?? '';

  return {
    _type: 'variant',
    _key: String(sv.id),
    printfulVariantId: sv.variant_id,
    printfulSyncVariantId: sv.id,
    size,
    color,
    colorHex,
    price: parseFloat(sv.retail_price ?? 0),
    sku: sv.sku ?? '',
    inStock: sv.availability_status === 'active',
  };
}

async function upsertSanityProduct(sanity: ReturnType<typeof createClient>, syncProduct: any, syncVariants: any[]) {
  const existingQuery = `*[_type == "product" && printfulSyncProductId == ${syncProduct.id}][0]`;
  const existing = await sanity.fetch(existingQuery);

  const variants = syncVariants.map(mapVariant);
  const prices = variants.map((v) => v.price).filter(Boolean);
  const basePrice = prices.length ? Math.min(...prices) : 0;

  const doc = {
    _type: 'product',
    printfulSyncProductId: syncProduct.id,
    printfulProductId: syncProduct.external_id ? parseInt(syncProduct.external_id) : null,
    variants,
    basePrice,
    lastSyncedAt: new Date().toISOString(),
    isActive: true,
  };

  if (existing) {
    await sanity
      .patch(existing._id)
      .set({
        printfulSyncProductId: doc.printfulSyncProductId,
        printfulProductId: doc.printfulProductId,
        variants: doc.variants,
        basePrice: doc.basePrice,
        lastSyncedAt: doc.lastSyncedAt,
      })
      .commit();
    return { action: 'updated', id: existing._id, title: existing.title };
  }

  const created = await sanity.create({
    ...doc,
    title: syncProduct.name,
    slug: {
      _type: 'slug',
      current: syncProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    },
  });
  return { action: 'created', id: created._id, title: syncProduct.name };
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sanity = getSanityClient();
    const products = await getPrintfulProducts();
    const results = [];

    for (const p of products) {
      const { sync_product, sync_variants } = await getPrintfulProductDetail(p.id);
      const result = await upsertSanityProduct(sanity, sync_product, sync_variants);
      results.push(result);
    }

    return NextResponse.json({ success: true, synced: results.length, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Printful sync error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return POST(req);
}
