'use client';

import React from 'react';
import { ProjectParallax } from '@/components/organisms/ProjectParallax';
import { HeroSection } from '@/components/organisms/HeroSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream" style={{ backgroundColor: '#FDFCF0' }}>
      {/* Hero Section avec effet Portal - Pin & Zoom */}
      <HeroSection />

      {/* Section des projets - Stacking Parallax Effect */}
      <ProjectParallax />
    </main>
  );
}

