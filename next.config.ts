import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  remotePatterns: [new URL('https://images.unsplash.com/**')],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default nextConfig;
