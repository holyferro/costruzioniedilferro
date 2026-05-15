"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { NEWS_ARTICLES, NEWS_CATEGORIES, FEATURED_ARTICLE, type NewsArticle } from "@/content/news";
import { ArticleReader } from "@/components/news/ArticleReader";

const ALL_ARTICLES = [FEATURED_ARTICLE, ...NEWS_ARTICLES];
const RICH_SLUGS = new Set(["habita", "palestra-gramsci"]);

const PAGE_SIZE = 9;

export function NewsArchiveClient() {
  const searchParams = useSearchParams();
  const targetSlug = searchParams.get("article");

  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [richSlug, setRichSlug] = useState<string | null>(null);

  const handleOpen = (slug: string) => {
    if (RICH_SLUGS.has(slug)) setRichSlug(slug);
    else setOpenSlug(slug);
  };

  const filtered = useMemo(
    () => NEWS_ARTICLES.filter((a) => cat === "all" || a.tag === cat),
    [cat],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  // On mount: if a target slug is in the URL, open that article's modal
  useEffect(() => {
    if (!targetSlug) return;
    const exists = ALL_ARTICLES.some((a) => a.slug === targetSlug);
    if (!exists) return;
    const idx = NEWS_ARTICLES.findIndex((a) => a.slug === targetSlug);
    const t = setTimeout(() => {
      if (idx >= 0) setPage(Math.ceil((idx + 1) / PAGE_SIZE));
      handleOpen(targetSlug);
    }, 150);
    return () => clearTimeout(t);
  }, [targetSlug]);

  const openArticle = ALL_ARTICLES.find((a) => a.slug === openSlug) ?? null;
  const close = useCallback(() => setOpenSlug(null), []);

  if (NEWS_ARTICLES.length === 0) {
    return <NewsPlaceholder />;
  }

  return (
    <>
      <FilterBar
        active={cat}
        onChange={(v) => {
          setCat(v);
          setPage(1);
        }}
        totalShown={filtered.length}
      />
      <NewsGrid items={pageItems} onOpen={handleOpen} />
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 500, behavior: "smooth" });
        }}
      />
      <NewsModal article={openArticle} onClose={close} />
      <ArticleReader slug={richSlug} onClose={() => setRichSlug(null)} />
    </>
  );
}

/* ---- Placeholder ---- */
function NewsPlaceholder() {
  return (
    <section className="bg-panna py-24 pb-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="border-border grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="border-border flex flex-col border"
              style={{ opacity: 1 - i * 0.25 }}
            >
              <div className="bg-ink/[0.04] aspect-[4/3] w-full" />
              <div className="flex flex-col gap-3 p-6 pb-7">
                <div className="bg-ink/[0.06] h-3 w-20 rounded-full" />
                <div className="bg-ink/[0.08] h-5 w-3/4 rounded-full" />
                <div className="bg-ink/[0.06] h-4 w-full rounded-full" />
                <div className="bg-ink/[0.06] h-4 w-2/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-ink/50 mt-12 font-serif text-base italic">Nuovi articoli in arrivo.</p>
      </div>
    </section>
  );
}

