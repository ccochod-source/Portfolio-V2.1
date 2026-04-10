import { parallaxProjects, type ParallaxProject } from '@/data/parallaxProjects';

const sephoraIntelFull: ParallaxProject = {
  id: '5',
  title: 'Sephora Intel — Brand & Market Intelligence',
  description:
    'Veille e-réputation et intelligence marché : 170 000 signaux sur six plateformes, benchmark Sephora vs Nocibé et alertes en quasi temps réel.\n\nContexte\nLes enseignes beauty peinent à centraliser signaux clients et réputation en ligne : données éclatées, veille lente, peu de vision comparative live avec la concurrence. Projet école (Eugenia School Paris, partenaire Licter) : concevoir une chaîne bout-en-bout, de la collecte à la recommandation pour une direction.\n\nSolution\nApplication web et pipelines Make.com : collecte multi-sources (Apify), dédoublonnage et stockage Supabase, enrichissement sémantique (GPT-4o-mini), reporting matinal (Slack / Gmail) et dashboard six vues (réputation, concurrence, alertes, etc.) avec Realtime, SWR et Recharts. Agent Mistral pour des next steps actionnables.\n\nRôle\nConception des workflows Make.com, nettoyage et structuration du dataset, prompts d’enrichissement, schéma Supabase et documentation de soutenance.\n\nImpact\n170 000 signaux traités · soutenance devant jury pro (avril 2026) · déploiement Vercel opérationnel.\n\nPoints clés\n- 170 000 signaux (TikTok, avis Google, Trustpilot, Instagram, X…)\n- Chaîne scraping → nettoyage → enrichissement LLM → dashboard temps réel\n- Benchmark sentiment Sephora vs Nocibé\n- Alertes bad buzz et synthèses automatiques (Slack / Gmail)\n\nCe que j’en retiens\n- Orchestrer des workflows Make.com à volume élevé\n- Normaliser un dataset multi-sources avant enrichissement IA\n- Cadrer des prompts d’analyse de sentiment et de thèmes\n- Brancher Realtime et visualisation sur une même source de vérité',
  imageSrc: '/sephora-intel.png',
  color: '#F3E9FF',
  link: [
    { url: 'https://bbd-licter.vercel.app/', label: 'Voir le dashboard' },
    { url: '/SEPHORA_INTEL_Soutenance_2026.pdf', label: 'Voir la soutenance (PDF)' },
  ],
};

const accidentologieProject: ParallaxProject = {
  id: 'accidentologie',
  title: 'Analyse Accidentologie',
  description:
    "Analyse géographique et territoriale de l'accidentologie routière en France basée sur les données BAAC 2024. Identification des zones à risques, analyse des facteurs explicatifs (densité, urbanisation, topographie) et comparaison entre métropole et outre-mer. Découverte principale : l'outre-mer présente un taux de tués 5.7x plus élevé que la métropole.",
  imageSrc: '/accidentologie.png',
  color: '#F5E6D3',
  link: [
    {
      url: 'https://www.canva.com/design/DAG4h3loszs/Wkr_gkWxS7c56OftfluiFQ/edit?utm_content=DAG4h3loszs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      label: 'Voir la présentation',
    },
    {
      url: 'https://docs.google.com/spreadsheets/d/1JZKTVJMfaLkBYb8Slpvts0pnSDhyRS8baDxn33wMP68/edit?usp=sharing',
      label: 'Voir les données',
    },
  ],
};

export const allProjects: ParallaxProject[] = [
  ...parallaxProjects.map((p) => (p.id === '5' ? sephoraIntelFull : p)),
  accidentologieProject,
];

