import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js peut "inférer" un mauvais workspace root s'il détecte plusieurs lockfiles.
  // Ici on force le root du projet pour éviter les assets `public/` manquants et les chunks incohérents en dev.
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [{
      source: '/:path*',
      has: [{ type: 'host', value: 'portfolio-v2-1-xi.vercel.app' }],
      destination: 'https://www.cochodelevate.com/:path*',
      permanent: true,
    }];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
