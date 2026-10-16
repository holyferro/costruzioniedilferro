import { cn } from "@/lib/utils/cn";

// Pill button styles, shared by <Link>, <a> and <button>. One look for every CTA on the site.
//   primary        — brand fill, on panna/white surfaces
//   secondary      — ink outline, on panna/white surfaces
//   inverse        — panna fill, on brand/dark surfaces
//   inverseOutline — panna outline, on brand/dark surfaces
const variants = {
  primary: "bg-brand text-panna hover:bg-brand/90 focus-visible:outline-brand",
  secondary: "border border-ink/25 text-ink hover:border-ink/60 focus-visible:outline-ink",
  inverse: "bg-panna text-brand hover:bg-panna/90 focus-visible:outline-panna",
  inverseOutline:
    "border border-panna/40 text-panna hover:border-panna hover:bg-panna/10 focus-visible:outline-panna",
} as const;

//   md — inline CTAs (modals, cards, empty states)
//   lg — section CTAs and form submit
const sizes = {
  md: "px-6 py-[15px] text-[13px] tracking-[0.06em]",
  lg: "px-7 py-5 text-[15px] tracking-[0.04em]",
} as const;

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
} = {}): string {
  return cn(
    "inline-flex items-center gap-3 rounded-full font-[family-name:var(--font-neue-montreal)] font-medium uppercase no-underline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}
