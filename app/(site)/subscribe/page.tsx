import PageTransition from "../components/PageTransition";

export default function SubscribePage() {
  return (
    <PageTransition>
      <main className="px-6 md:px-10 lg:px-16 py-16">
        <section className="max-w-xl mx-auto text-center">
          <h1 className="font-serif text-4xl">Subscribe</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3">Get the latest articles delivered to your inbox.</p>
          <form className="mt-6 flex gap-3 justify-center">
            <input type="email" required placeholder="you@example.com" className="w-full max-w-sm rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3" />
            <button className="rounded-lg bg-foreground text-background px-6 py-3">Subscribe</button>
          </form>
          <p className="text-xs text-zinc-500 mt-3">No spam. Unsubscribe anytime.</p>
        </section>
      </main>
    </PageTransition>
  );
}


