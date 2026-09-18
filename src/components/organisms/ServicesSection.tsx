import Link from 'next/link';
import { services } from '@/data/services';
import { guides } from '@/data/guides';

export function ServicesSection() {
  return <section id="services" aria-labelledby="services-title" className="scroll-mt-32 px-6 py-16 md:px-8 md:py-24">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-light">Cochod Elevate · Services en France</p>
      <h2 id="services-title" className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">De quoi avez-vous besoin ?</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {services.map((service, index) => <article key={service.slug} className="flex flex-col rounded-2xl border border-sand p-6 md:p-8">
          <p className="font-mono text-sm text-text-light">0{index + 1}</p>
          <h3 className="mt-6 text-2xl font-semibold">{service.label}</h3>
          <p className="my-5 flex-1 leading-relaxed text-text">{service.title}</p>
          <Link href={`/services/${service.slug}`} className="py-3 font-semibold underline underline-offset-4">Découvrir l’offre {service.label.toLowerCase()} →</Link>
        </article>)}
      </div>
    </div>
  </section>;
}

export function GuidesSection() {
  return <section id="guides" aria-labelledby="guides-title" className="scroll-mt-32 border-t border-sand px-6 py-16 md:px-8">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-light">Des réponses simples</p>
      <h2 id="guides-title" className="mt-4 text-4xl font-semibold tracking-tight">Avant de vous lancer.</h2>
      <div className="mt-8 grid gap-x-10 md:grid-cols-2">
        {guides.map(guide => <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group flex items-start justify-between gap-6 border-b border-sand py-6 text-xl font-medium leading-snug">
          {guide.title}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1">↗</span>
        </Link>)}
      </div>
    </div>
  </section>;
}
