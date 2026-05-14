"use client";

// components/sections/NewsUpdatesSection.tsx
// Client component: carosello orizzontale news con scroll tracking, frecce di navigazione e progress bar.

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import type { NewsItem } from "@/content/homepage";
import { ArticleReader } from "@/components/news/ArticleReader";

type NewsUpdatesSectionProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  body: string;
  allNewsLabel: string;
  allNewsHref: string;
  items: readonly NewsItem[];
};

type ScrollState = {
  progress: number;
  atStart: boolean;
  atEnd: boolean;
};

export function NewsUpdatesSection({
  eyebrow,
  titleStart,
  titleAccent,
  body,
  allNewsLabel,
  allNewsHref,
  items,
}: NewsUpdatesSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    progress: 0,
    atStart: true,
    atEnd: false,
  });

  const updateScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setScrollState({
      progress,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [updateScroll]);

  const scrollByCard = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-news-card]");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const [readerOpen, setReaderOpen] = useState(false);

  const currentCard = Math.min(
    items.length,
    Math.round(scrollState.progress * (items.length - 1)) + 1,
  );

  return (
    <section className="bg-panna text-ink relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-14 grid items-end gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="text-ink mt-5 max-w-[20ch] font-serif text-[clamp(2rem,1rem+2.6vw,3.4rem)] leading-[1.12] font-medium tracking-tight">
              {titleStart}
              <em className="text-brand font-serif italic">{titleAccent}</em>
            </h2>
          </div>

          <div className="flex flex-col gap-6 pb-1">
            <p className="text-ink/70 max-w-[44ch] text-base leading-[1.65]">{body}</p>

            <div className="flex flex-wrap items-center justify-between gap-5">
              <Link
                href={allNewsHref as Route<string>}
                className="text-brand border-brand inline-flex items-center gap-2.5 border-b pb-1.5 font-[family-name:var(--font-neue-montreal)] text-xs tracking-[0.08em] uppercase"
              >
                {allNewsLabel} <span aria-hidden="true">→</span>
              </Link>

              <div className="hidden items-center gap-2.5 md:flex">
                <NavArrow
                  dir="prev"
                  disabled={scrollState.atStart}
                  onClick={() => scrollByCard(-1)}
                />
                <NavArrow dir="next" disabled={scrollState.atEnd} onClick={() => scrollByCard(1)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Track — full-bleed con padding interno che rispetta il max-width del contenitore */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden py-2 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          scrollPaddingLeft: "max(24px, calc((100vw - 1152px) / 2 + 24px))",
          paddingLeft: "max(24px, calc((100vw - 1152px) / 2 + 24px))",
          paddingRight: "max(24px, calc((100vw - 1152px) / 2 + 24px))",
        }}
      >
        {items.map((item, i) =>
          item.isPlaceholder ? (
            <PlaceholderCard key={i} opacity={1 - (i - 1) * 0.3} />
          ) : (
            <NewsCard key={i} item={item} isFirst={i === 0} onOpen={() => setReaderOpen(true)} />
          ),
        )}
        <ArchiveCard href={allNewsHref} />
      </div>

      {/* Progress bar */}
      <div className="mx-auto mt-8 flex max-w-6xl items-center gap-6 px-6 md:px-12">
        <div className="bg-ink/20 relative h-px flex-1 overflow-hidden">
          <div
            className="bg-brand absolute inset-y-0 w-[30%] transition-[left] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ left: `${scrollState.progress * 70}%` }}
          />
        </div>
        <span className="text-ink/60 font-serif text-sm whitespace-nowrap italic">
          <span className="tabular-nums">{String(currentCard).padStart(2, "0")}</span>
          <span className="text-ink/40 mx-1.5">/</span>
          <span className="text-ink/40 tabular-nums">{String(items.length).padStart(2, "0")}</span>
        </span>
      </div>

      <ArticleReader open={readerOpen} onClose={() => setReaderOpen(false)} />
    </section>
  );
}

