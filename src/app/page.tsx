'use client';

import React from 'react';
import { Header } from '@/components/organisms/Header';
import { ProjectParallax } from '@/components/organisms/ProjectParallax';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream" style={{ backgroundColor: '#FDFCF0' }}>
      {/* Header avec z-index élevé pour être visible au-dessus du Hero */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Section avec effet Portal - Pin & Zoom */}
      <HeroSection />

      {/* Section des projets - Stacking Parallax Effect */}
      <ProjectParallax />

      {/* Section de contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

