'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

const DesktopScrollController = dynamic(() => import('./DesktopScrollController'), { ssr: false });

interface LenisProviderProps {
  children: React.ReactNode;
}

/**
 * Provider qui initialise le smooth scroll avec Lenis
 * Utilise le hook useSmoothScroll pour une synchronisation parfaite avec GSAP
 */
export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const desktopMotion = useDesktopMotion();
  return <>{children}{desktopMotion ? <DesktopScrollController /> : null}</>;
}
