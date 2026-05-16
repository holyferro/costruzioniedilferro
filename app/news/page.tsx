import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo/metadata";
import { NewsHero } from "@/components/sections/news/NewsHero";
import { NewsFeatured } from "@/components/sections/news/NewsFeatured";
import { NewsArchiveClient } from "@/components/sections/news/NewsArchiveClient";
import { HomepageCta } from "@/components/sections/HomepageCta";

export const metadata = buildMetadata({
  title: "News & Aggiornamenti",
  description:
    "Aggiornamenti dai cantieri, certificazioni, eventi e iniziative di Costruzioni Edilferro. Archivio articoli dal 2014.",
  alternates: { canonical: "/news" },
});

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsFeatured />
      <Suspense>
        <NewsArchiveClient />
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
