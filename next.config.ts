import type { NextConfig } from 'next';

/**
 * RGRMstore Production Configuration
 * Next.js 16 + Turbopack + React Compiler
 */
const nextConfig: NextConfig = {
  // 1. Stable React Compiler Support (New in Next.js 16)
  // Ensures automatic memoization for high-performance UI components.
  reactCompiler: true,

  // 2. Server External Packages
  // We opt-out 'loops' from bundling because it uses native Node.js features 
  // required for our Stripe-to-Loops webhook automation.
  serverExternalPackages: ['loops'],

  // 3. Turbopack Enhancements (Experimental in 16.1)
  // Speeds up subsequent builds by caching the file system.
  experimental: {
    turbopackFileSystemCacheForBuild: true,
  },

  // 4. Production Optimizations
  compiler: {
    // Remove console logs in production to keep the registry logs clean
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 5. Image Security
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
