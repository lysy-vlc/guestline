/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    apiBase: 'https://obmng.dbm.guestline.net/api/'
  }
}

module.exports = nextConfig
