const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
