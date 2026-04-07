import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

/**
 * RGRM // STUDIO_CORE_CONFIGURATION
 * Management interface for Artifact Registry.
 */

// @ts-ignore
import product from './studio/schemaTypes/product';
// @ts-ignore
import settings from './studio/schemaTypes/settings';

export default defineConfig({
  name: 'default',
  title: 'RGRM STUDIO ADMIN',

  // Grounded Project Data
  projectId: '055j6pls',
  dataset: 'production',

  // The 'Selection' directory is our admin gateway
  basePath: '/selection',

  plugins: [structureTool()],

  schema: {
    // Filter Boolean ensures that if an import fails, the build doesn't crash
    types: [product, settings].filter(Boolean),
  },

  // Optimized for Next.js 15
  form: {
    components: {
      // Custom branding or logic can go here later
    }
  }
});
