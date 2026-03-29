import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

// Corrected paths for Sanity schemas located in the root /schemas folder
import product from './schemas/product';
import settings from './schemas/settings';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO ADMIN',

  // Project ID and Dataset from your Sanity Management Dashboard
  // Uses Vercel environment variables with local fallbacks
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '055j6pls',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  // This matches your website's admin URL: raguiromo.store/selection
  basePath: '/selection',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: [product, settings],
  },
});
