/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: '../../../dist/turbopack-class-heavy',
  experimental: {
    turbo: {},
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;