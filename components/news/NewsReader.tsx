"use client";

import { Suspense, useEffect, useState, type MouseEvent } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { newsBySlugQuery } from "@/sanity/lib/queries";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { ArticleReader } from "./ArticleReader";

/** Props for an article card's <a>: the href is the article's own page (/news/[slug]), for search
 * engines and new tabs; a plain click opens the page's NewsReader instead. That is the plain history
 * API, which Next keeps in sync with useSearchParams without a server round-trip; Back closes it. */
export function articleLinkProps(slug: string) {
  return {
    href: `/news/${slug}`,
    onClick: (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      window.history.pushState(null, "", `?article=${encodeURIComponent(slug)}`);
    },
  };
}

/** The page's one article reader, driven by `?article=<slug>`, so every article has a shareable link.
 * Pass `articles` when the page already has them in full; otherwise the article is fetched by slug
 * when it opens. */
export function NewsReader(props: { articles?: readonly SanityNewsArticle[] }) {
  return (
    <Suspense>
      <Reader {...props} />
    </Suspense>
  );
}

function Reader({ articles }: { articles?: readonly SanityNewsArticle[] }) {
  const slug = useSearchParams().get("article");
  const pathname = usePathname();
  const [fetched, setFetched] = useState<SanityNewsArticle | null>(null);

  const known = articles?.find((a) => a.slug === slug);
  const article = known ?? (fetched?.slug === slug ? fetched : null);
  const close = () => window.history.replaceState(null, "", pathname);

  useEffect(() => {
    if (!slug || known) return;
    let live = true;
    client
      .fetch<SanityNewsArticle | null>(newsBySlugQuery, { slug })
      .then((a) => {
        if (!live) return;
        if (a) setFetched(a);
        else window.history.replaceState(null, "", window.location.pathname);
      })
      .catch((err) => {
        console.error("[NewsReader] fetch articolo fallito:", err);
        if (live) window.history.replaceState(null, "", window.location.pathname);
      });
    return () => {
      live = false;
    };
  }, [slug, known]);

  return <ArticleReader open={slug !== null} article={article} onClose={close} />;
}
