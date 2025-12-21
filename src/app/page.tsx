'use client';

import React from 'react';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { HeroSection } from '@/components/organisms/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream" style={{ backgroundColor: '#FDFCF0' }}>
      {/* Hero Section avec effet Portal - Pin & Zoom */}
      <HeroSection />

      {/* Section des projets - Scroll snapping activé */}
      <section aria-label="Section des projets">
        <ProjectGrid />
      </section>
    </main>
  );
}

