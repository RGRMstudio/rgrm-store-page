/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    // This must be inside the nextConfig object to be recognized
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
