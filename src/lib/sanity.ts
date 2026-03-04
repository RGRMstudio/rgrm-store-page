import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * RGRM // SANITY_IO_CORE_CLIENT
 * Status: Authenticated / CDN_Optimized
 */

export const client = createClient({
  // These variables must be set in Vercel and .env.local
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-04', // Current RGRM Protocol Date
  useCdn: false, // Set to false for Webhook/Revalidation to see changes instantly
  
  // Required for the 'revalidateTag' handshake
  token: process.env.SANITY_API_READ_TOKEN, 
});

// 1. Initialize the Global Image Builder
const builder = imageUrlBuilder(client);

/**
 * Generates optimized CDN URLs for Sanity assets.
 * Usage: <img src={urlFor(product.image).width(800).url()} />
 */
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * RGRM // DATA_FETCHING_PROTOCOL
 * Fetches all 'study' documents with a cache tag for the webhook.
 */
export async function getProducts() {
  const query = `*[_type == "study"] | order(_createdAt desc)`;
  
  // The 'next' object here is the key to the Webhook syncing.
  // It tells Next.js to group these results under the 'study' tag.
  return await client.fetch(
    query, 
    {}, 
    { next: { tags: ['study'] } }
  );
}
