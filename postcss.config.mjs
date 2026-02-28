/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Optimization: Process Tailwind CSS directives
    tailwindcss: {},
    
    // Compatibility: Add vendor prefixes for cross-browser support
    autoprefixer: {},
  },
};

export default config;
