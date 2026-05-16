import { urlFor } from "./client";
import type { Realizzazione } from "./types";
import type { Project, ProjectRow, ProjectLink } from "@/components/sections/lavori/ProgettoModal";

const CATEGORY_LABELS: Record<string, string> = {
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
