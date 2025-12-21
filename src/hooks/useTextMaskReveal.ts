'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseTextMaskRevealOptions {
  /**
   * Référence du conteneur de la section Hero
   */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Référence de l'élément de masque (clip-path)
   */
  maskRef: React.RefObject<HTMLElement | null>;
  /**
   * Durée de l'animation en pixels de scroll
   */
  scrollDuration?: number;
  /**
   * Point de départ de l'animation
   */
  start?: string;
  /**
   * Point de fin de l'animation
   */
  end?: string;
}

/**
 * Hook pour créer l'effet Text Mask Reveal style Olivier Larose
 * Le texte devient une fenêtre qui révèle progressivement une image en arrière-plan
 */
export const useTextMaskReveal = (options: UseTextMaskRevealOptions) => {
  const { containerRef, maskRef, scrollDuration = 1000, start = 'top top', end } = options;
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!containerRef.current || !maskRef.current || typeof window === 'undefined') return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const mask = maskRef.current;

    // Calculer la fin de l'animation si non fournie
    const endPoint = end || `+=${scrollDuration}`;

    // Initialiser le clip-path : commencer avec le texte masqué (petit inset)
    gsap.set(mask, {
      clipPath: 'inset(40% 20% 40% 20%)', // Commence avec un masque centré autour du texte
      willChange: 'clip-path',
    });

    // Créer l'animation avec ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        end: endPoint,
        pin: true, // Épingler la section pendant le scroll
        scrub: 1, // Animation fluide liée au scroll avec légère inertie
        anticipatePin: 1,
        // onUpdate optionnel pour debug
        // onUpdate: (self) => {
        //   console.log('Progress:', self.progress);
        // },
      },
    });

    // Animer le clip-path de sa position initiale vers inset(0%) (plein écran)
    tl.to(mask, {
      clipPath: 'inset(0% 0% 0% 0%)', // Révéler complètement l'image
      duration: 1,
      ease: 'power2.out',
    });

    animationRef.current = tl;
    scrollTriggerRef.current = tl.scrollTrigger || null;

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      // Nettoyer will-change
      gsap.set(mask, { willChange: 'auto' });
    };
  }, [containerRef, maskRef, scrollDuration, start, end]);

  return {
    scrollTrigger: scrollTriggerRef.current,
    animation: animationRef.current,
  };
};

