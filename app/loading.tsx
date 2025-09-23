export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-background/60 backdrop-blur-sm">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-100" />
    </div>
  );
}


