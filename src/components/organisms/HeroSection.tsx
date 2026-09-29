'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

function subscribeToHash(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}
const getHash = () => window.location.hash;
const getServerHash = () => '';

function HeroCopy({ animated }: { animated: boolean }) {
  return (
    <div className={animated ? 'absolute top-[max(9rem,calc(100svh_-_25rem))] left-8 z-20 w-[min(44rem,calc(100%_-_4rem))] rounded-3xl border border-sand bg-cream/95 p-6 text-text-dark shadow-sm' : 'bg-cream px-6 pb-12 pt-36 text-text-dark sm:px-8 sm:pt-40'}>
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">Cochod Elevate · Clément Cochod</p>
        <h1 className={animated ? 'text-[clamp(1.6rem,2.4vw,2.25rem)] font-semibold leading-tight tracking-tight' : 'max-w-4xl text-[clamp(2.2rem,7vw,4.75rem)] font-semibold leading-[1.08] tracking-tight'}>
          Un site pour présenter votre activité. Des outils pour simplifier votre travail.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-light sm:text-lg">
          Sites internet · Applications sur mesure · Automatisations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/#contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-text-dark px-6 py-3 text-sm font-semibold text-cream">Parlons de votre projet</a>
          <Link href="/projects" className="inline-flex min-h-12 items-center justify-center rounded-full border border-sand-dark px-6 py-3 text-sm font-semibold">Voir mes réalisations</Link>
        </div>
      </div>
    </div>
  );
}

const AnimatedHero = dynamic(
  () => import('./AnimatedHeroSection').then((module) => module.HeroSection),
  { ssr: false, loading: () => <div className="h-[100svh] bg-cream" /> }
);

export function HeroSection({ backgroundVideo }: { backgroundVideo?: string }) {
  const desktopMotion = useDesktopMotion();
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const showStaticHero = useCallback(() => setVideoUnavailable(true), []);
  const hash = useSyncExternalStore(subscribeToHash, getHash, getServerHash);
  useEffect(() => {
    if (!['#guides', '#services', '#contact'].includes(hash)) return;
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant' }));
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  const animated = desktopMotion && !videoUnavailable && !['#guides', '#services', '#contact'].includes(hash);
  return (
    <section className="relative bg-cream" data-static-hero={!animated || undefined}>
      {animated ? <AnimatedHero backgroundVideo={backgroundVideo} onUnavailable={showStaticHero} /> : null}
      <HeroCopy animated={animated} />
    </section>
  );
}
