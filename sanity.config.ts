import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { study } from './schemaTypes/study'; // Ensure this path matches your schema file

export default defineConfig({
  name: 'default',
  title: 'RGRM_STUDIO_MANIFEST',

  // Use the Project ID you found on manage.sanity.io
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your_id_here',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [study],
  },
});
