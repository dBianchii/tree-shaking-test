/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: '../../../dist/turbopack-named-exports',
  experimental: {
    turbo: {},
  },
  compiler: {
    removeConsole: false,
  },
};

module.exports = nextConfig;