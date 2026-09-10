'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Header } from '@/components/organisms/Header';
import { Footer } from '@/components/organisms/Footer';
import { Text } from '@/components/atoms/Text';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function AboutPage() {
  const sections = [
    {
      title: 'Parcours académique',
      content: (
        <>
          <p className="mb-4">
            Étudiant en Bachelor Business, Data & IA à Eugenia School Paris, je construis un profil hybride entre développement, data et compréhension métier. J'ai grandi à Annecy, en Haute-Savoie, avant de rejoindre Paris pour suivre ce cursus orienté IA et stratégie d'entreprise.
          </p>
        </>
      ),
    },
    {
      title: 'Compétences techniques',
      content: (
        <>
          <p className="mb-4">
            Je conçois des applications web et des outils internes avec <strong>Next.js</strong>, <strong>Supabase</strong>, <strong>SQL</strong> et des API d'IA. Je travaille aussi sur la modélisation de données, les tableaux de bord et l'automatisation de processus métier.
          </p>
          <p className="mb-4">
            Mon approche part du besoin réel : comprendre les utilisateurs, structurer l'information, prototyper rapidement, tester, corriger puis livrer une solution claire. J'utilise l'IA comme un outil de production et d'analyse, jamais comme un remplacement du jugement métier.
          </p>
        </>
      ),
    },
    {
      title: 'Projets & expériences',
      content: (
        <>
          <p className="mb-4">
            Lors d'un stage de huit semaines à la <strong>Brasserie de Tahiti</strong>, j'ai livré cinq applications métiers : BI et recherche documentaire, gestion des investissements, suivi de flotte, sécurité terrain et pilotage des coûts informatiques. Ce travail m'a amené à gérer des données historiques, des droits utilisateurs, des exports, des contrôles et des tests avec les équipes.
          </p>
          <p>
            Je développe aussi des projets clients comme <strong>Auralife</strong>, un site administrable avec automatisations, et une application privée d'aide à l'écriture par la voix. D'autres projets, comme <strong>Ping Pang</strong> et <strong>Eugeniagram</strong>, m'ont permis d'approfondir l'architecture Supabase, les algorithmes de classement et les fonctionnalités sociales.
          </p>
        </>
      ),
    },
    {
      title: 'Sport & valeurs',
      content: (
        <>
          <p className="mb-4">
            Je viens d'un environnement très sportif. J'ai pratiqué le rugby, le handball, le football, le tennis et le VTT, mais je me suis surtout passionné pour la randonnée, la musculation, la course à pied et le trail, des sports qui renforcent mon goût de l'effort et du dépassement de soi.
          </p>
          <p>
            Cette discipline sportive se retrouve dans ma façon de travailler : j'avance par objectifs clairs, j'accepte l'itération et je cherche constamment à optimiser ce que je fais, que ce soit un tableau de bord data ou une interface web.
          </p>
        </>
      ),
    },
    {
      title: 'Vision & ambitions',
      content: (
        <>
          <p className="mb-4">
            À moyen et long terme, je me vois soit créer ma propre entreprise, soit évoluer dans une startup pour devenir un profil multitâche capable de toucher à la data, au produit, au growth et au business.
          </p>
          <p>
            Mon objectif est de construire progressivement une liberté financière grâce à l'investissement, pour pouvoir voyager dans un maximum de pays, comprendre des cultures différentes et en tirer le meilleur pour ma vision personnelle et professionnelle.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInUp} className="text-center space-y-4">
            <Text variant="h1" className="text-accent-dark">
              À propos de moi
            </Text>
            <Text variant="body" className="text-text-light max-w-2xl mx-auto">
              Découvrez mon parcours, mes compétences et ma vision
            </Text>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                variants={fadeInUp}
                className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-sand/50 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <Text variant="h3" className="text-accent-dark mb-4">
                  {section.title}
                </Text>
                <div className="text-text leading-relaxed">
                  {section.content}
                </div>
              </motion.section>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            variants={fadeInUp}
            className="text-center pt-8"
          >
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors duration-300 font-medium"
            >
              Retour aux projets
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
