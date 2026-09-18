'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function DesktopScrollController() {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll({ duration: 1.2, easing, smoothWheel: true });
  useEffect(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    const position = target
      ? window.scrollY + target.getBoundingClientRect().top - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0)
      : 0;
    scrollTo(position, { immediate: true });
  }, [pathname, scrollTo]);
  return null;
}
