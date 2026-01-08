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
            Étudiant en 1ère année Business Data & IA à Eugenia School Paris, âgé de 19 ans, je construis un profil hybride entre data, développement web et business. J'ai grandi à Annecy, en Haute-Savoie, et j'ai déménagé à Paris en septembre 2025 pour suivre ce cursus orienté Data, IA et stratégie d'entreprise.
          </p>
        </>
      ),
    },
    {
      title: 'Compétences techniques',
      content: (
        <>
          <p className="mb-4">
            Je maîtrise les outils data comme <strong>Google Sheets</strong>, <strong>Looker Studio</strong> et <strong>SQL</strong>, avec notamment un projet d'analyse géographique de l'accidentologie routière en France où j'ai mis en évidence un écart de 5,7 fois entre la métropole et l'outre-mer.
          </p>
          <p className="mb-4">
            Côté développement, je crée des landing pages et portfolios modernes avec <strong>Next.js</strong>, <strong>Tailwind</strong> et <strong>Cursor</strong>, en m'imposant régulièrement des contraintes de temps (par exemple réaliser une landing page complète en moins de 5 heures ou en une journée).
          </p>
        </>
      ),
    },
    {
      title: 'Projets & expériences',
      content: (
        <>
          <p className="mb-4">
            J'ai travaillé sur une application type Instagram pour mon école, permettant aux étudiants de publier leurs projets et de valoriser leurs compétences, ce qui m'a confronté à des problématiques concrètes comme l'authentification, la réinitialisation de mot de passe et l'expérience utilisateur.
          </p>
          <p>
            En parallèle, je mène un défi personnel de création d'un projet par semaine, souvent partagé sur LinkedIn, pour progresser en continu et montrer ma capacité à livrer vite avec un bon niveau de qualité.
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

