// app/not-found.tsx
import Link from "next/link";
import { notFoundContent } from "@/content/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-ink/60 text-sm font-medium tracking-widest uppercase">404</p>
      <h1 className="text-h1 text-ink font-serif">{notFoundContent.title}</h1>
      <p className="text-ink/80 max-w-prose text-lg">{notFoundContent.body}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <Link
          href="/"
          className="bg-brand text-panna hover:bg-brand/90 inline-flex items-center rounded-full px-6 py-3 transition-colors"
        >
          {notFoundContent.ctaHomeLabel}
        </Link>
        <Link
          href="/contatti"
          className="border-ink/20 text-ink hover:border-ink/60 inline-flex items-center rounded-full border px-6 py-3 transition-colors"
        >
          {notFoundContent.ctaContactLabel}
        </Link>
      </div>
    </section>
  );
}
