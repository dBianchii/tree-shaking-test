/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack for development and build
  experimental: {
    turbo: {
      // Enable tree-shaking optimizations
      treeShaking: true,
    },
  },
  // Configure output for easier bundle analysis
  output: 'export',
  trailingSlash: true,
  // Optimize for bundle size analysis
  compiler: {
    removeConsole: false, // Keep console.log for testing
  },
  // Configure webpack for comparison
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure tree-shaking is enabled
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    return config;
  },
};

module.exports = nextConfig;