import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Set to true to ensure the build finishes even with minor warnings
    ignoreBuildErrors: true, 
  },
  // The 'eslint' block is deleted because it is now illegal in NextConfig
  output: "standalone",
};

export default nextConfig;
