import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO', // BRANDING: Bauhaus scrubbed completely
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/selection', // This is your RGRM/SELECT management route

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
  
  // Ensures Sanity content matches your Stripe 2026 data format
  api: {
    apiVersion: '2025-02-24'
  }
});
