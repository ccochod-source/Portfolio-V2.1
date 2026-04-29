import { allProjects } from '@/data/allProjects';
import type { ParallaxProject } from '@/data/parallaxProjects';

export type ProjectWithSlug = ParallaxProject & { slug: string };

export function getProjectsWithSlug(): ProjectWithSlug[] {
  return allProjects.filter((p): p is ProjectWithSlug =>
    typeof (p as ParallaxProject & { slug?: string }).slug === 'string' &&
    Boolean((p as ParallaxProject & { slug?: string }).slug),
  );
}

export function getProjectBySlug(slug: string): ProjectWithSlug | undefined {
  return getProjectsWithSlug().find((p) => p.slug === slug);
}
