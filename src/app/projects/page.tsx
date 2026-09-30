'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDesktopMotion } from '@/hooks/useDesktopMotion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { allProjects } from '@/data/allProjects';
import type { ProjectCategory } from '@/data/parallaxProjects';
import { PresentationAwareLink } from '@/components/atoms/PresentationAwareLink';
import { MiraklProjectLink } from '@/components/molecules/MiraklProjectLink';

const projects = allProjects.filter(project => project.id !== '1');
const filters: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' }, { value: 'sites', label: 'Sites' },
  { value: 'applications', label: 'Applications' }, { value: 'automatisations', label: 'Automatisations' },
  { value: 'data-etudes', label: 'Data et études' },
];

function ProjectDeckCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopMotion = useDesktopMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0.96, 1, 1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [72, 0, 0, -28]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.35, 1, 1, 0.58]);
  const demoLinks = (Array.isArray(project.link) ? project.link : [])
    .filter(link => /démo|dashboard|visiter|voir le site/i.test(link.label)).slice(0, 1);

  return <motion.article ref={sectionRef} id={`project-${project.id}`}
    style={{ backgroundColor: project.color || '#F5E6D3', opacity: desktopMotion ? opacity : 1, scale: desktopMotion ? scale : 1, y: desktopMotion ? y : 0, zIndex: index + 1 }}
    className="project-deck-card sticky top-6 mb-[18svh] grid h-[min(84svh,820px)] min-h-[500px] w-full scroll-mt-6 origin-top overflow-hidden rounded-[1.75rem] border border-black/10 shadow-[0_24px_70px_rgba(40,34,26,0.16)] last:mb-0 lg:grid-cols-[1.35fr_0.85fr] lg:rounded-[2.5rem]">
    <div className="relative min-h-0 overflow-hidden bg-black/5">
      <Image src={project.imageSrc} alt={project.title} fill priority={index === 0}
        className="object-contain p-3 md:p-6" style={{ objectPosition: project.imagePosition || 'center center' }}
        sizes="(max-width: 1023px) calc(100vw - 48px), (max-width: 1280px) 58vw, 746px" />
    </div>
    <div className="flex min-h-0 flex-col p-5 lg:px-10 lg:py-9">
      <div className="flex items-start justify-between gap-4 border-b border-black/15 pb-3">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-text-light lg:text-xs">{project.category || 'Projet numérique'}</p>
        <p className="shrink-0 font-mono text-xs text-text-light">{String(index + 1).padStart(2, '0')} / {total}</p>
      </div>
      <div className="flex flex-1 flex-col justify-center py-4 lg:py-7">
        <h2 className="text-[clamp(1.4rem,3.2vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-text-dark">{project.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-text lg:mt-6 lg:line-clamp-5 lg:text-base">{project.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/15 pt-3 text-sm">
        {project.slug === 'hackathon-mirakl'
          ? <MiraklProjectLink className="inline-flex min-h-11 items-center font-semibold text-text-dark" />
          : <Link href={`/projects/${project.slug}`} className="inline-flex min-h-11 items-center font-semibold text-text-dark">Voir la fiche →</Link>}
        {demoLinks.map(link => <PresentationAwareLink key={link.url} href={link.url} className="relative z-[2] inline-flex min-h-11 items-center text-text-dark underline underline-offset-4">{link.label} ↗</PresentationAwareLink>)}
      </div>
    </div>
  </motion.article>;
}

export default function ProjectsPage() {
  const [category, setCategory] = useState<ProjectCategory | 'all'>('all');
  const visibleProjects = projects.filter(project => category === 'all' || project.categories?.includes(category));
  return <div className="min-h-screen bg-cream">
    <Header />
    <main id="main-content" tabIndex={-1}>
      <section className="mx-auto max-w-7xl px-6 pb-6 pt-6 md:px-8 lg:pb-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-text-light">Réalisations · {projects.length} projets</p>
        <h1 className="text-[clamp(2.75rem,9vw,8rem)] font-semibold leading-none tracking-[-0.06em] text-text-dark">Mes projets</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-light">Sites internet, outils métiers et automatisations : trouvez une réalisation proche de votre besoin.</p>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-8" aria-label="Choisir un projet">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets">
          {filters.map(filter => <button key={filter.value} type="button" aria-pressed={category === filter.value}
            aria-controls="projects-results" onClick={() => setCategory(filter.value)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${category === filter.value ? 'border-text-dark bg-text-dark text-cream' : 'border-sand-dark bg-cream text-text-dark hover:bg-sand-light'}`}>{filter.label}</button>)}
        </div>
        <p role="status" className="mt-4 text-sm text-text-light">{visibleProjects.length} projet{visibleProjects.length > 1 ? 's' : ''}</p>
        <details className="mt-4 rounded-2xl border border-sand p-4">
          <summary className="cursor-pointer font-semibold">Accès rapide aux fiches</summary>
          <nav aria-label="Index des projets" className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map(project => <Link key={project.id} href={`/projects/${project.slug}`} className="py-2 text-sm underline underline-offset-4">{project.title}</Link>)}
          </nav>
        </details>
      </section>
      <section id="projects-results" aria-label="Projets" className="mx-auto w-full max-w-7xl scroll-mt-4 px-3 sm:px-6 md:px-8">
        {visibleProjects.map((project, index) => <ProjectDeckCard key={project.id} project={project} index={index} total={visibleProjects.length} />)}
      </section>
      <div className="py-12 text-center"><Link href="/" className="inline-flex rounded-full bg-accent px-7 py-3 font-medium text-text-dark hover:bg-sand">Retour à l’accueil</Link></div>
    </main>
    <Footer />
  </div>;
}
