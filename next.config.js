const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/il8n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: false,
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**',
    }]
  }
}

module.exports = withNextIntl(nextConfig);