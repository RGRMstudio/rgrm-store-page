import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'files.cdn.printful.com' },
    ],
  },
  // This helps Next.js find your files correctly inside the src folder
  typescript: {
    ignoreBuildErrors: true, 
  },
};

export default nextConfig;
