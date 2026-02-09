/** @type {import('next').NextConfig} */
const nextConfig = {
  // RGRM Studio: Form Follows Function
  typescript: {
    // Ensures structural beauty before deployment
    ignoreBuildErrors: false,
  },
  images: {
    // Allowing the gallery to pull from architectural sources (Printful)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.printful.com',
      },
    ],
  },
};

export default nextConfig;
