import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Set the correct workspace root for Turbopack
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
