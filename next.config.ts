import type { NextConfig } from "next";

/**
 * RaGuiRoMo Store - Production Config 2026
 * Unified for Store 002 (17181557)
 */
const nextConfig: NextConfig = {
  // Enforce the new React 19 Compiler for faster RGRM components
  reactCompiler: true,
  
  // Security: Prevent server-side variables from accidentally leaking
  experimental: {
    taint: true,
  },

  // Image Optimization for Printful product mockups
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.printful.com",
      },
    ],
  },

  // Ensure environment variables are loaded for both build and runtime
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://raguiromo.store",
  },
};

export default nextConfig;
