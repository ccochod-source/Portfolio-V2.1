import { beiteaSlideshowUrls } from '@/data/beiteaSlidesOrder';
import { neogenIaSlideshowUrls } from '@/data/neogenIaSlidesOrder';
import { payfitSlideshowUrls } from '@/data/payfitSlidesOrder';

export interface ParallaxProject {
  id: string;
  title: string;
  /** Texte court affiché sur la page d’accueil (cartes parallax) */
  description: string;
  /** Texte détaillé pour la page « Tous les projets » (optionnel) */
  longDescription?: string;
  imageSrc: string;
  category?: string;
  featured?: boolean;
  imagePosition?: string;
  color?: string;
  videoUrl?: string;
  link?: string | Array<{ url: string; label: string }>;
  /** Liens hors page (Maps, docs, références) — cumul aux liens déjà présents */
  extraLink?: { url: string; label: string };
  /** Segment d’URL pour la fiche détaillée (`/projects/[slug]`), absent pour la carte « À propos » */
  slug?: string;
  /** Slides PNG (exports type deck) affichées sur la fiche projet — chemins sous `/public` */
  slideshowSrcs?: readonly string[];
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
    id: 'tahiti',
    title: 'Brasserie de Tahiti',
    category: 'Stage · 5 applications métiers',
    featured: true,
    description:
      "Huit semaines pour livrer cinq outils : plateforme BI et RAG documentaire, gestion des investissements, suivi de flotte et carburant, sécurité terrain et pilotage des coûts de la DSI.",
    longDescription:
      "Cinq applications métiers conçues pendant un stage de huit semaines à la Brasserie de Tahiti, avec un même objectif : remplacer des fichiers dispersés et des procédures difficiles à suivre par des outils utilisables au quotidien.\n\nContexte\nLes équipes travaillaient avec des sources hétérogènes : documents internes, historiques Excel, données financières et procédures terrain. Chaque application devait respecter les rôles métier, reprendre l’existant et rester compréhensible par des utilisateurs non techniques.\n\nRéalisations\n- BDT Data Hub & Omni : couche sémantique, environ 50 corrections de modèles, 19 tableaux de bord et recherche RAG sur plus de 16 000 pages documentaires.\n- GestioPro : gestion des investissements avec 9 statuts, 7 rôles, budgets multi-devises, plus de 200 contrôles et une dizaine d’exports.\n- Flotte & carburant : remplacement de 26 feuilles Excel, suivi de 150 véhicules et reprise de dix ans d’historique, dont 22 000 entrées carburant et environ 400 anomalies détectées.\n- HSE : six types de permis de travail et 17 formulaires dynamiques adaptés aux opérations terrain.\n- Pilotage DSI : intégration ITSM, extraction assistée par IA des contrats PDF et espace de documentation interne.\n\nRôle\nRecueil des besoins, modélisation des données, développement, reprise des historiques, gestion des droits, contrôles de cohérence, tests utilisateurs et préparation du déploiement.\n\nImpact\nCinq outils livrés sur des périmètres différents, avec une base plus centralisée pour consulter l’information, contrôler les saisies et suivre les opérations.\n\nCe que j’en retiens\n- Commencer par comprendre le processus réel avant de dessiner l’interface\n- Prévoir la reprise et la qualité des données dès le début\n- Tester les droits et les cas limites avec les utilisateurs concernés\n- Documenter suffisamment pour rendre l’outil durable après la livraison",
    imageSrc: '/projects/tahiti.svg',
    color: '#EEE8DE',
    slug: 'brasserie-de-tahiti',
  },
  {
    id: 'auralife',
    title: 'Auralife',
    category: 'Site client · Administration & automatisation',
    featured: true,
    description:
      "Site complet pour une activité d'accompagnement : services, blog administrable, témoignages, messages, réglages centralisés et relances automatiques après rendez-vous.",
    longDescription:
      "Site public et espace d’administration conçus pour Auralife, une activité d’accompagnement qui devait pouvoir présenter son offre, publier du contenu et gérer les échanges sans dépendre d’un développeur pour chaque modification.\n\nContexte\nLe besoin dépassait une simple page vitrine : il fallait centraliser les services, les articles, les témoignages, les demandes reçues et les principaux réglages du site dans une interface cohérente.\n\nSolution\nCréation du site auralife.fr avec pages de présentation, blog administrable et parcours de contact. L’administration permet de gérer les articles, les témoignages, les messages et les réglages importants. Une automatisation envoie également une demande d’avis après un rendez-vous.\n\nRôle\nCadrage du besoin, organisation des contenus, conception des parcours public et administrateur, développement, automatisations et mise en ligne.\n\nRésultat\nUn site réellement en production, modifiable par la cliente et relié aux opérations qui suivent un rendez-vous.\n\nPoints clés\n- Site vitrine et outil d’administration dans le même projet\n- Gestion autonome du blog et des témoignages\n- Centralisation des messages et des réglages\n- Relance d’avis automatisée\n\nCe que j’en retiens\n- L’autonomie du client compte autant que l’apparence du site\n- Les contenus doivent être simples à mettre à jour\n- Une petite automatisation bien placée peut supprimer une tâche répétitive",
    imageSrc: '/projects/auralife.svg',
    color: '#E7E2D3',
    slug: 'auralife',
    link: [{ url: 'https://auralife.fr', label: 'Visiter Auralife' }],
  },
  {
    id: 'lorene',
    title: 'Écrire son livre',
    category: 'Application client · IA éditoriale',
    featured: true,
    description:
      "Application privée d'aide à l'écriture par la voix : enregistrement, transcription, structuration du manuscrit, corrections, vérification factuelle, assistant contextualisé et export Word.",
    longDescription:
      "Application privée conçue pour transformer des idées racontées à l’oral en un manuscrit structuré, tout en laissant l’autrice garder le contrôle sur son texte.\n\nContexte\nL’écriture longue peut être freinée par la page blanche, la dispersion des notes et le temps nécessaire pour reprendre chaque passage. Le projet devait faciliter la production sans uniformiser la voix de l’autrice.\n\nSolution\nLe parcours commence par l’enregistrement audio et la transcription. Les contenus peuvent ensuite être organisés dans le manuscrit, corrigés et retravaillés. L’application propose une vérification factuelle, un assistant qui conserve le contexte du livre et un export Word pour poursuivre le travail hors de l’outil.\n\nRôle\nConception du parcours d’écriture, structuration des données du manuscrit, intégration des fonctions d’IA, développement de l’interface privée et génération de l’export DOCX.\n\nRésultat\nUn espace de travail unique qui relie la parole, la transcription, l’édition et l’export, sans présenter le premier résultat de l’IA comme un texte définitif.\n\nPoints clés\n- Audio et transcription dans le même parcours\n- Organisation progressive du manuscrit\n- Correction et vérification factuelle séparées\n- Assistant contextualisé par le contenu du livre\n- Export Word exploitable\n\nCe que j’en retiens\n- Une IA éditoriale doit assister une voix, pas la remplacer\n- Les étapes de génération, vérification et validation doivent rester distinctes\n- L’export est essentiel pour ne pas enfermer l’utilisateur dans l’application",
    imageSrc: '/projects/lorene.svg',
    color: '#E8E1DB',
    slug: 'ecrire-son-livre',
  },
  {
    id: 'ping-pang',
    title: 'Ping Pang',
    category: 'Architecture data · Sport',
    featured: true,
    description:
      "Écosystème de suivi d'entraînement et de classement pour le tennis de table : Supabase, sécurité des données, imports multi-sources et moteur Glicko-2 testé.",
    longDescription:
      "Architecture de données pour un écosystème consacré au tennis de table, reliant le suivi d’entraînement, les profils joueurs et un classement calculé de manière cohérente.\n\nContexte\nLes données utiles viennent de plusieurs sources et ne désignent pas toujours les joueurs de la même façon. Le défi principal était de construire une base fiable avant d’ajouter les fonctions visibles de l’application.\n\nSolution\nConception d’une architecture Supabase partagée par les applications d’entraînement et de ranking. Les imports multi-sources sont normalisés avant leur rapprochement avec les profils utilisateurs. Le moteur de classement Glicko-2 a été isolé et testé pour rendre les calculs reproductibles. Les règles de sécurité limitent l’accès et les modifications selon le rôle de l’utilisateur.\n\nRôle\nModélisation du schéma, réflexion sur les identifiants et la déduplication, définition des règles de sécurité, préparation des imports et validation du moteur de classement.\n\nRésultat\nUne fondation technique commune pour éviter que chaque fonctionnalité recrée sa propre version des joueurs, des matchs et des classements.\n\nPoints clés\n- Supabase comme source de vérité\n- Imports provenant de plusieurs systèmes\n- Correspondance entre profils et ranking mondial\n- Calcul Glicko-2 testé séparément\n- Sécurité des données intégrée au schéma\n\nCe que j’en retiens\n- Un bon algorithme ne compense pas des identités mal rapprochées\n- Les règles d’accès doivent être pensées avec le modèle de données\n- Les imports ont besoin de contrôles et d’une trace de leur provenance",
    imageSrc: '/projects/ping-pang.svg',
    color: '#DDE7DF',
    slug: 'ping-pang',
  },
  {
    id: 'galaad',
    title: 'Bizroast',
    category: 'SaaS · Analyse business par IA',
    featured: false,
    description:
      "Analyse critique d'idées business : marché, risques, modèle économique, plan MVP, décision Go/No-Go, rapport structuré et mentor IA contextualisé.",
    longDescription:
      "Conception d’un SaaS qui challenge une idée d’entreprise avant d’investir du temps et de l’argent dans sa réalisation. Le produit est présenté comme une exploration et un prototype, pas comme une activité déjà commercialisée.\n\nProblème\nLes porteurs de projet obtiennent facilement des réponses encourageantes mais rarement une critique structurée de leurs hypothèses, de leurs risques et de leur modèle économique.\n\nSolution\nBizroast organise l’analyse autour du besoin, du marché, de la concurrence, des risques et de la monétisation. La sortie comprend une décision argumentée Go/No-Go, les hypothèses à tester et un plan de MVP. Un mentor IA conserve le contexte du rapport pour répondre aux questions suivantes sans recommencer l’analyse.\n\nRôle\nDéfinition du parcours, structuration du rapport, conception des critères d’analyse, prototypage de l’interface et du fonctionnement du mentor contextualisé.\n\nLivrable\nUn concept produit cohérent et un prototype permettant d’évaluer la qualité de l’analyse, le ton critique et l’utilité des recommandations avant une éventuelle commercialisation.\n\nPoints clés\n- Analyse par hypothèses plutôt que réponse générale\n- Risques et objections rendus visibles\n- Décision Go/No-Go expliquée\n- Plan MVP relié aux incertitudes prioritaires\n- Conversation conservant le contexte du rapport\n\nCe que j’en retiens\n- Une recommandation utile doit montrer ce qui pourrait la rendre fausse\n- Le rapport doit déboucher sur des tests concrets\n- Le contexte conservé améliore fortement les échanges après l’analyse",
    imageSrc: '/projects/galaad.svg',
    color: '#E8E4DC',
    slug: 'bizroast',
  },
  {
    id: 'omi',
    title: 'Omi',
    category: 'Produit · Organisation familiale',
    featured: false,
    description:
      "Application imaginée pour répartir les tâches familiales, organiser les plannings, préparer les repas et envoyer des rappels, avec travail sur l'acquisition et la fidélisation.",
    longDescription:
      "Concept d’application familiale pensé pour rendre visible la charge d’organisation quotidienne et faciliter sa répartition entre les membres du foyer.\n\nProblème\nLes tâches, rendez-vous, repas et rappels sont souvent répartis entre plusieurs applications ou restent dans la tête d’une seule personne. Le problème est moins le manque d’outils que leur fragmentation et la difficulté à faire participer toute la famille.\n\nSolution envisagée\nOmi réunit les missions du foyer, les plannings, la préparation des repas, les messages et les rappels. Le travail produit couvre également l’identité de marque, le positionnement B2C, les canaux d’acquisition et les mécanismes de fidélisation.\n\nRôle\nCadrage du problème, définition des utilisateurs, priorisation des fonctions, réflexion sur l’expérience familiale et construction d’une première stratégie de mise sur le marché.\n\nÉtat du projet\nOmi est une exploration produit. Les parcours et l’approche marketing ont été définis, mais la fiche ne présente pas le service comme déjà adopté par des familles.\n\nPoints clés\n- Répartition claire des responsabilités\n- Planning partagé et rappels\n- Repas intégrés à l’organisation du foyer\n- Positionnement accessible à plusieurs générations\n- Acquisition et rétention pensées avec le produit\n\nCe que j’en retiens\n- Une application familiale doit rester simple pour tous les âges\n- L’adoption collective est plus difficile que l’inscription individuelle\n- Les rappels doivent aider sans devenir une nouvelle source de pression",
    imageSrc: '/projects/omi-banner.png',
    color: '#F2EDCF',
    slug: 'omi',
  },
  {
    id: 'ar-plate',
    title: 'AR Plate',
    category: 'Étude de marché · FoodTech',
    featured: false,
    description:
      "Validation marché d'un service d'amélioration de photos culinaires par IA : huit entretiens, test de quatre hypothèses, objections, sensibilité au prix et plan pilote.",
    longDescription:
      "Étude de marché consacrée à un service d’amélioration de photos culinaires par IA pour les restaurateurs, menée avant de développer une solution complète.\n\nQuestion de départ\nDe meilleures photos peuvent-elles créer assez de valeur pour qu’un restaurant adopte et paie un service dédié, sans rendre les plats artificiels ni ajouter une tâche complexe à l’équipe ?\n\nMéthode\nHuit entretiens ont été conduits avec des restaurateurs pour tester quatre hypothèses. Les échanges ont porté sur la qualité des photos existantes, les usages de livraison et de réseaux sociaux, les objections face aux images retouchées et la sensibilité au prix. Cinq risques principaux ont ensuite été classés pour préparer un pilote.\n\nRôle\nPréparation du guide d’entretien, conduite et synthèse des échanges, comparaison des réponses, analyse des objections et transformation des résultats en prochaines expériences.\n\nLivrable\nUne lecture structurée du marché et un plan de pilote, avec les hypothèses encore fragiles clairement séparées des constats répétés pendant les entretiens.\n\nPoints clés\n- 8 entretiens qualitatifs\n- 4 hypothèses testées\n- 5 risques classés\n- Analyse des objections et du prix\n- Plan pilote avant développement complet\n\nCe que j’en retiens\n- Poser des questions sur les pratiques passées plutôt que demander une intention vague\n- Une objection récurrente vaut plus qu’un compliment poli\n- Le niveau de retouche acceptable fait partie du produit, pas seulement du modèle IA",
    imageSrc: '/projects/ar-plate-editorial.png',
    color: '#EFE5DC',
    slug: 'ar-plate',
  },
  {
    id: '2',
    title: 'Beitea',
    description:
      'Stratégie marketing pour BEITEA (bubble tea, Champs-Élysées) : fidélisation, panier moyen et leviers sociaux/gamification, avec une logique testable (A/B, données comportementales).',
    longDescription:
      'Stratégie marketing terrain pour un point de vente à fort flux touristique : monter la fréquence et le panier sans alourdir le parcours d’achat, via leviers communautaires et ludiques.\n\nContexte\nBEITEA est positionné sur un axe à très forte affluence (Champs-Élysées) où la concurrence sur l’attention est forte : il faut créer des raisons de revenir et d’augmenter spontanément le ticket, pas seulement des promos génériques.\n\nSolution\nConstruction d’un funnel adapté au lieu de vente (TOFU / MOFU / BOFU) avec une boisson « mystère » pensée comme contenu partageable au milieu du parcours, et un jeu de type grattage après un seuil de panier pour inciter à dépasser un ticket cible (ex. +10 €). Le deck pitch (slides PNG ci-dessous) reprend cette narrative sous forme de présentation prête pour la soutenance — sans dépendre d’un lien Canva externe.\n\nRôle\nDéfinition des messages, des hypothèses testables et des indicateurs à suivre (panier, retour visite, engagement social possible) ; alignement entre concept marketing et faisabilité opérationnelle en point de vente.\n\nImpact\nLivrable prêt pour expérimenter et mesurer sur le terrain : grille d’AB testing lorsque les volumes le permettent, lecture des premiers signaux comportementaux plutôt que des promesses sans test.\n\nPoints clés\n- Funnel pensé pour du retail à fort passage\n- Levier social (mystère / contenu) + levier incitatif (seuil de panier)\n- Méthode : hypothèse → test → lecture des données\n- Deck matcha / café-beauté intégré à la page projet (bouton slideshow)\n\nCe que j’en retiens\n- Lier chaque idée à une métrique possible en magasin\n- Éviter les campagnes décoratives sans lien avec le panier\n- Itérer avec de petits tests plutôt qu’un gros bloc non mesuré',
    imageSrc: '/beitea-capture.png',
    featured: false,
    color: '#A8D5BA',
    slug: 'beitea',
    slideshowSrcs: beiteaSlideshowUrls(),
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
      "Plateforme web d’écriture assistée pour produire des articles sérieux sur la paie et les RH, conformes aux critères EEAT et au SEO, avec garde-foux sur le fond juridique avant publication.\n\nContexte\nHackathon scolaire : il fallait monter une démonstration crédible là où le contenu métier est sensible (paie, RH) et où le référencement naturel exige structure, cohérence et sources plutôt que du texte générique.\n\nSolution\nAgents orchestrés sur Dust pour générer et contrôler les thèmes (EEAT, SEO, vérifications légales), interface en React pour la recherche et la génération, maquettes et deck de soutenance disponibles sous forme de slides PNG sur cette page (à la place d’un fichier Canva externe) ; déploiement d’une démo sur Vercel.\n\nRôle\nConception des parcours d’agents et des prompts, intégration via API, structuration de la démo produit et narration de la valeur (qualité + vitesse vs rédaction manuelle).\n\nImpact\nArticles structurés et relisibles par un humain avant mise en ligne · démonstration fonctionnelle lors de la soutenance · 1er prix du hackathon · réalisation en solo.\n\nPoints clés\n- Chaîne EEAT : expertise, sources, prudence juridique\n- Dust + API pour industrialiser la génération contrôlée\n- Front React + déploiement Vercel\n- Deck de soutenance : slides PNG intégrées à la fiche projet\n\nCe que j’en retiens\n- Ne jamais confondre rapidité LLM et conformité métier\n- Isoler les étapes de génération et de contrôle\n- Associer démo web et restitution lisible (slides + lien produit)",
    imageSrc: '/payfit-slide-1.png',
    color: '#D7E6F6',
    slug: 'payfit-plateforme-articles-ia',
    slideshowSrcs: payfitSlideshowUrls(),
    link: [{ url: 'https://payfit-pied.vercel.app', label: 'Voir la démo' }],
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
      "Programme « agence » de contenu pour l’école : produire en continu sans diluer la voix de marque, en combinant générateurs IA et relecture humaine sur les zones sensibles.\n\nContexte\nBesoin institutionnel de volumes de contenus homogènes (posts, fiches, mails) sans embaucher une agence externe : il faut cadre, prompts, et process de validation interne.\n\nSolution\nAteliers de définition du tone of voice ; bibliothèque de prompts par type de livrable ; packs visuels cohérents retracés dans les slides PNG ci-dessous (présentation intégrée au site, sans lien Canva externe) ; document de référence partagé ; organisation en cellule projet (direction, technique, marketing, design) pour livrer un package complet.\n\nRôle\nContribution à la définition des consignes créatives, aux prompts, à la coordination des rôles et à la cohérence des livrables finaux.\n\nImpact\nUne chaîne reproductible : moins d’improvisation, plus de qualité par itération ; livrables utilisables tels quels pour communiquer sur l’école.\n\nPoints clés\n- Ton de voice explicite avant de scaler le volume\n- Prompts documentés (pas seulement dans la tête)\n- Séparation claire : contenu sensible vs contenu recyclable\n- Narration visuelle disponible en modale (slides du deck London / rouge beige)\n\nCe que j’en retiens\n- L’outil ne remplace pas le cadrage éditorial\n- La qualité vient du process avant le modèle\n- Une mini-structure forcée évite les zones grises entre rôles",
    imageSrc: '/neogen-ia.png',
    featured: false,
    color: '#D4C4B0',
    slug: 'neogen-ia',
    slideshowSrcs: neogenIaSlideshowUrls(),
    link: [
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
      "Proposition de plateforme d’activation commerciale : collecter des signaux, enrichir des leads, générer des messages personnalisés et piloter des campagnes depuis un écran unique.\n\nContexte\nHackathon Eugenia School autour d’un challenge Mirakl : industrialiser une prospection outbound sans sacrifier la personnalisation, à partir de données accessibles et d’outils d’IA générative.\n\nSolution\nChaîne bout-en-bout : collecte / scraping, nettoyage et enrichissement, génération d’e-mails et enchaînement des relances ; interface type « campaign dashboard » déployée sur Vercel ; pitch deck pour raconter l’histoire produit.\n\nRôle\nCo-conception du pipeline data → texte, de la démo et du récit pour le jury (business + technique).\n\nImpact\n1ers sur notre use case · 2e place au classement général · obtention d’une API OpenAI d’une valeur annoncée à 5 000 €.\n\nPoints clés\n- Dashboard montrable (pas seulement un script)\n- Storytelling aligné démo + deck\n- Automatisation avec contrôle sur le message\n- Objectif : preuve d’exécution en temps limité\n\nCe que j’en retiens\n- Toujours préparer une démo « cliquable » pour un hackathon\n- Séparer pipeline technique et narration investisseur\n- La valeur est dans la chaîne complète, pas dans un seul prompt",
    imageSrc: '/mirakl-hackathon.png',
    color: '#D5F0EA',
    slug: 'hackathon-mirakl',
    link: [{ url: 'https://mirakl.vercel.app', label: 'Voir le dashboard' }],
    extraLink: {
      url: 'https://www.mirakl.com/',
      label: 'Mirakl — entreprise & marketplace B2B',
    },
  },
];
