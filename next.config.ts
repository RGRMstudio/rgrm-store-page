import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In Next.js 16, linting is moved entirely to the package.json scripts
  typescript: {
    ignoreBuildErrors: true, 
  },
  output: "standalone",
};

export default nextConfig;
