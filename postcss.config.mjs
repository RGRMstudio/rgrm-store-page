/** * RGRM // POSTCSS_ARCHITECTURE_RECALIBRATION
 * Configured for Next.js 16 + Tailwind CSS v4 (Turbopack Compatible)
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Sector 01: Tailwind v4 PostCSS Engine
    // This replaces the legacy 'tailwindcss' plugin to resolve the direct-use error.
    '@tailwindcss/postcss': {},
    
    // Sector 02: Vendor Prefixing
    // Ensures CSS architectural integrity across legacy and modern browsers.
    autoprefixer: {},
  },
};

export default config;
