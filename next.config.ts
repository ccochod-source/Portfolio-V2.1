import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Next.js peut "inférer" un mauvais workspace root s'il détecte plusieurs lockfiles.
  // Ici on force le root du projet pour éviter les assets `public/` manquants et les chunks incohérents en dev.
  outputFileTracingRoot: __dirname,
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com; font-src 'self' data:; media-src 'self' blob:; connect-src 'self' https://*.vercel-insights.com https://vercel.live; frame-src 'self' https://www.canva.com https://vercel.live" },
    ] }];
  },
  async redirects() {
    return ['portfolio-v2-1-xi.vercel.app', 'portfolio-v2-1-9bch.vercel.app'].map(host => ({
      source: '/:path*',
      has: [{ type: 'host' as const, value: host }],
      destination: 'https://www.cochodelevate.com/:path*',
      permanent: true,
    }));
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
