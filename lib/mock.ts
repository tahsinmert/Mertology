export type Article = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
  author: string;
  date: string;
  bodyHtml: string;
};

import categoriesJson from "@/data/categories.json" assert { type: "json" };
import articlesJson from "@/data/articles.json" assert { type: "json" };

const categories = categoriesJson as unknown as string[];
const articles = articlesJson as unknown as Article[];

export async function getAllCategories(): Promise<string[]> {
  return categories as unknown as string[];
}

export async function getArticlesByCategory(slug: string, page = 1, perPage = 9) {
  const name = slug[0].toUpperCase() + slug.slice(1);
  const filtered = articles.filter((a) => a.category.toLowerCase() === name.toLowerCase());
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);
  return { items, totalPages };
}

export async function getAllArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return articles.find((a) => a.slug === slug) ?? null;
}


