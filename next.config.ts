import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Add this if you still see errors after installing the plugin
  experimental: {
    serverExternalPackages: ['loops'],
  },
};

export default nextConfig;
