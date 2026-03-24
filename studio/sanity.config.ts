import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO',
  projectId: 'u6f5r7g8', // Your ID from the logs
  dataset: 'production',
  basePath: '/selection',
  plugins: [
    deskTool(), 
    visionTool() // This is what caused the error
  ],
  schema: {
    types: schemaTypes,
  },
});
