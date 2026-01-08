'use client';

import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  backgroundVideo?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundVideo = '/IMG_0764.mp4',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [mounted, setMounted] = useState(false);

  // Rendu client pur - anti-flash
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialiser GSAP et ScrollTrigger
  useLayoutEffect(() => {
    // Ne pas initialiser si pas monté
    if (!mounted) {
      return;
    }
    if (
      !containerRef.current ||
      !backgroundVideoRef.current ||
      !maskGroupRef.current ||
      typeof window === 'undefined'
    ) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { visibility: 'visible' });
      return;
    }

    const container = containerRef.current;
    const bgVideo = backgroundVideoRef.current;
    const maskGroup = maskGroupRef.current;

    const scrollDuration = 1500;
    const finalScale = 800; // Zoom ultra-violent x800 pour traverser la ligne laser de 1.2px

    const ctx = gsap.context(() => {
      // ANTI-FLASH : Rendre visible
      gsap.set(container, {
        visibility: 'visible',
      });

      // Initialiser le groupe du masque avec transform-origin au centre exact (50% 50%)
      // Le rectangle fantôme force le groupe à faire exactement 100x100, donc 50% 50% = centre absolu
      gsap.set(maskGroup, {
        scale: 1,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      // Vidéo de fond : visible dès le départ (elle est visible à travers les trous du masque)
      gsap.set(bgVideo, {
        opacity: 1,
        scale: 1,
        willChange: 'transform, opacity',
      });

      // Créer une Timeline avec ScrollTrigger pour une animation fluide et réactive
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${scrollDuration}`,
          pin: true,
          pinSpacing: true,
          scrub: 2, // Fluidité maximale au descroll avec inertie soyeuse
          invalidateOnRefresh: true, // FIX : Recalcule tout au changement de taille de fenêtre
          anticipatePin: 1, // Évite les petits sauts visuels au début du pin
          onLeave: () => {
            // Nettoyage et verrouillage de la vidéo en plein écran à la fin
            gsap.set(bgVideo, {
              opacity: 1,
              scale: 1.2,
              willChange: 'auto',
            });
            gsap.set(maskGroup, { 
              willChange: 'auto' 
            });
          },
          onEnterBack: () => {
            // Réactive l'optimisation GPU quand on remonte (descroll)
            gsap.set(maskGroup, { willChange: 'transform' });
            gsap.set(bgVideo, { willChange: 'transform, opacity' });
          },
        },
      });

      // Animer le zoom du masque avec transformOrigin verrouillé au centre (50% 50%)
      // Le rectangle fantôme garantit que 50% 50% = centre absolu (50, 50)
      tl.to(maskGroup, {
        scale: finalScale,
        transformOrigin: '50% 50%',
        duration: 1,
        ease: 'none', // Interpolation linéaire pour suivre le scroll
      })
      .to(bgVideo, {
        scale: 1.2,
        duration: 1,
        ease: 'none',
      }, 0); // Démarre en même temps que le zoom du masque

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

  // Early return si pas monté (après tous les hooks)
  if (!mounted) {
    return <div className="bg-[#FDFCF0] w-screen h-screen" />;
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ 
        backgroundColor: '#FDFCF0',
        visibility: 'hidden',
      }}
    >
      {/* Vidéo de fond - position fixed, z-0 */}
      <video
        ref={backgroundVideoRef}
        className="fixed inset-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{
          zIndex: 0,
          opacity: 1,
        }}
      />

      {/* SVG masque inversé - position fixed, z-10 */}
      <svg
  className="fixed inset-0 w-full h-full"
  style={{ zIndex: 10, pointerEvents: 'none' }}
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid slice" // CHANGE CECI
>
        <defs>
          <mask id="portalMask" maskUnits="userSpaceOnUse">
            {/* Fond blanc (visible) */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* Groupe noir (trous) */}
            <g ref={maskGroupRef} id="mask-group" fill="black">
              {/* Rectangle fantôme pour forcer les dimensions 100x100 */}
              <rect width="100" height="100" fill="none" />
              <text
                x="50%"
                y="46"
                textAnchor="middle"
                dominantBaseline="alphabetic"
                fontSize="18"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                letterSpacing="-0.05em"
              >
                COCHOD
              </text>
             {/* LE RECTANGLE : Pile au milieu (50) */}
             <rect
  x="0"         // Commence au bord gauche
  y="50"        // Pile au milieu vertical
  width="100"   // Toute la largeur du viewBox
  height="1.2"
  transform="translate(0, -0.6)"
  fill="black"
/>
              <text
                x="50%"
                y="54"
                textAnchor="middle"
                dominantBaseline="hanging"
                fontSize="18"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                letterSpacing="-0.05em"
              >
                CLEMENT
              </text>
            </g>
          </mask>
        </defs>
        
        {/* Rectangle crème qui applique le masque */}
        <rect width="100%" height="100%" fill="#FDFCF0" mask="url(#portalMask)" />
      </svg>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium" style={{ color: '#3A3A3A' }}>
            Scroll
          </span>
          <div className="flex flex-col items-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce-arrow"
              style={{ color: '#3A3A3A' }}
            >
              <path
                d="M7 10L12 15L17 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-arrow {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.6;
          }
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
