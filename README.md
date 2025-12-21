# Portfolio "Solaire & Calme"

Portfolio créatif et élégant construit avec Next.js 15, TypeScript strict, et une architecture modulaire basée sur les composants atomiques.

## 🚀 Stack Technique

- **Next.js 15** (App Router) avec TypeScript strict
- **Tailwind CSS** pour le styling
- **Framer Motion** pour les animations d'entrée et transitions
- **GSAP** pour les animations complexes (Text Mask, Scroll Triggers)
- **Lenis** pour le smooth scroll

## 📁 Architecture

Le projet suit une architecture atomique (atoms/molecules/organisms) :

```
src/
├── app/              # Pages et layouts Next.js
├── components/
│   ├── atoms/        # Composants atomiques (Button, Text, Card)
│   ├── molecules/    # Composants moléculaires (ProjectCard, EmptySlot)
│   ├── organisms/    # Composants complexes (ProjectGrid, Header, Footer)
│   └── providers/    # Providers React (LenisProvider)
├── data/             # Données centralisées (projects.ts)
├── lib/              # Utilitaires (animations, constants)
└── types/            # Types TypeScript
```

## 🎨 Palette de Couleurs

- **Background principal** : #FDFCF0 (créme)
- **Texte principal** : Nuances de brun/gris doux
- **Accents** : Tons dorés/sable subtils (#D4A574)

## 📝 Système de Données

Toutes les données des projets sont centralisées dans `src/data/projects.ts`. 

Pour ajouter un projet, modifiez simplement ce fichier :

```typescript
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Nom du projet',
    description: 'Description du projet',
    image: '/images/project-1.jpg',
    tags: ['React', 'TypeScript'],
    link: 'https://example.com',
    year: 2024,
  },
];
```

Si aucun projet n'est défini, la grille affichera automatiquement des "Empty Slots" stylisés pour faciliter l'ajout futur.

## 🚀 Développement

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build de production
npm run build

# Démarrage en production
npm start

# Linting
npm run lint
```

## ✨ Fonctionnalités

- ✅ Architecture modulaire et réutilisable
- ✅ Animations fluides avec Framer Motion et GSAP
- ✅ Smooth scroll avec Lenis
- ✅ Effet Text Mask avec GSAP
- ✅ Optimisations performance (lazy loading, images optimisées)
- ✅ Accessibilité WCAG (navigation clavier, ARIA labels)
- ✅ SEO optimisé (metadata, sitemap, robots.txt)
- ✅ Responsive design (mobile-first)
- ✅ TypeScript strict mode

## 🎯 Performance

Le projet est optimisé pour atteindre 100/100 sur Lighthouse :
- Images optimisées avec next/image
- Lazy loading des composants
- Optimisation des animations (will-change, transform)
- Code splitting automatique

## ♿ Accessibilité

- Navigation clavier complète
- ARIA labels appropriés
- Contraste de couleurs respectant WCAG AA
- Support de `prefers-reduced-motion`
- Support de `prefers-contrast`

## 📄 Licence

Ce projet est privé.

