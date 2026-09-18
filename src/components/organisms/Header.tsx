'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.header data-mobile-static
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="w-full bg-cream/80 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-8 md:px-8 md:py-12"
    >
      <nav aria-label="Navigation principale" className="flex items-center justify-center max-w-7xl mx-auto">
        <motion.div data-mobile-static
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-6 [&>a]:inline-flex [&>a]:min-h-11 [&>a]:items-center [&>a]:text-sm sm:[&>a]:text-base"
        >
          <Link
            href="/"
            className={`text-base font-medium transition-colors duration-300 ${
              pathname === '/'
                ? 'text-accent-dark'
                : 'text-text hover:text-accent-dark'
            }`}
          >
            Accueil
          </Link>
          <details className="relative" onKeyDown={(event) => { if (event.key === 'Escape') event.currentTarget.open = false; }}>
            <summary className={`flex min-h-11 cursor-pointer list-none items-center text-sm font-medium sm:text-base ${pathname?.startsWith('/services') ? 'text-accent-dark' : 'text-text'}`}>Services <span aria-hidden="true" className="ml-1 text-xs">⌄</span></summary>
            <ul className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 rounded-2xl border border-sand bg-cream p-2 shadow-lg">
              {[
                ['creation-site-internet', 'Sites internet'],
                ['automatisation', 'Automatisations & IA'],
                ['application-sur-mesure', 'Applications sur mesure'],
              ].map(([slug, label]) => <li key={slug}><Link href={`/services/${slug}`} onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')} className="block rounded-xl px-3 py-3 text-sm font-medium hover:bg-sand-light">{label}</Link></li>)}
            </ul>
          </details>
          <Link
            href="/projects"
            className={`text-base font-medium transition-colors duration-300 ${
              pathname?.startsWith('/projects') || pathname?.startsWith('/presentations')
                ? 'text-accent-dark'
                : 'text-text hover:text-accent-dark'
            }`}
          >
            Projets
          </Link>
          <Link href="/#guides" className={`font-medium transition-colors ${pathname?.startsWith('/guides') ? 'text-accent-dark' : 'text-text hover:text-accent-dark'}`}>Guides</Link>
          <Link
            href="/about"
            className={`text-base font-medium transition-colors duration-300 ${
              pathname === '/about'
                ? 'text-accent-dark'
                : 'text-text hover:text-accent-dark'
            }`}
          >
            À propos
          </Link>
        </motion.div>
      </nav>
    </motion.header>
  );
};
