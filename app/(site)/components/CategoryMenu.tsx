import Link from "next/link";

export default function CategoryMenu({
  categories,
  active,
}: {
  categories: string[];
  active?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((c) => {
        const isActive = active?.toLowerCase() === c.toLowerCase();
        return (
          <Link
            key={c}
            href={`/category/${c.toLowerCase()}`}
            className={`rounded-full border px-3 py-1 text-xs tracking-widest uppercase ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            }`}
          >
            {c}
          </Link>
        );
      })}
    </div>
  );
}


