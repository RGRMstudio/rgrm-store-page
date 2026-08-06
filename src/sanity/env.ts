export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-04-27'

// Never throw at module scope: route modules are evaluated during `next build`
// page-data collection, so a missing env var here would break the build itself.
// Queries will fail loudly at request time if these are not configured.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
