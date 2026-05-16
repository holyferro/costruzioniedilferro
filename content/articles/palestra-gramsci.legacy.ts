import type { Article } from "@/lib/types/article";

export const palestraGramsciArticle: Article = {
  slug: "palestra-gramsci",
  title: "Al via i lavori della nuova palestra",
  titleItalic: "al polo scolastico della Gazzera",
  excerpt:
    "Costruzioni Edilferro Srl è la ditta incaricata di realizzare la nuova palestra del Liceo Morin e dell'Istituto Gramsci/Luzzatti a Mestre, commissionata dalla Città Metropolitana di Venezia. Consegna prevista entro novembre 2026.",
  category: "Opere pubbliche",
  publishedAt: "2026-05-14",
  readTime: "4 min",
  author: "Redazione Edilferro",
  cover: "/images/prima-pietra-palestra-gramsci.webp",
  coverAlt:
    "Cerimonia della prima pietra per la nuova palestra del polo scolastico della Gazzera a Mestre — autorità e studenti presenti",
  featured: true,
  heroSubtitle:
    "Costruzioni Edilferro Srl è incaricata della costruzione della nuova palestra, commissionata dalla Città Metropolitana di Venezia. Inizio lavori marzo 2026, consegna prevista novembre 2026.",
  heroMeta: [
    { label: "Committente", value: "Città Metropolitana di Venezia" },
    { label: "Inizio lavori", value: "Marzo 2026" },
    { label: "Fine prevista", value: "Novembre 2026" },
  ],
  body: [
    {
      type: "lead",
      text: "Costruzioni Edilferro Srl è la ditta incaricata di realizzare la nuova palestra del polo scolastico della Gazzera a Mestre, che servirà gli studenti del Liceo Scientifico Ugo Morin e dell'Istituto Commerciale Gramsci/Luzzatti.",
    },
    {
      type: "paragraph",
      text: "Il cantiere è stato avviato il 24 marzo 2026 con la cerimonia della posa della prima pietra, alla presenza del sindaco metropolitano Luigi Brugnaro, dei dirigenti scolastici e del progettista dell'opera, l'ingegner Marco Sari. La conclusione è prevista entro novembre 2026 e i lavori si svolgeranno senza interferire con l'attività didattica delle due scuole.",
    },
    {
      type: "specs",
      rows: [
        ["Committente", "Città Metropolitana di Venezia"],
        ["Superficie coperta", "1.090 m²"],
        ["Posti in tribuna", "250 — omologazione CONI"],
        ["Spogliatoi", "4 + arbitri + infermeria"],
        ["Inizio lavori", "Marzo 2026"],
        ["Fine prevista", "Novembre 2026"],
      ],
    },
    {
      type: "paragraph",
      html: true,
      text: `<p style="margin:0;font-size:13px;color:var(--color-ink,#1a1a1a);opacity:0.5;font-family:var(--font-neue-montreal),sans-serif;letter-spacing:0.04em">Fonte: <a href="https://cittametropolitana.ve.it/notizie/notizie-dalla-citta-metropolitana/posata-nel-polo-scolastico-della-gazzera-mestre-la-prima" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px">Città Metropolitana di Venezia</a></p>`,
    },
    {
      type: "cta",
      kicker: "Lavoriamo insieme",
      title: "Realizziamo opere pubbliche",
      titleItalic: "con serietà e puntualità.",
      text: "Siamo qualificati SOA per opere pubbliche OG1, OG2, OG3 e OG11. Contattaci per parlare del tuo progetto.",
      ctaLabel: "Richiedi un sopralluogo",
      ctaHref: "/contatti",
    },
  ],
};
