/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? 'https://github.com/PhiGei2000/homepage-ffw-rennertehausen/' : ''
}

module.exports = nextConfig
