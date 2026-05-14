import type { ReactNode } from "react";

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`text-xs font-semibold tracking-[0.38em] uppercase ${dark ? "text-panna/55" : "text-ink/60"}`}
    >
      <span
        aria-hidden="true"
        className={`mr-3 inline-block h-px w-8 align-middle ${dark ? "bg-panna/40" : "bg-ink/40"}`}
      />
      {children}
    </p>
  );
}
