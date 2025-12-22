import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.example.com'),
  title: {
    default: 'Portfolio - Solaire & Calme',
    template: '%s | Portfolio',
  },
  description: 'Portfolio créatif et élégant - Vitrine de propreté technique et d\'élégance visuelle',
  keywords: ['portfolio', 'développeur', 'creative developer', 'web design', 'frontend', 'react', 'next.js'],
  authors: [{ name: 'Portfolio' }],
  creator: 'Portfolio',
  publisher: 'Portfolio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Portfolio - Solaire & Calme',
    title: 'Portfolio - Solaire & Calme',
    description: 'Portfolio créatif et élégant - Vitrine de propreté technique et d\'élégance visuelle',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Solaire & Calme',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Solaire & Calme',
    description: 'Portfolio créatif et élégant - Vitrine de propreté technique et d\'élégance visuelle',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="lenis lenis-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

