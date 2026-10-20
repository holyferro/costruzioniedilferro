// content/homepage.ts
// Tutto il copy e i dati della homepage.
// Importato da app/page.tsx e passato come props alle sezioni.
// Nessun import esterno — puro TypeScript, no JSX, no React.

export type TrustRow = {
  readonly value: string;
  readonly label: string; // frase in italic
  readonly sub: string; // caption uppercase
};

export type ServiceItem = {
  readonly n: string; // "01" / "02" / "03"
  readonly kicker: string; // audience label es. "Privati"
  readonly title: string;
  readonly body: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tags: readonly string[];
};

export type Zone = {
  readonly name: string;
  readonly role: string;
  readonly km: string;
  readonly primary: boolean;
};

/** A technical solution pinned on the floor plan. x/y/area are in plan units (see content/piantaPontecchio.ts). */
export type FloorPlanMarker = {
  readonly n: string;
  readonly title: string;
  readonly norm: string;
  readonly body: string;
  readonly x: number;
  readonly y: number;
  readonly area: { readonly x: number; readonly y: number; readonly w: number; readonly h: number };
  readonly photos: readonly {
    readonly src: string;
    readonly alt: string;
    readonly credit?: string;
  }[];
};

export type HomepageContent = {
  readonly newsUpdates: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly body: string;
    readonly allNewsLabel: string;
    readonly allNewsHref: string;
  };
  readonly hero: {
    readonly eyebrow?: string;
    readonly headline: string;
    readonly headlinePrefix?: string;
    readonly headlineWords?: readonly string[];
    readonly subheadline: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly trustStrip: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly rows: readonly TrustRow[];
  };
  readonly fromDrawing: {
    readonly eyebrow: string;
    readonly title: string;
    readonly stageStart: string; // label while the line drawing shows
    readonly stageEnd: string; // label once the render has taken over
    readonly drawingSrc: string;
    readonly renderSrc: string;
    readonly imageAlt: string;
  };
  readonly floorPlan: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly planAlt: string;
    readonly replayLabel: string;
    readonly hintTouch: string;
    readonly hintPointer: string;
    readonly markers: readonly FloorPlanMarker[];
  };
  readonly services: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
    readonly indexLinkLabel: string;
    readonly indexLinkHref: string;
    readonly items: readonly ServiceItem[];
  };
  readonly featuredProjects: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly archiveLinkLabel: string;
    readonly archiveLinkHref: string;
  };
  readonly serviceArea: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly body: string;
    readonly zones: readonly Zone[];
  };
  readonly finalCta: {
    readonly headline: string;
    readonly body: string;
  };
};

