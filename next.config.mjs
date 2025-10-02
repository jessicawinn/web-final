/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  basePath: '/fin-customer',
  assetPrefix: '/fin-customer',
};

export default nextConfig;
