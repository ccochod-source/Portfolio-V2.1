import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getService } from '@/data/services';
import { guides } from '@/data/guides';
import { pageMetadata, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs, ContactPanel, EditorialFrame } from '@/components/seo/Editorial';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return pageMetadata(service.seoTitle, service.description, `/services/${slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <EditorialFrame>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: service.label,
      description: service.description, url: `${SITE_URL}/services/${slug}`,
      provider: { '@id': `${SITE_URL}/#organization` }, areaServed: { '@type': 'Country', name: 'France' },
    }} />
    <Breadcrumbs items={[{ name: 'Accueil', path: '/' }, { name: 'Services', path: '/#services' }, { name: service.label, path: `/services/${slug}` }]} />
    <header className="border-b border-sand pb-12">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-light">{service.label} · Clément Cochod</p>
      <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[1.08] tracking-[-0.045em]">{service.title}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-relaxed text-text">{service.intro}</p>
      <a href="#service-contact" className="mt-7 inline-flex rounded-full bg-text-dark px-6 py-3 font-semibold text-cream">Parlons de votre projet ↗</a>
    </header>
    <div className="grid gap-12 py-12 md:grid-cols-2">
      <section><h2 className="text-2xl font-semibold tracking-tight">Cela vous parle ?</h2><ul className="mt-5 list-disc space-y-4 pl-5 leading-relaxed">{service.needs.map(need => <li key={need}>{need}</li>)}</ul></section>
      <section><h2 className="text-2xl font-semibold tracking-tight">Ce que je peux réaliser pour vous</h2><ul className="mt-5 list-disc space-y-4 pl-5 leading-relaxed">{service.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
    </div>
    {slug === 'automatisation' && <section className="rounded-3xl bg-sand-light p-6 sm:p-10" aria-labelledby="dust-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.2em]">IA utile, avec contrôle humain</p>
      <h2 id="dust-heading" className="mt-4 text-3xl font-semibold tracking-tight">Des assistants IA avec Dust</h2>
      <p className="mt-5 leading-relaxed">Vous souhaitez utiliser l’IA pour rechercher dans vos documents, préparer une synthèse ou aider votre équipe à retrouver une procédure ? Je peux vous accompagner dans la création d’un assistant IA avec Dust : choix des sources, consignes, droits d’accès et tests des réponses.</p>
      <p className="mt-4 leading-relaxed">J’ai utilisé Dust dans le hackathon scolaire PayFit, pour une plateforme de rédaction assistée. Ce travail n’est ni une mission client pour PayFit ni une certification Dust. Les réponses générées doivent être vérifiées, notamment pour les sujets sensibles.</p>
      <Link href="/projects/payfit-plateforme-articles-ia" className="mt-5 inline-block py-2 font-semibold underline underline-offset-4">Voir mon projet avec Dust →</Link>
    </section>}
    <section className="py-12"><h2 className="text-3xl font-semibold tracking-tight">Comment se déroule le projet ?</h2>
      <ol className="mt-8 grid gap-8 md:grid-cols-3">{service.steps.map((step, index) => <li key={step.title}><p className="font-mono text-sm text-text-light">0{index + 1}</p><h3 className="mt-3 text-xl font-semibold">{step.title}</h3><p className="mt-3 leading-relaxed text-text">{step.text}</p></li>)}</ol>
    </section>
    <section className="border-y border-sand py-10"><h2 className="text-3xl font-semibold tracking-tight">Des exemples concrets</h2>
      <div className="mt-8 space-y-8">{service.projects.map(project => <article key={project.slug}><p className="text-xs font-semibold uppercase tracking-wide text-text-light">{project.context}</p><h3 className="mt-2 text-xl font-semibold"><Link href={`/projects/${project.slug}`} className="underline underline-offset-4">{project.title} →</Link></h3><p className="mt-3 max-w-3xl leading-relaxed">{project.text}</p></article>)}</div>
    </section>
    <section className="py-12"><h2 className="text-3xl font-semibold tracking-tight">Vos questions</h2><div className="mt-6 divide-y divide-sand">{service.questions.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{item.question}</summary><p className="mt-4 max-w-3xl leading-relaxed text-text">{item.answer}</p></details>)}</div></section>
    <section><h2 className="text-2xl font-semibold">Pour préparer votre projet</h2><ul className="mt-5 space-y-4">{guides.filter(guide => guide.service === slug).map(guide => <li key={guide.slug}><Link href={`/guides/${guide.slug}`} className="inline-block py-2 underline underline-offset-4">{guide.title} →</Link></li>)}</ul></section>
    <ContactPanel />
  </EditorialFrame>;
}
