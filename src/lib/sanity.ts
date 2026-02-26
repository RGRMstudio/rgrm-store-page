import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// --- 1. CONFIGURATION ---
// Ideally, these should be in .env.local, but we provide fallbacks here
// to prevent the build from crashing if variables are missing.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_project_id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-01'; // Lock version for stability

// --- 2. CLIENT INITIALIZATION ---
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // usage: true -> Fast (CDN), false -> Fresh (API)
  // We use CDN for production speed, API for development accuracy
  useCdn: process.env.NODE_ENV === 'production', 
});

// --- 3. IMAGE BUILDER UTILITY ---
// Sanity returns images as cryptic references (e.g., image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg).
// This builder converts them into actual URLs (https://cdn.sanity.io/...).
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
