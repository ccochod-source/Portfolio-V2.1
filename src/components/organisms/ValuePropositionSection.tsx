'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const audiences = [
  {
    number: '01',
    eyebrow: 'Entreprise ou équipe',
    title: 'Vous aider à travailler plus simplement.',
    description:
      'Je transforme des fichiers dispersés, des informations difficiles à retrouver et des tâches répétitives en outils clairs. Votre équipe gagne du temps et sait enfin où trouver la bonne information.',
    result: 'Exemple : cinq outils métiers livrés en huit semaines pour la Brasserie de Tahiti.',
    links: [
      { href: '/projects/brasserie-de-tahiti', label: 'Brasserie de Tahiti' },
      { href: '/projects/ping-pang', label: 'Ping Pang' },
    ],
  },
  {
    number: '02',
    eyebrow: 'Indépendant ou petite structure',
    title: 'Créer un outil qui vous fait vraiment gagner du temps.',
    description:
      'Je peux construire votre site ou votre application, organiser son espace de gestion et automatiser les petites actions qui reviennent chaque semaine. Vous restez autonome une fois le projet livré.',
    result: 'Exemple : un site administrable et des relances automatiques après rendez-vous pour Auralife.',
    links: [
      { href: '/projects/auralife', label: 'Auralife' },
      { href: '/projects/ecrire-son-livre', label: 'Écrire son livre' },
    ],
  },
  {
    number: '03',
    eyebrow: 'Porteur de projet',
    title: 'Tester une idée avant d’y investir trop de temps.',
    description:
      'Je vous aide à clarifier le besoin, parler aux futurs utilisateurs et construire une première version utile. Le but est de vérifier ce qui fonctionne avant de financer une solution complète.',
    result: 'Exemple : huit entretiens et quatre hypothèses testées avant le développement d’AR Plate.',
    links: [
      { href: '/projects/ar-plate', label: 'AR Plate' },
      { href: '/projects/bizroast', label: 'Bizroast' },
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const ValuePropositionSection: React.FC = () => {
  return (
    <section className="bg-cream px-6 py-24 text-text-dark md:px-8 md:py-36" aria-labelledby="value-title">
      <div className="mx-auto max-w-7xl">
        <motion.header data-mobile-static
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-8 border-y border-black/15 py-10 md:grid-cols-[0.72fr_1.28fr] md:gap-16 md:py-16"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">
              Ce que je peux vous apporter
            </p>
          </div>
          <div>
            <h2
              id="value-title"
              className="max-w-4xl text-[clamp(2.6rem,6.4vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.06em]"
            >
              Transformer un problème concret en solution utile.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-text-light md:text-xl">
              Vous avez trop de fichiers, une tâche qui prend du temps ou une idée difficile à concrétiser ? Je peux comprendre le besoin, construire la solution et la rendre simple à utiliser.
            </p>
          </div>
        </motion.header>

        <div>
          {audiences.map((audience) => (
            <motion.article data-mobile-static
              key={audience.number}
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              className="grid gap-6 border-b border-black/15 py-10 md:grid-cols-[0.18fr_0.54fr_1.05fr] md:gap-10 md:py-14"
            >
              <p className="font-mono text-sm text-text-light">{audience.number}</p>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
                  {audience.eyebrow}
                </p>
                <h3 className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-[-0.035em] md:text-3xl">
                  {audience.title}
                </h3>
              </div>
              <div className="md:pl-4">
                <p className="max-w-2xl text-base leading-relaxed text-text md:text-lg">
                  {audience.description}
                </p>
                <p className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-text-dark/80">
                  {audience.result}
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  {audience.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-accent-dark transition-colors hover:text-accent"
                    >
                      <span>Voir {link.label}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div data-mobile-static
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-8 pt-12 md:grid-cols-[0.72fr_1.28fr] md:gap-16 md:pt-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-dark">Ma façon de travailler</p>
          <div>
            <p className="max-w-4xl text-2xl font-medium leading-snug tracking-[-0.03em] md:text-4xl">
              Comprendre le besoin <span className="text-accent">→</span> simplifier <span className="text-accent">→</span> construire <span className="text-accent">→</span> tester avec les utilisateurs <span className="text-accent">→</span> vous rendre autonome.
            </p>
            <Link
              href="/projects"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-text-dark px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-accent-dark"
            >
              Découvrir tous les projets
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
