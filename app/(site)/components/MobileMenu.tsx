"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";

interface MobileMenuProps {
  categories: Array<{ title: string; slug: string }>;
}

export default function MobileMenu({ categories }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Home" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.title })),
    { href: "/about", label: "About" },
    { href: "/subscribe", label: "Subscribe" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-zinc-200 dark:border-zinc-800 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
              <h2 className="font-serif text-xl">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-6">
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-zinc-100 dark:bg-zinc-800 text-foreground"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Search Section */}
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
              <form action="/search" className="space-y-4">
                <label htmlFor="mobile-search" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Search
                </label>
                <input
                  id="mobile-search"
                  name="q"
                  placeholder="Search articles..."
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-200"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-foreground text-background px-4 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
