/** @type {import('next').NextType} */
const nextConfig = {
  // Turbopack is already enabled by default in Next.js 16
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Removed 'eslint' and 'typescript.ignoreBuilds' as they are no longer supported here
};

export default nextConfig;
