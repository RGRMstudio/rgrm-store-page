import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // This allows the build to finish even if there are tiny type warnings
    ignoreBuildErrors: false, 
  },
  eslint: {
    // Ensures your code is clean before it goes live on raguiromo.store
    ignoreDuringBuilds: false,
  },
  images: {
    // Allows you to host images on Vercel efficiently
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
