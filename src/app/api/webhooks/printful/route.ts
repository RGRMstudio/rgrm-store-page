import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// 1. Setup the "Write" Client for Sanity
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2026-03-25',
  useCdn: false,
});

function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === 'product_synced') {
      const { sync_product, sync_variants } = body.data;

      // A. Get the Image using native fetch (Replaces Axios)
      const imageUrl = sync_variants[0]?.files?.find((f: any) => f.type === 'preview')?.url || sync_product.thumbnail_url;
      let imageAsset;

      if (imageUrl) {
        const imageRes = await fetch(imageUrl);
        const arrayBuffer = await imageRes.arrayBuffer();
        
        imageAsset = await sanityClient.assets.upload(
          'image', 
          Buffer.from(arrayBuffer), 
          { filename: `${sync_product.id}.jpg` }
        );
      }

      // B. Create the Sanity Document
      const productDoc = {
        _type: 'product',
        _id: `product-${sync_product.id}`,
        title: sync_product.name,
        slug: { _type: 'slug', current: slugify(sync_product.name) },
        printfulId: String(sync_product.id),
        price: parseFloat(sync_variants[0].retail_price),
        image: imageAsset ? {
          _type: 'image',
          asset: { _type: 'reference', _ref: imageAsset._id }
        } : undefined,
      };

      await sanityClient.createOrReplace(productDoc);
      return NextResponse.json({ message: 'Product Synced to Sanity' });
    }

    return NextResponse.json({ message: 'Event ignored' });
  } catch (err: any) {
    console.error('[PRINTFUL_SYNC_ERROR]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
