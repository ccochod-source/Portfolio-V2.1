'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollSnapOptions {
  /**
   * Référence du conteneur des projets
   */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Nombre de projets
   */
  itemCount: number;
  /**
   * Callback appelé quand l'index change
   */
  onIndexChange?: (index: number) => void;
}

/**
 * Hook pour créer un système de scroll snapping : un projet par scroll
 */
export const useScrollSnap = (options: UseScrollSnapOptions) => {
  const { containerRef, itemCount, onIndexChange } = options;
  const currentIndexRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined' || itemCount === 0)
      return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isScrollingRef.current) return;

      e.preventDefault();
      clearTimeout(wheelTimeout);

      const deltaY = e.deltaY;
      let newIndex = currentIndexRef.current;

      if (deltaY > 0 && currentIndexRef.current < itemCount - 1) {
        // Scroll vers le bas
        newIndex = currentIndexRef.current + 1;
      } else if (deltaY < 0 && currentIndexRef.current > 0) {
        // Scroll vers le haut
        newIndex = currentIndexRef.current - 1;
      }

      if (newIndex !== currentIndexRef.current) {
        isScrollingRef.current = true;
        currentIndexRef.current = newIndex;

        // Scroller vers le projet suivant/précédent
        // L'index 0 = Hero (0vh), index 1 = premier projet (100vh), etc.
        const targetY = newIndex * window.innerHeight;

        // Utiliser window.scrollTo avec smooth behavior
        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });

        // Appeler le callback après un délai
        setTimeout(() => {
          isScrollingRef.current = false;
          if (onIndexChange) onIndexChange(newIndex);
        }, 800);
      }

      // Reset le flag après un délai pour éviter les blocages
      wheelTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    // Ajouter l'écouteur d'événements wheel
    window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [containerRef, itemCount, onIndexChange]);

  return {
    currentIndex: currentIndexRef.current,
    goToIndex: (index: number) => {
      if (index >= 0 && index < itemCount && !isScrollingRef.current) {
        isScrollingRef.current = true;
        currentIndexRef.current = index;
        const targetY = index * window.innerHeight;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isScrollingRef.current = false;
          if (onIndexChange) onIndexChange(index);
        }, 800);
      }
    },
  };
};

