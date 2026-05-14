"use client";

import { useState } from "react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArticleReader } from "@/components/news/ArticleReader";
import { FEATURED_ARTICLE } from "@/content/news";

export function NewsFeatured() {
  const [readerOpen, setReaderOpen] = useState(false);

  return (
    <>
      <section className="bg-panna py-20 pb-[100px]">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="mb-8 flex items-baseline justify-between">
            <Eyebrow>In evidenza</Eyebrow>
            <span className="text-ink/60 font-serif text-base italic">
              L&apos;ultima dal cantiere
            </span>
          </div>

          <button
            onClick={() => setReaderOpen(true)}
            className="group border-border bg-surface grid w-full cursor-pointer overflow-hidden border text-left md:grid-cols-[1.35fr_1fr]"
            style={{
              transition:
                "box-shadow 380ms cubic-bezier(0.16,1,0.3,1), transform 380ms cubic-bezier(0.16,1,0.3,1)",
            }}
            aria-label={`Leggi l'articolo: ${FEATURED_ARTICLE.title}`}
          >
            {/* Image */}
            <div className="relative aspect-[5/4] overflow-hidden bg-[#0a1830] md:aspect-auto">
              <Image
                src={FEATURED_ARTICLE.img}
                alt={FEATURED_ARTICLE.imageAlt}
                fill
                quality={90}
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover saturate-95 transition-transform duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
              {/* Hover veil + hint */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[320ms] group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,24,48,0.55) 0%, rgba(10,24,48,0) 50%)",
                }}
              />
              {/* Tags */}
              <span className="text-brand absolute top-6 left-6 rounded-full bg-white/95 px-3.5 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
                {FEATURED_ARTICLE.tag}
              </span>
              <span className="bg-brand text-panna absolute top-6 right-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.24em] uppercase">
                <span className="bg-panna inline-block h-1.5 w-1.5 rounded-full" />
                In evidenza
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col justify-center gap-6 p-12 md:px-[52px] md:py-12">
              <div className="text-ink/60 flex flex-wrap items-center gap-3.5 font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.06em] uppercase">
                <span>{FEATURED_ARTICLE.date}</span>
              </div>

              <h2 className="text-ink m-0 font-serif text-[clamp(1.75rem,0.8rem+1.8vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.015em]">
                {FEATURED_ARTICLE.title}
              </h2>

              <p className="text-ink/80 m-0 text-base leading-[1.65]">{FEATURED_ARTICLE.excerpt}</p>

              <div className="border-border mt-3 inline-flex items-center gap-3.5 border-t pt-6">
                <span className="font-[family-name:var(--font-neue-montreal)] text-[13px] tracking-[0.08em] uppercase transition-colors duration-[250ms] group-hover:text-[color:var(--color-brand)]">
                  Apri l&apos;articolo
                </span>
                <span
                  aria-hidden
                  className="border-ink/40 group-hover:bg-brand group-hover:border-brand group-hover:text-panna inline-flex h-9 w-9 items-center justify-center rounded-full border bg-transparent transition-all duration-[280ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  <ArrowUpRight />
                </span>
              </div>
            </div>
          </button>
        </div>
      </section>

      <ArticleReader open={readerOpen} onClose={() => setReaderOpen(false)} />
    </>
  );
}

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.5M10.5 3.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
