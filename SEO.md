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
2. Exécuter `npm run check:seo`. Le script contrôle les 21 pages, les métadonnées uniques, les images de partage, les liens internes, le sitemap, les données structurées, les contacts et les erreurs 404.
3. Vérifier également le site publié avec `CHECK_URL=https://www.cochodelevate.com npm run check:seo`.
4. Tester visuellement le menu, les services, les guides, les projets et le contact à 320 et 390 px, puis sur ordinateur. Les animations restent désactivées sur les appareils tactiles et en réduction de mouvement.
5. Vérifier que l’ancien domaine public Vercel redirige en 308 en conservant le chemin et les paramètres. La règle porte uniquement sur `portfolio-v2-1-xi.vercel.app`, pas sur toutes les prévisualisations.

Les tests ne prouvent pas l’indexation réelle par Google. Les données structurées décrivent le contenu, sans garantir d’enrichissement des résultats. Aucun faux `lastModified` n’est envoyé dans le sitemap.

## Search Console : étape dépendant du compte propriétaire

Le propriétaire a indiqué le 18 septembre 2026 que le site n’est pas encore ajouté. Aucun accès Search Console ni jeton de validation n’est disponible dans ce projet. Ne pas inventer de métriques de trafic ou de classement.

1. Ouvrir https://search.google.com/search-console avec le compte Google du propriétaire.
2. Ajouter une propriété **Domaine** : `cochodelevate.com` (sans protocole).
3. Copier exactement l’enregistrement TXT fourni par Google et l’ajouter chez le fournisseur DNS, sans modifier les enregistrements existants. Cette valeur propre au compte doit être fournie avant toute intervention DNS.
4. Valider la propriété, puis soumettre `https://www.cochodelevate.com/sitemap.xml`.
5. Inspecter l’accueil, les trois services et les quatre guides ; vérifier l’exploration et l’adresse canonique sélectionnée. Demander l’indexation des pages clés sans répéter inutilement les demandes.

Sources : [validation de propriété](https://support.google.com/webmasters/answer/9008080?hl=fr), [rapport sur les sitemaps](https://support.google.com/webmasters/answer/7451001?hl=fr).

## Suivi manuel à 30, 60 et 90 jours

Les points de contrôle sont prévus les 18 octobre, 17 novembre et 17 décembre 2026, à décaler si la validation du domaine intervient plus tard. Aucun suivi automatique n’est activé sans accès aux données.

À chaque point, relever la période, les pages indexées, les impressions, les clics, le CTR et les positions par requête et par offre. Séparer les recherches de marque (Cochod Elevate / Clément Cochod et variantes) des autres recherches. Comparer des périodes de durée égale ; ne pas confondre absence de données et zéro trafic.

Tenir en parallèle un relevé des demandes réellement reçues : date, service demandé, origine déclarée et qualification. Un clic sur le mail ne prouve pas qu’une demande a été envoyée. Aucun traceur ou abonnement payant n’a été ajouté.

Utiliser ces résultats pour améliorer d’abord les pages déjà visibles : adéquation titre/contenu, réponses aux questions réelles, exemples et parcours de contact. Ne pas promettre une position ou un volume de prospects.
