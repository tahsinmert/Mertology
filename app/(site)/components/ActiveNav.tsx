"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type Cat = { title: string; slug: string };
export default function ActiveNav({ categories }: { categories: Cat[] }) {
  const pathname = usePathname();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const mainItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/subscribe", label: "Subscribe" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center gap-8">
      {mainItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-sm uppercase tracking-widest hover:opacity-80 transition-opacity ${
            pathname === item.href ? "text-foreground" : "text-zinc-500"
          }`}
        >
          {item.label}
        </Link>
      ))}
      
      {/* Categories Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className={`flex items-center gap-1 text-sm uppercase tracking-widest hover:opacity-80 transition-all duration-200 ${
            pathname.startsWith('/category/') ? "text-foreground" : "text-zinc-500"
          }`}
        >
          Categories
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
            isCategoriesOpen ? 'rotate-180' : 'rotate-0'
          }`} />
        </button>
        
        {/* Dropdown Menu */}
        {isCategoriesOpen && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
            <div className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category, index) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    onClick={() => setIsCategoriesOpen(false)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:scale-105 animate-in fade-in-0 slide-in-from-left-2 ${
                      pathname === `/category/${category.slug}`
                        ? "bg-zinc-100 dark:bg-zinc-800 text-foreground"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-foreground"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {category.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


