import Link from "next/link";

export type CategoryItem = {
  title: string;
  slug: string;
  description?: string;
};

export default function CategoriesShowcase({ categories }: { categories: CategoryItem[] }) {
  if (!categories?.length) return null;
  return (
    <section className="px-6 md:px-10 lg:px-16 pb-8 md:pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group relative rounded-2xl p-6 md:p-7 bg-zinc-50/90 dark:bg-zinc-950/60 hover:bg-zinc-50 dark:hover:bg-zinc-950 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.04)] transition-colors"
          >
            <span className="text-xs tracking-widest uppercase text-zinc-500">Category</span>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl leading-snug group-hover:opacity-80">
              {cat.title}
            </h3>
            {cat.description ? (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{cat.description}</p>
            ) : (
              <div className="mt-3 h-8" />
            )}
            <span className="pointer-events-none absolute right-4 bottom-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 dark:text-zinc-300 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}


