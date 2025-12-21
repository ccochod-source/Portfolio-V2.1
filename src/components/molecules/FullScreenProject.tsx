'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FullScreenProjectProps {
  project: Project;
  index: number;
}

export const FullScreenProject: React.FC<FullScreenProjectProps> = ({
  project,
  index,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !contentRef.current || typeof window === 'undefined') return;

    // Respecter les préférences de réduction de mouvement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    // Animation d'entrée : parallaxe et fade-in
    gsap.set(image, {
      scale: 1.1,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    gsap.set(content, {
      y: 50,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 1,
      },
    });

    // Animation de l'image : parallaxe et zoom
    tl.to(
      image,
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      0
    );

    // Animation du contenu : fade-in et slide-up
    tl.to(
      content,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      0.2
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
      gsap.set(image, { willChange: 'auto' });
      gsap.set(content, { willChange: 'auto' });
    };
  }, [index]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-cream overflow-hidden"
      style={{ backgroundColor: '#FDFCF0' }}
    >
      {/* Image de fond avec parallaxe */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: 'scale(1.1)',
          willChange: 'transform',
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            quality={90}
            sizes="100vw"
            priority={index === 0}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-sand-light via-sand to-accent-light flex items-center justify-center">
            <svg
              className="w-32 h-32 text-text-light opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Overlay pour améliorer la lisibilité */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(253, 252, 240, 0.1) 0%, rgba(253, 252, 240, 0.8) 100%)',
          }}
        />
      </div>

      {/* Contenu du projet */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl text-center"
        style={{
          transform: 'translateY(50px)',
          willChange: 'transform',
        }}
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-dark mb-6">
          {project.title}
        </h2>
        <p className="text-xl md:text-2xl text-text-light mb-8 max-w-3xl mx-auto">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium bg-cream/90 backdrop-blur-sm text-text-dark rounded-full border border-sand-dark/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-accent text-cream font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-300"
          >
            Voir le projet
          </a>
        )}

        {project.year && (
          <p className="mt-8 text-text-light text-sm">{project.year}</p>
        )}
      </div>
    </div>
  );
};

