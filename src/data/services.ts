export type Service = {
  slug: string; label: string; title: string; seoTitle: string; description: string; intro: string;
  needs: string[]; deliverables: string[]; steps: { title: string; text: string }[];
  projects: { slug: string; title: string; context: string; text: string }[];
  questions: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'creation-site-internet', label: 'Sites internet',
    title: 'Un site internet pour présenter votre activité et vous contacter facilement.',
    seoTitle: 'Création de site internet freelance pour entreprises',
    description: 'Création de site internet pour indépendants et petites entreprises : site vitrine sur mesure, contenus faciles à modifier et parcours de contact clair.',
    intro: 'Vous avez une activité, mais pas encore de site clair pour la présenter ? Je crée votre site internet autour de ce que vos clients ont besoin de savoir : ce que vous faites, pour qui, et comment vous joindre. Je travaille à distance avec des indépendants et entreprises partout en France.',
    needs: ['Présenter vos prestations sans devoir tout réexpliquer à chaque contact.', 'Rassurer les visiteurs avec des exemples de votre travail et des informations précises.', 'Mettre à jour vos textes ou publier des articles sans dépendre de quelqu’un à chaque fois.'],
    deliverables: ['Un site vitrine sur mesure, lisible sur téléphone, tablette et ordinateur.', 'Des pages organisées autour de vos services et d’un parcours de contact simple.', 'Un espace de gestion des contenus si votre activité le nécessite.', 'Les bases du référencement : titres, descriptions, structure des pages et sitemap.', 'La mise en ligne et une prise en main pour les mises à jour prévues dans le projet.'],
    steps: [
      { title: 'Comprendre votre activité', text: 'Nous choisissons les publics, les pages utiles et l’action attendue : appeler, écrire ou prendre rendez-vous.' },
      { title: 'Organiser et construire', text: 'Je structure les contenus, propose une direction visuelle puis développe le site. Vous validez les étapes avant de poursuivre.' },
      { title: 'Tester et mettre en ligne', text: 'Nous vérifions le site sur mobile, les liens et les contacts. Je vous explique ensuite comment gérer les contenus prévus.' },
    ],
    projects: [{ slug: 'auralife', title: 'Auralife', context: 'Site client en production', text: 'Un site pour présenter une activité d’accompagnement, avec blog administrable, gestion des messages et demande d’avis après rendez-vous.' }],
    questions: [
      { question: 'Puis-je modifier mon site moi-même ?', answer: 'Oui, si un espace de gestion est prévu. Nous définissons ensemble les éléments que vous souhaitez modifier : textes, articles, témoignages ou services.' },
      { question: 'Combien coûte la création d’un site internet ?', answer: 'Le prix dépend des pages, des contenus et des fonctions nécessaires. Après un échange sur votre besoin, je vous propose un périmètre et un devis. Les frais d’hébergement et des services externes sont distingués.' },
      { question: 'Le site sera-t-il visible sur Google ?', answer: 'Je prépare les éléments techniques qui permettent aux moteurs de comprendre le site. Le classement dépend aussi des contenus, de la concurrence et de la notoriété : aucune position n’est garantie.' },
    ],
  },
  {
    slug: 'automatisation', label: 'Automatisations',
    title: 'Automatisez les tâches qui vous prennent du temps.',
    seoTitle: 'Automatisation de tâches et assistants IA pour entreprise',
    description: 'Automatisez vos tâches répétitives, relances et échanges entre outils. Accompagnement freelance avec Make, n8n et assistants IA Dust selon vos besoins.',
    intro: 'Recopier des informations, envoyer les mêmes relances, préparer un rapport chaque semaine : ces tâches prennent de la place dans votre journée. Je vous aide à choisir lesquelles automatiser, puis à connecter vos outils avec des règles compréhensibles. L’IA n’est ajoutée que lorsqu’elle est utile.',
    needs: ['Automatiser les tâches administratives répétitives d’une petite entreprise.', 'Transmettre les informations entre un formulaire, un tableur et vos outils de suivi.', 'Automatiser les relances clients en gardant le contrôle sur les destinataires et les messages.', 'Retrouver une information dans vos documents ou préparer une synthèse avec un assistant IA.'],
    deliverables: ['Un processus décrit simplement : déclencheur, données utilisées, résultat attendu et exceptions.', 'Des automatisations Make, n8n ou des connexions par API selon vos outils et contraintes.', 'Des contrôles pour éviter les doublons et signaler les échecs.', 'Une étape de validation humaine pour les actions sensibles.', 'Des tests sur vos cas d’usage et une documentation pour reprendre la main.'],
    steps: [
      { title: 'Choisir une tâche précise', text: 'Nous regardons la fréquence, le temps passé et les erreurs possibles. Nous commençons par un besoin limité, pas par toute l’entreprise.' },
      { title: 'Relier les bons outils', text: 'Je construis le scénario, avec les autorisations nécessaires et les cas où une personne doit intervenir. Les abonnements éventuels sont identifiés avant validation.' },
      { title: 'Tester avant d’activer', text: 'Nous essayons des données manquantes, des doublons et des indisponibilités. L’activation se fait après validation ; la maintenance est définie avec vous.' },
    ],
    projects: [
      { slug: 'auralife', title: 'Auralife', context: 'Projet client', text: 'Une demande d’avis envoyée automatiquement après un rendez-vous, intégrée à un site administrable.' },
      { slug: 'hackathon-mirakl', title: 'Hackathon Mirakl', context: 'Prototype de hackathon scolaire', text: 'Une chaîne de collecte, d’enrichissement et de préparation de messages personnalisés, présentée avec une interface de campagne.' },
      { slug: 'payfit-plateforme-articles-ia', title: 'Hackathon PayFit', context: 'Projet scolaire avec Dust', text: 'Des agents Dust et une interface React pour préparer des articles paie et RH. La génération est séparée des contrôles et de la relecture humaine.' },
    ],
    questions: [
      { question: 'Faut-il utiliser l’IA pour automatiser ?', answer: 'Non. Une règle simple suffit souvent pour envoyer un rappel ou copier une donnée. Un assistant IA devient pertinent pour traiter du texte ou rechercher dans des documents, avec des vérifications adaptées.' },
      { question: 'Make, n8n ou Dust : comment choisir ?', answer: 'Make et n8n servent notamment à enchaîner des actions entre vos outils. Dust sert à créer des assistants IA reliés à un contexte d’entreprise. Le choix dépend du besoin, des accès, des données et du budget, pas d’un outil imposé.' },
      { question: 'Que se passe-t-il si une automatisation échoue ?', answer: 'Le fonctionnement attendu, les alertes et la reprise manuelle sont définis dès la conception. Un changement dans un outil externe peut demander une adaptation : le suivi après livraison doit être prévu dans le périmètre.' },
    ],
  },
  {
    slug: 'application-sur-mesure', label: 'Applications sur mesure',
    title: 'Un outil sur mesure pour simplifier votre travail.',
    seoTitle: 'Création d’application web et outil de gestion sur mesure',
    description: 'Développement d’application métier sur mesure : centralisez vos données, remplacez vos fichiers Excel dispersés et créez un outil adapté à votre équipe.',
    intro: 'Vos informations sont réparties entre plusieurs fichiers ? Vos équipes ne savent plus quelle version utiliser ? Je développe une application web adaptée à votre manière de travailler, ou une première version de votre idée pour la tester avec ses futurs utilisateurs.',
    needs: ['Remplacer des fichiers Excel devenus difficiles à partager et à maintenir.', 'Centraliser des dossiers, des opérations ou des données dans un outil de gestion pour entreprise.', 'Donner à chaque personne les bons accès, sans tout partager avec tout le monde.', 'Tester une nouvelle application avec un périmètre utile et limité.'],
    deliverables: ['Un parcours défini avec les utilisateurs et les fonctions prioritaires.', 'Une application web utilisable sur les écrans prévus pour votre activité.', 'Une base de données structurée et des droits d’accès adaptés aux rôles.', 'La reprise des données existantes et les exports convenus dans le périmètre.', 'Des tests, une documentation de prise en main et des conditions de suivi explicites.'],
    steps: [
      { title: 'Partir du travail réel', text: 'Nous regardons vos fichiers, les étapes du processus et les personnes concernées. Un logiciel existant peut suffire : le sur-mesure doit répondre à un vrai manque.' },
      { title: 'Construire une première version', text: 'Je développe les parcours essentiels et organise les données. Nous validons rapidement avec les utilisateurs, avant d’ajouter des fonctions.' },
      { title: 'Vérifier et transmettre', text: 'Nous testons les droits, les imports, les erreurs et les usages mobiles. La livraison inclut la prise en main et un cadre pour les évolutions.' },
    ],
    projects: [
      { slug: 'brasserie-de-tahiti', title: 'Brasserie de Tahiti', context: 'Stage de huit semaines', text: 'Cinq applications métiers : investissements, flotte et carburant, sécurité terrain, données et pilotage informatique.' },
      { slug: 'ping-pang', title: 'Ping Pang', context: 'Architecture de données', text: 'Une base commune pour les joueurs et les classements, avec imports multi-sources, règles de sécurité et calcul Glicko-2 testé.' },
      { slug: 'ecrire-son-livre', title: 'Écrire son livre', context: 'Application privée pour une cliente', text: 'Un parcours qui va de l’enregistrement vocal au manuscrit structuré, avec transcription, assistance éditoriale et export Word.' },
    ],
    questions: [
      { question: 'Faut-il forcément remplacer Excel ?', answer: 'Non. Si un tableur bien structuré répond au besoin, il vaut mieux le conserver. Une application devient intéressante lorsque les droits, les contrôles ou le travail à plusieurs dépassent ce que vos fichiers gèrent simplement.' },
      { question: 'Peut-on commencer petit ?', answer: 'Oui. Nous choisissons un premier parcours complet à tester, puis nous décidons des évolutions à partir des retours. Cela évite de développer d’emblée des fonctions peu utilisées.' },
      { question: 'Est-ce une application mobile ?', answer: 'L’offre porte sur les applications web accessibles depuis un navigateur. Les usages sur téléphone sont prévus selon le projet ; une application native publiée sur les stores constitue un autre périmètre.' },
    ],
  },
];

export function getService(slug: string) { return services.find(service => service.slug === slug); }
