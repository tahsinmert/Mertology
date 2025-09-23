import Image from "next/image";
import Link from "next/link";
import { fetchAuthors } from "@/lib/sanity/fetchers";
import { urlForImage } from "@/lib/sanity/image";
import PageTransition from "../components/PageTransition";

export default async function AboutPage() {
  const authors = await fetchAuthors();
  return (
    <PageTransition>
      <main className="px-6 md:px-10 lg:px-16 py-16">
      <article className="max-w-4xl mx-auto text-center">
        <h1 className="font-serif text-5xl md:text-6xl leading-tight">About Mertology</h1>
        <p className="mt-5 text-lg text-zinc-700 dark:text-zinc-300">
          Mertology is a minimal, typography-first magazine blog. The content takes center stage—crafted with generous whitespace,
          measured rhythms, and a quietly confident grid.
        </p>
        <p className="mt-3 text-lg text-zinc-700 dark:text-zinc-300">
          We explore design, culture, travel, and technology with editorial clarity and a modern aesthetic.
        </p>
      </article>

      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="font-serif text-3xl mb-6">Authors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {authors.map((a: any) => (
            <Link key={a.slug} href={`/author/${a.slug}`} className="group rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <div className="flex items-center gap-5">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900 ring-1 ring-zinc-200 dark:ring-zinc-800">
                  {a.avatar ? (
                    <Image src={urlForImage(a.avatar).width(240).height(240).url()} alt={a.name} width={96} height={96} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <h3 className="font-serif text-2xl group-hover:opacity-80">{a.name}</h3>
                  {a.bio ? <p className="text-sm text-zinc-500 line-clamp-2">{a.bio}</p> : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      </main>
    </PageTransition>
  );
}


