/**
 * Deck « Black and Cream Bold Minimalism Marketing Strategy Proposal Presentation » —
 * export Canva renommé en slide-01 … slide-13 sous /projects/analyse-accidentologie/.
 */
export const ANALYSE_ACCIDENTOLOGIE_SLIDE_FILENAMES = [
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

export function analyseAccidentologieSlideshowUrls(): readonly string[] {
  return ANALYSE_ACCIDENTOLOGIE_SLIDE_FILENAMES.map(
    (name) => `/projects/analyse-accidentologie/${name}`,
  );
}
