import { ImageResponse } from 'next/og';
import { services } from '@/data/services';
import { guides } from '@/data/guides';

export const runtime = 'edge';

const titles = new Map<string, string>([
  ['accueil', 'Sites internet. Applications. Automatisations.'],
  ['about', 'Clément Cochod. Du besoin concret à l’outil utile.'],
  ['projects', 'Des projets concrets. Des solutions utiles.'],
  ...services.map(service => [`services--${service.slug}`, service.title] as const),
  ...guides.map(guide => [`guides--${guide.slug}`, guide.title] as const),
]);

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = titles.get(slug);
  if (!title) return new Response('Not found', { status: 404 });
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: '60px 72px', background: '#FDFCF0', color: '#2A2A2A' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #D4C4A8', paddingBottom: 28 }}>
        <div style={{ display: 'flex', fontSize: 34, letterSpacing: -1 }}>Cochod Elevate</div>
        <div style={{ display: 'flex', fontSize: 18, color: '#665747' }}>CLÉMENT COCHOD</div>
      </div>
      <div style={{ display: 'flex', fontSize: title.length > 85 ? 56 : 66, lineHeight: 1.1, letterSpacing: -2, maxWidth: 1040 }}>{title}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 22 }}>
        <div style={{ display: 'flex', color: '#665747' }}>cochodelevate.com</div>
        <div style={{ display: 'flex', border: '1px solid #D4C4A8', borderRadius: 40, padding: '12px 24px' }}>{slug.startsWith('guides--') ? 'Guide pratique' : 'Créons quelque chose d’utile'}</div>
      </div>
    </div>,
    { width: 1200, height: 630, headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } },
  );
}
