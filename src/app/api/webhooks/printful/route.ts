import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import axios from 'axios';

// 1. Setup the "Write" Client for Sanity
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_WRITE_TOKEN, // Needs 'Editor' permissions
  apiVersion: '2026-03-25',
  useCdn: false,
});

// Helper to clean up titles for URLs (e.g., "Cool Poster" -> "cool-poster")
function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Only run if a product was synced in Printful
    if (body.type === 'product_synced') {
      const { sync_product, sync_variants } = body.data;

      // A. Get the Image
      const imageUrl = sync_variants[0]?.files?.find((f: any) => f.type === 'preview')?.url || sync_product.thumbnail_url;
      let imageAsset;

      if (imageUrl) {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        imageAsset = await sanityClient.assets.upload('image', Buffer.from(response.data), {
          filename: `${sync_product.id}.jpg`,
        });
      }

      // B. Create the Sanity Document
      const productDoc = {
        _type: 'product',
        _id: `product-${sync_product.id}`,
        title: sync_product.name,
        slug: { _type: 'slug', current: slugify(sync_product.name) },
        printfulId: sync_product.id,
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
