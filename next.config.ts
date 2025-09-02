import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
  },
  // Enable static exports
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Optional: Configure trailing slash
  trailingSlash: true,
  // Optional: Configure asset prefix if deploying to subdirectory
  // assetPrefix: './',
};

export default nextConfig;
