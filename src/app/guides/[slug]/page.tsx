import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuide } from '@/data/guides';
import { getService } from '@/data/services';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs, ContactPanel, EditorialFrame } from '@/components/seo/Editorial';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  return pageMetadata(guide.title, guide.description, `/guides/${slug}`);
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const service = getService(guide.service)!;
  return <EditorialFrame>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: guide.title,
      description: guide.description, mainEntityOfPage: `${SITE_URL}/guides/${slug}`,
      image: `${SITE_URL}/share/guides--${slug}`, inLanguage: 'fr-FR',
      author: { '@type': 'Person', '@id': `${SITE_URL}/about#person`, name: 'Clément Cochod', url: `${SITE_URL}/about` },
      publisher: { '@id': `${SITE_URL}/#organization` },
    }} />
    <Breadcrumbs items={[{ name: 'Accueil', path: '/' }, { name: 'Guides', path: '/#guides' }, { name: guide.title, path: `/guides/${slug}` }]} />
    <article className="mx-auto max-w-3xl">
      <header><p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-light">Guide pratique · {service.label}</p>
        <h1 className="mt-5 text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.1] tracking-[-0.04em]">{guide.title}</h1>
        <p className="mt-5 text-sm text-text-light">Par <Link href="/about" className="underline underline-offset-4">Clément Cochod</Link> · Cochod Elevate</p>
        <p className="mt-8 text-xl leading-relaxed">{guide.intro}</p>
      </header>
      <nav aria-label="Sommaire du guide" className="my-10 rounded-2xl border border-sand p-6"><p className="font-semibold">Dans ce guide</p><ol className="mt-4 list-decimal space-y-3 pl-5">{guide.sections.map((section, index) => <li key={section.title}><a href={`#partie-${index + 1}`} className="underline underline-offset-4">{section.title}</a></li>)}</ol></nav>
      {guide.sections.map((section, index) => <section key={section.title} id={`partie-${index + 1}`} className="mb-10 scroll-mt-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph} className="mt-5 text-lg leading-relaxed text-text">{paragraph}</p>)}
        {section.bullets && <ul className="mt-5 list-disc space-y-3 pl-5 text-lg leading-relaxed">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}
      </section>)}
      <aside className="rounded-2xl bg-sand-light p-6"><h2 className="text-xl font-semibold">Un exemple dans mes projets</h2><p className="mt-3 leading-relaxed">{guide.project.text}</p><Link href={`/projects/${guide.project.slug}`} className="mt-4 inline-block py-2 font-semibold underline underline-offset-4">{guide.project.label} →</Link></aside>
      {guide.sources && <section className="mt-8"><h2 className="text-lg font-semibold">Pour vérifier les fonctionnalités actuelles</h2><ul className="mt-3 space-y-3">{guide.sources.map(source => <li key={source.url}><a href={source.url} className="underline underline-offset-4">{source.label} ↗</a></li>)}</ul></section>}
      <section className="mt-10 border-t border-sand pt-8"><h2 className="text-2xl font-semibold">Besoin d’aide pour le mettre en place ?</h2><p className="mt-4 leading-relaxed">Je peux vous accompagner à distance, partout en France, en commençant par votre besoin concret.</p><Link href={`/services/${service.slug}`} className="mt-4 inline-block py-2 font-semibold underline underline-offset-4">Découvrir l’offre : {service.label.toLowerCase()} →</Link></section>
    </article>
    <ContactPanel />
  </EditorialFrame>;
}
