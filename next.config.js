/** @type {import('next').NextConfig} */
const nextConfig = {
  // RGRM Studio: Form Follows Function
  // We move eslint handling to the root for better build performance
  typescript: {
    // Ensuring structural beauty before deployment
    ignoreBuildErrors: false,
  },
  images: {
    // Allowing the gallery to pull from external architectural sources if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.printful.com',
      },
    ],
  },
};

export default nextConfig;
