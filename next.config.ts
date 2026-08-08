import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  typedRoutes: true,
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://fakestoreapi.com/**")],
    unoptimized: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
