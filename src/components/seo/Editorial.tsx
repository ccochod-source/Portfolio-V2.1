import Link from 'next/link';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { JsonLd } from './JsonLd';
import { breadcrumbSchema, CONTACT } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return <><JsonLd data={breadcrumbSchema(items)} /><nav aria-label="Fil d’Ariane" className="mb-8 text-sm text-text-light">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => <li key={item.path} className="flex items-center gap-2">
        {index > 0 && <span aria-hidden="true">/</span>}
        {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path} className="underline underline-offset-4 hover:text-text-dark">{item.name}</Link>}
      </li>)}
    </ol>
  </nav></>;
}

export function EditorialFrame({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-cream text-text-dark"><Header />
    <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 md:py-14">{children}</main><Footer />
  </div>;
}

export function ContactPanel() {
  return <section aria-labelledby="service-contact" className="mt-16 rounded-3xl bg-text-dark p-6 text-cream sm:p-10">
    <p className="text-xs uppercase tracking-[0.2em] text-sand">Cochod Elevate · Partout en France</p>
    <h2 id="service-contact" className="mt-4 text-3xl font-semibold tracking-tight">Parlons de votre projet.</h2>
    <p className="mt-4 max-w-xl leading-relaxed">Expliquez-moi votre activité, ce qui vous bloque et ce que vous aimeriez améliorer. Nous pourrons définir une première étape adaptée.</p>
    <div className="mt-6 flex flex-wrap gap-4">
      <a href={`mailto:${CONTACT.email}`} className="rounded-full bg-cream px-5 py-3 text-sm font-semibold text-text-dark break-all">{CONTACT.email}</a>
      <a href={`tel:${CONTACT.phone}`} className="rounded-full border border-sand px-5 py-3 text-sm font-semibold">07 43 70 05 96</a>
    </div>
  </section>;
}
