'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseDiveInEffectOptions {
  /**
   * Référence du conteneur de la section Hero
   */
  containerRef: React.RefObject<HTMLElement | null>;
  /**
   * Référence du titre à zoomer
   */
  titleRef: React.RefObject<HTMLElement | null>;
  /**
   * Référence de l'image de fond à faire disparaître
   */
  backgroundRef: React.RefObject<HTMLElement | null>;
  /**
   * Échelle finale du titre (par défaut 50)
   */
  finalScale?: number;
  /**
   * Durée de l'animation en pixels de scroll
   */
  scrollDuration?: number;
  /**
   * Callback appelé quand l'animation est terminée
   */
  onComplete?: () => void;
}

/**
 * Hook pour créer l'effet "Dive-In" : le titre zoom massivement pendant que le fond disparaît
 */
export const useDiveInEffect = (options: UseDiveInEffectOptions) => {
  const {
    containerRef,
    titleRef,
    backgroundRef,
    finalScale = 50,
    scrollDuration = 1500,
    onComplete,
  } = options;

  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !titleRef.current ||
      !backgroundRef.current ||
      typeof window === 'undefined'
    )
      return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const title = titleRef.current;
    const background = backgroundRef.current;

    // Initialiser les positions
    gsap.set(title, {
      scale: 1,
      willChange: 'transform',
    });

    gsap.set(background, {
      opacity: 1,
      willChange: 'opacity',
    });

    // Créer le ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${scrollDuration}`,
      pin: true, // Épingler la section Hero pendant l'animation
      scrub: 1, // Animation fluide liée au scroll
      anticipatePin: 1,
      onLeave: () => {
        // Nettoyer will-change quand on quitte la section
        gsap.set(title, { willChange: 'auto' });
        gsap.set(background, { willChange: 'auto' });
        if (onComplete) onComplete();
      },
    });

    // Créer la timeline avec le ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger,
    });

    // Animer le titre : zoom massif (scale 1 à 50)
    tl.to(
      title,
      {
        scale: finalScale,
        duration: 1,
        ease: 'power2.in',
        transformOrigin: 'center center',
      },
      0
    );

    // Animer le fond : disparition progressive (80% du temps)
    tl.to(
      background,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      0.1
    );

    animationRef.current = tl;
    scrollTriggerRef.current = scrollTrigger;

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      // Nettoyer will-change
      gsap.set(title, { willChange: 'auto' });
      gsap.set(background, { willChange: 'auto' });
    };
  }, [containerRef, titleRef, backgroundRef, finalScale, scrollDuration, onComplete]);

  return {
    scrollTrigger: scrollTriggerRef.current,
    animation: animationRef.current,
  };
};

