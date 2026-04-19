// content/services.ts
// Tutto il copy e i dati della pagina /servizi.
// Importato da app/servizi/page.tsx e passato come props alle sezioni.
// Nessun import esterno — puro TypeScript, no JSX, no React.

export type SoaBadge = {
  readonly code: string; // "OG1" | "OG2" | "OG3"
  readonly name: string; // "Edifici civili e industriali"
  readonly description: string; // 1-2 righe in italiano leggibile
};

export type ServicesTarget = {
  readonly id: string; // "privati" | "pubblico" | "professionisti"
  readonly n: string; // "01" | "02" | "03"
  readonly kicker: string; // eyebrow label — DEVE matchare homepageContent.services.items[N].kicker
  readonly title: string;
  readonly body: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly soaBadges?: readonly SoaBadge[]; // SOLO per target "pubblico"
};

export type ProcessStep = {
  readonly n: string; // "01" | "02" | "03" | "04"
  readonly title: string;
  readonly description: string;
};

export type ServicesContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly subtitle: string;
  };
  readonly targetIndex: {
    readonly targets: readonly ServicesTarget[];
  };
  readonly howWeWork: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly finalCta: {
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
    readonly primaryCta: { readonly label: string; readonly href: string };
    readonly secondaryCta: { readonly label: string; readonly href: string };
  };
};

export const servicesContent: ServicesContent = {
  hero: {
    eyebrow: "I NOSTRI SERVIZI",
    titleStart: "Soluzioni edilizie ",
    titleAccent: "per ogni esigenza",
    titleEnd: ".",
    subtitle:
      "Dal cantiere residenziale al restauro pubblico, dal capannone industriale all'urbanizzazione. Operiamo per privati, enti pubblici e aziende nel Polesine e in tutto il Veneto.",
  },
  targetIndex: {
    targets: [
      // ---- PRIVATI (id: "privati") ----
      {
        id: "privati",
        n: "01",
        kicker: "Privati", // MUST match homepageContent.services.items[0].kicker exactly
        title: "Case che invecchiano bene.",
        body: "Costruiamo e ristrutturiamo abitazioni con progettazione antisismica, materiali certificati e un unico interlocutore dal preventivo alla consegna. Direzione lavori interna, niente catena di subappalti.",
        imageSrc: "/images/design/img-residenziale.webp",
        imageAlt: "Cantiere residenziale — villa di pregio",
        tags: [
          "Nuove costruzioni antisismica",
          "Ristrutturazioni di pregio",
          "Case passive NZEB",
          "Direzione lavori interna",
        ],
        ctaLabel: "Scopri i servizi",
        ctaHref: "/contatti",
      },
      // ---- ENTI PUBBLICI (id: "pubblico") ----
      {
        id: "pubblico",
        n: "02",
        kicker: "Settore Pubblico", // MUST match homepageContent.services.items[1].kicker exactly
        title: "Opere in cui la comunità investe.",
        body: "Affianchiamo Comuni, ASL ed enti del territorio nella realizzazione di opere pubbliche, scuole, strutture sanitarie e restauro conservativo. Esperienza consolidata nei rapporti con Soprintendenze e stazioni appaltanti.",
        imageSrc: "/images/design/img-pubblico.webp",
        imageAlt: "Cantiere pubblico — restauro istituzionale",
        tags: [
          "Appalti pubblici SOA",
          "Restauro conservativo",
          "Scuole e strutture sanitarie",
          "Urbanizzazioni",
        ],
        ctaLabel: "Scopri i servizi",
        ctaHref: "/contatti",
        soaBadges: [
          {
            code: "OG1",
            name: "Edifici civili e industriali",
            description:
              "Costruzione, ristrutturazione e ampliamento di edifici di qualsiasi natura.",
          },
          {
            code: "OG2",
            name: "Restauro e manutenzione di beni tutelati",
            description:
              "Interventi su edifici sottoposti a tutela ai sensi del Codice dei beni culturali.",
          },
          {
            code: "OG3",
            name: "Strade, autostrade, ponti",
            description:
              "Opere di urbanizzazione primaria, infrastrutture viarie e manufatti complementari.",
          },
        ],
      },
      // ---- PROFESSIONISTI / AZIENDE (id: "professionisti") ----
      {
        id: "professionisti",
        n: "03",
        kicker: "Aziende & Professionisti", // MUST match homepageContent.services.items[2].kicker exactly
        title: "Spazi che lavorano con te.",
        body: "Capannoni industriali, sedi direzionali, strutture commerciali. Tempistiche contrattuali, manutenzione programmata e cantieri che non fermano la tua attività. Collaboriamo con studi di architettura e ingegneria come general contractor di fiducia.",
        imageSrc: "/images/design/img-industriale.webp",
        imageAlt: "Cantiere industriale — capannone produttivo",
        tags: [
          "General contractor",
          "Capannoni e strutture industriali",
          "Sedi direzionali",
          "Manutenzione programmata",
        ],
        ctaLabel: "Scopri i servizi",
        ctaHref: "/contatti",
      },
    ],
  },
  howWeWork: {
    eyebrow: "Come lavoriamo",
    titleStart: "Quattro fasi, ",
    titleAccent: "un solo referente",
    titleEnd: ".",
    steps: [
      {
        n: "01",
        title: "Analisi",
        description:
          "Sopralluogo in cantiere, verifica della fattibilità, ascolto delle esigenze del committente.",
      },
      {
        n: "02",
        title: "Progettazione",
        description:
          "Definizione tecnica, computo metrico, cronoprogramma e preventivo a corpo dettagliato.",
      },
      {
        n: "03",
        title: "Realizzazione",
        description:
          "Maestranze dirette, direzione lavori interna, coordinamento sicurezza ISO 45001.",
      },
      {
        n: "04",
        title: "Consegna",
        description:
          "Collaudo, documentazione tecnica, garanzie e supporto post-consegna sul lavoro eseguito.",
      },
    ],
  },
  finalCta: {
    eyebrow: "Iniziamo a parlarne",
    headline: "Hai un progetto? Parliamone.",
    body: "Raccontaci l'opera. Veniamo sul posto, valutiamo fattibilità e tempi, e prepariamo un'offerta dettagliata entro dieci giorni lavorativi. Nessun costo, nessun impegno.",
    primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
    secondaryCta: { label: "Richiedi un preventivo", href: "/contatti" },
  },
} as const;
