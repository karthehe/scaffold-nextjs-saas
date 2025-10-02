/**
 * @author Augustus Rivers <hello@offlabel.design>
 * Next.js configuration
 * 
 * Honestly, most of this is pretty standard. The important bits:
 * - Image optimization for better perf
 * - Strict mode because we're not animals
 * - Environment variable validation (learned this the hard way)
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Uncomment if you need standalone builds for Docker
  // output: 'standalone',
}

module.exports = nextConfig
