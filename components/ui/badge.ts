import { cn } from "@/lib/utils/cn";

// Small uppercase label over photos (category, "Novità"). Same look on every card and modal.
//   glass — translucent white, the default over imagery
//   brand — brand fill, to flag the newest item
const variants = {
  glass: "border-white/25 bg-white/15 text-white",
  brand: "border-white/25 bg-brand/85 text-panna",
} as const;

export function photoBadgeClass(
  className?: string,
  variant: keyof typeof variants = "glass",
): string {
  return cn(
    "rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-caps uppercase backdrop-blur-[8px]",
    variants[variant],
    className,
  );
}
