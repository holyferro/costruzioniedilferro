"use client";

// components/ui/MobileStickyBar.tsx
// "use client" — necessario per position:fixed dopo hydration.
// Visibile solo su mobile (md:hidden). z-50 > Header z-40.
import Link from "next/link";

type MobileStickyBarProps = {
  ctaLabel: string;
  ctaHref: string;
  phoneDisplay: string;
  phoneTel: string;
};

export function MobileStickyBar({
  ctaLabel,
  ctaHref,
  phoneDisplay,
  phoneTel,
}: MobileStickyBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-panna/95 p-3 backdrop-blur md:hidden"
      role="complementary"
      aria-label="Azioni rapide mobile"
    >
      <a
        href={`tel:${phoneTel}`}
        className="flex-1 rounded-full border border-ink/20 py-3 text-center text-sm font-medium text-ink"
        aria-label={`Chiama ${phoneDisplay}`}
      >
        {phoneDisplay}
      </a>
      <Link
        href={ctaHref}
        className="ml-2 flex-1 rounded-full bg-brand py-3 text-center text-sm font-medium text-panna"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
