import Image from "next/image";
import Link from "next/link";
import { fetchAllArticles, fetchAllCategories } from "@/lib/sanity/fetchers";
import { urlForImage } from "@/lib/sanity/image";
import CategoriesShowcase from "@/app/(site)/components/CategoriesShowcase";
import PageTransition from "@/app/(site)/components/PageTransition";
import { getAllArticles as getAllArticlesMock } from "@/lib/mock";

export default async function Home() {
  const categoriesRaw = (await fetchAllCategories()).length ? await fetchAllCategories() : ["Design", "Culture", "Travel", "Technology"];
  const all = (await fetchAllArticles()).length ? await fetchAllArticles() : await getAllArticlesMock();
  const featured = all.find((a: any) => (a as any).spotlight) || all[0];
  const trending = all.filter((a: any) => (a as any).trending).slice(0, 5);
  const editors = all.filter((a: any) => (a as any).editorsPick).slice(0, 4);
  const secondary = all.filter((a) => a.slug !== featured?.slug).slice(0, 2);
  const latest = all.filter((a) => a.slug !== featured?.slug).slice(0, 6);

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground">
      {/* Hero Featured Section */}
      <section className="px-6 md:px-10 lg:px-16 py-10 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {featured ? (
          <Link href={`/article/${featured.slug}`} className="group relative lg:col-span-2">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
              <Image src={typeof featured.image === "string" ? featured.image : urlForImage(featured.image).width(1600).height(900).url()} alt={featured.title} width={1600} height={900} className="w-full h-full object-cover" />
            </div>
            <div className="mt-6 space-y-2">
              <span className="text-xs tracking-widest uppercase text-zinc-500">{featured.category}</span>
              <h1 className="font-serif text-3xl md:text-5xl leading-tight group-hover:opacity-80">{featured.title}</h1>
              {featured.excerpt ? (
                <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl">{featured.excerpt}</p>
              ) : null}
            </div>
          </Link>
          ) : null}

          <div className="flex flex-col gap-8">
            {secondary.map((a) => (
              <Link key={a.slug} href={`/article/${a.slug}`} className="group">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <Image src={typeof a.image === "string" ? a.image : urlForImage(a.image).width(800).height(450).url()} alt={a.title} width={800} height={450} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 space-y-1">
                  <span className="text-xs tracking-widest uppercase text-zinc-500">{a.category}</span>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug group-hover:opacity-80">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending strip */}
      <section className="px-6 md:px-10 lg:px-16 py-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          <span className="text-xs uppercase tracking-widest text-zinc-500 shrink-0">Trending</span>
          {trending.map((a) => (
            <Link key={a.slug} href={`/article/${a.slug}`} className="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900">
              <span className="font-serif text-sm">{a.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <CategoriesShowcase categories={(categoriesRaw as any[]).map((c) => ({ title: typeof c === "string" ? c : c.title, slug: typeof c === "string" ? c.toLowerCase() : c.slug }))} />

      {/* Latest Posts List */}
      <section className="px-6 md:px-10 lg:px-16 py-10 md:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latest.map((a) => (
            <Link key={a.slug} href={`/article/${a.slug}`} className="group">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <Image src={typeof a.image === "string" ? a.image : urlForImage(a.image).width(1200).height(900).url()} alt={a.title} width={1200} height={900} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 space-y-1">
                <span className="text-xs tracking-widest uppercase text-zinc-500">{a.category}</span>
                <h3 className="font-serif text-xl leading-snug group-hover:opacity-80">{a.title}</h3>
                {a.excerpt ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{a.excerpt}</p>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Spotlight + Editors’ Picks */}
      <section className="px-6 md:px-10 lg:px-16 py-10 md:py-16 border-t border-zinc-200 dark:border-zinc-800">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl mb-5">Spotlight</h2>
            {featured && (
              <Link href={`/article/${featured.slug}`} className="group block">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <Image src={typeof featured.image === "string" ? featured.image : urlForImage(featured.image).width(1600).height(900).url()} alt={featured.title} width={1600} height={900} className="w-full h-full object-cover" />
                </div>
                <div className="mt-4 space-y-2">
                  <span className="text-xs tracking-widest uppercase text-zinc-500">{featured.category}</span>
                  <h3 className="font-serif text-2xl md:text-3xl group-hover:opacity-80">{featured.title}</h3>
                </div>
              </Link>
            )}
          </div>
          <div>
            <h2 className="font-serif text-2xl mb-5">Editors’ Picks</h2>
            <div className="flex flex-col gap-6">
              {editors.map((a) => (
                <Link key={a.slug} href={`/article/${a.slug}`} className="group">
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <Image src={typeof a.image === "string" ? a.image : urlForImage(a.image).width(800).height(500).url()} alt={a.title} width={800} height={500} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3">
                    <span className="text-xs tracking-widest uppercase text-zinc-500">{a.category}</span>
                    <h4 className="font-serif text-lg leading-snug group-hover:opacity-80">{a.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-20 border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl rounded-3xl border border-zinc-200 dark:border-zinc-800 p-10 md:p-14 bg-gradient-to-b from-white/80 to-zinc-50/60 dark:from-zinc-950/80 dark:to-zinc-900/60 text-center shadow-[0_1px_0_0_rgba(0,0,0,0.02)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
          <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-zinc-500">Newsletter</span>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl leading-tight">Stay in the loop</h2>
          <p className="mt-3 text-base md:text-lg text-zinc-700 dark:text-zinc-300">Weekly editorial picks and behind-the-scenes notes — no noise, just signal.</p>
          <form action="/subscribe" className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 max-w-2xl mx-auto">
            <input type="email" required placeholder="you@example.com" aria-label="Email address" className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-950/70 px-4 py-4 text-base placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-200" />
            <button className="inline-flex items-center justify-center rounded-xl bg-foreground text-background px-6 py-4 font-medium hover:opacity-90">Subscribe</button>
          </form>
          <p className="mt-3 text-xs text-zinc-500">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
      </main>
    </PageTransition>
  );
}
