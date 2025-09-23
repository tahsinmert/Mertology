import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug as getArticleBySlugMock, getAllArticles as getAllArticlesMock } from "@/lib/mock";
import { fetchArticleBySlug, fetchAllArticles } from "@/lib/sanity/fetchers";
import { urlForImage } from "@/lib/sanity/image";
import PortableRenderer from "./Portable";
import PageTransition from "../../components/PageTransition";
import ReadingMode from "../../components/ReadingMode";

export async function generateStaticParams() {
  const all = (await fetchAllArticles()).length ? await fetchAllArticles() : await getAllArticlesMock();
  return all.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = (await fetchArticleBySlug(params.slug)) || (await getArticleBySlugMock(params.slug));
  if (!article) return notFound();

  return (
    <PageTransition>
      <ReadingMode 
        title={article.title}
        author={article.author}
        publishedAt={new Date(article.date).toLocaleDateString()}
      >
        <article className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
        <header className="max-w-3xl mx-auto text-center">
          <span className="text-xs tracking-widest uppercase text-zinc-500">{article.category}</span>
          <h1 className="font-serif text-4xl md:text-6xl mt-3 leading-tight">{article.title}</h1>
          <div className="flex items-center justify-center gap-3 mt-4">
            {(article as any).authorAvatar ? (
              <Link href={`/author/${(article as any).authorSlug || ""}`} className="flex items-center gap-3 hover:opacity-80">
                <span className="h-8 w-8 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <Image src={urlForImage((article as any).authorAvatar).width(64).height(64).url()} alt={article.author} width={32} height={32} className="h-full w-full object-cover" />
                </span>
                <span className="text-sm text-zinc-500">{article.author}</span>
              </Link>
            ) : (
              <Link href={`/author/${(article as any).authorSlug || ""}`} className="text-sm text-zinc-500 hover:opacity-80">{article.author}</Link>
            )}
            <span className="text-sm text-zinc-400">— {new Date(article.date).toLocaleDateString()}</span>
          </div>
        </header>
        <div className="max-w-5xl mx-auto mt-10">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
            <Image src={typeof article.image === "string" ? article.image : urlForImage(article.image).width(1600).height(900).url()} alt={article.title} width={1600} height={900} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-10 prose-custom prose-columns prose-dropcap">
          {article.bodyHtml ? (
            <div dangerouslySetInnerHTML={{ __html: article.bodyHtml as unknown as string }} />
          ) : (
            <PortableRenderer value={(article as any).content} />
          )}
        </div>
        </article>
      </ReadingMode>
    </PageTransition>
  );
}


