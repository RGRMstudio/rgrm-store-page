import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // This helps prevent build errors related to strict linting on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
