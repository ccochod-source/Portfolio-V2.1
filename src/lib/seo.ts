import type { Metadata } from 'next';

// Public identity is independent of preview URLs and stale environment variables.
export const SITE_URL = 'https://www.cochodelevate.com';
export const BRAND = 'Cochod Elevate';
export const CONTACT = { email: 'cochod.elevate@icloud.com', phone: '+33743700596' };

export function pageMetadata(title: string, description: string, path: string, image?: string): Metadata {
  const fullTitle = `${title} | ${BRAND}`;
  const imageUrl = image || `/share/${path === '/' ? 'accueil' : path.split('/').filter(Boolean).join('--')}`;
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical: `${SITE_URL}${path === '/' ? '' : path}` },
    openGraph: {
      type: 'website', locale: 'fr_FR', siteName: BRAND,
      title: fullTitle, description, url: `${SITE_URL}${path === '/' ? '' : path}`,
      images: [{ url: imageUrl, alt: fullTitle }],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [imageUrl] },
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': `${SITE_URL}/#organization`,
  name: BRAND, url: SITE_URL, logo: `${SITE_URL}/icon.png`,
  email: CONTACT.email, telephone: CONTACT.phone,
  founder: { '@id': `${SITE_URL}/about#person` },
  areaServed: { '@type': 'Country', name: 'France' },
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: `${SITE_URL}${item.path}`,
    })),
  };
}