function NewsCard({
  item,
  isFirst,
  onOpen,
}: {
  item: NewsItem;
  isFirst: boolean;
  onOpen?: () => void;
}) {
  return (
    <a
      data-news-card=""
      href={item.href ?? "#"}
      onClick={
        onOpen
          ? (e) => {
              e.preventDefault();
              onOpen();
            }
          : undefined
      }
      className="group flex w-[clamp(280px,28vw,420px)] shrink-0 snap-start flex-col no-underline"
    >
      <div className="border-border bg-surface flex w-full flex-col border transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:shadow-[0_12px_32px_rgba(10,24,48,0.10)]">
        {/* Immagine */}
        <div className="bg-ink relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.imageAlt}
            fill
            quality={90}
            sizes="(min-width: 1024px) 28vw, (min-width: 768px) 44vw, 80vw"
            className="object-cover saturate-95 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <span className="text-brand absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase backdrop-blur-md">
            {item.tag}
          </span>
          {isFirst && (
            <span className="bg-brand text-panna absolute top-4 right-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold tracking-[0.22em] uppercase">
              <span className="bg-panna inline-block h-1.5 w-1.5 rounded-full" />
              Più recente
            </span>
          )}
        </div>

        {/* Corpo card */}
        <div className="flex flex-1 flex-col gap-3.5 p-6 pb-[26px]">
          {/* Meta */}
          <div className="text-ink/60 flex items-center gap-3 text-[12px] tracking-[0.06em] uppercase">
            <span>{item.date}</span>
          </div>

          {/* Titolo */}
          <h3 className="text-ink line-clamp-2 font-serif text-[22px] leading-[1.25] font-medium tracking-[-0.01em]">
            {item.title}
          </h3>

          {/* Descrizione */}
          <p className="text-ink/70 line-clamp-3 text-[15px] leading-[1.55]">{item.desc}</p>

          {/* CTA */}
          <div className="border-border text-ink group-hover:text-brand mt-auto flex items-center justify-between border-t pt-[18px] font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.1em] uppercase transition-colors duration-[250ms]">
            Leggi di più
            <span
              aria-hidden="true"
              className="border-border text-ink group-hover:border-brand group-hover:bg-brand group-hover:text-panna inline-flex h-8 w-8 items-center justify-center rounded-full border bg-transparent transition-[transform,background-color,border-color,color] duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
            >
              <ArrowUpRight />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function PlaceholderCard({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      data-news-card=""
      className="flex w-[clamp(280px,28vw,420px)] shrink-0 snap-start flex-col"
      style={{ opacity }}
    >
      <div className="border-border bg-surface flex w-full flex-col border">
        <div className="bg-ink/[0.05] aspect-[4/3] w-full" />
        <div className="flex flex-col gap-3 p-6 pb-[26px]">
          <div className="bg-ink/[0.07] h-3 w-20 rounded-full" />
          <div className="bg-ink/[0.09] h-5 w-3/4 rounded-full" />
          <div className="bg-ink/[0.06] h-4 w-full rounded-full" />
          <div className="bg-ink/[0.06] h-4 w-2/3 rounded-full" />
          <div className="border-border mt-auto border-t pt-[18px]">
            <div className="bg-ink/[0.06] h-3 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchiveCard({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="border-ink/30 group hover:border-brand flex w-[clamp(240px,22vw,320px)] shrink-0 snap-start flex-col items-center justify-center gap-5 border border-dashed p-8 text-center no-underline transition-colors duration-[250ms]"
    >
      <span className="bg-brand text-panna inline-flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
        <ArrowUpRight size={20} />
      </span>
      <p className="text-ink font-serif text-[22px] leading-[1.3] font-medium italic">
        Esplora l&apos;archivio completo
      </p>
      <p className="text-ink/60 font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.08em] uppercase">
        Tutti gli aggiornamenti
      </p>
    </a>
  );
}

type NavArrowProps = {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
};

function NavArrow({ dir, disabled, onClick }: NavArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "prev" ? "Articolo precedente" : "Articolo successivo"}
      className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        disabled
          ? "border-ink/20 text-ink/40 cursor-not-allowed opacity-50"
          : "border-ink/40 text-ink hover:border-brand hover:bg-brand hover:text-panna cursor-pointer"
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        style={{ transform: dir === "prev" ? "rotate(180deg)" : undefined }}
        aria-hidden="true"
      >
        <path
          d="M2 8h12M9 3l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-ink/60 text-xs font-semibold tracking-[0.38em] uppercase">
      <span aria-hidden="true" className="bg-ink/40 mr-3 inline-block h-px w-8 align-middle" />
      {children}
    </p>
  );
}
