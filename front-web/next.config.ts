import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // permite qualquer domínio https
      },
      {
        protocol: "http",
        hostname: "**", // permite qualquer domínio http
      },
    ],
  },
};

export default nextConfig;
