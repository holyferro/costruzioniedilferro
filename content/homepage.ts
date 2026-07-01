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

export type ProjectTile = {
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tag: string;
  readonly title: string;
  readonly place: string;
  readonly year: string;
  readonly projectKey?: string;
};

export type FeaturedProject = ProjectTile & {
  readonly description: string;
};

export type Principle = {
  readonly n: string;
  readonly title: string;
  readonly body: string;
};

export type Zone = {
  readonly name: string;
  readonly role: string;
  readonly km: string;
  readonly primary: boolean;
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
    readonly feature: FeaturedProject;
    readonly tiles: readonly ProjectTile[];
  };
  readonly values: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
    readonly principles: readonly Principle[];
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
    title: "Quattro numeri, oltre quarantacinque anni di lavoro.",
    body: "Dati verificabili, aggiornati al bilancio dell'ultimo esercizio. Nessuna stima di comodo.",
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
    feature: {
      imageSrc: "/images/cantieri/studentato rovigo/2021-04-02_08-49-18_099.webp",
      imageAlt: "Studentato Universitario a Rovigo in fase di cantiere",
      tag: "Residenziale",
      title: "Studentato Universitario",
      place: "Rovigo",
      year: "2024",
      projectKey: "studentato-universitario",
      description:
        "Dispone di 100 posti letto, con alloggi temporanei da destinare agli studenti fuori sede, distribuiti in tre corpi di fabbrica ognuno di due piani. Gli edifici, di nuova costruzione e moderna progettazione, sono articolati in modo da creare tra loro aree verdi esterne vivibili.",
    },
    tiles: [
      {
        imageSrc: "/images/cantieri/casa-di-cura-città-di-rovigo/foto-csa.webp",
        imageAlt: "Policlinico Città di Rovigo — nuova costruzione",
        tag: "Opere pubbliche",
        title: "Policlinico Città di Rovigo",
        place: "Rovigo",
        year: "2015",
        projectKey: "policlinico-rovigo",
      },
      {
        imageSrc: "/images/design/proj-passiva.webp",
        imageAlt: "Habita — prima casa passiva in legno nel Delta del Po",
        tag: "Residenziale",
        title: "Habita — Casa passiva",
        place: "Porto Viro",
        year: "2016",
        projectKey: "habita",
      },
      {
        imageSrc: "/images/design/proj-casa-cura.webp",
        imageAlt: "Ampliamento casa di cura — Porto Viro",
        tag: "Opere pubbliche",
        title: "Ampliamento casa di cura",
        place: "Porto Viro",
        year: "2022",
        projectKey: "casa-di-cura",
      },
    ],
  },
  values: {
    eyebrow: "Perché sceglierci",
    titleStart: "Quattro promesse ",
    titleAccent: "che manteniamo",
    titleEnd: " da cantiere a cantiere.",
    body: "Non le chiamiamo valori. Sono il modo in cui lavoriamo da settant'anni, e il motivo per cui i nostri clienti tornano.",
    principles: [
      {
        n: "01",
        title: "Un unico interlocutore, dal preventivo al collaudo.",
        body: "Il direttore di cantiere che incontri al sopralluogo è lo stesso che firma la consegna. Niente passaggi di mano, niente catena di subappalti da rincorrere.",
      },
      {
        n: "02",
        title: "Preventivi chiusi, senza varianti a sorpresa.",
        body: "Lavoriamo a corpo. Il prezzo pattuito è il prezzo finale, salvo modifiche esplicitamente richieste dal committente e sempre preventivate per iscritto.",
      },
      {
        n: "03",
        title: "Maestranze dirette, non agenzie interinali.",
        body: "Trentacinque persone in organico, contratti Cassa Edile. La qualità di una finitura dipende da chi la posa: per questo non esternalizziamo il mestiere.",
      },
      {
        n: "04",
        title: "Cantieri puliti, consegne puntuali.",
        body: "Sicurezza sul lavoro certificata ISO 45001, piani operativi aggiornati settimanalmente. Nel 2024 il 96% dei nostri cantieri è stato consegnato entro la data contrattuale.",
      },
    ],
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
