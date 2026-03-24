/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This is our safety net
    ignoreBuildErrors: true,
  },
  eslint: {
    // Prevents ESLint warnings from stopping the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
