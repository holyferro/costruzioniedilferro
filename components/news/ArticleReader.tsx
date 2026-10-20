"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseButton } from "@/components/ui/CloseButton";
import { Overlay } from "@/components/ui/Overlay";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { ArticleContent } from "./ArticleContent";

interface ArticleReaderProps {
  open: boolean;
  /** null while it loads: the panel opens at once with a loading line. */
  article: SanityNewsArticle | null;
  onClose: () => void;
}

/** Used through NewsReader, which drives it from the URL. */
export function ArticleReader({ open, article, onClose }: ArticleReaderProps) {
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
        {open && !article && (
          <p className="text-ink/65 px-8 py-14 text-center font-serif italic">Caricamento…</p>
        )}
        {article && <ArticleContent article={article} imageSizes="min(1100px, 96vw)" />}
      </div>
    </Overlay>
  );
}
