import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_AUTH_USER_POOL_ID: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID || '',
    NEXT_PUBLIC_AUTH_WEB_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH_WEB_CLIENT_ID || '',
  },
}

module.exports = nextConfig
