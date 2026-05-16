// app/error.tsx
// NOTE: this is the ONLY legitimate Client Component in Phase 1 — Next.js requires
// error boundaries to be Client Components. See CONTEXT.md §D-17 exception and
// RESEARCH.md §8 "app/error.tsx — route-level error boundary".
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { errorContent } from "@/content/site";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // TODO (Phase 7): wire to an error reporting service if the client asks.
    // For Phase 1, plain console.error is sufficient.
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
      <p className="text-ink/60 text-sm font-medium tracking-widest uppercase">Errore</p>
      <h1 className="text-h1 text-ink font-serif">{errorContent.title}</h1>
      <p className="text-ink/80 max-w-prose text-lg">{errorContent.body}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="bg-brand text-panna hover:bg-brand/90 inline-flex items-center rounded-full px-6 py-3 transition-colors"
        >
          {errorContent.ctaRetryLabel}
        </button>
        <Link
          href="/"
          className="border-ink/20 text-ink hover:border-ink/60 inline-flex items-center rounded-full border px-6 py-3 transition-colors"
        >
          {errorContent.ctaHomeLabel}
        </Link>
      </div>
    </section>
  );
}
