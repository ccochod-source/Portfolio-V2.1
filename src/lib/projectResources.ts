import type { ParallaxProject } from '@/data/parallaxProjects';

/** Liens directs : présentations, démos, tableurs, lien bonus. */
export function getFlatProjectLinks(project: ParallaxProject): { url: string; label: string }[] {
  const items: { url: string; label: string }[] = [];
  if (typeof project.link === 'string') {
    items.push({ url: project.link, label: 'Ressource principale' });
  } else if (Array.isArray(project.link)) {
    items.push(...project.link.map((x) => ({ url: x.url, label: x.label })));
  }
  if (project.extraLink) {
    items.push({ url: project.extraLink.url, label: project.extraLink.label });
  }

  const seen = new Set<string>();
  return items.filter((it) => {
    if (!it.url || seen.has(it.url)) return false;
    seen.add(it.url);
    return true;
  });
}

export function isSameOriginRelativePath(url: string): boolean {
  return url.startsWith('/');
}

/** URL Google Docs en mode prévisualisation iframe (léger, doc public uniquement). */
export function googleDocPreviewEmbedUrl(editUrl: string): string | null {
  try {
    const u = new URL(editUrl);
    if (!u.hostname.includes('docs.google.com')) return null;
    if (!u.pathname.includes('/document/d/')) return null;
    const pathParts = u.pathname.split('/');
    const idIndex = pathParts.indexOf('d');
    const docId = idIndex >= 0 ? pathParts[idIndex + 1] : undefined;
    if (!docId) return null;
    return `https://docs.google.com/document/d/${docId}/preview`;
  } catch {
    return null;
  }
}

export function linkCategory(url: string): 'pdf' | 'video' | 'google-doc' | 'google-sheet' | 'canva' | 'dashboard' | 'other' {
  const lower = url.toLowerCase();
  if (lower.endsWith('.pdf') || lower.includes('.pdf')) return 'pdf';
  if (
    lower.endsWith('.mp4') ||
    lower.endsWith('.webm') ||
    lower.endsWith('.mov') ||
    lower.includes('youtube.com')
  ) {
    return 'video';
  }
  if (url.includes('docs.google.com/document')) return 'google-doc';
  if (url.includes('docs.google.com/spreadsheets') || url.includes('google.com/spreadsheets')) return 'google-sheet';
  if (url.includes('canva.com')) return 'canva';
  if (url.includes('vercel.app')) return 'dashboard';
  return 'other';
}
