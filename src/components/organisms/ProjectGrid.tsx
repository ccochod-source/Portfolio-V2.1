'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FullScreenProject } from '@/components/molecules/FullScreenProject';
import { EmptySlot } from '@/components/molecules/EmptySlot';
import { projects } from '@/data/projects';
import { useScrollSnap } from '@/hooks/useScrollSnap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EMPTY_SLOTS_COUNT = 6;

export const ProjectGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  // Calculer le nombre total d'items (projets + hero = index 0)
  // Les projets commencent à l'index 1 (après le Hero)
  const totalItems = Math.max(projects.length, EMPTY_SLOTS_COUNT);
  const emptySlotsNeeded = totalItems - projects.length;

  // Animation d'entrée des projets : fondu depuis le bas
  useEffect(() => {
    if (!containerRef.current || !gridRef.current || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const grid = gridRef.current;

    // Initialiser la position : en bas et invisible
    gsap.set(grid, {
      y: 100,
      opacity: 0,
      willChange: 'transform, opacity',
    });

    // Créer l'animation avec ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger,
    });

    tl.to(grid, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });

    return () => {
      if (scrollTrigger) scrollTrigger.kill();
      gsap.set(grid, { willChange: 'auto' });
    };
  }, []);

  // Activer le scroll snapping : un projet par scroll
  // Note: l'index 0 correspond au Hero, les projets commencent à l'index 1
  useScrollSnap({
    containerRef,
    itemCount: totalItems + 1, // +1 pour le Hero
    onIndexChange: (_index) => {
      // Optionnel : log pour debug
      // console.log('Current index:', _index);
    },
  });

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        ref={gridRef}
        className="relative w-full"
        style={{
          transform: 'translateY(100px)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      >
      {/* Projets existants en plein écran */}
      {projects.map((project, index) => (
        <FullScreenProject
          key={project.id}
          project={project}
          index={index}
        />
      ))}

      {/* Empty Slots si nécessaire */}
      {emptySlotsNeeded > 0 &&
        Array.from({ length: emptySlotsNeeded }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="relative w-full h-screen flex items-center justify-center bg-cream"
            style={{ backgroundColor: '#FDFCF0' }}
          >
            <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-5xl">
              <EmptySlot index={projects.length + index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
