"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { photoBadgeClass } from "@/components/ui/badge";
import { urlFor } from "@/sanity/lib/client";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { openArticle } from "@/components/news/NewsReader";
import { formatNewsDate } from "@/lib/news";

const PAGE_SIZE = 9;

const CATEGORY_ORDER = [
  "Cantieri",
  "Opere pubbliche",
  "Certificazioni",
  "Restauro",
  "Azienda",
  "Progetto",
  "Eventi",
];

interface NewsArchiveClientProps {
  articles: SanityNewsArticle[];
  categoryCounts: Record<string, number>;
}

export function NewsArchiveClient({ articles, categoryCounts }: NewsArchiveClientProps) {
  const [cat, setCat] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => articles.filter((a) => cat === "all" || a.category === cat),
    [cat, articles],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  if (articles.length === 0) {
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
        categoryCounts={categoryCounts}
      />
      <NewsGrid items={pageItems} />
      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 500, behavior: "smooth" });
        }}
      />
    </>
  );
}

/* ---- Placeholder ---- */
function NewsPlaceholder() {
  return (
    <section className="bg-surface py-24 pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
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
        <p className="text-ink/65 mt-12 font-serif text-base italic">Nuovi articoli in arrivo.</p>
      </div>
    </section>
  );
}

/* ---- Filter Bar ---- */
function FilterBar({
  active,
  onChange,
  categoryCounts,
}: {
  active: string;
  onChange: (v: string) => void;
  categoryCounts: Record<string, number>;
}) {
  // Build ordered category list from counts
  const categories = useMemo(() => {
    const ordered = CATEGORY_ORDER.filter((id) => (categoryCounts[id] ?? 0) > 0);
    const known = new Set(CATEGORY_ORDER);
    const extras = Object.keys(categoryCounts).filter(
      (k) => k !== "all" && !known.has(k) && (categoryCounts[k] ?? 0) > 0,
    );
    return [
      { id: "all", label: "Tutti gli articoli" },
      ...ordered.map((id) => ({ id, label: id })),
      ...extras.map((id) => ({ id, label: id })),
    ];
  }, [categoryCounts]);

  return (
    <div className="bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5 md:px-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onChange(c.id)}
              className="tracking-caps cursor-pointer rounded-full border px-[18px] py-[9px] font-[family-name:var(--font-neue-montreal)] text-[12px] font-medium uppercase transition-colors"
              style={{
                background: active === c.id ? "var(--color-brand)" : "transparent",
                color:
                  active === c.id
                    ? "var(--color-panna)"
                    : "color-mix(in oklab, var(--color-ink) 70%, transparent)",
                borderColor: active === c.id ? "var(--color-brand)" : "var(--color-border)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Grid ---- */
function NewsGrid({ items }: { items: SanityNewsArticle[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-surface py-32 text-center">
        <p className="text-ink/70 font-serif text-2xl italic">
          Nessun articolo in questa categoria.
        </p>
      </div>
    );
  }
  return (
    <section className="bg-surface py-16 pb-12">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a, i) => (
            <ArchiveCard key={a._id} item={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchiveCard({ item, index }: { item: SanityNewsArticle; index: number }) {
  const imgUrl = urlFor(item.coverImage).width(900).url();

  return (
    <button
      id={`article-${item.slug}`}
      onClick={() => openArticle(item.slug)}
      className="group border-border bg-surface flex flex-col border text-left"
      style={{ animationDelay: `${(index % 6) * 50}ms` }}
    >
      <div className="bg-night relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imgUrl}
          alt={item.coverImage.alt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover saturate-95 transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className={photoBadgeClass("absolute top-[18px] left-[18px]")}>{item.category}</span>
        <span
          aria-hidden
          className="absolute bottom-[18px] left-[18px] inline-block text-[18px] leading-none text-white transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[5px] group-hover:-translate-y-[5px]"
        >
          <ArrowUpRight aria-hidden className="size-[18px]" strokeWidth={1.5} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 pb-[26px]">
        <div className="text-ink/65 tracking-caps-tight flex items-center gap-2.5 font-[family-name:var(--font-neue-montreal)] text-[11px] uppercase">
          <span>{formatNewsDate(item.publishedAt)}</span>
        </div>
        <h3 className="text-ink line-clamp-2 font-serif text-[21px] leading-[1.25] font-medium tracking-[-0.01em]">
          {item.title}
        </h3>
        <p className="text-ink/70 line-clamp-3 text-[14.5px] leading-[1.55]">{item.excerpt}</p>
        <span className="border-border text-ink group-hover:text-brand tracking-caps-tight mt-auto flex items-center justify-between border-t pt-4 font-[family-name:var(--font-neue-montreal)] text-[12px] uppercase transition-colors duration-[250ms]">
          Leggi
          <span
            aria-hidden
            className="border-border group-hover:border-brand group-hover:bg-brand group-hover:text-panna inline-flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-transparent transition-all duration-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />
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
    <section className="bg-surface pb-28">
      <div className="border-border mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 border-t px-6 pt-8 md:px-12">
        <span className="text-ink/65 font-serif text-base italic">
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
      className={`tracking-caps-tight rounded-full border px-[18px] py-2.5 font-[family-name:var(--font-neue-montreal)] text-[12px] uppercase transition-all duration-[220ms] ${
        disabled
          ? "border-ink/20 text-ink/40 cursor-not-allowed opacity-50"
          : "border-ink/40 text-ink hover:border-brand hover:bg-brand hover:text-panna cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}
