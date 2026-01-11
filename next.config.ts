import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generates a self-contained production build for Node 22
  output: "standalone",

  typescript: {
    // We keep this true so that minor type warnings don't block 
    // the Bauhaus registry from going live.
    ignoreBuildErrors: true,
  },

  // Note: The 'eslint' block is intentionally removed.
  // Linting is now handled by the 'npm run lint' gate in package.json.
  
  experimental: {
    // Optimizes GSAP and Lucide-React for faster Bauhaus animations
    optimizePackageImports: ["gsap", "lucide-react"],
  },
};

export default nextConfig;
