"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CloseButton } from "@/components/ui/CloseButton";
import { Overlay } from "@/components/ui/Overlay";
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
    if (!open) return;
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
      setPastHero(false);
    });
  }, [open]);

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
    <Overlay
      open={open}
      onClose={onClose}
      label="Articolo"
      className="bg-panna relative flex h-[96svh] w-full max-w-[1100px] flex-col overflow-hidden"
    >
      {/* ── Sticky header ── */}
      <header
        className="relative z-20 flex shrink-0 items-center justify-between gap-4 px-5 py-3 sm:px-8"
        style={{
          background: pastHero
            ? "color-mix(in oklab, var(--color-panna) 96%, transparent)"
            : "color-mix(in oklab, var(--color-night) 45%, transparent)",
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
            className="tracking-caps truncate font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold uppercase transition-opacity duration-300"
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

        <CloseButton
          label="Chiudi articolo"
          variant={pastHero ? "light" : "glass"}
          onClick={onClose}
        />

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
        className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-y-contain"
      >
        {article && (
          <article>
            {/* Hero */}
            <section
              className="relative flex min-h-[540px] items-end overflow-hidden"
              style={{ background: "var(--color-night)" }}
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
                    "linear-gradient(to bottom, color-mix(in oklab, var(--color-night) 25%, transparent) 0%, color-mix(in oklab, var(--color-night) 40%, transparent) 50%, color-mix(in oklab, var(--color-night) 88%, transparent) 100%)",
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
                    className="mt-10 flex flex-wrap gap-y-4 border-t pt-6 md:flex-nowrap"
                    style={{ borderColor: "rgba(255,255,255,0.18)" }}
                  >
                    {article.heroMeta.map((m) => (
                      <div
                        key={m.label}
                        className="w-1/2 min-w-0 pr-4 md:w-auto md:flex-1 md:pr-8 md:last:pr-0"
                      >
                        <p
                          className="tracking-caps m-0 mb-1.5 font-[family-name:var(--font-neue-montreal)] text-[11px] uppercase md:text-[11px]"
                          style={{ color: "rgba(255,255,255,0.55)" }}
                        >
                          {m.label}
                        </p>
                        <p
                          className="m-0 font-serif text-[13px] leading-[1.3] font-medium md:text-[16px]"
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
    </Overlay>
  );
}
