import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-v2-1-xi.vercel.app'),
  title: {
    default: 'Clément Cochod — Développement, Data & IA',
    template: '%s | Clément Cochod',
  },
  description: "Portfolio de Clément Cochod : applications métiers, projets data, automatisations et produits numériques intégrant l'IA.",
  keywords: ['Clément Cochod', 'applications métiers', 'data', 'intelligence artificielle', 'Next.js', 'Supabase', 'portfolio'],
  authors: [{ name: 'Clément Cochod' }],
  creator: 'Clément Cochod',
  publisher: 'Clément Cochod',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Clément Cochod — Portfolio',
    title: 'Clément Cochod — Développement, Data & IA',
    description: "Applications métiers, projets data, automatisations et produits numériques intégrant l'IA.",
  },
  twitter: {
    card: 'summary',
    title: 'Clément Cochod — Développement, Data & IA',
    description: "Applications métiers, projets data, automatisations et produits numériques intégrant l'IA.",
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
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
