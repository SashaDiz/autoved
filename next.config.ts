import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
  },
  // For production with admin panel, we need server-side rendering
  // Comment out 'output: export' to enable API routes and database functionality
  // output: 'export', // Only use this for static hosting without admin features
  
  // Keep image optimization disabled for compatibility
  images: {
    unoptimized: true,
  },
  // Optional: Configure trailing slash
  trailingSlash: true,
};

export default nextConfig;
