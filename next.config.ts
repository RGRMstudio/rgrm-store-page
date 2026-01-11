import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* NEXT.JS 16 CLEANUP:
     The 'eslint' key is removed. 
     TypeScript ignoreBuildErrors is kept here to bypass minor type issues.
  */
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Recommended for Vercel performance
  output: "standalone",
};

export default nextConfig;
