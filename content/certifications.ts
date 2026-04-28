// content/certifications.ts
// Dati per la pagina /certificazioni. Unica fonte di verità per copy e asset.

export type RenewalRow = {
  label: string;
  title: string;
  detail: string;
};

export const certificazioniContent = {
  hero: {
    eyebrow: "Qualifiche & certificazioni",
    titleStart: "Qualificati per costruire, ",
    titleAccent: "certificati",
    titleEnd: " per durare.",
    subtitle:
      "Ogni certificazione che portiamo è il risultato di audit esterni, di processi misurabili e di una filiera produttiva che non ha subappaltatori opachi.",
  },

  soa: {
    eyebrow: "Qualificazione opere pubbliche",
    tag: "Qualificazione SOA",
    title: "Costruttori Qualificati Opere Pubbliche — Classifica IV",
    body: "L'attestazione SOA (rilasciata da CQOP S.p.A., organismo di attestazione vigilato da ANAC) certifica la nostra idoneità a partecipare ad appalti pubblici per le categorie OG1 (Edifici civili e industriali), OG2 (Restauro e manutenzione dei beni immobili sottoposti a tutela) e OG3 (Strade, autostrade, ponti) fino alla classifica IV.",
    stats: [
      { label: "Categoria", value: "OG1 · OG2 · OG3" },
      { label: "Classifica", value: "IV" },
      { label: "Organismo", value: "CQOP S.p.A." },
    ],
    anacLink: "https://servizi.anticorruzione.it/RicercaAttestazioniWebApp/",
    commitments: [
      {
        title: "Accesso garantito a bandi pubblici",
        body: "Possiamo partecipare a gare d'appalto indette da Comuni, ASL, enti locali e pubbliche amministrazioni senza limitazioni di importo fino alla classifica IV.",
      },
      {
        title: "Verifica ANAC trasparente",
        body: "L'attestazione è pubblica e consultabile sul sito ANAC. Nessuna autocertificazione: terzi verificano competenze, mezzi d'opera e solidità patrimoniale ogni tre anni.",
      },
      {
        title: "Garanzia finanziaria inclusa",
        body: "La classifica IV copre importi fino a 5.165.000 €. Per opere di maggiore entità lavoriamo in ATI con imprese complementari, garantendo sempre la stazione appaltante.",
      },
    ],
  },

  certCards: [
    {
      id: "iso9001",
      year: "ISO 9001:2015",
      logoSrc: "/images/certifications/italia_Accredia-kiwa Cermet_blu 1.webp",
      logoAlt: "Logo Kiwa Cermet Accredia — certificazione ISO 9001",
      tag: "Sistema di gestione qualità",
      title: "UNI EN ISO 9001 — Kiwa Cermet",
      body: "Il sistema di gestione della qualità dell'impresa è certificato secondo la norma ISO 9001:2015, verificato annualmente da Kiwa Cermet (ente accreditato Accredia). Coprono tutti i processi: dalla progettazione del cantiere alla consegna delle chiavi, fino alla gestione dei fornitori.",
    },
    {
      id: "cea",
      year: "2023",
      logoSrc: "/images/certifications/Bollino_CEA2023.webp",
      logoAlt: "Bollino Cassa Edile Awards 2023",
      tag: "Riconoscimento settoriale",
      title: "Cassa Edile Awards 2023",
      body: "Premio assegnato da Cassa Edile di Rovigo alle imprese edili che si distinguono per regolarità contributiva, sicurezza sul lavoro e continuità occupazionale. Un riconoscimento dalla filiera, non dall'autoattribuzione.",
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
    {
      id: "castoro",
      year: null,
      logoSrc: "/images/certifications/castoro 1.webp",
      logoAlt: "Logo Castoro — rating imprese edili",
      tag: "Rating qualitativo",
      title: "Castoro — Rating Imprese Edili",
      body: "Riconoscimento riservato alle imprese edili che dimostrano continuità operativa, affidabilità finanziaria e qualità esecutiva nel tempo. Assegnato sulla base di parametri oggettivi verificati annualmente.",
    },
  ],

  rinnovi: {
    eyebrow: "Il valore di una certificazione",
    title: "Una certificazione vale quanto chi la mantiene.",
    body: "Ottenere un certificato richiede un audit iniziale. Mantenerlo richiede continuità: revisioni annuali, aggiornamento delle procedure, formazione obbligatoria dei tecnici. Noi rinnoviamo ogni qualifica nei tempi previsti, senza deroghe.",
    rows: [
      {
        label: "SOA",
        title: "Rinnovo triennale + verifica annuale",
        detail: "Prossimo rinnovo: 2026 · Organismo: CQOP S.p.A.",
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
    eyebrow: "Iniziamo a parlarne",
    headline: "Ogni progetto comincia con un sopralluogo gratuito.",
    body: "Raccontaci l'opera. Portiamo l'esperienza di quarant'anni di cantieri e tutte le qualifiche che servono per realizzarla.",
    primaryCta: { label: "Richiedi un sopralluogo", href: "/contatti" },
    secondaryCta: { label: "Richiedi un preventivo", href: "/contatti" },
  },
};
