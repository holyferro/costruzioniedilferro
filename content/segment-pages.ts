// content/segment-pages.ts
// Copy e dati per le 3 pagine di espansione: /servizi/privati, /servizi/pubblico, /servizi/aziende.
// Importato dai rispettivi page.tsx — nessun JSX, nessun React.

import type { ProcessStep, FaqItem } from "@/content/services";

// ─────────────────────────────────────────────
// PRIVATI
// ─────────────────────────────────────────────

export type BonusCard = {
  readonly pct: string;
  readonly title: string;
  readonly description: string;
  readonly note: string;
};

export type PrivatiPageContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly serviceCards: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
  };
  readonly process: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly steps: readonly ProcessStep[];
  };
  readonly bonusFiscali: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
    readonly cards: readonly BonusCard[];
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

export const privatiPageContent: PrivatiPageContent = {
  hero: {
    eyebrow: "SERVIZI PER PRIVATI",
    title: "La vostra casa merita un'impresa che dura.",
    subtitle:
      "Dalla prima chiamata alla consegna delle chiavi, un unico referente tecnico e preventivi chiusi senza sorprese. Dal 1981 costruiamo abitazioni nel Polesine e in tutto il Veneto.",
    imageSrc: "/images/design/proj-passiva.webp",
    imageAlt: "Interno casa passiva — Costruzioni Edilferro",
  },
  serviceCards: {
    eyebrow: "COSA REALIZZIAMO",
    titleStart: "Quattro servizi, ",
    titleAccent: "una sola impresa",
    titleEnd: ".",
    body: "Dalla nuova costruzione antisismica alla ristrutturazione chiavi in mano, con direzione lavori interna per ogni fase.",
  },
  process: {
    eyebrow: "COME LAVORIAMO",
    titleStart: "Dal primo contatto ",
    titleAccent: "alla consegna delle chiavi",
    titleEnd: ".",
    steps: [
      {
        n: "01",
        title: "Sopralluogo",
        description:
          "Veniamo sul posto, ascoltiamo le esigenze, valutiamo lo stato dell'immobile e la fattibilità tecnica. Senza costi, senza impegno.",
      },
      {
        n: "02",
        title: "Preventivo a corpo",
        description:
          "Computo metrico dettagliato e prezzo fisso allegato al contratto. Il numero concordato è il numero finale — salvo modifiche esplicite richieste dal committente.",
      },
      {
        n: "03",
        title: "Cantiere coordinato",
        description:
          "Maestranze dirette, direttore di cantiere presente, aggiornamenti settimanali sullo stato avanzamento lavori. Un unico interlocutore per tutta la durata.",
      },
      {
        n: "04",
        title: "Consegna e garanzia",
        description:
          "Collaudo, documentazione tecnica completa e garanzia post-consegna per legge e per contratto. Per le nuove costruzioni la garanzia decennale è obbligatoria (art. 1669 c.c.).",
      },
    ],
  },
  bonusFiscali: {
    eyebrow: "INCENTIVI FISCALI",
    titleStart: "Pratiche e incentivi: ",
    titleAccent: "ci pensiamo noi",
    titleEnd: ".",
    body: "Gestiamo le pratiche ENEA, i rapporti con il Comune e le comunicazioni con i professionisti abilitati. Il committente non deve sapere niente di moduli e scadenze.",
    cards: [
      {
        pct: "65%",
        title: "Ecobonus",
        description:
          "Interventi di efficienza energetica: cappotto termico, serramenti ad alta prestazione, pompa di calore, fotovoltaico integrato.",
        note: "Applicabile a edifici esistenti",
      },
      {
        pct: "70–85%",
        title: "Sismabonus",
        description:
          "Riduzione del rischio sismico certificata da professionista abilitato. Più è alta la riduzione di classe di rischio, più è alta la detrazione.",
        note: "Zona sismica 2 e 3",
      },
      {
        pct: "50%",
        title: "Detrazione ristrutturazioni",
        description:
          "Ristrutturazioni edilizie ordinarie e straordinarie. Applicabile a pratiche CILA e SCIA, con computo metrico certificato.",
        note: "Su importi fino a 96.000 €",
      },
      {
        pct: "75%",
        title: "Bonus barriere",
        description:
          "Eliminazione di barriere architettoniche. Applicabile anche in appartamento, su scala condominiale e in edifici unifamiliari.",
        note: "Valido anche per condomini",
      },
    ],
  },
  faq: {
    eyebrow: "DOMANDE FREQUENTI",
    titleStart: "Risposte ",
    titleAccent: "chiare",
    titleEnd: " per i privati.",
    items: [
      {
        q: "Posso restare in casa durante i lavori di ristrutturazione?",
        a: "Dipende dall'estensione dell'intervento. Per ristrutturazioni parziali (rifacimento bagno, singolo locale, facciata) è in genere possibile restare. Per ristrutturazioni complete che interessano impianti, struttura e finiture in contemporanea, è preferibile lasciare libero il cantiere per garantire sicurezza e velocità di esecuzione. Lo valutiamo caso per caso durante il sopralluogo.",
      },
      {
        q: "Cosa succede se durante i lavori scoprite problemi strutturali non previsti?",
        a: "È una delle situazioni più comuni nelle ristrutturazioni. Appena individuiamo un problema non previsto, lo documentiam fotograficamente, lo segnaliamo al committente e prepariamo una perizia tecnica. Qualsiasi variante rispetto al contratto originale viene preventivata per iscritto e approvata dal committente prima di procedere. Non facciamo mai lavori non concordati.",
      },
      {
        q: "Quanto tempo si calcola per una ristrutturazione completa?",
        a: "Una ristrutturazione completa di un appartamento di 100–120 mq richiede in media 4–6 mesi, a seconda dello stato di partenza e delle finiture scelte. Per villette unifamiliari con interventi strutturali si calcolano 8–12 mesi. Questi tempi includono solo la fase di cantiere: l'iter autorizzativo (CILA, SCIA, permesso di costruire) va calcolato a parte.",
      },
      {
        q: "Come funzionano i pagamenti in corso d'opera?",
        a: "Lavoriamo con SAL (Stati di Avanzamento Lavori) concordati in contratto. Di norma: anticipo alla firma, SAL intermedi a milestone definite (fine struttura, fine impiantistica, fine finiture) e saldo a collaudo. Non chiediamo anticipi non giustificati da lavori già eseguiti. Ogni SAL è accompagnato da reportistica fotografica dello stato dei lavori.",
      },
      {
        q: "Gestite anche le pratiche con il Comune e gli incentivi fiscali?",
        a: "Sì. Ci occupiamo di CILA, SCIA e permessi di costruire attraverso i nostri tecnici di fiducia. Per gli incentivi fiscali (Ecobonus, Sismabonus, detrazioni al 50%) gestiamo le pratiche ENEA e coordiniamo i professionisti abilitati. Il committente ha un unico interlocutore per tutto l'iter.",
      },
      {
        q: "Come funziona la garanzia sul lavoro eseguito?",
        a: "Per le nuove costruzioni la garanzia decennale è obbligatoria per legge (art. 1669 c.c.) e copre vizi strutturali. Per ristrutturazioni e interventi di manutenzione applichiamo una garanzia contrattuale specifica, concordata nel contratto. Emettiamo garanzia su tutto il lavoro eseguito direttamente dalle nostre maestranze.",
      },
    ],
  },
  finalCta: {
    eyebrow: "INIZIA DA QUI",
    headline: "Ogni progetto comincia con un sopralluogo.",
    body: "Veniamo a vedere l'immobile, valutiamo fattibilità e tempi, e prepariamo un'offerta dettagliata entro dieci giorni. Nessun costo, nessun impegno.",
    primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
    secondaryCta: { label: "Richiedi un preventivo", href: "/contatti" },
  },
};

