'use client';

import React, { useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { usePathname } from 'next/navigation';

interface LenisProviderProps {
  children: React.ReactNode;
}

/**
 * Provider qui initialise le smooth scroll avec Lenis
 * Utilise le hook useSmoothScroll pour une synchronisation parfaite avec GSAP
 */
export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Scroll to top on route change
  useEffect(() => {
    scrollTo(0, { immediate: true });
  }, [pathname, scrollTo]);

  return <>{children}</>;
}

