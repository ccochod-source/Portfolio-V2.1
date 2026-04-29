/**
 * Ordre narratif du deck PayFit dans la modale slideshow.
 * (Les fichiers sous /public sont numérotés à l’export — ce tableau impose l’ordre logique.)
 */
export const PAYFIT_SLIDE_FILENAMES = [
  // 1–10 — pitch agents & valeur
  'slide-09.png', // PAYFIT (titres + illus)
  'slide-10.png', // Problématiques (Home)
  'slide-02.png', // Synthèse agents (KPI / Content / Concurrence)
  'slide-08.png', // Agent créateur
  'slide-03.png', // Agent législatif
  'slide-06.png', // Agent EEAT
  'slide-18.png', // Agent Backlinks
  'slide-04.png', // Agent GEO (vue synthèse)
  'slide-05.png', // Agent GEO (détail scores & tableaux)
  'slide-15.png', // Simulateurs — visibilité & leads (QR, Zapier)
  // 11–18 — produit / démo / clôture
  'slide-16.png', // Simulateurs — projection / croissance (mock navigateur)
  'slide-17.png', // Simulateurs — comparateur de scénarios
  'slide-11.png', // Dashboard — appli démo & QR repos
  'slide-12.png', // Dashboard — alternative (captures KPI)
  'slide-07.png', // Budget total (outil / coûts)
  'slide-13.png', // Bonus (Claude SEO / GitHub…)
  'slide-14.png', // Thank you
  'slide-01.png', // Schéma pipeline bout-en-bout
] as const;

export function payfitSlideshowUrls(): readonly string[] {
  return PAYFIT_SLIDE_FILENAMES.map((name) => `/projects/payfit/${name}`);
}
