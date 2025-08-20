/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: '../../../dist/turbopack-class-optimized',
  experimental: {
    turbo: {},
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;