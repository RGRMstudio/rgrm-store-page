import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Suppress hydration warnings if using brutalist/heavy GSAP animations
  reactStrictMode: false, 
};

export default nextConfig;
