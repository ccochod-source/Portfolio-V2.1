'use client';

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseSmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

interface UseSmoothScrollReturn {
  lenis: Lenis | null;
  scrollTo: (target: number | string, options?: { immediate?: boolean }) => void;
  getScroll: () => number;
  getVelocity: () => number;
  stop: () => void;
  start: () => void;
}

/**
 * Hook pour gérer le smooth scroll avec Lenis et synchroniser avec GSAP ScrollTrigger
 * La synchronisation doit être parfaite pour une expérience fluide
 */
export const useSmoothScroll = (
  options: UseSmoothScrollOptions = {}
): UseSmoothScrollReturn => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  const {
    duration = 1.2,
    easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel = true,
    wheelMultiplier = 1,
    touchMultiplier = 2,
  } = options;

  // Initialiser Lenis
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // Créer l'instance Lenis
    const lenis = new Lenis({
      duration,
      easing,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel,
      wheelMultiplier,
      touchMultiplier,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop pour synchroniser Lenis et GSAP ScrollTrigger
    function raf(time: number) {
      lenis.raf(time);
      
      // Rafraîchir ScrollTrigger à chaque frame pour synchronisation parfaite
      ScrollTrigger.update();
      
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    // Écouter les événements Lenis pour mettre à jour ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Cleanup
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [duration, easing, smoothWheel, wheelMultiplier, touchMultiplier]);

  // Méthode pour scroller vers une position
  const scrollTo = useCallback(
    (target: number | string, options?: { immediate?: boolean }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      }
    },
    []
  );

  // Obtenir la position actuelle du scroll
  const getScroll = useCallback(() => {
    return lenisRef.current?.scroll || window.scrollY || 0;
  }, []);

  // Obtenir la vélocité du scroll
  const getVelocity = useCallback(() => {
    return lenisRef.current?.velocity || 0;
  }, []);

  // Arrêter le smooth scroll
  const stop = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  // Reprendre le smooth scroll
  const start = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    getScroll,
    getVelocity,
    stop,
    start,
  };
};

