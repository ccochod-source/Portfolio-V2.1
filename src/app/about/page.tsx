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
          <p className="mb-5">
            Je relie le besoin métier à la réalisation technique&nbsp;: comprendre le processus, structurer les données, construire l’outil, le tester avec les utilisateurs et le rendre exploitable au quotidien. Chaque compétence ci-dessous est reliée à un projet concret du portfolio.
          </p>

          <div className="space-y-5">
            <div>
              <h4 className="text-base font-semibold text-text-dark mb-2 tracking-tight">
                Applications web &amp; outils métiers
              </h4>
              <p className="mb-3">
                Je conçois des interfaces responsives, des espaces d’administration, des formulaires dynamiques, des systèmes de rôles et des exports adaptés au travail réel des équipes. Cette compétence est visible dans les <Link href="/projects/brasserie-de-tahiti" className="font-semibold text-accent-dark hover:text-accent">cinq applications de la Brasserie de Tahiti</Link>, le site administrable <Link href="/projects/auralife" className="font-semibold text-accent-dark hover:text-accent">Auralife</Link> et l’application privée <Link href="/projects/ecrire-son-livre" className="font-semibold text-accent-dark hover:text-accent">Écrire son livre</Link>.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-text-dark mb-2 tracking-tight">
                Data, bases de données &amp; qualité
              </h4>
              <p className="mb-3">
                Je modélise les données, prépare les imports, nettoie les historiques et ajoute des contrôles pour éviter que l’interface repose sur une base fragile. À la Brasserie de Tahiti, cela a notamment concerné dix ans d’historique, 22&nbsp;000 entrées carburant et environ 400 anomalies détectées. Sur <Link href="/projects/ping-pang" className="font-semibold text-accent-dark hover:text-accent">Ping Pang</Link>, j’ai travaillé sur Supabase, les règles de sécurité, le rapprochement de données multi-sources et un moteur de classement Glicko-2 testé. L’<Link href="/projects/analyse-accidentologie" className="font-semibold text-accent-dark hover:text-accent">analyse Accidentologie</Link> montre mon travail de lecture, d’agrégation et de restitution de données ouvertes.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-text-dark mb-2 tracking-tight">
                Automatisation, API &amp; intégrations
              </h4>
              <p className="mb-3">
                Je construis des workflows avec Make, n8n, des webhooks et des API pour supprimer les actions répétitives et relier plusieurs services. Exemples&nbsp;: relance automatique après rendez-vous pour <Link href="/projects/auralife" className="font-semibold text-accent-dark hover:text-accent">Auralife</Link>, chaîne collecte → enrichissement → messages pour le <Link href="/projects/hackathon-mirakl" className="font-semibold text-accent-dark hover:text-accent">hackathon Mirakl</Link>, et intégration ITSM avec extraction de contrats PDF pendant mon stage.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-text-dark mb-2 tracking-tight">
                IA appliquée à un usage précis
              </h4>
              <p className="mb-3">
                J’intègre l’IA comme une étape contrôlée d’un produit&nbsp;: recherche RAG sur plus de 16&nbsp;000 pages documentaires, transcription audio, assistant contextualisé, vérification factuelle, extraction de documents et génération structurée. Ces usages sont présentés dans <Link href="/projects/brasserie-de-tahiti" className="font-semibold text-accent-dark hover:text-accent">Brasserie de Tahiti</Link>, <Link href="/projects/ecrire-son-livre" className="font-semibold text-accent-dark hover:text-accent">Écrire son livre</Link>, <Link href="/projects/payfit-plateforme-articles-ia" className="font-semibold text-accent-dark hover:text-accent">PayFit</Link> et <Link href="/projects/bizroast" className="font-semibold text-accent-dark hover:text-accent">Bizroast</Link>. Je sépare autant que possible génération, contrôle et validation humaine.
              </p>
            </div>

            <div>
              <h4 className="text-base font-semibold text-text-dark mb-2 tracking-tight">
                Cadrage produit &amp; validation
              </h4>
              <p>
                Avant de développer, je peux clarifier le problème, conduire des entretiens, classer les risques et définir une première version testable. Pour <Link href="/projects/ar-plate" className="font-semibold text-accent-dark hover:text-accent">AR Plate</Link>, j’ai mené huit entretiens, testé quatre hypothèses et préparé un plan pilote. Les projets <Link href="/projects/omi" className="font-semibold text-accent-dark hover:text-accent">Omi</Link> et <Link href="/projects/bizroast" className="font-semibold text-accent-dark hover:text-accent">Bizroast</Link> montrent aussi mon travail de priorisation, de parcours utilisateur et de définition de MVP.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-sand/60">
            <p className="text-sm text-text-light mb-3">Technologies et méthodes utilisées dans mes projets</p>
            <ul className="flex flex-wrap gap-2" aria-label="Liste d’outils maîtrisés">
              {[
                'Next.js',
                'React',
                'TypeScript',
                'Tailwind CSS',
                'Supabase',
                'SQL',
                'Vercel',
                'Make',
                'n8n',
                'API & webhooks',
                'OpenAI',
                'Mistral',
                'Dust',
                'Apify',
                'RAG',
                'Google Sheets',
                'Looker Studio',
              ].map((tool) => (
                <li
                  key={tool}
                  className="inline-flex items-center rounded-full border border-sand bg-cream/80 px-3 py-1 text-xs font-medium text-text-dark"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
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
            Je développe aussi des projets clients comme <strong>Auralife</strong>, un site administrable avec automatisations, et une application privée d'aide à l'écriture par la voix. D'autres projets — PayFit, Mirakl, Ping Pang et Eugeniagram — m'ont permis d'approfondir les agents IA, les pipelines de données, Supabase et les produits web.
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
