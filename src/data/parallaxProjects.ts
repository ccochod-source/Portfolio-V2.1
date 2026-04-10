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
    title: 'PayFit — plateforme d’articles IA (EEAT + SEO)',
    description:
      'Plateforme d’articles IA conçue pour automatiser la création de contenus EEAT-optimisés (Expertise, Authoritativeness, Trustworthiness) pour PayFit.\n\nJ’ai développé des agents IA sur Dust pour générer des articles professionnels sur la paie et les RH, avec vérification législative et SEO intégré.\n\nStack : React (front), Canva (visuels & mockups), agents Dust via API (EEAT/SEO/vérification légale), SQL (bases RH), Looker Studio (analytics), déploiement Vercel.\n\nImpact : articles prêts à publier en quelques minutes, amélioration du potentiel de trafic organique. Projet réalisé en solo lors d’un hackathon scolaire (1er prix).',
    imageSrc: '/payfit-slide-1.png',
    color: '#D7E6F6',
    link: [
      { url: 'https://payfit-pied.vercel.app', label: 'Voir la démo' },
      { url: 'https://canva.link/522x4im8hv0crvz', label: 'Voir les mockups Canva' },
    ],
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
    title: 'Sephora Intel — Brand & Market Intelligence',
    description:
      'Plateforme d’intelligence marché et de veille e-réputation (Sephora vs Nocibé) alimentée par 170 000 signaux multi-sources.\n\nPipeline Make.com + Supabase + enrichissement LLM pour produire un dashboard temps réel, des alertes “bad buzz” et des synthèses automatiques.\n\nDéployé sur Vercel · soutenance jury pro (avril 2026).',
    imageSrc: '/sephora-intel.png',
    color: '#F3E9FF',
    link: [
      { url: 'https://bbd-licter.vercel.app/', label: 'Voir le dashboard' },
      { url: '/SEPHORA_INTEL_Soutenance_2026.pdf', label: 'Voir la soutenance (PDF)' },
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



