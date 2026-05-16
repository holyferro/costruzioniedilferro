import { urlFor } from "./client";
import type { Realizzazione } from "./types";
import type { Project, ProjectRow, ProjectLink } from "@/components/sections/lavori/ProgettoModal";
import type { FeaturedProject, ProjectTile } from "@/content/homepage";

export const CATEGORY_LABELS: Record<string, string> = {
  residenziale: "Residenziale",
  restauro: "Restauro",
  pubblico: "Opere pubbliche",
  industriale: "Industriale",
  efficientamento: "Efficientamento",
};

export function sanityToProject(r: Realizzazione): Project {
  const imgs = r.immagini.map((img) => urlFor(img).width(1600).url());

  const rows: ProjectRow[] = (r.righe ?? []).map((riga) => [riga.label, riga.valore] as ProjectRow);

  const links: ProjectLink[] | undefined = r.link?.map((l) => ({
    label: l.label,
    href: l.url,
    external: l.esterno,
  }));

  return {
    title: r.title,
    place: r.luogo,
    desc: r.descrizione ?? "",
    tag: CATEGORY_LABELS[r.category] ?? r.category,
    year: String(r.anno),
    imgs,
    rows,
    links,
  };
}

function imgUrl(r: Realizzazione, width: number): string {
  const img = r.immagini[0];
  return img ? urlFor(img).width(width).url() : "";
}

function imgAlt(r: Realizzazione): string {
  return r.immagini[0]?.alt ?? r.title;
}

function toTile(r: Realizzazione): ProjectTile {
  return {
    imageSrc: imgUrl(r, 900),
    imageAlt: imgAlt(r),
    tag: CATEGORY_LABELS[r.category] ?? r.category,
    title: r.title,
    place: r.luogo,
    year: String(r.anno),
    projectKey: r.slug.current,
  };
}

export function buildFeaturedData(realizzazioni: Realizzazione[]): {
  feature: FeaturedProject;
  tiles: readonly ProjectTile[];
  projectsData: Readonly<Record<string, Project>>;
} | null {
  const first = realizzazioni[0];
  if (!first) return null;

  const feature: FeaturedProject = {
    ...toTile(first),
    imageSrc: imgUrl(first, 1600),
    description: first.descrizione ?? "",
  };

  const tiles = realizzazioni.slice(1).map(toTile);

  const projectsData: Record<string, Project> = Object.fromEntries(
    realizzazioni.map((r) => [r.slug.current, sanityToProject(r)]),
  );

  return { feature, tiles, projectsData };
}
