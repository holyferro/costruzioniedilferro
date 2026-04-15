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
      <p className="text-sm font-medium uppercase tracking-widest text-ink/60">
        Errore
      </p>
      <h1 className="font-serif text-h1 text-ink">{errorContent.title}</h1>
      <p className="max-w-prose text-lg text-ink/80">{errorContent.body}</p>
      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="inline-flex items-center rounded-full bg-brand px-6 py-3 text-panna transition-colors hover:bg-brand/90"
        >
          {errorContent.ctaRetryLabel}
        </button>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 text-ink transition-colors hover:border-ink/60"
        >
          {errorContent.ctaHomeLabel}
        </Link>
      </div>
    </section>
  );
}
