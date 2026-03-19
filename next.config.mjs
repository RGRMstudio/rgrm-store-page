/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Sanity CMS images
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      // Printful product images
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
      // Printful preview images
      {
        protocol: 'https',
        hostname: '*.printful.com',
      },
    ],
  },
};

export default nextConfig;
