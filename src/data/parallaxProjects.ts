export interface ParallaxProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  category?: string;
  featured?: boolean;
  imagePosition?: string;
  color?: string;
  videoUrl?: string;
  link?: string | Array<{ url: string; label: string }>;
}

export const parallaxProjects: ParallaxProject[] = [
  {
    id: '1',
    title: 'À propos de moi',
    category: 'Business, Data & IA',
    featured: true,
    description: "Je suis Clément Cochod, étudiant à Eugenia School et développeur de solutions digitales. Je transforme des procédures, des fichiers dispersés et des données difficiles à exploiter en applications métiers simples, fiables et utilisables.",
    imageSrc: '/6356FA63-E8D4-4C94-88E1-8C21E48ECC70_1_201_a.jpeg',
    imagePosition: 'center 24%',
    color: '#EFE7DC',
  },
  {
    id: 'tahiti',
    title: 'Brasserie de Tahiti',
    category: 'Stage · 5 applications métiers',
    featured: true,
    description: "Huit semaines pour livrer cinq outils : plateforme BI et RAG documentaire, gestion des investissements, suivi de flotte et carburant, sécurité terrain et pilotage des coûts de la DSI. De la compréhension métier jusqu'aux tests utilisateurs et au déploiement.",
    imageSrc: '/projects/tahiti.svg',
    color: '#EEE8DE',
  },
  {
    id: 'auralife',
    title: 'Auralife',
    category: 'Site client · Administration & automatisation',
    featured: true,
    description: "Conception et mise en ligne d'un site complet pour une activité d'accompagnement : pages de services, blog administrable, gestion des témoignages et messages, réglages centralisés et relances automatiques après rendez-vous.",
    imageSrc: '/projects/auralife.svg',
    color: '#E7E2D3',
    link: 'https://auralife.fr',
  },
  {
    id: 'lorene',
    title: 'Écrire son livre',
    category: 'Application client · IA éditoriale',
    featured: true,
    description: "Application privée conçue pour accompagner l'écriture d'un livre à partir de la voix : enregistrement audio, transcription, structuration du manuscrit, corrections éditoriales, vérification factuelle, assistant contextualisé et export Word.",
    imageSrc: '/projects/lorene.svg',
    color: '#E8E1DB',
  },
  {
    id: 'ping-pang',
    title: 'Ping Pang',
    category: 'Architecture data · Sport',
    featured: true,
    description: "Écosystème de suivi d'entraînement et de classement pour le tennis de table : architecture Supabase, sécurité des données, imports multi-sources, moteur Glicko-2 testé et passerelle entre profils utilisateurs et ranking mondial.",
    imageSrc: '/projects/ping-pang.svg',
    color: '#DDE7DF',
  },
  {
    id: 'galaad',
    title: 'Bizroast',
    category: 'SaaS · Analyse business par IA',
    featured: false,
    description: "SaaS d'analyse critique d'idées business : clarification du besoin, étude du marché et des risques, modèle économique, plan MVP, décision Go/No-Go, rapport structuré et mentor IA conservant le contexte de l'analyse.",
    imageSrc: '/projects/galaad.svg',
    color: '#E8E4DC',
  },
  {
    id: 'coplat',
    title: 'Coplat',
    category: 'SaaS restauration · Business & data',
    featured: false,
    description: "Concept de plateforme de pilotage pour restaurants indépendants : amélioration de photos par IA, menu QR analytique, suivi de réputation et copilote de profitabilité. Business plan, pricing, unit economics et scénarios financiers sur trois ans.",
    imageSrc: '/projects/coplat.svg',
    color: '#E3E7EC',
  },
  {
    id: 'omi',
    title: 'Omi',
    category: 'Produit · Organisation familiale',
    featured: false,
    description: "Concept d'application pour répartir les tâches familiales, organiser les plannings, préparer les repas et envoyer des rappels. Travail sur le positionnement B2C, l'identité, l'acquisition et la fidélisation.",
    imageSrc: '/projects/omi.svg',
    color: '#F2EDCF',
  },
  {
    id: 'ar-plate',
    title: 'AR Plate',
    category: 'Étude de marché · FoodTech',
    featured: false,
    description: "Validation marché d'un service d'amélioration de photos culinaires par IA. Entretiens restaurateurs, test des hypothèses, analyse des objections, sensibilité au prix, classement des risques et plan de pilote.",
    imageSrc: '/projects/ar-plate.svg',
    color: '#EFE5DC',
  },
  {
    id: 'eugeniagram',
    title: 'Eugeniagram',
    category: 'Application web · Réseau social',
    featured: true,
    description: "Réseau social de portfolios pour les étudiants : authentification, profils, publications, stories, reels, messagerie et interactions sociales. Une vitrine interactive pour documenter les projets et valoriser les compétences.",
    imageSrc: '/eugeniagram.png',
    imagePosition: 'center 18%',
    color: '#E8D4E6',
    videoUrl: '/eugeniagram.mp4',
    link: [{ url: '/eugeniagram.mp4', label: 'Voir la démo vidéo' }],
  },
  {
    id: 'northwind',
    title: 'Analyse Northwind',
    category: 'Data · Business intelligence',
    featured: false,
    description: "Modélisation de données commerciales et création d'un tableau de bord Looker Studio. Analyse des ventes par produit, client, pays et période afin d'identifier les tendances et les opportunités d'optimisation.",
    imageSrc: '/northwind-dashboard.png',
    color: '#B8D4E3',
    link: 'https://docs.google.com/document/d/1PO4XfCnuDaMTMx0oBu71ZigprCCQ9w62BLSsGclEISw/edit?usp=sharing',
  },
  {
    id: 'neogen',
    title: 'NeogenIA',
    category: 'IA générative · Contenu',
    featured: false,
    description: "Agence de contenu assistée par IA : analyse du ton de marque, ingénierie de prompts, production éditoriale et création d'assets visuels, avec validation humaine de la qualité et de la cohérence.",
    imageSrc: '/neogen-ia.png',
    color: '#D4C4B0',
    link: [
      { url: 'https://www.canva.com/design/DAG5hMHPxik/OT_jscfoh5PY4F3Qui9Wyg/edit', label: 'Voir le design' },
      { url: 'https://docs.google.com/document/d/1_KGaPBq7ZWT0HHp-KQN2BUU2I6FmuuUMpwAU4LoNGhY/edit?usp=sharing', label: 'Voir le document' },
    ],
  },
  {
    id: 'accidentologie',
    title: 'Analyse Accidentologie',
    category: 'Data · Analyse territoriale',
    featured: false,
    description: "Analyse géographique de l'accidentologie routière à partir des données BAAC 2024 : zones à risque, facteurs territoriaux et comparaison entre métropole et outre-mer.",
    imageSrc: '/accidentologie.png',
    imagePosition: '25% center',
    color: '#F5E6D3',
    link: [
      { url: 'https://www.canva.com/design/DAG4h3loszs/Wkr_gkWxS7c56OftfluiFQ/edit', label: 'Voir la présentation' },
      { url: 'https://docs.google.com/spreadsheets/d/1JZKTVJMfaLkBYb8Slpvts0pnSDhyRS8baDxn33wMP68/edit?usp=sharing', label: 'Voir les données' },
    ],
  },
  {
    id: 'beitea',
    title: 'Beitea',
    category: 'Marketing · Growth',
    featured: false,
    description: "Stratégie marketing pour un bubble tea des Champs-Élysées : fidélisation, augmentation du panier moyen, gamification et concepts de contenu conçus pour être testés par A/B testing.",
    imageSrc: '/beitea-capture.png',
    color: '#A8D5BA',
    link: 'https://www.canva.com/design/DAG5tvEoqWE/vCj2i68G_c07lT6Llm6ESQ/edit',
  },
];
