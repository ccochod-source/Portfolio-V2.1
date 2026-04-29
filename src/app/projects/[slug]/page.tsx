import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Text } from '@/components/atoms/Text';
import { PresentationAwareLink } from '@/components/atoms/PresentationAwareLink';
import { ProjectSlidesModal } from '@/components/molecules/ProjectSlidesModal';
import { getProjectBySlug, getProjectsWithSlug } from '@/lib/projects';
import {
  getFlatProjectLinks,
  googleDocPreviewEmbedUrl,
  linkCategory,
} from '@/lib/projectResources';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjectsWithSlug().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Projet introuvable' };
  return {
    title: `${project.title} — Portfolio`,
    description: project.longDescription?.slice(0, 155) ?? project.description.slice(0, 155),
  };
}

function categoryBadgeLabel(cat: ReturnType<typeof linkCategory>): string {
  switch (cat) {
    case 'pdf':
      return 'PDF';
    case 'video':
      return 'Vidéo';
    case 'google-doc':
      return 'Google Doc';
    case 'google-sheet':
      return 'Sheets';
    case 'canva':
      return 'Canva';
    case 'dashboard':
      return 'Dashboard';
    default:
      return 'Lien';
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const flatLinks = getFlatProjectLinks(project);
  const embeddedVideoHref = project.videoUrl;
  const listLinksWithoutEmbeddedDup =
    embeddedVideoHref != null
      ? flatLinks.filter((l) => l.url !== embeddedVideoHref)
      : flatLinks;

  const docsForEmbedPreview = flatLinks.filter(
    (l) => linkCategory(l.url) === 'google-doc' && googleDocPreviewEmbedUrl(l.url),
  );

  const pdfLinks = flatLinks.filter((l) => linkCategory(l.url) === 'pdf');

  const embeddedUrls = new Set<string>();
  pdfLinks.forEach((l) => embeddedUrls.add(l.url));
  docsForEmbedPreview.forEach((l) => embeddedUrls.add(l.url));

  const resourceOnlyLinks = listLinksWithoutEmbeddedDup.filter((l) => !embeddedUrls.has(l.url));

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 md:px-8 py-10 md:py-14 pb-24">
        <nav className="text-sm text-text-light mb-8">
          <Link href="/projects" className="hover:text-accent-dark transition-colors">
            ← Tous les projets
          </Link>
        </nav>

        <div
          className="rounded-2xl p-8 md:p-10 border border-sand/60 shadow-sm mb-10"
          style={{
            backgroundColor: project.color || '#FFFFFF',
          }}
        >
          <div className="relative w-full aspect-[21/9] max-h-52 mb-8 rounded-xl overflow-hidden bg-white/70">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-contain p-4"
              sizes="100vw"
              priority
            />
          </div>
          <Text variant="h1" className="text-accent-dark mb-2">
            {project.title}
          </Text>
          <p className="text-text-light text-sm mb-6">Résumé présent également sur la page d’accueil.</p>
          <div className="text-text whitespace-pre-line leading-relaxed text-base md:text-lg">
            {project.longDescription ?? project.description}
          </div>
        </div>

        {project.slideshowSrcs && project.slideshowSrcs.length > 0 && (
          <ProjectSlidesModal slideshowSrcs={project.slideshowSrcs} projectTitle={project.title} />
        )}

        {embeddedVideoHref && (
          <section className="mb-12" aria-labelledby="embed-video-heading">
            <h2 id="embed-video-heading" className="text-lg font-semibold text-text-dark mb-3">
              Démo vidéo
            </h2>
            <video className="w-full rounded-xl border border-sand/60 shadow-sm bg-black" controls preload="metadata">
              <source src={embeddedVideoHref} />
            </video>
          </section>
        )}

        {pdfLinks.length > 0 && (
          <section className="mb-12" aria-labelledby="embed-pdf-heading">
            <h2 id="embed-pdf-heading" className="text-lg font-semibold text-text-dark mb-3">
              Document PDF
            </h2>
            <div className="space-y-4">
              {pdfLinks.map((l, i) => (
                <div key={`${l.url}-${i}`} className="rounded-xl overflow-hidden border border-sand bg-white shadow-sm">
                  <div className="h-[min(70vh,640px)] w-full bg-sand/30">
                    <iframe title={l.label} src={l.url} className="w-full h-full border-0" />
                  </div>
                  <div className="px-4 py-2 text-sm bg-cream flex justify-between items-center gap-2">
                    <span className="text-text truncate">{l.label}</span>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-dark whitespace-nowrap text-sm font-medium hover:underline"
                    >
                      Ouvrir en plein écran
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {docsForEmbedPreview.length > 0 && (
          <section className="mb-12" aria-labelledby="embed-gdoc-heading">
            <h2 id="embed-gdoc-heading" className="text-lg font-semibold text-text-dark mb-3">
              Document Google&nbsp;Docs (aperçu)
            </h2>
            <p className="text-sm text-text-light mb-3">
              L’iframe fonctionne lorsque le document est partageable en lecture (lien ouvert depuis Google).
            </p>
            <div className="space-y-8">
              {docsForEmbedPreview.map((l) => {
                const preview = googleDocPreviewEmbedUrl(l.url);
                if (!preview) return null;
                return (
                  <div key={l.url} className="rounded-xl overflow-hidden border border-sand shadow-sm bg-white">
                    <div className="h-[min(75vh,720px)] w-full bg-sand/30">
                      <iframe title={l.label} src={preview} className="w-full h-full border-0" />
                    </div>
                    <div className="px-4 py-2 text-sm bg-cream">
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-dark font-medium hover:underline"
                      >
                        {l.label} — ouvrir dans Google Docs
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {resourceOnlyLinks.length > 0 && (
          <section aria-labelledby="resources-heading">
            <h2 id="resources-heading" className="text-lg font-semibold text-text-dark mb-4">
              Ressources &amp; liens directs
            </h2>
            <ul className="space-y-3">
              {resourceOnlyLinks.map((item) => {
                const cat = linkCategory(item.url);
                const key = `${item.url}-${item.label}`;
                return (
                  <li
                    key={key}
                    className="flex flex-wrap items-center gap-2 rounded-lg border border-sand/70 bg-white/80 px-4 py-3 shadow-sm"
                  >
                    <span className="text-xs uppercase tracking-wide text-text-light">{categoryBadgeLabel(cat)}</span>
                    <PresentationAwareLink
                      href={item.url}
                      className="flex-1 min-w-[12rem] text-text-dark font-medium hover:text-accent-dark transition-colors"
                    >
                      {item.label}
                    </PresentationAwareLink>
                    <span className="text-xs text-text-light truncate max-w-[16rem] hidden sm:inline">{item.url}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
