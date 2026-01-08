'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '@/lib/animations';

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <motion.header
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      className="w-full py-8 md:py-12 px-6 md:px-8 backdrop-blur-sm bg-cream/80"
    >
      <nav className="flex items-center justify-center max-w-7xl mx-auto">
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-6"
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
          <Link
            href="/projects"
            className={`text-base font-medium transition-colors duration-300 ${
              pathname === '/projects'
                ? 'text-accent-dark'
                : 'text-text hover:text-accent-dark'
            }`}
          >
            Projets
          </Link>
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

