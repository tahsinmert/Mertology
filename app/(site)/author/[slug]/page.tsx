import Image from "next/image";
import Link from "next/link";
import { fetchAuthorBySlug, fetchArticlesByAuthor } from "@/lib/sanity/fetchers";
import { urlForImage } from "@/lib/sanity/image";

export default async function AuthorPage({ params }: { params: { slug: string } }) {
  const author = await fetchAuthorBySlug(params.slug);
  if (!author) return null;
  const articles = await fetchArticlesByAuthor(params.slug);

  return (
    <main className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <section className="max-w-4xl mx-auto flex items-center gap-6">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
          {author.avatar ? (
            <Image src={urlForImage(author.avatar).width(160).height(160).url()} alt={author.name} width={80} height={80} className="h-full w-full object-cover" />
          ) : null}
        </div>
        <div>
          <h1 className="font-serif text-3xl md:text-5xl">{author.name}</h1>
          {author.bio ? <p className="text-zinc-600 dark:text-zinc-400 mt-2">{author.bio}</p> : null}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {articles.map((a) => (
          <Link key={a.slug} href={`/article/${a.slug}`} className="group">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <Image src={typeof a.image === "string" ? a.image : urlForImage(a.image).width(1200).height(900).url()} alt={a.title} width={1200} height={900} className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs tracking-widest uppercase text-zinc-500">{a.category}</span>
              <h3 className="font-serif text-xl leading-snug group-hover:opacity-80">{a.title}</h3>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}


