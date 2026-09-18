import type { MetadataRoute } from 'next';
import { getProjectsWithSlug } from '@/lib/projects';
import { SITE_URL } from '@/lib/seo';
import { services } from '@/data/services';
import { guides } from '@/data/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/projects`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectPages: MetadataRoute.Sitemap = getProjectsWithSlug().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const contentPages: MetadataRoute.Sitemap = [
    ...services.map(service => ({ url: `${siteUrl}/services/${service.slug}` })),
    ...guides.map(guide => ({ url: `${siteUrl}/guides/${guide.slug}` })),
  ];
  return [...staticPages, ...projectPages, ...contentPages];
}