/* ---- Modal ---- */
function NewsModal({ article, onClose }: { article: NewsArticle | null; onClose: () => void }) {
  const isOpen = !!article;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-10"
      style={{
        background: isOpen ? "rgba(10,14,26,0.87)" : "rgba(10,14,26,0)",
        pointerEvents: isOpen ? "all" : "none",
        transition: "background 380ms ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Articolo"
    >
      <div
        className="bg-panna grid max-h-[90svh] w-full overflow-y-auto md:max-h-[80vh] md:grid-cols-[1.2fr_1fr] md:overflow-hidden"
        style={{
          maxWidth: 1100,
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.93) translateY(24px)",
          transition:
            "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Left — immagine */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#0a1830] md:aspect-auto md:min-h-0">
          {article && (
            <Image
              src={article.img}
              alt={article.imageAlt}
              fill
              quality={90}
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover saturate-95"
            />
          )}
          {article && (
            <span className="text-brand absolute top-5 left-5 rounded-full bg-white/95 px-3.5 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase">
              {article.tag}
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            ✕
          </button>
        </div>

        {/* Right — contenuto */}
        {article && (
          <div className="bg-panna flex flex-col overflow-y-auto px-8 py-10 md:px-12 md:py-12">
            <p className="text-brand mb-5 flex items-center gap-3 font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.3em] uppercase">
              <span aria-hidden className="bg-brand inline-block h-px w-6" />
              {article.tag}
            </p>

            <h2 className="text-ink font-serif text-[clamp(1.5rem,0.8rem+1.6vw,2.25rem)] leading-[1.15] font-medium tracking-[-0.015em]">
              {article.title}
            </h2>

            <div className="text-ink/50 mt-4 mb-8 flex flex-wrap items-center gap-3 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.1em] uppercase">
              <span>{article.date}</span>
              {article.author && (
                <>
                  <span className="bg-ink/30 inline-block h-[3px] w-[3px] rounded-full" />
                  <span>{article.author}</span>
                </>
              )}
            </div>

            <p className="text-ink/70 text-[15px] leading-[1.7]">{article.excerpt}</p>

            <a
              href="/contatti#form"
              className="bg-brand text-panna mt-10 inline-flex items-center gap-3 self-start rounded-full px-6 py-[15px] font-[family-name:var(--font-neue-montreal)] text-[13px] font-medium tracking-[0.06em] uppercase transition-colors hover:bg-[#1a1a6b]"
            >
              Richiedi un sopralluogo →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- Filter Bar ---- */
function FilterBar({
  active,
  onChange,
  totalShown,
}: {
  active: string;
  onChange: (v: string) => void;
  totalShown: number;
}) {
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setStuck(!(e?.isIntersecting ?? true)), {
      threshold: 0,
      rootMargin: "-1px 0px 0px 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />
      <div
        className="border-border bg-panna sticky z-30 border-b transition-shadow duration-[250ms]"
        style={{
          top: "var(--header-height, 78px)",
          boxShadow: stuck ? "0 4px 18px rgba(10,24,48,0.06)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12">
          <div className="flex flex-wrap gap-1.5">
            {NEWS_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => onChange(c.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-[family-name:var(--font-neue-montreal)] text-[13px] transition-all duration-[220ms] ${
                  active === c.id
                    ? "bg-brand text-panna border-brand"
                    : "border-border text-ink hover:border-ink/40"
                }`}
              >
                <span>{c.label}</span>
                <span
                  className={`font-serif text-[12px] italic ${active === c.id ? "text-panna/70" : "text-ink/60"}`}
                >
                  {c.count}
                </span>
              </button>
            ))}
          </div>
          <span className="text-ink/60 font-serif text-sm whitespace-nowrap italic">
            {totalShown} {totalShown === 1 ? "articolo" : "articoli"}
          </span>
        </div>
      </div>
    </>
  );
}

/* ---- Grid ---- */
function NewsGrid({ items, onOpen }: { items: NewsArticle[]; onOpen: (slug: string) => void }) {
  if (items.length === 0) {
    return (
      <div className="bg-panna py-32 text-center">
        <p className="text-ink/70 font-serif text-2xl italic">
          Nessun articolo in questa categoria.
        </p>
      </div>
    );
  }
  return (
    <section className="bg-panna py-16 pb-12">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <ArchiveCard key={a.slug} item={a} index={i} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({
  item,
  index,
  onOpen,
}: {
  item: NewsArticle;
  index: number;
  onOpen: (slug: string) => void;
}) {
  return (
    <button
      id={`article-${item.slug}`}
      onClick={() => onOpen(item.slug)}
      className="group border-border bg-surface flex flex-col border text-left transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(10,24,48,0.10)]"
      style={{ animationDelay: `${(index % 6) * 50}ms` }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a1830]">
        <Image
          src={item.img}
          alt={item.imageAlt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover saturate-95 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="text-brand absolute top-3.5 left-3.5 rounded-full bg-white/95 px-3 py-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] font-semibold tracking-[0.22em] uppercase">
          {item.tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pb-[26px]">
        <div className="text-ink/60 flex items-center gap-2.5 font-[family-name:var(--font-neue-montreal)] text-[11px] tracking-[0.06em] uppercase">
          <span>{item.date}</span>
        </div>
        <h3 className="text-ink line-clamp-2 font-serif text-[21px] leading-[1.25] font-medium tracking-[-0.01em]">
          {item.title}
        </h3>
        <p className="text-ink/70 line-clamp-3 text-[14.5px] leading-[1.55]">{item.excerpt}</p>
        <span className="border-border text-ink group-hover:text-brand mt-auto flex items-center justify-between border-t pt-4 font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.1em] uppercase transition-colors duration-[250ms]">
          Leggi
          <span
            aria-hidden
            className="border-border group-hover:border-brand group-hover:bg-brand group-hover:text-panna inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-transparent transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <ArrowUpRight />
          </span>
        </span>
      </div>
    </button>
  );
}

/* ---- Pagination ---- */
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <section className="bg-panna pb-[120px]">
      <div className="border-border mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 border-t px-6 pt-8 md:px-12">
        <span className="text-ink/60 font-serif text-base italic">
          Pagina <span className="text-ink">{String(page).padStart(2, "0")}</span> di{" "}
          {String(totalPages).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          <PageBtn disabled={page === 1} onClick={() => onChange(page - 1)} label="← Precedente" />
          <div className="mx-2 flex gap-1">
            {pages.map((p) => (
              <button
                key={p}
                onClick={() => onChange(p)}
                className={`h-10 w-10 rounded-full border font-serif text-[15px] font-medium transition-all duration-[200ms] ${
                  p === page
                    ? "bg-brand text-panna border-brand"
                    : "text-ink/70 hover:border-ink/30 border-transparent"
                }`}
              >
                {String(p).padStart(2, "0")}
              </button>
            ))}
          </div>
          <PageBtn
            disabled={page === totalPages}
            onClick={() => onChange(page + 1)}
            label="Successiva →"
          />
        </div>
      </div>
    </section>
  );
}

function PageBtn({
  disabled,
  onClick,
  label,
}: {
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full border px-[18px] py-2.5 font-[family-name:var(--font-neue-montreal)] text-[12px] tracking-[0.08em] uppercase transition-all duration-[220ms] ${
        disabled
          ? "border-ink/20 text-ink/40 cursor-not-allowed opacity-50"
          : "border-ink/40 text-ink hover:border-brand hover:bg-brand hover:text-panna cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
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
