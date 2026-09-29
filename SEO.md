# Référencement de Cochod Elevate

## Identité et contenu

- URL publique unique : https://www.cochodelevate.com.
- Trois offres de même importance, pour des clients partout en France : sites internet, automatisations et applications web sur mesure.
- Les trois pages de services et les quatre guides sont définis dans `src/data/services.ts` et `src/data/guides.ts` ; ils sont pré-rendus, accessibles sans JavaScript et ajoutés au sitemap.
- Dust est présenté comme un outil d’assistants IA, avec le projet scolaire PayFit comme exemple explicite. Aucun partenariat ou certification revendiqué.
- Les descriptions SEO des onze projets sont rédigées dans `src/data/projectSeo.ts`. Lors de l’ajout d’un projet, ajouter son entrée et ses services associés.
- Aucune liste artificielle de mots-clés ou page locale dupliquée ; un sujet principal par page.

## Contrôles de publication

1. Exécuter `npm run build` puis `npm run start -- --hostname localhost --port 3004`.
2. Exécuter `npm run check:seo`. Le script contrôle les 23 pages (21 existantes et 2 pages légales), les métadonnées uniques, les images de partage, les liens internes, le sitemap, les données structurées, les contacts et les erreurs 404.
3. Vérifier également le site publié avec `CHECK_URL=https://www.cochodelevate.com npm run check:seo`.
4. Tester visuellement le menu, les services, les guides, les projets et le contact à 320 et 390 px, puis sur ordinateur. Les animations restent désactivées sur les appareils tactiles et en réduction de mouvement.
5. Vérifier les redirections 308 des deux alias publics `portfolio-v2-1-xi.vercel.app` et `portfolio-v2-1-9bch.vercel.app`, en conservant chemin et paramètres. Les prévisualisations ne sont pas redirigées. L’ancien alias xi a été rattaché de nouveau au projet le 29 septembre 2026.

Les tests ne prouvent pas l’indexation réelle par Google. Les données structurées décrivent le contenu, sans garantir d’enrichissement des résultats. Aucun faux `lastModified` n’est envoyé dans le sitemap.

## Search Console : situation vérifiée le 29 septembre 2026

La propriété est configurée et le sitemap était accepté le 28 septembre, avec 21 pages découvertes avant ajout des pages légales. « Découvertes » ne signifie pas « indexées ». Ne pas recréer la propriété ni resoumettre inutilement le sitemap.

L’audit du 29 septembre relevait 3 clics, 5 impressions, un CTR de 60 % et une position moyenne de 1 sur la période affichée. Cet échantillon est trop faible pour conclure à une visibilité commerciale ou hors marque. Conserver les dates et filtres de chaque futur relevé pour rendre les comparaisons valides.

Inspecter l’accueil, les trois services et les quatre guides ; vérifier l’exploration et la canonical sélectionnée. Demander l’indexation des pages clés seulement si nécessaire, sans répéter les demandes.

Sources : [validation de propriété](https://support.google.com/webmasters/answer/9008080?hl=fr), [rapport sur les sitemaps](https://support.google.com/webmasters/answer/7451001?hl=fr).

## Suivi manuel à 30, 60 et 90 jours

Après les améliorations du 29 septembre, les points de contrôle manuels sont prévus les 29 octobre, 28 novembre et 28 décembre 2026. Aucune automatisation récurrente n’est créée.

À chaque point, relever la période, les pages indexées, les impressions, les clics, le CTR et les positions par requête et par offre. Séparer les recherches de marque (Cochod Elevate / Clément Cochod et variantes) des autres recherches. Comparer des périodes de durée égale ; ne pas confondre absence de données et zéro trafic.

Tenir en parallèle un relevé des demandes réellement reçues : date, service demandé, origine déclarée et qualification. Un clic sur le mail ne prouve pas qu’une demande a été envoyée. Aucun traceur ou abonnement payant n’a été ajouté.

Utiliser ces résultats pour améliorer d’abord les pages déjà visibles : adéquation titre/contenu, réponses aux questions réelles, exemples et parcours de contact. Ne pas promettre une position ou un volume de prospects.
