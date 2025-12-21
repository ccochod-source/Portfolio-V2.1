import { gsap } from 'gsap';

/**
 * Configuration centralisée pour GSAP
 * Easings de type luxe et calme (power3.out, expo.out)
 */

// Enregistrer les plugins si nécessaire
if (typeof window !== 'undefined') {
  // Les plugins seront enregistrés dans les composants qui les utilisent
}

/**
 * Easings personnalisés pour une sensation de luxe et de calme
 */
export const easings = {
  // Easing principal : doux et élégant
  smooth: 'power3.out',
  // Easing pour transitions rapides mais fluides
  quick: 'expo.out',
  // Easing pour animations très douces
  gentle: 'power2.out',
  // Easing pour effets de rebond subtils
  bounce: 'elastic.out(1, 0.3)',
} as const;

/**
 * Durées standardisées
 */
export const durations = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  slower: 1.5,
} as const;

/**
 * Configuration par défaut pour ScrollTrigger
 */
export const defaultScrollTriggerConfig = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  once: false,
  markers: false, // Mettre à true pour debug
} as const;

/**
 * Helper pour créer une timeline avec easing par défaut
 */
export const createTimeline = (config?: gsap.TimelineVars) => {
  return gsap.timeline({
    ease: easings.smooth,
    ...config,
  });
};

/**
 * Helper pour créer une animation avec easing par défaut
 */
export const createAnimation = (
  target: gsap.TweenTarget,
  vars: gsap.TweenVars
) => {
  return gsap.to(target, {
    ease: easings.smooth,
    ...vars,
  });
};

