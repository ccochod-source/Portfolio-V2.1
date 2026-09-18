import type { Metadata } from 'next';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, BRAND, organizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: BRAND,
    template: `%s | ${BRAND}`,
  },
  authors: [{ name: 'Clément Cochod' }],
  creator: 'Clément Cochod',
  publisher: BRAND,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <JsonLd data={organizationSchema} />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
