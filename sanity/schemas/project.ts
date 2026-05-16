import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Progetto",
  type: "document",
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
      name: "featured",
      title: "In evidenza",
      description: "Mostra il progetto in primo piano nella homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordine",
      description: "Valori più bassi appaiono prima nella griglia",
      type: "number",
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
