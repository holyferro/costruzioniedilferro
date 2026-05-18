"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { PortableTextRenderer } from "./PortableTextRenderer";

interface ArticleReaderProps {
  article: SanityNewsArticle | null;
  onClose: () => void;
}

export function ArticleReader({ article, onClose }: ArticleReaderProps) {
  const open = article !== null;

  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        if (progressBarRef.current) progressBarRef.current.style.width = "0%";
        setPastHero(false);
      });
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: WheelEvent) => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.contains(e.target as Node)) return;
      e.preventDefault();
      el.scrollBy({ top: e.deltaY, behavior: "auto" });
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [open]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${max > 0 ? (el.scrollTop / max) * 100 : 0}%`;
    }
    setPastHero(el.scrollTop > 460);
  }, []);

  const coverUrl = article?.coverImage ? urlFor(article.coverImage).width(1600).url() : "";

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6"
      style={{
        background: open ? "rgba(10,14,26,0.87)" : "rgba(10,14,26,0)",
        pointerEvents: open ? "all" : "none",
        transition: "background 380ms ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Articolo"
      aria-hidden={!open}
    >
      <div
        className="bg-panna relative flex w-full max-w-[1100px] flex-col overflow-hidden"
        style={{
          height: "96svh",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          transition:
            "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* ── Sticky header ── */}
        <header
          className="relative z-20 flex shrink-0 items-center justify-between gap-4 px-5 py-3 sm:px-8"
          style={{
            background: pastHero ? "rgba(248,245,238,0.96)" : "rgba(10,24,48,0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: pastHero
              ? "1px solid var(--color-border)"
              : "1px solid rgba(255,255,255,0.12)",
            transition: "background 300ms ease, border-color 300ms ease",
          }}
        >
          <div className="min-w-0 flex-1 overflow-hidden">
            <p
              className="truncate font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase transition-opacity duration-300"
              style={{ color: pastHero ? "var(--color-brand)" : "rgba(255,255,255,0.6)" }}
            >
              {pastHero ? (article?.category ?? "") : "Articolo"}
            </p>
            <p
              className="mt-0.5 truncate text-[13px] leading-[1.3] transition-all duration-300"
              style={{
                fontFamily: "var(--font-serif)",
                color: pastHero ? "var(--color-ink)" : "transparent",
                maxHeight: pastHero ? "1.4em" : 0,
                overflow: "hidden",
              }}
            >
              {article?.title ?? ""}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Chiudi articolo"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: pastHero ? "rgba(26,26,26,0.25)" : "rgba(255,255,255,0.25)",
              color: pastHero ? "var(--color-ink)" : "#fff",
              background: "transparent",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Reading progress bar */}
          <div
            className="absolute right-0 bottom-0 left-0 h-[2px]"
            style={{ background: pastHero ? "var(--color-border)" : "rgba(255,255,255,0.1)" }}
          >
            <div ref={progressBarRef} className="bg-brand h-full" style={{ width: "0%" }} />
          </div>
        </header>

        {/* ── Scrollable article body ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
        >
          {article && (
            <article>
              {/* Hero */}
              <section
                className="relative flex min-h-[540px] items-end overflow-hidden"
                style={{ background: "#0a1830" }}
              >
                {coverUrl && (
                  <Image
                    src={coverUrl}
                    alt={article.coverImage.alt}
                    fill
                    quality={90}
                    sizes="min(1100px, 96vw)"
                    className="object-cover saturate-[0.92]"
                    priority
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(10,24,48,0.25) 0%, rgba(10,24,48,0.4) 50%, rgba(10,24,48,0.88) 100%)",
                  }}
                />
                <div className="relative mx-auto w-full max-w-[860px] px-8 pt-12 pb-14">
                  <h1 className="m-0 max-w-[18ch] font-serif text-[clamp(2.25rem,1.4rem+2.8vw,4rem)] leading-[1.05] font-medium tracking-[-0.02em] [text-wrap:balance] text-white">
                    {article.title}
                    {article.titleItalic && (
                      <>
                        {" "}
                        <em className="italic" style={{ color: "rgba(255,255,255,0.78)" }}>
                          {article.titleItalic}.
                        </em>
                      </>
                    )}
                  </h1>

                  <p
                    className="mt-6 max-w-[60ch] text-[18px] leading-[1.55]"
                    style={{ color: "rgba(255,255,255,0.82)" }}
                  >
                    {article.heroSubtitle}
                  </p>

                  {article.heroMeta.length > 0 && (
                    <div
                      className="mt-10 grid gap-5 border-t pt-6"
                      style={{
                        gridTemplateColumns: `repeat(${Math.min(article.heroMeta.length, 4)}, 1fr)`,
                        borderColor: "rgba(255,255,255,0.18)",
                      }}
                    >
                      {article.heroMeta.map((m) => (
                        <div key={m.label}>
                          <p
                            className="m-0 mb-1.5 font-[family-name:var(--font-neue-montreal)] text-[10px] tracking-[0.22em] uppercase"
                            style={{ color: "rgba(255,255,255,0.55)" }}
                          >
                            {m.label}
                          </p>
                          <p
                            className="m-0 font-serif text-[16px] leading-[1.3] font-medium"
                            style={{ color: "#fff" }}
                          >
                            {m.valore}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Body */}
              <div className="mx-auto max-w-[760px] px-8 py-14">
                <PortableTextRenderer value={article.body} />
              </div>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
