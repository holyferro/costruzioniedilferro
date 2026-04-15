// app/not-found.tsx
import Link from "next/link";
import { notFoundContent } from "@/content/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        404
      </p>
      <h1 className="font-serif text-h1 text-ink">{notFoundContent.title}</h1>
      <p className="max-w-prose text-lg text-ink/80">
        {notFoundContent.body}
      </p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-panna transition-colors hover:bg-brand/90"
        >
          {notFoundContent.ctaHomeLabel}
        </Link>
        <Link
          href="/contatti"
          className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:border-ink/60"
        >
          {notFoundContent.ctaContactLabel}
        </Link>
      </div>
    </section>
  );
}
