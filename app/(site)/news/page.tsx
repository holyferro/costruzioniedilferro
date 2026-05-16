import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import { serverClient } from "@/sanity/lib/client";
import { allNewsQuery } from "@/sanity/lib/queries";
import type { SanityNewsArticle } from "@/sanity/lib/types";
import { NewsHero } from "@/components/sections/news/NewsHero";
import { NewsFeatured } from "@/components/sections/news/NewsFeatured";
import { NewsArchiveClient } from "@/components/sections/news/NewsArchiveClient";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const revalidate = 3600;

export const metadata = buildMetadata({
  title: "News & Aggiornamenti",
  description:
    "Aggiornamenti dai cantieri, certificazioni, eventi e iniziative di Costruzioni Edilferro. Archivio articoli dal 2014.",
  alternates: { canonical: "/news" },
});

export default async function NewsPage() {
  const articles = await serverClient.fetch<SanityNewsArticle[]>(
    allNewsQuery,
    {},
    { next: { tags: ["news"] } },
  );

  // Featured: first article with featured == true, fallback to most recent
  const featuredArticle = articles.find((a) => a.featured === true) ?? articles[0] ?? null;

  // Count per category for the filter bar
  const categoryCounts: Record<string, number> = { all: articles.length };
  for (const a of articles) {
    categoryCounts[a.category] = (categoryCounts[a.category] ?? 0) + 1;
  }

  return (
    <>
      <NewsHero />
      {featuredArticle && <NewsFeatured article={featuredArticle} />}
      <Suspense>
        <NewsArchiveClient articles={articles} categoryCounts={categoryCounts} />
      </Suspense>
      <HomepageCta
        eyebrow="Lavoriamo insieme"
        headline="Hai un progetto in mente?"
        body="Raccontaci quello che vuoi costruire. Valutiamo insieme fattibilità, tempistiche e approccio tecnico senza impegno."
        primaryCta={{ label: "Richiedi un sopralluogo", href: "/contatti" }}
        secondaryCta={{ label: "Guarda i nostri lavori", href: "/lavori" }}
      />
    </>
  );
}
