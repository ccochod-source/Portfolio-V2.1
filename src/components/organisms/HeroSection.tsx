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

    const scrollDuration = 3000;
    const finalScale = 800; // Zoom ultra-violent x800 pour traverser la ligne laser de 1.2px

    const ctx = gsap.context(() => {
      // ANTI-FLASH : Rendre visible
      gsap.set(container, {
        visibility: 'visible',
      });

      // Initialiser le groupe du masque avec transform-origin au centre (50% 50%)
     gsap.set(maskGroup, {
  scale: 1,
  // 50 50 correspond au centre exact de ton viewBox="0 0 100 100"
  svgOrigin: "50 50", 
  willChange: 'transform',
});

      // Vidéo de fond : visible dès le départ (elle est visible à travers les trous du masque)
      gsap.set(bgVideo, {
        opacity: 1,
        scale: 1,
        willChange: 'transform, opacity',
      });

      // ScrollTrigger
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: `+=${scrollDuration}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        markers: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!self || typeof self.progress !== 'number') return;
          const progress = self.progress;

          // Zoom massif sur le groupe du masque (centré sur la barre à 50% 50%)
          const scale = 1 + progress * (finalScale - 1);
          gsap.set(maskGroup, { scale });

          // Faire apparaître la vidéo progressivement pendant le zoom
          // Commencer à partir de 20% du scroll, complète à 80%
          const bgOpacity = progress < 0.2 ? 1 : Math.min(1 + (progress - 0.2) / 0.6, 1);
          gsap.set(bgVideo, {
            opacity: bgOpacity,
            scale: 1 + progress * 0.2, // Légèrement zoomer pour remplir l'écran
          });
        },
        onLeave: () => {
          // Quand on quitte la section, vidéo pleine écran
          gsap.set(bgVideo, {
            opacity: 1,
            scale: 1.2,
            willChange: 'auto',
          });
          gsap.set(maskGroup, { 
            willChange: 'auto' 
          });
        },
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
        style={{
          zIndex: 10,
          pointerEvents: 'none',
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="portalMask" maskUnits="userSpaceOnUse">
            {/* Fond blanc (visible) */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* Groupe noir (trous) */}
            <g ref={maskGroupRef} id="mask-group" fill="black">
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="alphabetic"
                fontSize="18"
                fontWeight="900"
                fontFamily="system-ui, sans-serif"
                letterSpacing="-0.05em"
              >
                COCHOD
              </text>
              {/* Ligne laser ultra-fine de 1.2px, centrée à 50% verticalement avec précision mathématique */}
              <rect
  x="25"      // Utilise des chiffres sans % pour plus de précision avec svgOrigin
  y="50"      // Pile au milieu
  width="50"
  height="1.2"
  fill="black"
  transform="translate(0, -0.6)" // Décale de la moitié de la hauteur pour un centrage parfait
/>
              <text
                x="50%"
                y="53%"
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
          <div
            className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2"
            style={{ borderColor: '#3A3A3A' }}
          >
            <div
              className="w-1 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: '#3A3A3A',
                animation: 'bounce 2s infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(12px);
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};
