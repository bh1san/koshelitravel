/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache-busting change
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.imghippo.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@opentelemetry/instrumentation',
      '@opentelemetry/sdk-node',
      'handlebars',
      'require-in-the-middle'
    ],
  },
};

module.exports = nextConfig;
