import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable standalone output for high-performance Vercel hosting
  output: "standalone",

  // 2. Configure TypeScript behavior
  typescript: {
    // Keep this false for production to catch bugs before they go live
    ignoreBuildErrors: false,
  },

  // 3. Experimental features for the Bauhaus 2026 Edition
  experimental: {
    // Improves GSAP and Lucide-React load speeds
    optimizePackageImports: ["gsap", "lucide-react"],
    
    // Enables the React 19 Compiler for smoother animations
    reactCompiler: true,
  },

  // 4. Image security for your Bauhaus assets
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raguiromo.store',
      },
    ],
  },
};

export default nextConfig;
