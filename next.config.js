/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    domains: ['img.clerk.com', 'utfs.io'],
  },
}

module.exports = nextConfig
