// content/certifications.ts
// Dati per la pagina /certificazioni. Unica fonte di verità per copy e asset.

export type RenewalRow = {
  label: string;
  title: string;
  detail: string;
};

export type SoaCategory = {
  code: string;
  name: string;
  classifica: string;
};

export const certificazioniContent = {
  hero: {
    eyebrow: "Qualifiche & certificazioni",
    titleStart: "Qualificati per costruire, ",
    titleAccent: "certificati",
    titleEnd: " per durare.",
    subtitle:
      "Ogni qualifica che portiamo è pubblica e verificabile sul portale ANAC. Nessuna autocertificazione.",
  },

  soa: {
    eyebrow: "Qualificazione opere pubbliche",
    tag: "Qualificazione SOA",
    title: "Qualificazione SOA fino alla Classe VI",
    body: "L'attestazione SOA certifica l'idoneità di Costruzioni Edilferro S.r.l. a partecipare ed eseguire lavori pubblici, attestando requisiti tecnici, organizzativi ed economico-finanziari verificati da organismi autorizzati.\n\nL'impresa è qualificata nelle principali categorie del settore edilizio, infrastrutturale e impiantistico, con capacità operativa su opere pubbliche di elevata complessità.",
    stats: [
      { label: "Categorie SOA", value: "OG1 · OG2\nOG3 · OG11" },
      { label: "Qualificazione principale", value: "Classe VI", sub: "fino a oltre 10 milioni €" },
      { label: "Organismo", value: "CQOP S.p.A." },
    ],
    categories: [
      { code: "OG1", name: "Edifici civili e industriali", classifica: "Classifica VI" },
      {
        code: "OG2",
        name: "Restauro e manutenzione beni sottoposti a tutela",
        classifica: "Classifica IV-bis",
      },
      { code: "OG3", name: "Strade, autostrade, ponti", classifica: "Classifica III-bis" },
      { code: "OG11", name: "Impianti tecnologici", classifica: "Classifica III" },
    ] satisfies SoaCategory[],
    anacLink: "https://servizi.anticorruzione.it/RicercaAttestazioniWebApp/",
    commitments: [
      {
        title: "Accesso qualificato agli appalti pubblici",
        body: "L'attestazione SOA consente all'impresa di partecipare a gare pubbliche per lavori di importo rilevante, in base alle categorie e classifiche ottenute.",
      },
      {
        title: "Verifica ANAC trasparente",
        body: "L'attestazione è pubblica e verificabile attraverso i canali ufficiali ANAC, offrendo a committenti, enti e professionisti un riscontro oggettivo sui requisiti dell'impresa.",
      },
      {
        title: "Solidità tecnica e organizzativa",
        body: "Le qualificazioni ottenute confermano una struttura aziendale adeguata alla gestione di cantieri complessi, opere pubbliche e interventi multidisciplinari.",
      },
    ],
  },

  certCards: [
    {
      id: "iso9001",
      year: null,
      logoSrc: "/images/certifications/castoro 1.webp",
      logoAlt: "Logo Castoro — rating imprese edili",
      logo2Src: "/images/certifications/italia_Accredia-kiwa Cermet_blu 1.webp",
      logo2Alt: "Logo Kiwa Cermet accreditato Accredia",
      logo2ClassName: "h-[130%] w-auto object-contain object-left",
      tag: "Sistemi di gestione certificati",
      title: "ISO 9001 e ISO 14001 — Kiwa Cermet",
      body: "Costruzioni Edilferro S.r.l. adotta sistemi di gestione certificati secondo le norme ISO 9001:2015 e ISO 14001:2015, rilasciati da Kiwa Cermet e accreditati da Accredia.\n\nLa certificazione ISO 9001 attesta un sistema di gestione orientato alla qualità, al controllo dei processi e al miglioramento continuo. La certificazione ISO 14001 conferma l'impegno dell'impresa nella gestione ambientale delle proprie attività.\n\nEntrambe le certificazioni sono riferite alle attività di costruzione e ristrutturazione di edifici civili.",
      pdfHref: "/images/certifications/edilferro-iso-kiwa-cermet.pdf",
      pdfLabel: "Consulta i certificati PDF",
      pdfNote: "Documento completo disponibile in PDF.",
    },
    {
      id: "cea",
      year: "2023",
      logoSrc: "/images/certifications/Bollino_CEA2023.webp",
      logoAlt: "Bollino Cassa Edile Awards 2023",
      tag: "Riconoscimento settoriale",
      title: "Cassa Edile Awards 2023",
      body: "Nel 2023 Costruzioni Edilferro S.r.l. ha ricevuto il riconoscimento Cassa Edile Awards, conferito dalla Cassa Edile Interprovinciale del Veneto alle imprese che si distinguono per correttezza, affidabilità e qualità operativa.\n\nL'azienda è stata premiata per il comportamento virtuoso nelle categorie Top Player Impresa e Dream Team, a conferma dell'impegno costante nella gestione dei cantieri, nella sicurezza sul lavoro e nella continuità occupazionale.\n\nQuesto riconoscimento rappresenta una valutazione oggettiva da parte della filiera, basata su parametri concreti e verificabili, e non su autodichiarazioni.",
    },
    {
      id: "ance",
      year: null,
      logoSrc: "/images/certifications/ancerovigo 1.webp",
      logoAlt: "Logo ANCE Rovigo",
      tag: "Associazione di categoria",
      title: "ANCE — Costruttori Edili",
      body: "Soci ANCE Rovigo — Associazione Nazionale Costruttori Edili. L'affiliazione garantisce l'accesso agli aggiornamenti normativi di settore, ai protocolli di sicurezza e alla formazione continua delle maestranze secondo gli standard nazionali.",
    },
    {
      id: "asp",
      year: null,
      logoSrc: "/images/certifications/A.S.P.Energia certif. socio Partner 1.webp",
      logoAlt: "Logo ASP Energia — socio partner",
      tag: "Efficienza energetica",
      title: "A.S.P. Energia — Socio Partner Certificato",
      body: "Certificazione come Socio Partner di A.S.P. Energia, che qualifica l'impresa per interventi di efficientamento energetico, riqualificazione NZEB e pratiche Superbonus/Ecobonus. Accesso diretto ai protocolli di diagnosi e verifica energetica.",
    },
  ],

  rinnovi: {
    eyebrow: "Il valore di una certificazione",
    title: "Una certificazione vale quanto chi la mantiene.",
    body: "Ottenere un certificato richiede un audit iniziale. Mantenerlo richiede continuità: revisioni annuali, aggiornamento delle procedure, formazione obbligatoria dei tecnici. Noi rinnoviamo ogni qualifica nei tempi previsti, senza deroghe.",
    rows: [
      {
        label: "SOA",
        title: "Validità quinquennale — scadenza 2028",
        detail: "Attestazione n. 74915/10/00 · rilascio 06/11/2024 · Organismo: CQOP S.p.A.",
      },
      {
        label: "ISO 9001",
        title: "Audit di sorveglianza annuale",
        detail: "Prossimo audit: ottobre 2025 · Kiwa Cermet",
      },
      {
        label: "ANCE",
        title: "Rinnovo annuale iscrizione",
        detail: "Regolarità contributiva Cassa Edile verificata mensilmente",
      },
      {
        label: "A.S.P.",
        title: "Rinnovo biennale",
        detail: "Qualifica energetica aggiornata con i requisiti PNRR 2024",
      },
    ] satisfies RenewalRow[],
  },

  finalCta: {
    headline: "Ogni progetto comincia con un sopralluogo gratuito.",
    body: "Raccontaci l'opera. Portiamo l'esperienza di quarant'anni di cantieri e tutte le qualifiche che servono per realizzarla.",
  },
};
