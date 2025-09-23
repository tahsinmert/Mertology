import Link from "next/link";
import Image from "next/image";
import { fetchSearch } from "@/lib/sanity/fetchers";
import { getAllArticles } from "@/lib/mock";
import { urlForImage } from "@/lib/sanity/image";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const term = searchParams.q?.trim() || "";
  const results = term
    ? (await fetchSearch(term))
    : [];
  const fallback = term ? (await getAllArticles()).filter((a) => a.title.toLowerCase().includes(term.toLowerCase())) : [];
  const items = results.length ? results : fallback;

  return (
    <main className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <h1 className="font-serif text-3xl md:text-5xl">Search {term ? `“${term}”` : ""}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {items.map((a) => (
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
      </div>
    </main>
  );
}


