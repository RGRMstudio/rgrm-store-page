import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import product from './schemas/product';
import settings from './schemas/settings';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO ADMIN',

  // This tries the NEXT_PUBLIC version first, then falls back to the secret version
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!,

  basePath: '/selection', // This is where you will go to edit products

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [product, settings],
  },
});
