import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  // The 'eslint' key is no longer needed or supported here
};

export default nextConfig;
