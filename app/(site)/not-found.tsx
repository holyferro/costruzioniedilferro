// app/not-found.tsx
import Link from "next/link";
import { notFoundContent } from "@/content/site";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-ink/65 tracking-caps text-sm font-medium uppercase">404</p>
      <h1 className="text-ink text-h1 font-serif font-medium tracking-[-0.02em]">
        {notFoundContent.title}
      </h1>
      <p className="text-ink/80 max-w-prose text-lg">{notFoundContent.body}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Link href="/" className={buttonClass()}>
          {notFoundContent.ctaHomeLabel}
        </Link>
        <Link href="/contatti" className={buttonClass({ variant: "secondary" })}>
          {notFoundContent.ctaContactLabel}
        </Link>
      </div>
    </section>
  );
}
