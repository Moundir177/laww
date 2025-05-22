/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Remove experimental settings that cause errors
  trailingSlash: true,
  // Skip certain routes during static export
  distDir: '.next',
};

module.exports = nextConfig; 