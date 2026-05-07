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
  readonly ctaLabel: string;
  readonly ctaHref: string;
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

export type NewsItem = {
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly tag: string;
  readonly date: string;
  readonly title: string;
  readonly desc: string;
  readonly readMin: number;
  readonly href?: string;
};

export type HomepageContent = {
  readonly newsUpdates: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly body: string;
    readonly allNewsLabel: string;
    readonly allNewsHref: string;
    readonly items: readonly NewsItem[];
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
    readonly eyebrow: string;
    readonly headline: string;
    readonly body: string;
    readonly primaryCta: { readonly label: string; readonly href: string };
    readonly secondaryCta: { readonly label: string; readonly href: string };
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
    items: [
      {
        imageSrc: "/images/design/proj-passiva.webp",
        imageAlt: "Cantiere residenze Adria — nuova costruzione classe A4",
        tag: "Cantieri",
        date: "28 Apr 2026",
        title: "Posata la prima pietra delle Residenze del Naviglio, Adria",
        desc: "Avviato il cantiere per 24 unità in classe A4. Cappotto in fibra di legno e tetto ventilato, consegna prevista per primavera 2027.",
        readMin: 4,
      },
      {
        imageSrc: "/images/certifications/italia_Accredia-kiwa Cermet_blu 1.webp",
        imageAlt: "Certificazione ISO 45001 — Kiwa Cermet",
        tag: "Certificazioni",
        date: "12 Apr 2026",
        title: "Rinnovata la certificazione ISO 45001 per il quinto anno consecutivo",
        desc: "L'audit Kiwa Cermet ha confermato l'allineamento dei nostri processi di sicurezza ai più alti standard di settore.",
        readMin: 3,
      },
      {
        imageSrc: "/images/design/proj-villaregia.webp",
        imageAlt: "Abbazia di Villaregia — restauro conservativo completato",
        tag: "Restauro",
        date: "02 Apr 2026",
        title: "Abbazia di Villaregia: completato il consolidamento strutturale",
        desc: "Conclusa la fase di consolidamento delle volte e ripristino dei paramenti murari originali. Aperta al pubblico nel weekend di Pentecoste.",
        readMin: 6,
      },
      {
        imageSrc: "/images/design/proj-corti.webp",
        imageAlt: "Ufficio tecnico Costruzioni Edilferro",
        tag: "Azienda",
        date: "20 Mar 2026",
        title: "Tre nuovi geometri entrano nell'ufficio tecnico",
        desc: "L'organico tecnico cresce a 14 figure dedicate alla progettazione esecutiva, computi metrici e direzione lavori interna.",
        readMin: 2,
      },
      {
        imageSrc: "/images/cantieri/efficientamento-energetico/01.webp",
        imageAlt: "Open day cantiere efficientamento energetico — Rovigo",
        tag: "Eventi",
        date: "08 Mar 2026",
        title: "Open day di cantiere a Rovigo: oltre 80 visitatori in due giorni",
        desc: "Apertura straordinaria del cantiere di efficientamento energetico in via Mazzini. Il prossimo open day è previsto a settembre.",
        readMin: 3,
      },
      {
        imageSrc: "/images/design/proj-casa-cura.webp",
        imageAlt: "Cantiere ampliamento casa di cura San Bortolo — Rovigo",
        tag: "Opere pubbliche",
        date: "24 Feb 2026",
        title: "Aggiudicato l'ampliamento della casa di cura San Bortolo",
        desc: "Gara vinta in raggruppamento temporaneo di imprese. Progetto da 4.200 mq con criteri NZEB e sale operatorie ibride.",
        readMin: 5,
      },
      {
        imageSrc: "/images/cantieri/casa-passiva-porto-viro/03.webp",
        imageAlt: "Casa passiva privata Adria — fase cappotto e tetto",
        tag: "Cantieri",
        date: "10 Feb 2026",
        title: "Casa passiva privata di Adria: tetto e cappotto completati",
        desc: "Test blower-door superato con n50 = 0,28. Fase finale di posa serramenti triplo vetro a taglio termico.",
        readMin: 4,
      },
    ],
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
          "Chiavi in mano",
        ],
        ctaLabel: "Servizi per privati",
        ctaHref: "/servizi#privati",
      },
      {
        n: "02",
        kicker: "Settore Pubblico",
        title: "Opere in cui la comunità investe.",
        body: "Affianchiamo Comuni, ASL ed enti del territorio nella realizzazione di scuole, edifici sanitari e restauro conservativo. Attestazione SOA OG1–OG2–OG3–OG11, esperienza consolidata nei rapporti con Soprintendenze e stazioni appaltanti.",
        imageSrc: "/images/design/img-pubblico.webp",
        imageAlt: "Cantiere pubblico — restauro istituzionale",
        tags: ["Appalti SOA", "Restauro conservativo", "Scuole e ASL", "Direzione lavori"],
        ctaLabel: "Opere pubbliche",
        ctaHref: "/servizi#pubblico",
      },
      {
        n: "03",
        kicker: "Aziende & Professionisti",
        title: "Spazi che lavorano con te.",
        body: "Capannoni industriali, sedi direzionali, strutture commerciali. Tempistiche contrattuali, manutenzione programmata e cantieri che non fermano la tua attività. Collaboriamo con studi di architettura e ingegneria come impresa generale di fiducia.",
        imageSrc: "/images/design/img-industriale.webp",
        imageAlt: "Cantiere industriale — capannone produttivo",
        tags: ["Capannoni", "Sedi direzionali", "General contractor", "Manutenzione programmata"],
        ctaLabel: "Soluzioni per aziende",
        ctaHref: "/servizi#professionisti",
      },
    ],
  },
  featuredProjects: {
    eyebrow: "Selezione lavori",
    titleStart: "Cantieri recenti ",
    titleAccent: "dal Polesine",
    titleEnd: " al resto del Veneto.",
    archiveLinkLabel: "Archivio lavori",
    archiveLinkHref: "/progetti#archivio-lavori",
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
        imageSrc: "/images/design/proj-villaregia.webp",
        imageAlt: "Abbazia di Villaregia — restauro conservativo",
        tag: "Restauro",
        title: "Abbazia di Villaregia",
        place: "Porto Viro",
        year: "2023",
        projectKey: "abbazia-villaregia",
      },
      {
        imageSrc: "/images/design/proj-passiva.webp",
        imageAlt: "Casa passiva privata — Porto Viro",
        tag: "Residenziale",
        title: "Casa passiva privata",
        place: "Adria",
        year: "2024",
        projectKey: "casa-passiva",
      },
      {
        imageSrc: "/images/design/proj-casa-cura.webp",
        imageAlt: "Ampliamento casa di cura — Rovigo",
        tag: "Opere pubbliche",
        title: "Ampliamento casa di cura",
        place: "Rovigo",
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
    titleAccent: "presenti in tutto il Veneto.",
    body: "Sede storica nel cuore del Polesine, una rete di fornitori consolidati e squadre pronte a intervenire in giornata sui cantieri continuativi. Per commesse di rilievo raggiungiamo Padova, Ferrara e Venezia.",
    zones: [
      { name: "Porto Viro", role: "Sede operativa", km: "0 km", primary: true },
      { name: "Rovigo", role: "Cantieri continuativi", km: "28 km", primary: true },
      { name: "Adria", role: "Cantieri continuativi", km: "18 km", primary: true },
      { name: "Chioggia", role: "Cantieri continuativi", km: "35 km", primary: true },
      { name: "Padova", role: "Commesse selezionate", km: "62 km", primary: false },
      { name: "Ferrara", role: "Commesse selezionate", km: "54 km", primary: false },
      { name: "Venezia", role: "Commesse selezionate", km: "75 km", primary: false },
    ],
  },
  finalCta: {
    eyebrow: "Iniziamo a parlarne",
    headline: "Ogni progetto comincia con un sopralluogo in cantiere.",
    body: "Raccontaci l'opera. Veniamo sul posto, valutiamo fattibilità e tempi, e prepariamo un'offerta dettagliata entro dieci giorni lavorativi. Nessun costo, nessun impegno.",
    primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
    secondaryCta: { label: "Richiedi un preventivo", href: "/contatti" },
  },
} as const;
