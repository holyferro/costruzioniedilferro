import { forwardRef, type ButtonHTMLAttributes } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// The one close (×) control of the site: 44px round target, lucide X.
//   light — on panna/white surfaces
//   glass — over photos or dark surfaces
const variants = {
  light: "bg-ink/[0.06] text-ink hover:bg-ink/[0.12] focus-visible:outline-ink",
  glass:
    "border border-white/25 bg-white/15 text-white backdrop-blur-[8px] hover:bg-white/30 focus-visible:outline-white",
} as const;

type CloseButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: keyof typeof variants;
  label?: string;
};

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { variant = "light", label = "Chiudi", className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(
        "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      <X aria-hidden className="size-5" strokeWidth={1.5} />
    </button>
  );
});
