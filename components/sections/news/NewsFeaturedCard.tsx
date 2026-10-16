"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { ArticleReader } from "@/components/news/ArticleReader";
import { ArrowUpRight } from "lucide-react";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function NewsFeaturedCard({ article }: { article: SanityNewsArticle }) {
  const [readerOpen, setReaderOpen] = useState(false);

  const coverUrl = urlFor(article.coverImage).width(1600).url();

  return (
    <>
      <button
        onClick={() => setReaderOpen(true)}
        className="group border-border bg-surface grid w-full cursor-pointer overflow-hidden border text-left md:grid-cols-[1.35fr_1fr]"
        style={{
          transition:
            "box-shadow 380ms cubic-bezier(0.16,1,0.3,1), transform 380ms cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-label={`Leggi l'articolo: ${article.title}`}
      >
        {/* Immagine */}
        <div className="bg-night relative aspect-[5/4] overflow-hidden md:aspect-auto">
          <Image
            src={coverUrl}
            alt={article.coverImage.alt}
            fill
            quality={90}
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover saturate-95 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[320ms] group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--color-night) 55%, transparent) 0%, transparent 50%)",
            }}
          />
          <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2 md:contents">
            <span className="text-brand tracking-caps rounded-full bg-white/95 px-3.5 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold uppercase md:absolute md:top-6 md:left-6">
              {article.category}
            </span>
            <span className="bg-brand text-panna tracking-caps inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold uppercase md:absolute md:top-6 md:right-6">
              <span className="bg-panna inline-block h-1.5 w-1.5 rounded-full" />
              In evidenza
            </span>
          </div>
        </div>

        {/* Corpo */}
        <div className="flex flex-col justify-center gap-6 p-6 md:px-[52px] md:py-12">
          <div className="text-ink/65 tracking-caps-tight flex flex-wrap items-center gap-3.5 font-[family-name:var(--font-neue-montreal)] text-[12px] uppercase">
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <h2 className="text-ink m-0 font-serif text-[clamp(1.75rem,0.8rem+1.8vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.015em]">
            {article.title}
            {article.titleItalic && (
              <>
                {" "}
                <em className="italic">{article.titleItalic}</em>
              </>
            )}
          </h2>

          <p className="text-ink/80 m-0 text-base leading-[1.65]">{article.excerpt}</p>

          <div className="border-border mt-3 inline-flex items-center gap-3.5 border-t pt-6">
            <span className="tracking-caps-tight font-[family-name:var(--font-neue-montreal)] text-[13px] uppercase transition-colors duration-[250ms] group-hover:text-[color:var(--color-brand)]">
              Apri l&apos;articolo
            </span>
            <span
              aria-hidden
              className="border-ink/40 group-hover:bg-brand group-hover:border-brand group-hover:text-panna inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </button>

      <ArticleReader article={readerOpen ? article : null} onClose={() => setReaderOpen(false)} />
    </>
  );
}
