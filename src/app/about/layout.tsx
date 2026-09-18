import { pageMetadata, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';

export const metadata = pageMetadata('Clément Cochod, créateur de Cochod Elevate',
  'Découvrez mon parcours et mes compétences en sites web, applications, data et automatisation, illustrés par mes projets clients, stages et prototypes.', '/about');

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <><JsonLd data={{ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE_URL}/about#person`,
    name: 'Clément Cochod', url: `${SITE_URL}/about`, worksFor: { '@id': `${SITE_URL}/#organization` },
    sameAs: ['https://github.com/ccochod-source', 'https://www.linkedin.com/in/clément-cochod-506a9633b/'],
  }} />{children}</>;
}
