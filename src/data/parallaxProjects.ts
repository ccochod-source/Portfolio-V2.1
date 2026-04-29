export interface ParallaxProject {
  id: string;
  title: string;
  /** Texte court affiché sur la page d’accueil (cartes parallax) */
  description: string;
  /** Texte détaillé pour la page « Tous les projets » (optionnel) */
  longDescription?: string;
  imageSrc: string;
  color?: string;
  videoUrl?: string;
  link?: string | Array<{ url: string; label: string }>;
  /** Liens hors page (Maps, docs, références) — cumul aux liens déjà présents */
  extraLink?: { url: string; label: string };
  /** Segment d’URL pour la fiche détaillée (`/projects/[slug]`), absent pour la carte « À propos » */
  slug?: string;
}

export const parallaxProjects: ParallaxProject[] = [
  {
    id: '1',
    title: 'A propos de moi',
    description:
      'Profil Business Data & IA à Eugenia School : je relie data, produit et exécution pour rendre la complexité lisible et actionnable — entre automatisations no-code, développement web et stratégie mesurée.',
    longDescription:
      "Profil orienté Data, IA et produit : je combine exigence sportive, curiosité technique et regard business pour livrer vite, avec une logique de preuve (chiffres, itérations, qualité de finition).\n\nContexte\nFormation Business Data & IA à Eugenia School Paris ; parcours où la data n’est pas une fin en soi mais un levier pour des décisions plus claires. Goût prononcé pour le terrain (sport, discipline) transposé dans la façon d’avancer en projet : objectifs, feedback, amélioration continue.\n\nSolution\nPalette outils et approches du no-code au code : automatisations type Make / n8n, SQL et tableaux de bord, développement d’interfaces avec Next.js et Tailwind, mise en scène des résultats avec Canva ou des démonstrations interactives. Priorité à une communication simple des analyses.\n\nRôle\nRelier la question business à la technique : cadrer ce qu’il faut mesurer, structurer les données, choisir les bons automatismes ou le bon prototype, et rendre le livrable exploitable par un décideur sans jargon inutile.\n\nImpact\nUn profil hybride exploitable en stage ou en mission : à la fois rigueur sur la donnée, sens du produit, et capacité à produire des assets visuels ou une démo web lorsque c’est la meilleure façon de convaincre.\n\nPoints clés\n- Double culture data + exécution (projet livré, pas seulement une idée)\n- Maîtrise d’outils d’automatisation et de visualisation\n- Front web moderne pour démontrer un use case\n- Discipline et itération (culture sport / objectifs)\n\nCe que j’en retiens\n- Séparer clairement problème, mesure et décision\n- Préférer un prototype observable à un cahier des charges flou\n- Documenter les hypothèses pour itérer sans perdre le fil",
    imageSrc: '/6356FA63-E8D4-4C94-88E1-8C21E48ECC70_1_201_a.jpeg',
    color: '#FFE5D9',
  },
  {
    id: '2',
    title: 'Beitea',
    description:
      'Stratégie marketing pour BEITEA (bubble tea, Champs-Élysées) : fidélisation, panier moyen et leviers sociaux/gamification, avec une logique testable (A/B, données comportementales).',
    longDescription:
      'Stratégie marketing terrain pour un point de vente à fort flux touristique : monter la fréquence et le panier sans alourdir le parcours d’achat, via leviers communautaires et ludiques.\n\nContexte\nBEITEA est positionné sur un axe à très forte affluence (Champs-Élysées) où la concurrence sur l’attention est forte : il faut créer des raisons de revenir et d’augmenter spontanément le ticket, pas seulement des promos génériques.\n\nSolution\nConstruction d’un funnel adapté au lieu de vente (TOFU / MOFU / BOFU) avec une boisson « mystère » pensée comme contenu partageable au milieu du parcours, et un jeu de type grattage après un seuil de panier pour inciter à dépasser un ticket cible (ex. +10 €). Narrative cohérente porter sur la Canva de synthèse.\n\nRôle\nDéfinition des messages, des hypothèses testables et des indicateurs à suivre (panier, retour visite, engagement social possible) ; alignement entre concept marketing et faisabilité opérationnelle en point de vente.\n\nImpact\nLivrable prêt pour expérimenter et mesurer sur le terrain : grille d’AB testing lorsque les volumes le permettent, lecture des premiers signaux comportementaux plutôt que des promesses sans test.\n\nPoints clés\n- Funnel pensé pour du retail à fort passage\n- Levier social (mystère / contenu) + levier incitatif (seuil de panier)\n- Méthode : hypothèse → test → lecture des données\n- Présentation Canva comme support de pitch\n\nCe que j’en retiens\n- Lier chaque idée à une métrique possible en magasin\n- Éviter les campagnes décoratives sans lien avec le panier\n- Itérer avec de petits tests plutôt qu’un gros bloc non mesuré',
    imageSrc: '/beitea-capture.png',
    color: '#A8D5BA',
    slug: 'beitea',
    link: [
      {
        url: 'https://www.canva.com/design/DAG5tvEoqWE/vCj2i68G_c07lT6Llm6ESQ/edit?utm_content=DAG5tvEoqWE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        label: 'Présentation Canva du projet',
      },
    ],
    extraLink: {
      url: 'https://www.google.com/maps/search/Beitea+Paris+Av+des+Champs-%C3%89lys%C3%A9es',
      label: 'Quartier & zone commerciale (Google Maps)',
    },
  },
  {
    id: '3',
    title: 'PayFit — plateforme d’articles IA (EEAT + SEO)',
    description:
      'Plateforme d’articles IA pour contenus paie & RH au standard EEAT vérifiés (Dust, React, Vercel) : génération rapide sans sacrifier légalité ni SEO — hackathon, 1er prix (solo).',
    longDescription:
      "Plateforme web d’écriture assistée pour produire des articles sérieux sur la paie et les RH, conformes aux critères EEAT et au SEO, avec garde-foux sur le fond juridique avant publication.\n\nContexte\nHackathon scolaire : il fallait monter une démonstration crédible là où le contenu métier est sensible (paie, RH) et où le référencement naturel exige structure, cohérence et sources plutôt que du texte générique.\n\nSolution\nAgents orchestrés sur Dust pour générer et contrôler les thèmes (EEAT, SEO, vérifications légales), interface en React pour la recherche et la génération, visuels préparés sous Canva, suivi d’usage imaginable via Looker Studio ; déploiement d’une démo sur Vercel.\n\nRôle\nConception des parcours d’agents et des prompts, intégration via API, structuration de la démo produit et narration de la valeur (qualité + vitesse vs rédaction manuelle).\n\nImpact\nArticles structurés et relisibles par un humain avant mise en ligne · démonstration fonctionnelle lors de la soutenance · 1er prix du hackathon · réalisation en solo.\n\nPoints clés\n- Chaîne EEAT : expertise, sources, prudence juridique\n- Dust + API pour industrialiser la génération contrôlée\n- Front React + déploiement Vercel\n- Visualisation des mockups (Canva)\n\nCe que j’en retiens\n- Ne jamais confondre rapidité LLM et conformité métier\n- Isoler les étapes de génération et de contrôle\n- Présenter une démo web plutôt qu’un slide statique",
    imageSrc: '/payfit-slide-1.png',
    color: '#D7E6F6',
    slug: 'payfit-plateforme-articles-ia',
    link: [
      { url: 'https://payfit-pied.vercel.app', label: 'Voir la démo' },
      { url: 'https://canva.link/522x4im8hv0crvz', label: 'Voir les mockups Canva' },
    ],
    extraLink: {
      url: 'https://platform.openai.com/docs/guides/text-generation',
      label: 'Guides OpenAI API (contexte génération de texte)',
    },
  },
  {
    id: '4',
    title: 'Neogen-IA',
    description:
      'Neogen-IA : mini-agence de contenu pilotée par l’IA pour Eugénia — ton de voice, prompts réutilisables, production de contenus et visuels, avec une équipe rôles CEO/CTO/CMO/CDO.',
    longDescription:
      "Programme « agence » de contenu pour l’école : produire en continu sans diluer la voix de marque, en combinant générateurs IA et relecture humaine sur les zones sensibles.\n\nContexte\nBesoin institutionnel de volumes de contenus homogènes (posts, fiches, mails) sans embaucher une agence externe : il faut cadre, prompts, et process de validation interne.\n\nSolution\nAteliers de définition du tone of voice ; bibliothèque de prompts par type de livrable ; création de packs visuels cohérents sur Canva ; document de référence partagé ; organisation en cellule projet (direction, technique, marketing, design) pour livrer un package complet.\n\nRôle\nContribution à la définition des consignes créatives, aux prompts, à la coordination des rôles et à la cohérence des livrables finaux.\n\nImpact\nUne chaîne reproductible : moins d’improvisation, plus de qualité par itération ; livrables utilisables tels quels pour communiquer sur l’école.\n\nPoints clés\n- Ton de voice explicite avant de scaler le volume\n- Prompts documentés (pas seulement dans la tête)\n- Séparation claire : contenu sensible vs contenu recyclable\n- Co-design Canva pour l’aspect visuel\n\nCe que j’en retiens\n- L’outil ne remplace pas le cadrage éditorial\n- La qualité vient du process avant le modèle\n- Une mini-structure forcée évite les zones grises entre rôles",
    imageSrc: '/neogen-ia.png',
    color: '#D4C4B0',
    slug: 'neogen-ia',
    link: [
      {
        url: 'https://www.canva.com/design/DAG5hMHPxik/OT_jscfoh5PY4F3Qui9Wyg/edit?utm_content=DAG5hMHPxik&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
        label: 'Voir le design',
      },
      {
        url: 'https://docs.google.com/document/d/1_KGaPBq7ZWT0HHp-KQN2BUU2I6FmuuUMpwAU4LoNGhY/edit?usp=sharing',
        label: 'Voir le document',
      },
    ],
    extraLink: {
      url: 'https://www.eugeniaschool.com/',
      label: 'Eugenia School — contexte projet',
    },
  },
  {
    id: '5',
    title: 'Sephora Intel — Brand & Market Intelligence',
    description:
      'Veille e-réputation et intelligence marché : 170 000 signaux sur six plateformes, benchmark Sephora vs Nocibé et alertes en quasi temps réel.',
    longDescription:
      'Veille e-réputation et intelligence marché : 170 000 signaux sur six plateformes, benchmark Sephora vs Nocibé et alertes en quasi temps réel.\n\nContexte\nLes enseignes beauty peinent à centraliser signaux clients et réputation en ligne : données éclatées, veille lente, peu de vision comparative live avec la concurrence. Projet école (Eugenia School Paris, partenaire Licter) : concevoir une chaîne bout-en-bout, de la collecte à la recommandation pour une direction.\n\nSolution\nApplication web et pipelines Make.com : collecte multi-sources (Apify), dédoublonnage et stockage Supabase, enrichissement sémantique (GPT-4o-mini), reporting matinal (Slack / Gmail) et dashboard six vues (réputation, concurrence, alertes, etc.) avec Realtime, SWR et Recharts. Agent Mistral pour des next steps actionnables.\n\nRôle\nConception des workflows Make.com, nettoyage et structuration du dataset, prompts d’enrichissement, schéma Supabase et documentation de soutenance.\n\nImpact\n170 000 signaux traités · soutenance devant jury pro (avril 2026) · déploiement Vercel opérationnel.\n\nPoints clés\n- 170 000 signaux (TikTok, avis Google, Trustpilot, Instagram, X…)\n- Chaîne scraping → nettoyage → enrichissement LLM → dashboard temps réel\n- Benchmark sentiment Sephora vs Nocibé\n- Alertes bad buzz et synthèses automatiques (Slack / Gmail)\n\nCe que j’en retiens\n- Orchestrer des workflows Make.com à volume élevé\n- Normaliser un dataset multi-sources avant enrichissement IA\n- Cadrer des prompts d’analyse de sentiment et de thèmes\n- Brancher Realtime et visualisation sur une même source de vérité',
    imageSrc: '/sephora-intel.png',
    color: '#F3E9FF',
    slug: 'sephora-intel',
    link: [
      { url: 'https://bbd-licter.vercel.app/', label: 'Voir le dashboard' },
      { url: '/SEPHORA_INTEL_Soutenance_2026.pdf', label: 'Voir la soutenance (PDF)' },
    ],
    extraLink: {
      url: 'https://apify.com',
      label: 'Apify — acteurs scraping (réf.)',
    },
  },
  {
    id: '6',
    title: 'Eugeniagram',
    description:
      'Réseau social de portfolios pour étudiants (UX type Instagram) : fil d’actualité, publications de projets et vitrine collective pour l’école et les recruteurs.',
    longDescription:
      "Application web pensée comme un fil social de portfolios : les étudiants centralisent leurs travaux au même endroit, avec une lecture simple pour les visiteurs et pour l’institution.\n\nContexte\nLes réalisations étudiantes sont souvent éparpillées (PDF, drive, réseaux perso) : difficile pour une école de porter une image unifiée et pour un recruteur de parcourir un parcours cohérent.\n\nSolution\nProduit web avec cartes projet (visuel, titre, contexte, lien), navigation type feed, parcours de publication et de découverte ; démonstration vidéo du produit ; attention portée au mobile et aux parcours compte (authentification, réinitialisation mot de passe).\n\nRôle\nParticipation à la conception produit et à l’expérience utilisateur sur un MVP orienté clarté plutôt que sur une accumulation de features.\n\nImpact\nUn support de valorisation collective : les filières peuvent être montrées comme un ensemble de projets vivants, pas seulement comme une liste de CV.\n\nPoints clés\n- Modèle « feed » familier pour baisser la friction\n- MVP centré sur la lisibilité des projets\n- Démo vidéo pour montrer le flow réel\n- Base technique web moderne (logique composants)\n\nCe que j’en retiens\n- Un bon portfolio est d’abord une histoire parcourable\n- L’auth et la récupération de compte font partie du produit, pas du détail\n- Mieux vaut peu de features polies que beaucoup à moitié finies",
    imageSrc: '/eugeniagram.png',
    color: '#E8D4E6',
    slug: 'eugeniagram',
    videoUrl: '/eugeniagram.mp4',
    link: [{ url: '/eugeniagram.mp4', label: 'Voir la démo vidéo' }],
    extraLink: {
      url: 'https://react.dev/learn/thinking-in-react',
      label: 'React — modèle composant / UI réactive',
    },
  },
  {
    id: '7',
    title: 'Hackaton Mirakl',
    description:
      'Hackathon Mirakl : pipeline complet scraping → leads enrichis → emails IA et séquences outbound, avec dashboard Vercel et pitch — 1ers sur le use case, 2e au général, API OpenAI 5 000 €.',
    longDescription:
      "Proposition de plateforme d’activation commerciale : collecter des signaux, enrichir des leads, générer des messages personnalisés et piloter des campagnes depuis un écran unique.\n\nContexte\nHackathon Eugenia School autour d’un challenge Mirakl : industrialiser une prospection outbound sans sacrifier la personnalisation, à partir de données accessibles et d’outils d’IA générative.\n\nSolution\nChaîne bout-en-bout : collecte / scraping, nettoyage et enrichissement, génération d’e-mails et enchaînement des relances ; interface type « campaign dashboard » déployée sur Vercel ; pitch deck en ligne pour raconter l’histoire produit.\n\nRôle\nCo-conception du pipeline data → texte, de la démo et du récit pour le jury (business + technique).\n\nImpact\n1ers sur notre use case · 2e place au classement général · obtention d’une API OpenAI d’une valeur annoncée à 5 000 €.\n\nPoints clés\n- Dashboard montrable (pas seulement un script)\n- Storytelling aligné démo + deck\n- Automatisation avec contrôle sur le message\n- Objectif : preuve d’exécution en temps limité\n\nCe que j’en retiens\n- Toujours préparer une démo « cliquable » pour un hackathon\n- Séparer pipeline technique et narration investisseur\n- La valeur est dans la chaîne complète, pas dans un seul prompt",
    imageSrc: '/mirakl-hackathon.png',
    color: '#D5F0EA',
    slug: 'hackathon-mirakl',
    link: [
      { url: 'https://mirakl.vercel.app', label: 'Voir le dashboard' },
      { url: 'https://mirakl-c2-pitch-deck.vercel.app/s/1', label: 'Voir la présentation' },
    ],
    extraLink: {
      url: 'https://www.mirakl.com/',
      label: 'Mirakl — entreprise & marketplace B2B',
    },
  },
];
