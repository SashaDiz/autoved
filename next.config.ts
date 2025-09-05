import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
  },
  // Keep images unoptimized for compatibility
  images: {
    unoptimized: true,
  },
  // Optional: Configure trailing slash
  trailingSlash: true,
};

export default nextConfig;
