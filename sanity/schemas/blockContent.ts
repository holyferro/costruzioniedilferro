// Schema base per il corpo degli articoli.
// Blocchi custom (universityBadge, partnersGrid, specsTable, ctaBlock) possono essere
// aggiunti come arrayMember custom se necessari in futuro per articoli ricchi.
import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Contenuto",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normale", value: "normal" },
        { title: "Lead", value: "lead" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Citazione", value: "blockquote" },
      ],
      lists: [
        { title: "Elenco puntato", value: "bullet" },
        { title: "Elenco numerato", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Grassetto", value: "strong" },
          { title: "Corsivo", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (Rule) => Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
              }),
              defineField({
                name: "blank",
                title: "Apri in nuova scheda",
                type: "boolean",
                initialValue: false,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Immagine",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (Rule) => Rule.required().error("Alt text obbligatorio per accessibilità"),
        }),
        defineField({
          name: "caption",
          title: "Didascalia",
          type: "string",
        }),
      ],
    }),
  ],
});
