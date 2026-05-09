import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schema';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'y7y2atv1';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'RGRM Store',
  projectId: projectId,
  dataset: dataset,
  plugins: [structureTool()],
  schema: {
    types: schema.types,
  },
});
