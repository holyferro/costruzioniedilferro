"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/client";

const components: PortableTextComponents = {
  block: {
    // Matches LeadBlock: font-serif text-[26px] leading-[1.5] italic
    lead: ({ children }) => (
      <p className="text-ink mt-0 mb-0 font-serif text-[26px] leading-[1.5] font-normal tracking-[-0.005em] [text-wrap:pretty] italic">
        {children}
      </p>
    ),
    // Matches ParagraphBlock plain
    normal: ({ children }) => <p className="text-ink/80 text-[17px] leading-[1.75]">{children}</p>,
    // Matches SectionBlock h2
    h2: ({ children }) => (
      <h2 className="text-ink mt-12 mb-5 max-w-[22ch] font-serif text-[clamp(1.5rem,0.6rem+1.4vw,2rem)] leading-[1.2] font-medium tracking-[-0.015em] [text-wrap:pretty]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-ink mt-8 mb-4 font-serif text-[1.375rem] leading-[1.3] font-medium tracking-[-0.01em]">
        {children}
      </h3>
    ),
    // Matches QuoteBlock
    blockquote: ({ children }) => (
      <blockquote className="border-brand text-ink my-9 border-l-2 py-2 pl-8 font-serif text-[22px] leading-[1.45] tracking-[-0.005em] italic">
        <span aria-hidden className="text-brand mb-1.5 block text-[32px] leading-none">
          &ldquo;
        </span>
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-6 list-none space-y-3 pl-0">{children}</ul>,
    number: ({ children }) => <ol className="my-6 list-decimal space-y-3 pl-6">{children}</ol>,
  },

  listItem: {
    // Matches SpecsBlock / partners / advantages bullet style
    bullet: ({ children }) => (
      <li className="text-ink/80 flex gap-3 text-[17px] leading-[1.75]">
        <span
          aria-hidden
          className="bg-brand mt-[0.6em] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
        />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-ink/80 text-[17px] leading-[1.75]">{children}</li>
    ),
  },

  marks: {
    // Matches ParagraphBlock [&_strong]:text-ink [&_strong]:font-semibold
    strong: ({ children }) => <strong className="text-ink font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-brand underline underline-offset-2"
      >
        {children}
      </a>
    ),
  },

  types: {
    // Matches ImageBlock: aspect-ratio 16/10, fill, same sizes
    image: ({ value }: { value: { asset: unknown; alt?: string; caption?: string } }) => {
      if (!value?.asset) return null;
      const url = urlFor(value as Parameters<typeof urlFor>[0])
        .width(760)
        .url();
      return (
        <figure className="m-0 my-9">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/10" }}>
            <Image
              src={url}
              alt={value.alt ?? ""}
              fill
              quality={88}
              sizes="(min-width: 768px) 760px, 100vw"
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-ink/50 mt-3 text-center font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.04em]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <PortableText value={value} components={components} />
    </div>
  );
}
