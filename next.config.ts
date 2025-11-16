import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.topuniversities.com",
        pathname: "/sites/default/files/**",
      },
    ],
  },
};

export default nextConfig;
