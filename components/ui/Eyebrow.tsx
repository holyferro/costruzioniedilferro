import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// Kicker above section headings. Single source for the whole site — never re-implement inline.
// Opacity chosen for WCAG AA at 12.75px: ink/70 on panna ≈ 6.1:1, panna/65 on brand ≈ 6.3:1.
export function Eyebrow({
  children,
  dark,
  className,
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "tracking-eyebrow text-xs font-semibold uppercase",
        dark ? "text-panna/65" : "text-ink/70",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mr-3 inline-block h-px w-8 align-middle",
          dark ? "bg-panna/40" : "bg-ink/40",
        )}
      />
      {children}
    </p>
  );
}
