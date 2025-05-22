/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to allow server rendering
  reactStrictMode: true,
  images: {
    unoptimized: true,
  }
};

module.exports = nextConfig; 