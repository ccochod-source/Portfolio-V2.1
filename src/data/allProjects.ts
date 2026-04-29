import { parallaxProjects, type ParallaxProject } from '@/data/parallaxProjects';
import { analyseAccidentologieSlideshowUrls } from '@/data/analyseAccidentologieSlidesOrder';

const accidentologieProject: ParallaxProject = {
  id: 'accidentologie',
  title: 'Analyse Accidentologie',
  slug: 'analyse-accidentologie',
  description:
    'Exploration géographique de l’accidentologie française (BAAC) avec comparaison métropole / outre-mer — signal fort sur les écarts de risque après lecture territoriale sérieuse.',
  longDescription:
    "Étude de données territoriales pour relier géographie routière et indicateurs de sévérité, sans s’arrêter à une carte décorative sans interprétation.\n\nContexte\nLa sécurité routière varie fortement selon les territoires ; les séries nationales peuvent masquer des écarts structurels entre métropole et outre-mer. Travail conduit sur la base BAAC comme socle officiel permettant des agrégations comparables.\n\nSolution\nConstruction d’analyses géographiques et territoriales à partir du BAAC 2024 ; croisement avec quelques corrélats (densité urbaine, profil géographique) lorsque défendables ; mise en évidence de zones à vigilance renforcée et d’un rapport cohérent métropole / outre-mer. Synthèse visuelle disponible sous forme de slides PNG intégrées à cette page (bouton slideshow), sans lien Canva externe ; données retravaillées dans Sheets.\n\nRôle\nConstruction des indicateurs ; choix des agrégats prudents ; rédaction d’un récit vérifiable chiffré ; livraison lisible décideur avec tableaux annexes sous Sheets.\n\nImpact\nMessage principal quantifié : après traitement et périmètres présentés dans le livrable, le taux de tués peut apparaître environ 5,7 fois plus élevé outre-mer qu’en métropole selon les calculs documentés — un signal mobilisable dans la concertation territoriale.\n\nPoints clés\n- Lecture territoriale défendable plutôt qu’heatmap « décorative »\n- Prudence méthodo sur tout ce qui mérite normalisation ou volume-km\n- Données sources traçables (BAAC)\n- Narration noir & crème : deck pitch intégré au portfolio\n\nCe que j’en retiens\n- Toujours expliciter l’agrégation avant de comparer deux territoires\n- Séparer corrélats plausibles et causalité forte\n- Ouvrir le débat public avec des ordres de grandeur robustes plus qu’avec des moyennes n nationales trop lissées",
  imageSrc: '/accidentologie.png',
  color: '#F5E6D3',
  slideshowSrcs: analyseAccidentologieSlideshowUrls(),
  link: [
    {
      url: 'https://docs.google.com/spreadsheets/d/1JZKTVJMfaLkBYb8Slpvts0pnSDhyRS8baDxn33wMP68/edit?usp=sharing',
      label: 'Voir les données',
    },
  ],
  extraLink: {
    url: 'https://www.data.gouv.fr/fr/datasets/base-de-donnees-accidents-corporels-de-la-circulation/',
    label: 'Jeu de données ouvert (réf. BAAC)',
  },
};

export const allProjects: ParallaxProject[] = [...parallaxProjects, accidentologieProject];
