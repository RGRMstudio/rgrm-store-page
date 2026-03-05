/**
 * RGRM // POSTCSS_ENGINE_CONFIGURATION
 * Compatible with Next.js 16 (Turbopack) & Tailwind CSS v4
 */

module.exports = {
  plugins: {
    // This handles the new Tailwind v4 processing engine
    '@tailwindcss/postcss': {},
    
    // This ensures cross-browser compatibility for your CSS variables
    'autoprefixer': {},
  },
}
