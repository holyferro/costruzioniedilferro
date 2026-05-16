import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Progetti")
        .child(
          S.documentTypeList("project")
            .title("Progetti")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("News")
        .child(
          S.documentTypeList("newsArticle")
            .title("Articoli News")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("Team")
        .child(
          S.documentTypeList("teamMember")
            .title("Membro del team")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
    ]);
