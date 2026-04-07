/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // This is the gear Vercel said was missing
    autoprefixer: {},
  },
};

export default config;
