'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';

function StaticHero() {
  return (
    <section data-static-hero className="bg-cream px-6 pb-12 pt-32 text-text-dark sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">Cochod Elevate · Clément Cochod</p>
        <h1 className="max-w-4xl text-[clamp(2.2rem,8vw,5rem)] font-semibold leading-[1.05] tracking-[-0.045em]">
          Sites web, applications et automatisations pour votre activité.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-light sm:text-lg">
          Je vous aide à créer votre site, simplifier vos tâches et transformer vos idées en outils utiles.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="inline-flex min-h-12 items-center justify-center rounded-full bg-text-dark px-6 py-3 text-sm font-semibold text-cream">Voir mes projets</Link>
          <a href="mailto:cochod.elevate@icloud.com" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand-dark px-6 py-3 text-sm font-semibold">Parlons de votre projet</a>
        </div>
      </div>
    </section>
  );
}

const AnimatedHero = dynamic(
  () => import('./AnimatedHeroSection').then((module) => module.HeroSection),
  { ssr: false, loading: StaticHero }
);

export function HeroSection({ backgroundVideo }: { backgroundVideo?: string }) {
  const desktopMotion = useDesktopMotion();
  if (!desktopMotion) return <StaticHero />;
  return (
    <>
      <h1 className="sr-only">Clément Cochod — Sites web, applications et automatisations</h1>
      <AnimatedHero backgroundVideo={backgroundVideo} />
    </>
  );
}
