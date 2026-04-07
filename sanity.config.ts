import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

// NO ../../ schemas! Use direct paths to your studio folder
// @ts-ignore
import product from './studio/schemaTypes/product';
// @ts-ignore
import settings from './studio/schemaTypes/settings';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO ADMIN',
  projectId: '055j6pls',
  dataset: 'production',
  basePath: '/selection',
  plugins: [structureTool()],
  schema: {
    types: [product, settings],
  },
});
