import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NEXT.JS 16: The 'eslint' block is no longer supported here.
  // Linting must be run via scripts in package.json.
  typescript: {
    ignoreBuildErrors: true, 
  },
  output: "standalone",
};

export default nextConfig;
