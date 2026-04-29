/**
 * Deck « Green and White Elegant Clean Matcha Café » exporté pour Beitea —
 * ordre = numérotation d’origine du dossier Canva (1.png → slide-01.png …).
 */
export const BEITEA_SLIDE_FILENAMES = [
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
  'slide-12.png',
  'slide-13.png',
] as const;

export function beiteaSlideshowUrls(): readonly string[] {
  return BEITEA_SLIDE_FILENAMES.map((name) => `/projects/beitea/${name}`);
}
