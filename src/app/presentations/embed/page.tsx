import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { isCanvaPresentationUrl, toCanvaIframeSrc } from '@/lib/canvaEmbed';

type Props = { searchParams: Promise<{ u?: string }> };

export default async function CanvaEmbedPage({ searchParams }: Props) {
  const params = await searchParams;
  const raw = params.u;
  if (!raw) notFound();

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    redirect('/projects');
  }

  if (!isCanvaPresentationUrl(decoded)) {
    redirect('/projects');
  }

  const iframeSrc = toCanvaIframeSrc(decoded);

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <Link
          href="/projects"
          className="text-sm font-medium text-text-dark hover:text-accent-dark transition-colors inline-flex items-center gap-2 mb-8"
        >
          ← Retour aux projets
        </Link>

        <div className="rounded-2xl border border-sand bg-white/90 shadow-sm p-6 md:p-8 mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-text-dark mb-2">Présentation Canva</h1>
          <p className="text-text-light text-sm md:text-base leading-relaxed mb-6">
            Tu restes sur le portfolio : ouvre la présentation dans un nouvel onglet pour la consulter avec les bons droits
            Canva (connexion, partage, etc.).
          </p>
          <a
            href={decoded}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-dark transition-colors shadow-sm"
          >
            Ouvrir la présentation sur Canva
          </a>
          <p className="mt-4 text-xs text-text-light leading-relaxed">
            Si Canva affiche « pas l’autorisation », le design n’est pas partagé en lecture pour ton compte ou est un
            modèle restreint : demande l’accès au propriétaire ou exporte en PDF / image publiée sur ce site.
          </p>
        </div>

        <details className="group rounded-2xl border border-sand/80 bg-white/60 overflow-hidden">
          <summary className="cursor-pointer list-none px-4 py-3 md:px-6 md:py-4 text-sm font-medium text-text-dark hover:bg-cream/80 flex items-center justify-between gap-2 [&::-webkit-details-marker]:hidden">
            <span>Aperçu intégré (optionnel — souvent bloqué par Canva)</span>
            <span className="text-text-light group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="px-4 pb-4 md:px-6 md:pb-6 border-t border-sand/50 bg-cream/40">
            <p className="text-xs text-text-light py-3 leading-relaxed">
              L’iframe ne fonctionne que si le fichier est partagé en « Toute personne avec le lien » (lecture) et que
              Canva autorise l’affichage hors canva.com. Sinon, utilise le bouton ci-dessus.
            </p>
            <div className="rounded-xl overflow-hidden border border-sand bg-white shadow-inner">
              <iframe
                title="Aperçu Canva"
                src={iframeSrc}
                className="w-full h-[min(70vh,800px)] border-0 bg-white"
                allow="fullscreen"
                loading="lazy"
              />
            </div>
          </div>
        </details>
      </div>
      <Footer />
    </div>
  );
}
