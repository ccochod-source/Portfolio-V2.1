'use client';

import { useSyncExternalStore } from 'react';

// Touch devices remain in native-scroll mode, including in landscape.
const STATIC_QUERY = '(max-width: 1023px), (any-pointer: coarse), (prefers-reduced-motion: reduce)';
const getServerSnapshot = () => false;
const getSnapshot = () => !window.matchMedia(STATIC_QUERY).matches;
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(STATIC_QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};

export function useDesktopMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
