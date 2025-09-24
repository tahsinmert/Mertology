import ArticleCard from "@/app/(site)/components/ArticleCard";
import type { Metadata } from "next";
import Pagination from "@/app/(site)/components/Pagination";
import PageTransition from "@/app/(site)/components/PageTransition";
import { getArticlesByCategory, getAllCategories } from "@/lib/mock";
import { fetchAllCategories, fetchArticlesByCategory } from "@/lib/sanity/fetchers";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || 1);
  const fromSanity = await fetchArticlesByCategory(params.slug);
  const list = fromSanity.length ? fromSanity : (await getArticlesByCategory(params.slug, page)).items;
  const totalPages = Math.max(1, Math.ceil(list.length / 9));
  const items = list.slice((page - 1) * 9, page * 9);

  return (
    <PageTransition>
      <main className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="font-serif text-3xl md:text-5xl capitalize">{params.slug}</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {items.map((a) => (
          <ArticleCard key={a.slug} slug={a.slug} title={a.title} category={a.category} excerpt={a.excerpt} image={a.image} />
        ))}
      </div>

      <Pagination basePath={`/category/${params.slug}`} page={page} totalPages={totalPages} />
      </main>
    </PageTransition>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const title = `${params.slug} — Category`;
  const desc = `Read the latest articles in ${params.slug} on Mertology.`;
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://mertology.netlify.app";
  return {
    title,
    description: desc,
    openGraph: { title, description: desc, url: `${url}/category/${params.slug}` },
    twitter: { title, description: desc },
  };
}


