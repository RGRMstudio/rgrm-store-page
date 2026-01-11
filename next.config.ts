import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 removes the 'eslint' key entirely.
  // Linting should now be run via 'npm run lint'.
  typescript: {
    ignoreBuildErrors: true, 
  },
  output: "standalone",
};

export default nextConfig;