// ─────────────────────────────────────────────
// SETTORE PUBBLICO
// ─────────────────────────────────────────────

export type PubbliciWork = {
  readonly tag: string;
  readonly title: string;
  readonly place: string;
  readonly year: string;
  readonly description: string;
};

export type PubblicoPageContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly serviceCards: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
  };
  readonly worksHighlight: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly items: readonly PubbliciWork[];
  };
  readonly process: {
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

export const pubblicoPageContent: PubblicoPageContent = {
  hero: {
    eyebrow: "SETTORE PUBBLICO",
    title: "Affidabilità documentata. Qualificazione SOA.",
    subtitle:
      "Costruzioni Edilferro è qualificata per eseguire lavori pubblici nelle categorie OG1, OG2, OG3 e OG11 — fino alla Classe VI. Esperienza consolidata con Comuni, ASL, Soprintendenze e stazioni appaltanti del Veneto.",
    imageSrc: "/images/design/img-pubblico.webp",
    imageAlt: "Cantiere pubblico — restauro istituzionale",
  },
  serviceCards: {
    eyebrow: "COSA REALIZZIAMO",
    titleStart: "Quattro ambiti, ",
    titleAccent: "una qualificazione verificata",
    titleEnd: ".",
    body: "Nuove costruzioni pubbliche, restauro conservativo, urbanizzazioni, scuole e strutture sanitarie. Attestazione SOA per ogni categoria.",
  },
  worksHighlight: {
    eyebrow: "OPERE RECENTI",
    titleStart: "Cantieri pubblici ",
    titleAccent: "completati",
    titleEnd: " nel Veneto.",
    items: [
      {
        tag: "Residenziale pubblico",
        title: "Studentato Universitario",
        place: "Rovigo",
        year: "2024",
        description:
          "100 posti letto distribuiti in tre corpi di fabbrica di due piani, con aree verdi esterne. Nuova costruzione in accordo con l'Università degli Studi di Padova.",
      },
      {
        tag: "Sanitario",
        title: "Ampliamento Casa di Cura",
        place: "Porto Viro",
        year: "2022",
        description:
          "Ampliamento e adeguamento normativo di struttura sanitaria in esercizio. Gestione interferenze con attività clinica continuativa durante tutto il cantiere.",
      },
      {
        tag: "Restauro conservativo",
        title: "Comunità Missionaria di Villaregia",
        place: "Porto Viro",
        year: "2023",
        description:
          "Restauro conservativo di edificio storico sottoposto a tutela ministeriale. Coordinamento con Soprintendenza e applicazione delle tecniche conservative NTC.",
      },
    ],
  },
  process: {
    eyebrow: "COME LAVORIAMO",
    titleStart: "Dall'offerta ",
    titleAccent: "al certificato di regolare esecuzione",
    titleEnd: ".",
    steps: [
      {
        n: "01",
        title: "Gara e aggiudicazione",
        description:
          "Documentazione tecnica completa (SOA, referenze, organigramma) per la fase di offerta. Supporto alla stazione appaltante nella valutazione dei requisiti.",
      },
      {
        n: "02",
        title: "Progettazione esecutiva",
        description:
          "Progetto esecutivo integrato, computo metrico a corpo, cronoprogramma vincolante. Coordinamento con i professionisti incaricati dalla stazione appaltante.",
      },
      {
        n: "03",
        title: "Realizzazione e SAL",
        description:
          "Maestranze dirette, sicurezza D.Lgs. 81/2008, SAL rendicontati alla stazione appaltante. Reportistica mensile e gestione interferenze con l'utenza.",
      },
      {
        n: "04",
        title: "Collaudo e chiusura",
        description:
          "Certificato di regolare esecuzione, documentazione tecnica completa, garanzie di legge. Supporto alla stazione appaltante nelle pratiche di collaudo.",
      },
    ],
  },
  faq: {
    eyebrow: "DOMANDE FREQUENTI",
    titleStart: "Risposte ",
    titleAccent: "tecniche",
    titleEnd: " per enti e stazioni appaltanti.",
    items: [
      {
        q: "Quali categorie SOA possedete e fino a quali importi?",
        a: "Siamo qualificati nelle categorie OG1 (Edifici civili e industriali — Classifica VI, oltre 10 milioni €), OG2 (Restauro e manutenzione beni tutelati — Classifica IV-bis), OG3 (Strade, autostrade, ponti — Classifica III-bis) e OG11 (Impianti tecnologici — Classifica III). L'attestazione è verificabile sul portale ANAC.",
      },
      {
        q: "Avete esperienza con rendicontazione per fondi PNRR o europei?",
        a: "Sì. Abbiamo esperienza nella rendicontazione SAL strutturata per stazioni appaltanti che operano con fondi PNRR, con le specifiche richieste di documentazione e tracciabilità dei flussi finanziari previste dalla normativa. Su richiesta forniamo un riferimento diretto con un ente pubblico con cui abbiamo collaborato su cantieri con finanziamento europeo.",
      },
      {
        q: "Come gestite i cantieri in aree frequentate come scuole o presidi sanitari?",
        a: "È uno degli aspetti che gestiamo con più attenzione. Prima dell'avvio del cantiere elaboriamo un piano di gestione delle interferenze con l'utenza, con orari di lavorazione, percorsi alternativi e misure di abbattimento rumore concordate con la stazione appaltante. Abbiamo realizzato ampliamenti in strutture sanitarie in piena attività e adeguamenti in istituti scolastici senza interruzione dell'attività didattica.",
      },
      {
        q: "Collaborate con la stazione appaltante nella fase di progettazione esecutiva?",
        a: "Sì, quando richiesto. Per gli appalti integrati e gli appalti di progettazione esecutiva e realizzazione possiamo affiancare i progettisti incaricati dalla stazione appaltante nella definizione dei dettagli esecutivi, nella verifica delle quantità e nella stesura del cronoprogramma. La collaborazione avviene sempre entro i ruoli previsti dal contratto.",
      },
      {
        q: "Come richiedere informazioni su una gara o invitarvi a una trattativa privata?",
        a: "Per richieste legate a procedure di gara (inviti a trattative private, richieste di preventivo su appalti negoziati) è preferibile contattare direttamente il nostro ufficio tecnico tramite il form di contatto o via email, specificando l'ente committente, la categoria SOA richiesta e l'importo stimato dei lavori. Forniamo documentazione aziendale completa entro 48 ore lavorative.",
      },
      {
        q: "Avete esperienza con la Soprintendenza per beni sottoposti a vincolo ministeriale?",
        a: "Sì. Abbiamo eseguito interventi di restauro conservativo su edifici sotto tutela del MiC, con iter autorizzativo gestito in coordinamento con la Soprintendenza di Venezia. La nostra qualificazione SOA OG2 certifica la capacità tecnica specifica per questo tipo di lavori.",
      },
    ],
  },
  finalCta: {
    eyebrow: "COLLABORIAMO",
    headline: "Per gare d'appalto e commesse pubbliche.",
    body: "Forniamo documentazione SOA, referenze e profilo aziendale su richiesta. Per informazioni su procedure di gara o per invitarci a trattative private, contattate il nostro ufficio tecnico.",
    primaryCta: { label: "Contatta l'ufficio tecnico", href: "/contatti" },
    secondaryCta: { label: "Verifica qualificazione SOA", href: "/certificazioni" },
  },
};

// ─────────────────────────────────────────────
// AZIENDE & PROFESSIONISTI
// ─────────────────────────────────────────────

export type ValueColumn = {
  readonly kicker: string;
  readonly title: string;
  readonly items: readonly string[];
};

export type AziendePageContent = {
  readonly hero: {
    readonly eyebrow: string;
    readonly title: string;
    readonly subtitle: string;
    readonly imageSrc: string;
    readonly imageAlt: string;
  };
  readonly valueSplit: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
    readonly columns: readonly [ValueColumn, ValueColumn];
  };
  readonly serviceCards: {
    readonly eyebrow: string;
    readonly titleStart: string;
    readonly titleAccent: string;
    readonly titleEnd: string;
    readonly body: string;
  };
  readonly process: {
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

export const aziendePageContent: AziendePageContent = {
  hero: {
    eyebrow: "AZIENDE & PROFESSIONISTI",
    title: "Il cantiere che non ferma la vostra attività.",
    subtitle:
      "General contractor per strutture industriali, commerciali e direzionali. Manutenzione programmata con intervento garantito. Partner realizzativo per studi di architettura e ingegneria.",
    imageSrc: "/images/design/img-industriale.webp",
    imageAlt: "Cantiere industriale — capannone produttivo Veneto",
  },
  valueSplit: {
    eyebrow: "PERCHÉ SCEGLIERCI",
    titleStart: "Due interlocutori, ",
    titleAccent: "un unico approccio",
    titleEnd: ".",
    body: "Lavoriamo con le aziende come general contractor di fiducia e con gli studi tecnici come impresa esecutrice fedele al progetto. In entrambi i casi: cronoprogramma vincolante, interfaccia unica, SAL mensili.",
    columns: [
      {
        kicker: "Per le aziende",
        title: "Zero downtime. Costi certi.",
        items: [
          "Cronoprogramma vincolante con penali per ritardo",
          "Gestione interferenze con la continuità produttiva",
          "Appalto a corpo: il prezzo concordato è quello finale",
          "Manutenzione programmata con intervento entro 48h",
          "Fatturazione SAL mensile allineata al cantiere",
          "Unico referente per tutta la durata del contratto",
        ],
      },
      {
        kicker: "Per studi A+I",
        title: "Eseguiamo il progetto. Non lo reinterpretiamo.",
        items: [
          "Esecuzione fedele al capitolato e alle tavole di progetto",
          "Condivisione AS-BUILT e documentazione costruttiva",
          "Riunioni di cantiere cadenzate con verbale",
          "Subappaltatori specializzati già selezionati e coordinati",
          "Fatturazione SAL allineata alle milestone del progetto",
          "Disponibilità a inserirci in cantieri già avviati",
        ],
      },
    ],
  },
  serviceCards: {
    eyebrow: "COSA REALIZZIAMO",
    titleStart: "Quattro aree, ",
    titleAccent: "un general contractor",
    titleEnd: ".",
    body: "Dal capannone prefabbricato al contratto di manutenzione pluriennale, dalla sede direzionale alla collaborazione con lo studio di progettazione.",
  },
  process: {
    eyebrow: "COME LAVORIAMO",
    titleStart: "Dal briefing ",
    titleAccent: "alla consegna operativa",
    titleEnd: ".",
    steps: [
      {
        n: "01",
        title: "Briefing",
        description:
          "Cronoprogramma concordato, identificazione delle interferenze con l'attività produttiva, definizione dei vincoli operativi e delle soglie di tolleranza per il cantiere.",
      },
      {
        n: "02",
        title: "Progettazione esecutiva",
        description:
          "Computo a corpo, verifica carichi, autorizzazioni. Per strutture industriali: fondazioni, impianti tecnologici, raccordo con la rete esistente.",
      },
      {
        n: "03",
        title: "Cantiere",
        description:
          "Gestione attiva delle interferenze, aggiornamenti SAL mensili, coordinamento subappaltatori specializzati. Il cantiere non è un problema di chi commissiona.",
      },
      {
        n: "04",
        title: "Consegna",
        description:
          "Documentazione AS-BUILT, collaudo impiantistico, reportistica tecnica completa. Contratto di manutenzione ordinaria opzionale al momento della consegna.",
      },
    ],
  },
  faq: {
    eyebrow: "DOMANDE FREQUENTI",
    titleStart: "Risposte ",
    titleAccent: "operative",
    titleEnd: " per aziende e professionisti.",
    items: [
      {
        q: "Garantite il rispetto del cronoprogramma con penali contrattualizzate?",
        a: "Sì. Lavoriamo con cronoprogrammi vincolanti allegati al contratto, con milestone definite e penali per ritardo concordate. Il 96% dei cantieri del 2024 è stato consegnato entro la data contrattuale. Quando prevediamo scostamenti, lo comunichiamo con anticipo sufficiente per pianificare alternative — non a consegna avvenuta.",
      },
      {
        q: "Come gestite un cantiere che si sovrappone alla nostra attività produttiva?",
        a: "È il tema centrale per le aziende. Prima dell'avvio definiamo con voi le fasce orarie di lavorazione tollerabili, i percorsi di accesso al cantiere, le zone buffer e le misure di contenimento di polvere e rumore. Interveniamo spesso in orari notturni o nel weekend quando la produzione è ferma. Il piano di gestione interferenze è parte integrante del contratto.",
      },
      {
        q: "Offrite contratti di manutenzione ordinaria e straordinaria?",
        a: "Sì. I contratti di manutenzione programmata includono: sopralluogo diagnostico iniziale, piano pluriennale personalizzato, intervento entro 48h per urgenze e report fotografico post-intervento. Il canone è concordato annualmente e copre sia la manutenzione ordinaria preventiva che gli interventi straordinari a tariffa concordata.",
      },
      {
        q: "Come funziona la collaborazione con uno studio di architettura o ingegneria?",
        a: "Lavoriamo come impresa esecutrice affiancata allo studio, non come sostituti del progettista. Eseguiamo il capitolato e le tavole di progetto, segnaliamo eventuali incongruenze esecutive in anticipo rispetto all'avanzamento del cantiere, condividiamo AS-BUILT e documentazione costruttiva, partecipiamo alle riunioni di cantiere con verbale. La fatturazione SAL è allineata alle milestone del progetto.",
      },
      {
        q: "Realizzate anche gli impianti tecnologici o solo le opere civili?",
        a: "Realizziamo anche impianti tecnologici (cat. SOA OG11): impianti elettrici, idraulici, HVAC, antincendio, fotovoltaici e reti dati. Per gli impianti speciali ci avvaliamo di subappaltatori specializzati già selezionati e coordinati internamente — il committente non deve gestire interfacce multiple.",
      },
      {
        q: "Qual è l'importo minimo per una commessa industriale o commerciale?",
        a: "Non esiste una soglia fissa, ma per questioni di organizzazione cantiere e gestione amministrativa lavoriamo con più efficacia su interventi da 100.000 € in su. Per interventi più piccoli (manutenzione, adeguamenti locali) valutiamo caso per caso. Contattateci con una descrizione dell'opera: se non è nel nostro range, lo diciamo chiaramente.",
      },
    ],
  },
  finalCta: {
    eyebrow: "PARLIAMO DI BUSINESS",
    headline: "Il vostro progetto merita un preventivo strutturato.",
    body: "Tipo di struttura, metratura, tempistiche: raccontateci l'opera e prepariamo un'offerta a corpo con cronoprogramma entro dieci giorni lavorativi.",
    primaryCta: { label: "Richiedi un preventivo", href: "/contatti" },
    secondaryCta: { label: "Scopri le certificazioni", href: "/certificazioni" },
  },
};
