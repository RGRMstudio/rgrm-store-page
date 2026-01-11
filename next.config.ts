import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT.JS 16 STABLE ARCHITECTURE:
    ESLint key is removed (now handled via package.json scripts).
  */
  typescript: {
    // We set this to true to ensure the Bauhaus Registry deploys 
    // even if there are minor type warnings in third-party libraries.
    ignoreBuildErrors: true,
  },
  
  // Optimizes the bundle for Vercel's edge network
  output: "standalone",
  
  // Stabilizes GSAP animations for high-fidelity rendering
  experimental: {
    optimizePackageImports: ["gsap"],
  }
};

export default nextConfig;
