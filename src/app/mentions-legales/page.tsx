import Link from 'next/link';
import { EditorialFrame, Breadcrumbs } from '@/components/seo/Editorial';
import { pageMetadata, CONTACT } from '@/lib/seo';

export const metadata = pageMetadata('Mentions légales', 'Identité de l’éditeur Cochod Elevate, coordonnées professionnelles, hébergement du site et informations sur les contenus présentés.', '/mentions-legales', '/share/accueil');

export default function LegalPage() {
  return <EditorialFrame>
    <Breadcrumbs items={[{ name: 'Accueil', path: '/' }, { name: 'Mentions légales', path: '/mentions-legales' }]} />
    <h1 className="text-4xl font-semibold tracking-tight">Mentions légales</h1>
    <div className="mt-10 space-y-10 leading-relaxed [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
      <section><h2>Éditeur du site</h2>
        <p>Clément Cochod EI, entrepreneur individuel exerçant sous le nom commercial Cochod Elevate.</p>
        <p>Adresse professionnelle : 14 Rue Camille Pelletan, 92120 Montrouge, France.</p>
        <p>SIREN : 104 864 038.</p>
        <p>Activité : développement web et solutions d’intelligence artificielle.</p>
        <p>Email : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a><br />Téléphone : <a href={`tel:${CONTACT.phone}`}>07 43 70 05 96</a>.</p>
        <p>Responsable de la publication : Clément Cochod.</p>
      </section>
      <section><h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.</p>
        <p>Téléphone du contact juridique publié par l’hébergeur : +1 559 288 7060.</p>
        <p><a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Coordonnées et politique de confidentialité de Vercel</a> · <a href="https://vercel.com/legal/dmca-policy" target="_blank" rel="noreferrer">Contact juridique de Vercel</a>.</p>
      </section>
      <section><h2>Contenus et projets</h2>
        <p>Ce site présente l’activité et les réalisations de Clément Cochod. Les fiches distinguent les missions, stages, projets étudiants et hackathons. La présence du nom d’une entreprise ne constitue pas une certification ou un partenariat.</p>
        <p>Les marques, logos et contenus tiers restent la propriété de leurs titulaires. Pour demander une autorisation de réutilisation d’un contenu ou signaler une erreur, contactez l’éditeur.</p>
      </section>
      <section><h2>Données personnelles</h2><p>Les informations relatives aux prises de contact, aux outils de mesure et aux services tiers sont présentées dans la <Link href="/confidentialite">politique de confidentialité</Link>.</p></section>
    </div>
  </EditorialFrame>;
}
