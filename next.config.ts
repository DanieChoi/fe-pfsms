import type { NextConfig } from "next";
import packageJson from './package.json';

const backend = process.env.BACKEND_URL ?? 'http://43.200.234.52:8080';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version || '0.0.0',
  },

  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${backend}/api/:path*` },
    ];
  },
};

export default nextConfig;
