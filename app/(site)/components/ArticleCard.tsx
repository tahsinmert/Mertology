import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";

export type ArticleCardProps = {
  slug: string;
  title: string;
  category: string;
  excerpt?: string;
  image?: any;
};

export default function ArticleCard({ slug, title, category, excerpt, image }: ArticleCardProps) {
  return (
    <Link href={`/article/${slug}`} className="group">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900">
        <Image src={typeof image === "string" ? image : image ? urlForImage(image).width(1200).height(900).url() : "/globe.svg"} alt={title} width={1200} height={900} className="w-full h-full object-cover" />
      </div>
      <div className="mt-4 space-y-1">
        <span className="text-xs tracking-widest uppercase text-zinc-500">{category}</span>
        <h3 className="font-serif text-xl leading-snug group-hover:opacity-80">{title}</h3>
        {excerpt ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{excerpt}</p>
        ) : null}
      </div>
    </Link>
  );
}


