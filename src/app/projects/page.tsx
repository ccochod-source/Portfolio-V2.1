'use client';

import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { allProjects } from '@/data/allProjects';
import { getFlatProjectLinks } from '@/lib/projectResources';
import { PresentationAwareLink } from '@/components/atoms/PresentationAwareLink';

const projects = allProjects.filter((project) => project.id !== '1');

type Project = (typeof projects)[number];

interface ProjectDeckCardProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectDeckCard({ project, index, total }: ProjectDeckCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.96, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [72, 0, 0, -28]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.58]);
  const externalLinks = getFlatProjectLinks(project).slice(0, 2);
  const useContainedImage = project.id === '5' || project.id === '7';

  return (
    <motion.article
      ref={sectionRef}
      id={`project-${project.id}`}
      style={{
        backgroundColor: project.color || '#F5E6D3',
        opacity: prefersReducedMotion ? 1 : opacity,
        scale: prefersReducedMotion ? 1 : scale,
        y: prefersReducedMotion ? 0 : y,
        zIndex: index + 1,
      }}
      className="sticky top-4 mb-[18svh] grid h-[calc(100svh-2rem)] min-h-[560px] max-h-[820px] w-full scroll-mt-4 origin-top overflow-hidden rounded-[1.75rem] border border-black/10 shadow-[0_24px_70px_rgba(40,34,26,0.16)] last:mb-0 md:top-6 md:h-[min(84svh,820px)] md:min-h-[500px] md:grid-cols-[1.35fr_0.85fr] md:scroll-mt-6 md:rounded-[2.5rem]"
    >
        <div
          className={`group relative min-h-0 overflow-hidden bg-black/5 ${
            useContainedImage ? 'p-5 md:p-8' : ''
          }`}
        >
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            priority={index === 0}
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.025] ${
              useContainedImage ? 'object-contain' : 'object-cover'
            }`}
            style={{ objectPosition: project.imagePosition || 'center center' }}
            sizes="(max-width: 768px) 100vw, 62vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />
        </div>

        <div className="flex min-h-0 flex-col px-6 py-6 sm:px-8 md:px-10 md:py-9 lg:px-12 lg:py-11">
          <div className="flex items-start justify-between gap-5 border-b border-black/15 pb-4">
            <p className="max-w-[75%] text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-text-light md:text-xs">
              {project.category || 'Projet numérique'}
            </p>
            <p className="shrink-0 font-mono text-xs tabular-nums text-text-light md:text-sm">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-center py-5 md:py-7">
            <h2 className="text-[clamp(2.1rem,4.6vw,4.75rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-text-dark">
              {project.title}
            </h2>
            <p className="mt-4 line-clamp-4 max-w-xl text-sm leading-relaxed text-text md:mt-6 md:text-base lg:text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/15 pt-4 text-sm">
            {project.slug ? (
              <Link
                href={`/projects/${project.slug}`}
                className="group/link inline-flex items-center gap-2 font-semibold text-accent-dark transition-colors hover:text-accent"
              >
                <span>Voir la fiche</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
              </Link>
            ) : null}
            {externalLinks.map((linkItem, linkIndex) => (
              <PresentationAwareLink
                key={`${linkItem.url}-${linkIndex}`}
                href={linkItem.url}
                className="group/link inline-flex items-center gap-2 font-medium text-text-dark/75 transition-colors hover:text-accent-dark"
              >
                <span>{linkItem.label}</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-1">↗</span>
              </PresentationAwareLink>
            ))}
          </div>
        </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main>
        <section className="mx-auto flex min-h-[62svh] w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-8 md:px-8 md:pb-28">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
            Sélection · {projects.length} projets
          </p>
          <h1 className="max-w-5xl text-[clamp(3.75rem,11vw,9.5rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-text-dark">
            Mes projets
          </h1>
          <div className="mt-8 flex max-w-3xl flex-col gap-8 border-t border-black/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-text-light md:text-lg">
              Applications métiers, sites clients, data et produits numériques. Faites défiler : chaque projet prend la scène à son tour.
            </p>
            <a
              href="#project-tahiti"
              className="group inline-flex shrink-0 items-center gap-3 text-sm font-semibold text-text-dark"
            >
              Explorer
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>
          </div>
        </section>

        <section aria-label="Projets" className="mx-auto w-full max-w-7xl px-3 sm:px-6 md:px-8">
          {projects.map((project, index) => (
            <ProjectDeckCard
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </section>

        <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 md:px-8 md:pb-32 md:pt-20">
          <div className="mb-9 flex items-end justify-between gap-6 border-b border-black/15 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark">Accès rapide</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-text-dark md:text-5xl">
                Index des projets
              </h2>
            </div>
            <span className="font-mono text-sm text-text-light">01—{String(projects.length).padStart(2, '0')}</span>
          </div>

          <nav aria-label="Index des projets" className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <a
                key={project.id}
                href={`#project-${project.id}`}
                className="group flex items-center gap-4 border-b border-black/10 py-4 transition-colors hover:border-accent-dark"
              >
                <span className="font-mono text-xs text-text-light">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="flex-1 font-medium text-text-dark transition-transform duration-300 group-hover:translate-x-1">
                  {project.title}
                </span>
                <span className="text-text-light transition-transform duration-300 group-hover:-translate-y-0.5">↗</span>
              </a>
            ))}
          </nav>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 font-medium text-white transition-colors hover:bg-accent-dark"
            >
              Retour à l’accueil
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
