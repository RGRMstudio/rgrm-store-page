import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false, // Set to false for real-time updates
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
});

export async function getProducts() {
  const query = `*[_type == "product"]{
    _id,
    title,
    "slug": slug.current,
    price,
    "imageUrl": mainImage.asset->url,
    "researchLog": researchLog[0].children[0].text,
    variants[]{
      size,
      color,
      printfulVariantId,
      stripePriceId
    }
  }`;
  return await client.fetch(query);
