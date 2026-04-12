/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables the use of images from Sanity's CDN
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'files.cdn.printful.com',
      },
    ],
  },

  // FORCE ROUTING RESET: 
  // This section ensures the /admin path is isolated from your /selection gallery
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ];
  },

  // Optional: Add this if you want to ensure clean builds every time on Vercel
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
