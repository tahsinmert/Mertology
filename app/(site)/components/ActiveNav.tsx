"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Cat = { title: string; slug: string };
export default function ActiveNav({ categories }: { categories: Cat[] }) {
  const pathname = usePathname();
  const items = [
    { href: "/", label: "Home" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.title })),
    { href: "/about", label: "About" },
    { href: "/subscribe", label: "Subscribe" },
  ];
  return (
    <nav className="hidden md:flex items-center gap-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm uppercase tracking-widest hover:opacity-80 ${
            pathname === item.href ? "text-foreground" : "text-zinc-500"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}


