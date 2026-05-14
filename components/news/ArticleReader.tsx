"use client";

import { useEffect, useRef, useState } from "react";
import { HabitaArticleBody } from "./HabitaArticleBody";
import { FEATURED_ARTICLE } from "@/content/news";

interface ArticleReaderProps {
  open: boolean;
  onClose: () => void;
}

export function ArticleReader({ open, onClose }: ArticleReaderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  // Show condensed title in header only after scrolling past the hero
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = 0;
          setProgress(0);
          setPastHero(false);
        }
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
      // Only redirect if the wheel event target is outside the scroll container
      if (el.contains(e.target as Node)) return;
      e.preventDefault();
      el.scrollBy({ top: e.deltaY, behavior: "auto" });
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, [open]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
    // Hero is roughly 540px tall
    setPastHero(el.scrollTop > 460);
  };

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
      aria-label="Articolo in evidenza"
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
        {/* ── Sticky header — always visible ── */}
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
          {/* Left — label or article title */}
          <div className="min-w-0 flex-1 overflow-hidden">
            <p
              className="truncate font-[family-name:var(--font-neue-montreal)] text-[11px] font-semibold tracking-[0.22em] uppercase transition-opacity duration-300"
              style={{
                color: pastHero ? "var(--color-brand)" : "rgba(255,255,255,0.6)",
                opacity: pastHero ? 1 : 1,
              }}
            >
              {pastHero ? FEATURED_ARTICLE.tag : "Articolo · In evidenza"}
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
              {FEATURED_ARTICLE.title}
            </p>
          </div>

          {/* Right — read time + close */}
          <div className="flex shrink-0 items-center gap-4">
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
          </div>

          {/* Reading progress bar at bottom of header */}
          <div
            className="absolute right-0 bottom-0 left-0 h-[2px]"
            style={{ background: pastHero ? "var(--color-border)" : "rgba(255,255,255,0.1)" }}
          >
            <div
              className="bg-brand h-full transition-[width] duration-75 ease-linear"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </header>

        {/* ── Scrollable article body ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto"
        >
          <HabitaArticleBody />
        </div>
      </div>
    </div>
  );
}
