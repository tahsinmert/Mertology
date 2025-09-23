import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Mertology. All rights reserved.</p>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="#" className="hover:opacity-80">Twitter</Link>
          <Link href="#" className="hover:opacity-80">Instagram</Link>
          <Link href="#" className="hover:opacity-80">GitHub</Link>
        </nav>
      </div>
    </footer>
  );
}


