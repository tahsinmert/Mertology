import Link from "next/link";
import ThemeToggle from "@/app/(site)/components/ThemeToggle";
import ActiveNav from "@/app/(site)/components/ActiveNav";
import MobileMenu from "@/app/(site)/components/MobileMenu";
import { fetchAllCategories, fetchAuthors } from "@/lib/sanity/fetchers";

export async function Header() {
  const categories = (await fetchAllCategories()).slice(0, 6);
  const authors = await fetchAuthors();
  const editor = authors.find((a: any) => String(a.name).toLowerCase().includes("mert mutlu"));
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        <Link href={editor ? `/author/${editor.slug}` : "/about"} className="flex items-center">
          <span className="font-serif text-2xl tracking-tight">Mertology</span>
        </Link>
        <ActiveNav categories={categories} />
        <div className="flex items-center gap-3">
          <form action="/search" className="hidden md:block">
            <input name="q" placeholder="Search" className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-1 text-sm" />
          </form>
          <ThemeToggle />
          <MobileMenu categories={categories} />
        </div>
      </div>
    </header>
  );
}

export default Header;


