"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="font-serif text-5xl md:text-6xl mt-8 leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="font-serif text-4xl md:text-5xl mt-8 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="font-serif text-2xl md:text-3xl mt-6">{children}</h3>,
    normal: ({ children }) => <p className="text-lg leading-8">{children}</p>,
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="underline" target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-8 avoid-column-break">
        <img src={(value as any)?.asset?.url} alt={(value as any)?.alt || ""} className="rounded-xl w-full h-auto" />
        {value?.caption ? (
          <figcaption className="text-sm text-zinc-500 mt-2">{value.caption}</figcaption>
        ) : null}
      </figure>
    ),
  },
};

export default function PortableRenderer({ value }: { value: any }) {
  return <PortableText value={value} components={components} />;
}


