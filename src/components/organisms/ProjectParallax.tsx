'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Interface pour les projets avec couleurs
interface ParallaxProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string; // Image obligatoire
  color?: string; // Couleur ou dégradé CSS
  videoUrl?: string;
  link?: string | Array<{ url: string; label: string }>; // Lien optionnel pour le CTA "See more" (string pour un seul lien, array pour plusieurs)
}

// Données de démonstration
const parallaxProjects: ParallaxProject[] = [
  {
    id: '1',
    title: 'A propos de moi',
    description: 'Clément Cochod étudiant Business Data & IA à Eugenia School.\n\nSportif de haut niveau dans l\'âme, je transpose la culture du résultat à la Data. Je combine maîtrise technique (Code/No-code) et stratégie business pour transformer la donnée en levier de croissance. Mon objectif : décoder la complexité pour piloter des décisions innovantes et performantes.',
    imageSrc: '/6356FA63-E8D4-4C94-88E1-8C21E48ECC70_1_201_a.jpeg',
    color: '#FFE5D9',
  },
  {
    id: '2',
    title: 'Beitea',
    description: 'Stratégie marketing pour BEITEA, café bubble tea sur les Champs-Élysées. Objectif : améliorer la fidélisation client et augmenter le panier moyen. Solutions proposées : boisson "mystère" pour l\'engagement social (MOFU) et système de gamification avec tickets à gratter pour inciter à dépenser +10€ (TOFU). Méthodologie basée sur l\'A/B testing et l\'analyse de données comportementales.',
    imageSrc: '/beitea-capture.png',
    color: '#A8D5BA',
    link: 'https://www.canva.com/design/DAG5tvEoqWE/vCj2i68G_c07lT6Llm6ESQ/edit?utm_content=DAG5tvEoqWE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  },
  {
    id: '3',
    title: 'Analyse Northwind',
    description: 'Analyse approfondie de la base de données Northwind (commerce de produits alimentaires). Modélisation des données, création d\'un dashboard Looker Studio et analyse multidimensionnelle des performances commerciales par produit, région et période. Identification des clients les plus rentables, des tendances temporelles et des opportunités d\'optimisation',
    imageSrc: '/northwind-dashboard.png',
    color: '#B8D4E3',
    link: 'https://docs.google.com/document/d/1PO4XfCnuDaMTMx0oBu71ZigprCCQ9w62BLSsGclEISw/edit?usp=sharing',
  },
  {
    id: '4',
    title: 'Neogen-IA',
    description: 'NeogenIA, agence de contenu alimentée par l\'IA pour Eugénia. Objectif : créer du contenu clair et cohérent en combinant l\'efficacité de l\'IA avec un contrôle humain sur la qualité. Méthodologie : analyse du tone of voice, ingénierie de prompts optimisés, création de contenu et développement d\'assets visuels. Équipe structurée (CEO/COO, CTO, CMO, CDO) pour livrer un package professionnel et homogène.',
    imageSrc: '/neogen-ia.png',
    color: '#D4C4B0',
    link: [
      { url: 'https://www.canva.com/design/DAG5hMHPxik/OT_jscfoh5PY4F3Qui9Wyg/edit?utm_content=DAG5hMHPxik&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', label: 'Voir le design' },
      { url: 'https://docs.google.com/document/d/1_KGaPBq7ZWT0HHp-KQN2BUU2I6FmuuUMpwAU4LoNGhY/edit?usp=sharing', label: 'Voir le document' },
    ],
  },
  {
    id: '5',
    title: 'Analyse Accidentologie',
    description: 'Analyse géographique et territoriale de l\'accidentologie routière en France basée sur les données BAAC 2024. Identification des zones à risques, analyse des facteurs explicatifs (densité, urbanisation, topographie) et comparaison entre métropole et outre-mer. Découverte principale : l\'outre-mer présente un taux de tués 5.7x plus élevé que la métropole.',
    imageSrc: '/accidentologie.png',
    color: '#F5E6D3',
    link: [
      { url: 'https://www.canva.com/design/DAG4h3loszs/Wkr_gkWxS7c56OftfluiFQ/edit?utm_content=DAG4h3loszs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', label: 'Voir la présentation' },
      { url: 'https://docs.google.com/spreadsheets/d/1JZKTVJMfaLkBYb8Slpvts0pnSDhyRS8baDxn33wMP68/edit?usp=sharing', label: 'Voir les données' },
    ],
  },
];

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
                  {project.id !== '1' && project.link && (
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
                  )}
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
