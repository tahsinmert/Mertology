import { sanityClient } from "./client";
import { allArticlesQuery, articleBySlugQuery, byCategoryQuery, allCategoriesQuery, searchArticlesQuery, allAuthorsQuery, authorBySlugQuery, articlesByAuthorQuery } from "./queries";
import type { Article } from "@/lib/mock";

export async function fetchAllArticles(): Promise<Article[]> {
  const data = await sanityClient.fetch(allArticlesQuery);
  return (data as any[]).map((d) => ({
    ...d,
    image: d.coverImage ? d.coverImage : d.image,
  })) as unknown as Article[];
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  const data = await sanityClient.fetch(articleBySlugQuery, { slug });
  if (!data) return null;
  const mapped = { ...data, image: data.coverImage ? data.coverImage : data.image } as any;
  return mapped as Article;
}

export async function fetchArticlesByCategory(slug: string): Promise<Article[]> {
  const data = await sanityClient.fetch(byCategoryQuery, { slug });
  return (data as any[]).map((d) => ({
    ...d,
    image: d.coverImage ? d.coverImage : d.image,
  })) as unknown as Article[];
}

export type CategoryRef = { title: string; slug: string };

export async function fetchAllCategories(): Promise<CategoryRef[]> {
  const data = await sanityClient.fetch(allCategoriesQuery);
  return data as CategoryRef[];
}

export async function fetchSearch(term: string): Promise<Article[]> {
  const data = await sanityClient.fetch(searchArticlesQuery, { term: `*${term}*` });
  return (data as any[]).map((d) => ({ ...d, image: d.coverImage ? d.coverImage : d.image })) as unknown as Article[];
}

export async function fetchAuthors(): Promise<any[]> {
  return sanityClient.fetch(allAuthorsQuery);
}

export async function fetchAuthorBySlug(slug: string): Promise<any | null> {
  return sanityClient.fetch(authorBySlugQuery, { slug });
}

export async function fetchArticlesByAuthor(slug: string): Promise<Article[]> {
  const data = await sanityClient.fetch(articlesByAuthorQuery, { slug });
  return (data as any[]).map((d) => ({ ...d, image: d.coverImage ? d.coverImage : d.image })) as unknown as Article[];
}


