'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { parallaxProjects } from '@/data/parallaxProjects';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ProjectParallax: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [mounted, setMounted] = useState(false);

  // Rendu client pur - anti-flash
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Initialiser GSAP et ScrollTrigger
  useLayoutEffect(() => {
    if (!mounted) return;

    if (!containerRef.current || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Animation d'entrée fluide pour la première carte (transition depuis HeroSection)
      if (cards.length > 0) {
        const firstCard = cards[0];
        if (firstCard) {
          // Initialiser la première carte avec opacité 0 et légèrement en dessous
          gsap.set(firstCard, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            willChange: 'transform, opacity',
          });

          // Animation d'entrée fluide quand la première carte entre en vue
          ScrollTrigger.create({
            trigger: firstCard,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const easedProgress = gsap.utils.clamp(0, 1, progress);
              
              const opacity = gsap.utils.interpolate(0, 1, easedProgress);
              const y = gsap.utils.interpolate(50, 0, easedProgress);
              const scale = gsap.utils.interpolate(0.95, 1, easedProgress);

              gsap.set(firstCard, {
                opacity,
                y,
                scale,
                force3D: true,
              });
            },
            onEnter: () => {
              // Verrouiller l'état final
              gsap.set(firstCard, {
                opacity: 1,
                y: 0,
                scale: 1,
                willChange: 'transform, opacity',
              });
            },
          });
        }
      }

      // Pour chaque carte (sauf la dernière), créer une animation de scale et brightness
      cards.forEach((card, index) => {
        if (index === cards.length - 1) return; // Dernière carte ne s'anime pas

        const nextCard = cards[index + 1];
        if (!nextCard) return;

        // Initialiser l'état de la carte (sauf la première qui a déjà été initialisée)
        if (index !== 0) {
          gsap.set(card, {
            scale: 1,
            opacity: 1,
            willChange: 'transform, opacity',
          });
        }

        // Créer un ScrollTrigger pour cette carte avec animation fluide
        ScrollTrigger.create({
          trigger: nextCard,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1.5, // Scrub plus fluide avec légère inertie
          onUpdate: (self) => {
            const progress = self.progress;
            // Easing personnalisé pour une transition plus douce
            const easedProgress = gsap.utils.clamp(0, 1, progress);
            
            // Scale de 1 à 0.9 avec easing
            const scale = gsap.utils.interpolate(1, 0.9, easedProgress);
            // Opacity de 1 à 0.5 avec easing
            const opacity = gsap.utils.interpolate(1, 0.5, easedProgress);
            // Légère translation Y pour plus de profondeur
            const y = gsap.utils.interpolate(0, 20, easedProgress);

            gsap.set(card, {
              scale,
              opacity,
              y,
              force3D: true, // Activation de l'accélération GPU
            });
          },
          onLeave: () => {
            // Verrouiller l'état final avec transition douce
            gsap.to(card, {
              scale: 0.9,
              opacity: 0.5,
              y: 20,
              duration: 0.3,
              ease: 'power2.out',
              willChange: 'auto',
            });
          },
          onEnterBack: () => {
            // Réactiver l'optimisation avec transition douce
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out',
              willChange: 'transform, opacity',
            });
          },
        });
      });

      ScrollTrigger.refresh();
    }, container);

    ctxRef.current = ctx;

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [mounted]);

  // Early return si pas monté
  if (!mounted) {
    return null;
  }

  // Calculer la hauteur totale du conteneur (chaque carte = 100vh)
  const totalHeight = parallaxProjects.length * 100;

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{
        height: `${totalHeight}vh`,
        backgroundColor: '#FDFCF0',
      }}
    >
      {parallaxProjects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => {
            wrapperRefs.current[index] = el;
          }}
          className="sticky flex items-center justify-center"
          style={{
            top: `${20 + index * 20}px`,
            height: '100vh',
            zIndex: index,
          }}
        >
          {/* Carte avec style Larose - Structure 1:1 */}
          <div
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="w-[90vw] max-w-[1200px] h-[75vh] rounded-[40px] shadow-xl flex flex-col overflow-hidden"
            style={{
              background: project.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            {/* Titre centré en haut */}
            <div className="flex justify-center items-center pt-8 pb-6">
              <h2
                className="text-3xl md:text-4xl font-bold text-center"
                style={{
                  color: '#1a1a1a',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {project.title}
              </h2>
            </div>

            {/* Conteneur de contenu (Bas) - Flex Row */}
            <div className="flex-1 flex flex-row px-8 pb-8 gap-8">
              {/* Section Gauche - Texte (45%) */}
              <div className="w-[45%] flex flex-col">
                {/* Description centrée */}
                <div className="flex-1 flex items-center justify-center">
                  <p
                    className="text-lg leading-relaxed whitespace-pre-line text-center"
                    style={{
                      color: 'rgba(0, 0, 0, 0.8)',
                      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Lien See more en bas centré */}
                <div className="mt-6 flex flex-col gap-3 items-center">
                  {project.id === '1' ? (
                    // Lien spécial pour "A propos de moi" vers la page /about
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 text-base font-medium text-[#1a1a1a] relative group"
                      style={{
                        textDecoration: 'none',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      <span className="relative">
                        En savoir plus
                        <span
                          className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a1a1a] transition-all duration-300 group-hover:w-full"
                        />
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ) : project.link ? (
                    <>
                      {typeof project.link === 'string' ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-base font-medium text-[#1a1a1a] relative group"
                          style={{
                            textDecoration: 'none',
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                          }}
                        >
                          <span className="relative">
                            See more
                            <span
                              className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a1a1a] transition-all duration-300 group-hover:w-full"
                            />
                          </span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </a>
                      ) : (
                        project.link.map((linkItem, index) => (
                          <a
                            key={index}
                            href={linkItem.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-base font-medium text-[#1a1a1a] relative group"
                            style={{
                              textDecoration: 'none',
                              fontFamily: 'system-ui, -apple-system, sans-serif',
                            }}
                          >
                            <span className="relative">
                              {linkItem.label}
                              <span
                                className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#1a1a1a] transition-all duration-300 group-hover:w-full"
                              />
                            </span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </a>
                        ))
                      )}
                    </>
                  ) : null}
                </div>
              </div>

              {/* Section Droite - Image (55%) */}
              <div className="w-[55%] flex items-center justify-center p-4">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="rounded-3xl"
                    style={{
                      objectFit: 'cover',
                      objectPosition: project.id === '5' ? '25% center' : 'center 20%',
                    }}
                    sizes="(max-width: 768px) 100vw, 55vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
