/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Structural integrity checks are handled during development
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
    ],
  },
};

module.exports = nextConfig;
