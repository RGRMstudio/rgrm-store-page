import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
  deployment: {
    /**
     * Get the appId for a previously deployed Studio under the "Studio" tab for your project in sanity.io/manage
     * Note: this is required for fine-grained version selection
     */
    appId: 'mq59zdc80cqsopzchkozfof3',
    /**
     * Enable auto-updates.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity
     */
    autoUpdates: true,
  },
})
