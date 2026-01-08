export interface ParallaxProject {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  color?: string;
  videoUrl?: string;
  link?: string | Array<{ url: string; label: string }>;
}

export const parallaxProjects: ParallaxProject[] = [
  {
    id: '1',
    title: 'A propos de moi',
    description: 'Clément Cochod étudiant Business Data & IA à Eugenia School.\n\nSportif de haut niveau dans l\'âme, je transpose la culture du résultat à la Data. Je combine maîtrise technique (Code/No-code) et stratégie business pour transformer la donnée en levier de croissance. Mon objectif : décoder la complexité pour piloter des décisions innovantes et performantes.',
    imageSrc: '/6356FA63-E8D4-4C94-88E1-8C21E48ECC70_1_201_a.jpeg',
    color: '#FFE5D9',
  },
  {
    id: '2',
    title: 'Beitea',
    description: 'Stratégie marketing pour BEITEA, café bubble tea sur les Champs-Élysées. Objectif : améliorer la fidélisation client et augmenter le panier moyen. Solutions proposées : boisson "mystère" pour l\'engagement social (MOFU) et système de gamification avec tickets à gratter pour inciter à dépenser +10€ (TOFU). Méthodologie basée sur l\'A/B testing et l\'analyse de données comportementales.',
    imageSrc: '/beitea-capture.png',
    color: '#A8D5BA',
    link: 'https://www.canva.com/design/DAG5tvEoqWE/vCj2i68G_c07lT6Llm6ESQ/edit?utm_content=DAG5tvEoqWE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  },
  {
    id: '3',
    title: 'Analyse Northwind',
    description: 'Analyse approfondie de la base de données Northwind (commerce de produits alimentaires). Modélisation des données, création d\'un dashboard Looker Studio et analyse multidimensionnelle des performances commerciales par produit, région et période. Identification des clients les plus rentables, des tendances temporelles et des opportunités d\'optimisation',
    imageSrc: '/northwind-dashboard.png',
    color: '#B8D4E3',
    link: 'https://docs.google.com/document/d/1PO4XfCnuDaMTMx0oBu71ZigprCCQ9w62BLSsGclEISw/edit?usp=sharing',
  },
  {
    id: '4',
    title: 'Neogen-IA',
    description: 'NeogenIA, agence de contenu alimentée par l\'IA pour Eugénia. Objectif : créer du contenu clair et cohérent en combinant l\'efficacité de l\'IA avec un contrôle humain sur la qualité. Méthodologie : analyse du tone of voice, ingénierie de prompts optimisés, création de contenu et développement d\'assets visuels. Équipe structurée (CEO/COO, CTO, CMO, CDO) pour livrer un package professionnel et homogène.',
    imageSrc: '/neogen-ia.png',
    color: '#D4C4B0',
    link: [
      { url: 'https://www.canva.com/design/DAG5hMHPxik/OT_jscfoh5PY4F3Qui9Wyg/edit?utm_content=DAG5hMHPxik&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', label: 'Voir le design' },
      { url: 'https://docs.google.com/document/d/1_KGaPBq7ZWT0HHp-KQN2BUU2I6FmuuUMpwAU4LoNGhY/edit?usp=sharing', label: 'Voir le document' },
    ],
  },
  {
    id: '5',
    title: 'Analyse Accidentologie',
    description: 'Analyse géographique et territoriale de l\'accidentologie routière en France basée sur les données BAAC 2024. Identification des zones à risques, analyse des facteurs explicatifs (densité, urbanisation, topographie) et comparaison entre métropole et outre-mer. Découverte principale : l\'outre-mer présente un taux de tués 5.7x plus élevé que la métropole.',
    imageSrc: '/accidentologie.png',
    color: '#F5E6D3',
    link: [
      { url: 'https://www.canva.com/design/DAG4h3loszs/Wkr_gkWxS7c56OftfluiFQ/edit?utm_content=DAG4h3loszs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton', label: 'Voir la présentation' },
      { url: 'https://docs.google.com/spreadsheets/d/1JZKTVJMfaLkBYb8Slpvts0pnSDhyRS8baDxn33wMP68/edit?usp=sharing', label: 'Voir les données' },
    ],
  },
  {
    id: '6',
    title: 'Eugeniagram',
    description: 'Ce projet est une application web conçue comme un réseau social de portfolios, inspirée par l\'ergonomie d\'Instagram. Elle permet aux étudiants de centraliser, documenter et valoriser visuellement leurs travaux académiques et projets personnels au sein d\'un fil d\'actualité dynamique. Pour l\'école, cet outil constitue une vitrine interactive et moderne, idéale pour promouvoir les talents des différentes filières auprès des recruteurs et futurs partenaires.',
    imageSrc: '/eugeniagram.png',
    color: '#E8D4E6',
    videoUrl: '/eugeniagram.mp4',
    link: [
      { url: '/eugeniagram.mp4', label: 'Voir la démo vidéo' },
    ],
  },
];



