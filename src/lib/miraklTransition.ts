export const MIRAKL_PATH = '/projects/hackathon-mirakl';
export const MIRAKL_SESSION_KEY = 'cochod:mirakl-intro:v1';
export const MIRAKL_STATIC_QUERY = '(max-width: 1023px), (any-pointer: coarse), (prefers-reduced-motion: reduce)';

export function shouldPlayMiraklTransition(input: {
  desktop: boolean;
  seen: boolean;
  button: number;
  modified: boolean;
  defaultPrevented: boolean;
}) {
  return input.desktop && !input.seen && input.button === 0 && !input.modified && !input.defaultPrevented;
}
