import { MetadataRoute } from 'next';

/**
 * RGRMstore - Dynamic Sitemap Generator
 * This helps Google and other search engines index the RaGuiRoMo Store.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://raguiromo.store';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/registry`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add more Registry modules here as they are released
  ];
}
