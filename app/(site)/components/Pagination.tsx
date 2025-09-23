import Link from "next/link";

export default function Pagination({
  basePath,
  page,
  totalPages,
}: {
  basePath: string;
  page: number;
  totalPages: number;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;
  return (
    <div className="flex items-center justify-between mt-10">
      {prev ? (
        <Link href={`${basePath}?page=${prev}`} className="hover:opacity-80">
          ← Previous
        </Link>
      ) : (
        <span className="text-zinc-400">← Previous</span>
      )}
      <span className="text-sm text-zinc-500">
        Page {page} of {totalPages}
      </span>
      {next ? (
        <Link href={`${basePath}?page=${next}`} className="hover:opacity-80">
          Next →
        </Link>
      ) : (
        <span className="text-zinc-400">Next →</span>
      )}
    </div>
  );
}


