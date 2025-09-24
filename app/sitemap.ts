import type { MetadataRoute } from 'next';
import { fetchAllArticles, fetchAllCategories } from '@/lib/sanity/fetchers';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://mertology.netlify.app';
  const articles = await fetchAllArticles();
  const categories = await fetchAllCategories();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/subscribe',
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const articleRoutes: MetadataRoute.Sitemap = (articles || []).map((a: any) => ({
    url: `${base}/article/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((c: any) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...categoryRoutes];
}


