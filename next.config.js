/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ],
  },
  experimental: {
    serverComponentsExternalPackages: [
      '@opentelemetry/instrumentation',
      '@opentelemetry/sdk-node',
      '@opentelemetry/exporter-jaeger',
      'handlebars',
      'require-in-the-middle'
    ],
  },
};

module.exports = nextConfig;
