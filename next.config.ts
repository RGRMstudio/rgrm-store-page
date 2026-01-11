import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT.JS 16 OPTIMIZATIONS
     Turbopack is now the default bundler for production. 
     The 'eslint' block is removed here as it is no longer supported in config.
  */

  typescript: {
    // Set to 'true' only if you want to force deployment despite minor type warnings
    ignoreBuildErrors: false,
  },

  // Enable standalone output for the best performance on Vercel
  output: "standalone",

  experimental: {
    // Improves performance for large Bauhaus-style GSAP animations
    optimizePackageImports: ["gsap"],
  },

  // If you use external Bauhaus assets/images, add their domains here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
      },
    ],
  },
};

export default nextConfig;
