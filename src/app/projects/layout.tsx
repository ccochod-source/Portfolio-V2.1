import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Projets web, applications et automatisations',
  'Parcourez mes réalisations : sites clients, applications métiers, automatisations et projets IA. Découvrez le contexte et mon rôle sur chaque projet.', '/projects');

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
