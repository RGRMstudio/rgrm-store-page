import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '055j6pls',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  }
})
