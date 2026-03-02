import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

/**
 * RGRM // SANITY_IO_CLIENT_CONFIG
 * Environment: Production
 */

export const client = createClient({
  // Check your sanity.json or manage.sanity.io for these values
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id', 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-02', // Use current date for latest API features
  useCdn: true, // true for fast response, false for fresh data
});

// 1. Initialize the Image Builder
const builder = imageUrlBuilder(client);

// 2. Helper function to generate optimized image URLs
// Usage: urlFor(product.image).width(800).url()
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * ARCHITECTURAL NOTE:
 * Ensure your .env.local contains:
 * NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxx
 * NEXT_PUBLIC_SANITY_DATASET=production
 */
