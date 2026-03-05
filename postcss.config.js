/**
 * RGRM // POSTCSS_ENGINE_CONFIGURATION
 * Standard: CommonJS (Node.js Compatible)
 * Protocol: Tailwind_v4 + Autoprefixer
 */

module.exports = {
  plugins: {
    // This processes the new Tailwind CSS v4 syntax
    '@tailwindcss/postcss': {},
    
    // This adds cross-browser prefixes for CSS variables and layouts
    'autoprefixer': {},
  },
};
