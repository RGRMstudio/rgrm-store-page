import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO', // BRANDING: Bauhaus scrubbed
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/selection', // Matches your RGRM/SELECT routing

  plugins: [
    deskTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  // 2026 PROTOCOL: Keeps the Studio engine updated automatically
  autoUpdates: true, 

  // UI Customization
  icon: () => '🔘', 
  
  // Ensures the Studio uses the correct Stripe-aligned API version
  api: {
    apiVersion: '2025-02-24'
  }
});
