import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Realizzazioni")
        .child(
          S.documentTypeList("realizzazione")
            .title("Realizzazioni")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("News")
        .child(
          S.documentTypeList("newsArticle")
            .title("Articoli News")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
    ]);
