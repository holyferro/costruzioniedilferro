import { defineArrayMember, defineField, defineType } from "sanity";

const CATEGORY_LIST = [
  { title: "Progetto", value: "Progetto" },
  { title: "Cantieri", value: "Cantieri" },
  { title: "Opere pubbliche", value: "Opere pubbliche" },
  { title: "Certificazioni", value: "Certificazioni" },
  { title: "Restauro", value: "Restauro" },
  { title: "Azienda", value: "Azienda" },
  { title: "Eventi", value: "Eventi" },
];

export const newsArticle = defineType({
  name: "newsArticle",
  title: "Articolo News",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "titleItalic",
      title: "Titolo — parte in corsivo",
      description: "Seconda riga del titolo, renderizzata in corsivo serif",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Immagine di copertina",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: { list: CATEGORY_LIST },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data pubblicazione",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Data aggiornamento",
      type: "datetime",
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "string",
      initialValue: "Redazione Edilferro",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Tempo di lettura",
      description: 'Es. "9 min"',
      type: "string",
    }),
    defineField({
      name: "excerpt",
      title: "Estratto",
      description: "Breve testo per anteprime e meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Sottotitolo hero",
      description: "Testo introduttivo nella sezione hero dell'articolo",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroMeta",
      title: "Metadati hero",
      description: "Coppie etichetta/valore mostrate nell'hero (es. Committente, Anno, Luogo)",
      type: "array",
      initialValue: [
        { label: "Committente", valore: "" },
        { label: "Luogo", valore: "" },
        { label: "Inizio lavori", valore: "" },
        { label: "Consegna prevista", valore: "" },
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
      name: "body",
      title: "Corpo articolo",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      author: "author",
      media: "coverImage",
    },
    prepare({ title, publishedAt, author, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "";
      return {
        title,
        subtitle: [date, author].filter(Boolean).join(" — "),
        media,
      };
    },
  },
});
