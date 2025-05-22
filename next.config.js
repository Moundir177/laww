/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Remove experimental settings that cause errors
  trailingSlash: true,
};

module.exports = nextConfig; 