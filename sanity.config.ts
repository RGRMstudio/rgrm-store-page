import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
// Using 4-dots because the config is being called from src/app/selection
import product from '../../schemas/product';
import settings from '../../schemas/settings';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO ADMIN',

  // Fallback logic to ensure it works in both local and Vercel environments
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!,

  basePath: '/selection', 

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [product, settings],
  },
});
