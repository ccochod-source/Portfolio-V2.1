'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easings } from '@/lib/gsapConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseTextRevealMaskOptions {
  /**
   * Élément de texte à animer
   */
  textRef: React.RefObject<HTMLElement | null>;
  /**
   * Point de départ de l'animation (en % de la hauteur de la fenêtre)
   * Par défaut, commence quand l'élément atteint 80% du viewport
   */
  start?: string;
  /**
   * Point de fin de l'animation (en % de la hauteur de la fenêtre)
   * Par défaut, se termine quand l'élément atteint 20% du viewport
   */
  end?: string;
  /**
   * Direction de révélation : 'horizontal' ou 'vertical'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Délai entre chaque caractère (stagger)
   */
  stagger?: number;
  /**
   * Callback appelé quand l'animation commence
   */
  onStart?: () => void;
  /**
   * Callback appelé quand l'animation se termine
   */
  onComplete?: () => void;
}

/**
 * Hook pour créer un effet Text Reveal Mask avec clip-path
 * Le texte se révèle progressivement selon le scroll, créant une fenêtre de vision
 */
export const useTextRevealMask = (options: UseTextRevealMaskOptions) => {
  const {
    textRef,
    start = 'top 80%',
    end = 'top 20%',
    direction = 'horizontal',
    stagger = 0.02,
    onStart,
    onComplete,
  } = options;

  const charsRef = useRef<HTMLElement[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!textRef.current || typeof window === 'undefined') return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const textElement = textRef.current;
    const originalText = textElement.textContent || '';

    // Split le texte en caractères individuels
    const chars = originalText.split('');
    charsRef.current = [];

    // Créer la structure HTML avec chaque caractère dans un span
    textElement.innerHTML = chars
      .map((char, index) => {
        if (char === ' ') {
          return '<span class="inline-block">&nbsp;</span>';
        }
        return `<span class="inline-block overflow-hidden" data-char-index="${index}">
          <span class="inline-block">${char}</span>
        </span>`;
      })
      .join('');

    // Récupérer tous les spans de caractères
    const charSpans = textElement.querySelectorAll<HTMLElement>(
      'span[data-char-index]'
    );

    charsRef.current = Array.from(charSpans);

    // Initialiser les positions avec clip-path
    charSpans.forEach((span) => {
      const innerSpan = span.querySelector('span');
      if (innerSpan) {
        if (direction === 'horizontal') {
          // Clip-path horizontal : révélation de gauche à droite
          gsap.set(innerSpan, {
            clipPath: 'inset(0 100% 0 0)',
            willChange: 'clip-path',
          });
        } else {
          // Clip-path vertical : révélation de haut en bas
          gsap.set(innerSpan, {
            clipPath: 'inset(100% 0 0 0)',
            willChange: 'clip-path',
          });
        }
      }
    });

    // Créer l'animation avec ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: textElement,
      start,
      end,
      scrub: 1, // Animation liée au scroll (scrub)
      onEnter: onStart,
      onLeave: onComplete,
      onEnterBack: onStart,
      onLeaveBack: onComplete,
    });

    scrollTriggerRef.current = scrollTrigger;

    const tl = gsap.timeline({
      scrollTrigger,
    });

    // Animer chaque caractère avec stagger
    charSpans.forEach((span, index) => {
      const innerSpan = span.querySelector('span');
      if (innerSpan) {
        if (direction === 'horizontal') {
          tl.to(
            innerSpan,
            {
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.5,
              ease: easings.smooth,
            },
            index * stagger
          );
        } else {
          tl.to(
            innerSpan,
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 0.5,
              ease: easings.smooth,
            },
            index * stagger
          );
        }
      }
    });

    animationRef.current = tl;

    // Cleanup
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      // Nettoyer will-change
      charSpans.forEach((span) => {
        const innerSpan = span.querySelector('span');
        if (innerSpan) {
          innerSpan.style.willChange = 'auto';
        }
      });
    };
  }, [textRef, start, end, direction, stagger, onStart, onComplete]);

  return {
    chars: charsRef.current,
  };
};

