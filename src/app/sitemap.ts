import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://raguiromo.store';

  // Define the core structural routes of the RGRM Studio
  const routes = [
    '',               // Homepage (Phase 01: Brutalist Lineage)
    '/success',       // Acquisition Confirmation
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8, // Priority for the main blueprint
  }));

  return [...routes];
}
