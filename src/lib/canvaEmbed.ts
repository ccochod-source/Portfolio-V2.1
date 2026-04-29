/**
 * Détecte un lien vers une présentation Canva (domaine public).
 */
export function isCanvaPresentationUrl(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.hostname === 'canva.link') return true;
    if (u.hostname.endsWith('.canva.link')) return true;
    if (u.hostname === 'www.canva.com' || u.hostname === 'canva.com') return true;
    return u.hostname.endsWith('.canva.com');
  } catch {
    return false;
  }
}

/**
 * Transforme une URL Canva design (edit / lien court) vers une URL lisible en embed plein cadre si possible.
 * Les liens canva.link sont laissés tels quels (redirection dans l’iframe).
 */
export function toCanvaIframeSrc(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === 'canva.link') {
      return url;
    }
    if (!(u.hostname === 'www.canva.com' || u.hostname.endsWith('.canva.com'))) {
      return url;
    }
    const match = u.pathname.match(/\/design\/([^/]+)/);
    if (!match) {
      return url;
    }
    const designKey = match[1];
    const iframe = new URL(`https://www.canva.com/design/${designKey}/view`);
    iframe.searchParams.set('embed', '');
    return iframe.toString();
  } catch {
    return url;
  }
}

/** Route interne : la présentation s’ouvre dans le site (iframe), sans quitter le domaine. */
export function canvaEmbedPageHref(originalCanvaUrl: string): string {
  return `/presentations/embed?u=${encodeURIComponent(originalCanvaUrl)}`;
}

/** Si Canva → lien vers la page embed du portfolio ; sinon URL inchangée. */
export function resolvePresentationHref(url: string): { internalEmbed: boolean; href: string } {
  if (isCanvaPresentationUrl(url)) {
    return { internalEmbed: true, href: canvaEmbedPageHref(url) };
  }
  return { internalEmbed: false, href: url };
}
