/**
 * Deck « Présentation Voyage Londres Moderne Rouge et Beige » — Neogen-IA —
 * ordre = export Canva du dossier (1.png → slide-01.png …).
 */
export const NEOGEN_IA_SLIDE_FILENAMES = [
  'slide-01.png',
  'slide-02.png',
  'slide-03.png',
  'slide-04.png',
  'slide-05.png',
  'slide-06.png',
  'slide-07.png',
  'slide-08.png',
  'slide-09.png',
  'slide-10.png',
  'slide-11.png',
] as const;

export function neogenIaSlideshowUrls(): readonly string[] {
  return NEOGEN_IA_SLIDE_FILENAMES.map((name) => `/projects/neogen-ia/${name}`);
}