export const homepageContent: HomepageContent = {
  newsUpdates: {
    eyebrow: "News & Aggiornamenti",
    titleStart: "Dal cantiere all'azienda: ",
    titleAccent: "le ultime novità.",
    body: "Aggiornamenti, progetti e iniziative che raccontano il nostro modo di costruire — un cantiere alla volta.",
    allNewsLabel: "Vedi tutte le news",
    allNewsHref: "/news",
  },
  hero: {
    eyebrow: "DAL 1981",
    headline: "Costruiamo valore, qualità e fiducia nel territorio.",
    headlinePrefix: "Costruiamo",
    headlineWords: ["valore", "qualità", "fiducia nel territorio"] as const,
    subheadline: "Radicati nel territorio,\ncostruiamo con esperienza e continuità.",
    imageSrc: "/images/hero3.webp",
    imageAlt: "Cantiere residenze universitarie Rovigo — Costruzioni Edilferro",
  },
  trustStrip: {
    eyebrow: "Affidabilità misurabile",
    title: "L'esperienza si misura.",
    body: "Dati e certificazioni verificabili, aggiornati al bilancio dell'ultimo esercizio. Nessuna stima di comodo.",
    rows: [
      {
        value: "45+",
        label: "anni di attività",
        sub: "fondata nel 1981",
      },
      {
        value: "30",
        label: "tra tecnici e maestranze",
        sub: "squadra diretta, zero subappalti opachi",
      },
      {
        value: "SOA",
        label: "OG1 · OG2 · OG3 · OG11",
        sub: "qualificazione opere pubbliche",
      },
    ],
  },
  fromDrawing: {
    eyebrow: "Dal progetto all'opera",
    title: "Ogni cantiere nasce da un disegno preciso.",
    stageStart: "Progetto",
    stageEnd: "Realizzazione",
    drawingSrc: "/images/home/dal-progetto-disegno.webp",
    renderSrc: "/images/home/dal-progetto-render.webp",
    imageAlt:
      "Cortile porticato con loggiato ad archi: il disegno a linee del progetto diventa, scorrendo, il render dell'edificio finito",
  },
  floorPlan: {
    eyebrow: "Dentro il progetto",
    title: "Prima dei muri, le scelte che non si vedono.",
    intro:
      "La pianta di un nostro cantiere residenziale, costruita pezzo per pezzo: muri, aperture, quote, e i punti in cui lavoriamo oltre lo standard.",
    planAlt:
      "Pianta del piano tipo di un edificio residenziale a L, con muri, finestre, scale, balconi, quote e tre soluzioni tecniche evidenziate",
    replayLabel: "Rivedi la costruzione",
    hintTouch: "Tocca i punti della pianta per vedere le foto.",
    hintPointer: "Passa sopra ai punti o agli elementi evidenziati per vedere le foto.",
    // TODO(testi): titoli confermati; norme e descrizioni ancora segnaposto.
    // TODO(foto): "segnaposto-*" sono riquadri neri (alt vuoto) in attesa delle foto di cantiere.
    markers: [
      {
        n: "01",
        title: "Cappotto di ultima generazione",
        norm: "[Norma da confermare]",
        body: "Testo segnaposto: isolamento termico continuo sulle facciate, senza ponti termici, per consumi da casa passiva.",
        x: 1751,
        y: 3330,
        area: { x: 1690, y: 1934, w: 120, h: 2551 },
        photos: [
          {
            src: "/images/cantieri/efficientamento-energetico/01.webp",
            alt: "Edificio residenziale su ponteggio durante la posa del cappotto termico",
          },
          {
            src: "/images/cantieri/casa-passiva-porto-viro/habita-14.webp",
            alt: "Facciata finita intonacata bianca di una casa passiva a Porto Viro",
          },
        ],
      },
      {
        n: "02",
        title: "Elemento termoisolante portante per balconi",
        norm: "[Norma da confermare]",
        body: "Testo segnaposto: il balcone è collegato al solaio con un elemento che porta i carichi e interrompe il ponte termico.",
        x: 2980,
        y: 1400,
        area: { x: 2830, y: 640, w: 240, h: 1530 },
        photos: [
          {
            src: "/images/home/pianta/segnaposto-balcone-termoisolante.webp",
            alt: "",
          },
          {
            src: "/images/cantieri/casa-passiva-porto-viro/03.webp",
            alt: "Casa passiva a Porto Viro con balconi in aggetto al primo piano",
          },
        ],
      },
      {
        n: "03",
        title: "Impianto elettrificato con pompa di calore",
        norm: "[Norma da confermare]",
        body: "Testo segnaposto: riscaldamento, raffrescamento e acqua calda con pompa di calore, senza gas.",
        x: 2100,
        y: 505,
        area: { x: 1338, y: 405, w: 921, h: 200 },
        photos: [
          {
            src: "/images/home/pianta/segnaposto-pompa-di-calore.webp",
            alt: "",
          },
        ],
      },
    ],
  },
  services: {
    eyebrow: "Cosa realizziamo",
    titleStart: "Un'impresa edile, ",
    titleAccent: "tre committenze",
    titleEnd: " distinte.",
    body: "Metodi, strumenti e referenti dedicati per chi costruisce una casa, per chi gestisce un patrimonio pubblico, per chi deve far lavorare un capannone domani mattina.",
    indexLinkLabel: "Tutti i servizi",
    indexLinkHref: "/servizi",
    items: [
      {
        n: "01",
        kicker: "Privati",
        title: "Case che invecchiano bene.",
        body: "Villette singole, palazzine e ville di pregio. Dalla nuova costruzione antisismica alla ristrutturazione chiavi in mano, con direzione lavori interna e un unico referente dal preventivo alla consegna.",
        imageSrc: "/images/design/proj-passiva.webp",
        imageAlt: "Interno abitazione residenziale — casa passiva",
        tags: [
          "Nuove costruzioni",
          "Ristrutturazioni complete",
          "Case passive NZEB",
          "Recupero e risanamento",
        ],
      },
      {
        n: "02",
        kicker: "Settore Pubblico",
        title: "Opere in cui la comunità investe.",
        body: "Affianchiamo Comuni, ASL ed enti del territorio nella realizzazione di scuole, edifici sanitari e restauro conservativo. Attestazione SOA OG1–OG2–OG3–OG11, esperienza consolidata nei rapporti con Soprintendenze e stazioni appaltanti.",
        imageSrc: "/images/design/img-pubblico.webp",
        imageAlt: "Cantiere pubblico — restauro istituzionale",
        tags: ["SOA OG1–OG11", "Restauro monumentale", "Strutture ospedaliere", "Edifici di culto"],
      },
      {
        n: "03",
        kicker: "Aziende & Professionisti",
        title: "Spazi che lavorano con te.",
        body: "Capannoni industriali, sedi direzionali, strutture commerciali. Tempistiche contrattuali, manutenzione programmata e cantieri che non fermano la tua attività. Collaboriamo con studi di architettura e ingegneria come impresa generale di fiducia.",
        imageSrc: "/images/design/img-industriale.webp",
        imageAlt: "Cantiere industriale — capannone produttivo",
        tags: [
          "Capannoni e stabilimenti",
          "Sedi aziendali",
          "Riconversioni industriali",
          "Manutenzione",
        ],
      },
    ],
  },
  featuredProjects: {
    eyebrow: "Selezione lavori",
    titleStart: "Cantieri recenti ",
    titleAccent: "dal Polesine",
    titleEnd: " al resto del Veneto.",
    archiveLinkLabel: "Archivio lavori",
    archiveLinkHref: "/realizzazioni#archivio-lavori",
  },
  serviceArea: {
    eyebrow: "Dove operiamo",
    titleStart: "Radicati nel Polesine, ",
    titleAccent: "operativi in tutto il Nord‑Est.",
    body: "Porto Viro è la nostra base da oltre quarant'anni. Da qui copriamo con squadre proprie Veneto ed Emilia-Romagna, con la capacità di raggiungere tutto il Nord‑Est per commesse pubbliche e private di maggior rilievo.",
    zones: [
      { name: "Porto Viro", role: "Sede operativa", km: "0 km", primary: true },
      { name: "Rovigo e provincia", role: "Cantieri attivi", km: "~20 km", primary: true },
      { name: "Ferrara e provincia", role: "Cantieri attivi", km: "~45 km", primary: true },
      { name: "Padova e provincia", role: "Cantieri attivi", km: "~60 km", primary: true },
      { name: "Venezia e provincia", role: "Cantieri attivi", km: "~80 km", primary: true },
      { name: "Bologna e provincia", role: "Su commessa", km: "~120 km", primary: false },
    ],
  },
  finalCta: {
    headline: "Ogni progetto comincia con un sopralluogo in cantiere.",
    body: "Raccontaci l'opera. Veniamo sul posto, valutiamo fattibilità e tempi, e prepariamo un'offerta dettagliata.",
  },
} as const;
