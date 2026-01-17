import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/Neural-Insights' : '',
  assetPrefix: isProd ? '/Neural-Insights/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
