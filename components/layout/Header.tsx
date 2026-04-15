// components/layout/Header.tsx
// Server Component. No client interaction in Phase 1.
// Hamburger menu is a Phase 2 concern (needs a client island).

import Link from "next/link";
import { primaryNav, primaryCta } from "@/content/navigation";
import { siteContent } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-panna/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo / brand wordmark */}
        <Link
          href="/"
          className="font-serif text-xl font-medium text-ink"
          aria-label={`${siteContent.brand.name} — home`}
        >
          {siteContent.brand.name}
        </Link>

        {/* Desktop nav (D-13 single-row) */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Navigazione principale"
        >
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA (D-06 fill-only: panna text on brand background) */}
        <Link
          href={primaryCta.href}
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-panna transition-colors hover:bg-brand/90 md:inline-flex"
        >
          {primaryCta.label}
        </Link>

        {/* Mobile zone — click-to-call (HOM-05 / D-14) + hamburger placeholder.
            Hamburger interactivity lands in Phase 2. */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${siteContent.contact.phone.tel}`}
            aria-label={`Chiama ${siteContent.brand.name}`}
            className="rounded-full border border-ink/20 p-2.5 text-ink transition-colors hover:border-ink/60"
          >
            {/* Inline phone SVG — Phase 1 avoids lucide-react per CLAUDE.md safety rules */}
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
          {/* TODO Phase 2: hamburger menu (client island). */}
        </div>
      </div>
    </header>
  );
}
