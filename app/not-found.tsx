import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-6 md:px-10 lg:px-16 py-20 text-center">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="text-zinc-600 dark:text-zinc-400 mt-2">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-block mt-6 underline">Return home</Link>
    </main>
  );
}


