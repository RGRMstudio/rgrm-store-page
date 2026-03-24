import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO', // Final branding update
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/selection', // Your RGRM Studio URL path

  plugins: [
    deskTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },

  // 2026 Protocol: Automatic engine updates
  autoUpdates: true, 

  icon: () => '🔘', 
  
  api: {
    apiVersion: '2025-02-24'
  }
});
