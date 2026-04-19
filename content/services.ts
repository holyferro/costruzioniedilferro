// content/services.ts
// Tutto il copy e i dati della pagina /servizi.
// Importato da app/servizi/page.tsx e passato come props alle sezioni.
// Nessun import esterno — puro TypeScript, no JSX, no React.

export type SoaBadge = {
  readonly code: string; // "OG1" | "OG2" | "OG3"
  readonly name: string; // "Edifici civili e industriali"
  readonly description: string; // 1-2 righe in italiano leggibile
};

export type ServiceCard = {
  readonly title: string;
  readonly description: string;
  readonly features?: readonly string[];
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
  readonly serviceCards?: readonly ServiceCard[];
};

export type ProcessStep = {
  readonly n: string; // "01" | "02" | "03" | "04"
  readonly title: string;
  readonly description: string;
};

export type FaqItem = {
  readonly q: string;
  readonly a: string;
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
  readonly faq: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly items: readonly FaqItem[];
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
        serviceCards: [
          {
            title: "Nuove costruzioni antisismiche",
            description:
              "Edifici residenziali conformi alle norme NTC 2018. Struttura in c.a. o acciaio certificata, dal progetto esecutivo alla consegna.",
            features: [
              "Progettazione strutturale NTC 2018",
              "Strutture in c.a. o acciaio certificate",
              "Classe energetica A/NZEB su richiesta",
              "Gestione pratiche comunali inclusa",
            ],
          },
          {
            title: "Ristrutturazioni di pregio",
            description:
              "Interventi completi sull'esistente: consolidamento strutturale, rifacimento impiantistico, rifinitura su misura.",
            features: [
              "Consolidamento strutturale e antisismico",
              "Rifacimento impiantistico (idraulico, elettrico, HVAC)",
              "Rifinitura personalizzata su capitolato",
              "Interventi su immobili vincolati",
            ],
          },
          {
            title: "Efficienza energetica NZEB",
            description:
              "Case passive e nZEB con cappotto termico, serramenti ad alta prestazione e impianti a basse emissioni.",
            features: [
              "Cappotto termico certificato",
              "Serramenti ad alta prestazione",
              "Impianti pompa di calore e fotovoltaico",
              "Pratiche Ecobonus/Superbonus gestite",
            ],
          },
          {
            title: "Direzione lavori interna",
            description:
              "Un unico referente tecnico dall'apertura cantiere alla consegna chiavi. Nessuna catena di subappalti non coordinata.",
            features: [
              "Unico referente tecnico per tutta la durata",
              "Coordinamento sicurezza ISO 45001",
              "Reportistica avanzamento lavori",
              "Garanzia post-consegna sul lavoro eseguito",
            ],
          },
        ],
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
        serviceCards: [
          {
            title: "General contractor",
            description:
              "Gestiamo l'intera filiera: progettazione esecutiva, subappaltatori specializzati, rendicontazione a corpo e cronoprogramma vincolante.",
            features: [
              "Appalto a corpo con cronoprogramma vincolante",
              "Subappaltatori specializzati già selezionati",
              "Rendicontazione mensile SAL",
              "Interfaccia unica con la committenza",
            ],
          },
          {
            title: "Strutture industriali e commerciali",
            description:
              "Capannoni prefabbricati e in c.a., sedi direzionali, showroom e strutture ricettive fino a grande scala.",
            features: [
              "Capannoni prefabbricati e in c.a.",
              "Fondazioni speciali su terreni difficili",
              "Impianti tecnologici integrati",
              "Consegna chiavi in mano",
            ],
          },
          {
            title: "Manutenzione programmata",
            description:
              "Contratti di manutenzione ordinaria e straordinaria con intervento pianificato, reportistica e tempi garantiti.",
            features: [
              "Sopralluogo diagnostico iniziale",
              "Piano pluriennale personalizzato",
              "Intervento entro 48h per urgenze",
              "Report fotografico post-intervento",
            ],
          },
          {
            title: "Collaborazione con studi tecnici",
            description:
              "Affiancamento a studi di architettura e ingegneria come partner realizzativo di fiducia per la fase di cantiere.",
            features: [
              "Interfaccia cantiere per studi A+I",
              "Condivisione tavole costruttive e AS-BUILT",
              "Riunioni di cantiere cadenzate",
              "Fatturazione SAL allineata al progetto",
            ],
          },
        ],
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
  faq: {
    eyebrow: "DOMANDE FREQUENTI",
    titleStart: "Risposte ",
    titleAccent: "chiare",
    titleEnd: " ai tuoi dubbi.",
    items: [
      {
        q: "Quanto tempo passa dal primo contatto all'inizio del cantiere?",
        a: "Dopo il sopralluogo elaboriamo il preventivo entro 10 giorni lavorativi. Una volta accettato, i tempi di avvio dipendono dalle pratiche edilizie necessarie: per interventi in manutenzione ordinaria si può partire in 2–4 settimane, per nuove costruzioni con permesso di costruire si calcolano 60–90 giorni per l'iter autorizzativo.",
      },
      {
        q: "Operate solo nel Polesine o anche in altre province del Veneto?",
        a: "Operiamo principalmente nel Polesine (Rovigo e provincia) e nelle aree limitrofe del Veneto. Per opere pubbliche e commesse di importo rilevante siamo disponibili su tutto il territorio regionale. Contattaci per valutare insieme la fattibilità logistica del tuo progetto.",
      },
      {
        q: "Rilasciate garanzie sui lavori eseguiti?",
        a: "Sì. Emettiamo garanzia post-consegna su tutti i lavori eseguiti direttamente dalle nostre maestranze. Per le nuove costruzioni la garanzia decennale è obbligatoria per legge (art. 1669 c.c.) e copre vizi strutturali. Per ristrutturazioni e interventi di manutenzione applichiamo una garanzia contrattuale specifica, concordata caso per caso.",
      },
      {
        q: "Come si struttura il preventivo? Lavorate a misura o a corpo?",
        a: "Lavoriamo preferibilmente a corpo con computo metrico dettagliato allegato al contratto: il prezzo concordato è fisso e non varia al variare delle quantità. Questo elimina le sorprese a fine lavori. Su richiesta è possibile strutturare il contratto a misura per interventi particolarmente complessi o con variabili difficilmente prevedibili in fase progettuale.",
      },
      {
        q: "Gestite anche le pratiche edilizie e i rapporti con il Comune?",
        a: "Sì, ci occupiamo della gestione delle pratiche CILA, SCIA e permessi di costruire attraverso i nostri tecnici di fiducia. Coordiniamo i rapporti con il Comune, la Soprintendenza (per interventi su edifici vincolati) e gli altri enti coinvolti. Il committente ha un unico interlocutore per tutto l'iter.",
      },
      {
        q: "Cosa significa avere l'attestazione SOA e perché è importante?",
        a: "L'attestazione SOA (Società Organismo di Attestazione) certifica che un'impresa edile ha i requisiti tecnici, economici e organizzativi per eseguire lavori pubblici. Le nostre qualifiche OG1 (edifici civili), OG2 (restauro beni tutelati) e OG3 (strade e urbanizzazioni) ci abilitano a partecipare a gare d'appalto pubbliche. Per i privati è un segnale di solidità: attestano che l'impresa è stata verificata da un organismo terzo accreditato.",
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
