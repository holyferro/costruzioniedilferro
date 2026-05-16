import { buildMetadata } from "@/lib/seo/metadata";
import { LavoriHero } from "@/components/sections/lavori/LavoriHero";
import { LavoriManifesto } from "@/components/sections/lavori/LavoriManifesto";
import { ProgettiGrid } from "@/components/sections/lavori/ProgettiGrid";
import { HomepageCta } from "@/components/sections/HomepageCta";
import { client } from "@/sanity/lib/client";
import { allRealizzazioniQuery } from "@/sanity/lib/queries";
import { sanityToProject } from "@/sanity/lib/realizzazione-helpers";
import { PROJECTS } from "@/components/sections/lavori/ProgettoModal";
import type { Realizzazione } from "@/sanity/lib/types";
import type { CardDef } from "@/components/sections/lavori/ProgettiGrid";
import type { Project } from "@/components/sections/lavori/ProgettoModal";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "Realizzazioni",
  description:
    "Oltre 520 cantieri completati dal 1978 tra Polesine e Veneto. Residenziale, restauro, opere pubbliche, industriale, efficientamento energetico. Ogni progetto con scheda tecnica verificabile.",
  alternates: { canonical: "/realizzazioni" },
});

const DELAYS = [0, 80, 160] as const;

function buildFromSanity(realizzazioni: Realizzazione[]): {
  cards: CardDef[];
  projects: Record<string, Project>;
} {
  const projects: Record<string, Project> = {};
  const cards: CardDef[] = [];

  realizzazioni.forEach((r, i) => {
    const key = r.slug.current;
    projects[key] = sanityToProject(r);
    cards.push({
      key,
      cat: r.category,
      wide: r.wide ?? false,
      delay: DELAYS[i % 3],
    });
  });

  return { cards, projects };
}

function buildFromLegacy(): { cards: CardDef[]; projects: Record<string, Project> } {
  const projects: Record<string, Project> = { ...PROJECTS };
  const legacyKeys = Object.keys(PROJECTS);
  const cards: CardDef[] = legacyKeys.map((key, i) => ({
    key,
    cat: PROJECTS[key]!.tag.toLowerCase()
      .replace("opere pubbliche", "pubblico")
      .replace("efficientamento", "efficientamento"),
    wide: false,
    delay: DELAYS[i % 3],
  }));
  return { cards, projects };
}

export default async function RealizzazioniPage() {
  if (process.env.USE_LEGACY_PROJECTS === "true") {
    const { cards, projects } = buildFromLegacy();
    return <RealizzazioniLayout cards={cards} projects={projects} />;
  }

  const realizzazioni = await client.fetch<Realizzazione[]>(allRealizzazioniQuery);
  const { cards, projects } = buildFromSanity(realizzazioni);

  return <RealizzazioniLayout cards={cards} projects={projects} />;
}

function RealizzazioniLayout({
  cards,
  projects,
}: {
  cards: CardDef[];
  projects: Record<string, Project>;
}) {
  return (
    <>
      <LavoriHero />
      <LavoriManifesto />
      <ProgettiGrid cards={cards} projects={projects} />
      <HomepageCta
        eyebrow="Iniziamo a parlarne"
        headline="Il prossimo cantiere può essere il vostro."
        body="Portiamo lo stesso metodo, la stessa squadra e la stessa attenzione al dettaglio che vedete in ogni progetto di questo archivio."
        primaryCta={{ label: "Richiedi un sopralluogo", href: "/contatti" }}
        secondaryCta={{ label: "Richiedi un preventivo", href: "/contatti" }}
      />
    </>
  );
}
