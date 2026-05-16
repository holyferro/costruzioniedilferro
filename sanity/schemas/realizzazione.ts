import { defineArrayMember, defineField, defineType } from "sanity";

export const realizzazione = defineType({
  name: "realizzazione",
  title: "Realizzazione",
  type: "document",
  fieldsets: [
    {
      name: "visualizzazione",
      title: "Visualizzazione",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Residenziale", value: "residenziale" },
          { title: "Restauro", value: "restauro" },
          { title: "Opere pubbliche", value: "pubblico" },
          { title: "Industriale", value: "industriale" },
          { title: "Efficientamento", value: "efficientamento" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "anno",
      title: "Anno",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(2000)
          .max(new Date().getFullYear() + 2),
    }),
    defineField({
      name: "luogo",
      title: "Luogo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descrizione",
      title: "Descrizione",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: "righe",
      title: "Specifiche tecniche",
      description: "Righe etichetta/valore mostrate nella scheda tecnica del modal",
      type: "array",
      initialValue: [
        { label: "Committente", valore: "" },
        { label: "Tipologia intervento", valore: "" },
        { label: "Superficie", valore: "" },
        { label: "Classe energetica", valore: "" },
      ],
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Etichetta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "valore",
              title: "Valore",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "valore" },
          },
        }),
      ],
    }),
    defineField({
      name: "immagini",
      title: "Immagini",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Testo alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Didascalia",
              type: "string",
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error("Almeno un'immagine obbligatoria"),
    }),
    defineField({
      name: "link",
      title: "Link correlati",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Etichetta",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "esterno",
              title: "Apri in nuova scheda",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        }),
      ],
    }),
    defineField({
      name: "wide",
      title: "Card larga in griglia",
      description:
        "Se attivo, la card occupa 2 colonne nella griglia /realizzazioni per dare ritmo visivo",
      type: "boolean",
      initialValue: false,
      fieldset: "visualizzazione",
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      description: "Mostra la realizzazione in primo piano nella homepage",
      type: "boolean",
      initialValue: false,
      fieldset: "visualizzazione",
    }),
    defineField({
      name: "order",
      title: "Ordine",
      description: "Valori più bassi appaiono prima nella griglia",
      type: "number",
      fieldset: "visualizzazione",
    }),
  ],
  preview: {
    select: {
      title: "title",
      anno: "anno",
      luogo: "luogo",
      media: "immagini.0",
    },
    prepare({ title, anno, luogo, media }) {
      const sub = [anno, luogo].filter(Boolean).join(" • ");
      return { title, subtitle: sub || undefined, media };
    },
  },
});
