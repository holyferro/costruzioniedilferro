import type { Article } from "@/lib/types/article";

export const habitaArticle: Article = {
  slug: "habita",
  title: "Habita —",
  titleItalic: "la prima casa passiva in legno",
  excerpt:
    "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, monitorata per tre anni dall'Università di Padova. Un progetto che dimostra come comfort, sostenibilità e bellezza possano convivere anche nelle condizioni climatiche più impegnative.",
  category: "Progetto",
  publishedAt: "2016-01-01",
  updatedAt: "2025-01-01",
  readTime: "9 min",
  author: "Redazione Edilferro",
  cover: "/images/design/proj-passiva.webp",
  coverAlt: "Casa passiva Habita a Porto Viro nel Delta del Po",
  featured: true,
  heroMeta: [
    { label: "Anno", value: "2016" },
    { label: "Luogo", value: "Porto Viro, Rovigo" },
    { label: "Tipologia", value: "Casa passiva, X-Lam" },
    { label: "Certificazione", value: "Casa passiva certificata" },
  ],
  heroSubtitle:
    "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, certificata casa passiva e monitorata per tre anni dall'Università degli Studi di Padova.",
  body: [
    {
      type: "lead",
      text: "Uno dei progetti più ambiziosi mai realizzati da Costruzioni Edilferro: un'abitazione interamente in legno, nata dall'unione di competenze d'eccellenza e da una visione condivisa del futuro dell'edilizia.",
    },
    {
      type: "paragraph",
      text: "Costruita a Porto Viro, in provincia di Rovigo, in un'area dalle condizioni climatiche particolarmente impegnative come il Delta del Po, Habita rappresenta una sfida raccolta e vinta: realizzare un'abitazione ad altissime prestazioni energetiche in una zona esposta a umidità, vento salino e forti escursioni termiche stagionali.",
    },
    {
      type: "image",
      src: "/images/cantieri/casa-passiva-porto-viro/habita-21.webp",
      alt: "Habita — casa passiva a Porto Viro durante la costruzione",
      caption: "Porto Viro, 2016 — fase di cantiere",
    },
    {
      type: "section",
      eyebrow: "01 · Il progetto",
      title: "Nasce dalla collaborazione tra eccellenze del territorio",
      blocks: [
        {
          type: "paragraph",
          html: true,
          text: "Habita nasce dall'unione tra due realtà solide e riconosciute nel loro settore: <strong>Zennaro Giuseppe Legnami sas</strong>, storica nel commercio del larice siberiano e nella progettazione di abitazioni ecosostenibili tramite i pannelli X-Lam, e <strong>Costruzioni Edilferro Srl</strong>, che dagli anni Cinquanta opera nell'edilizia civile e privata con un costante impegno verso l'innovazione tecnica.",
        },
        {
          type: "paragraph",
          html: true,
          text: "Al progetto ha contribuito anche <strong>Tumiati Impianti srl</strong>, specializzata nella realizzazione degli impianti che rendono la casa quasi completamente autosufficiente dal punto di vista energetico.",
        },
        {
          type: "quote",
          text: "L'obiettivo era dimostrare che si può costruire un'abitazione in legno di alto livello anche in una zona dalle condizioni climatiche particolarmente difficili come l'area del Delta del Po, usando materiali naturali e fonti energetiche rinnovabili.",
        },
      ],
    },
    {
      type: "section",
      eyebrow: "02 · Cos'è",
      title: "Casa passiva: comfort assoluto, energia quasi zero",
      blocks: [
        {
          type: "paragraph",
          html: true,
          text: "Una <strong>casa passiva</strong> è un'abitazione progettata per mantenere al suo interno una temperatura costante e gradevole senza ricorrere — o ricorrendo solo in minima parte — a fonti energetiche tradizionali: caldaie, termosifoni, condizionatori. È praticamente autosufficiente nella regolazione del microclima interno.",
        },
        {
          type: "paragraph",
          text: "Il risultato si ottiene grazie a un involucro edilizio ad altissima efficienza termica, all'orientamento strategico dell'edificio, alla ventilazione meccanica controllata con recupero di calore e all'integrazione di fonti energetiche rinnovabili.",
        },
        {
          type: "paragraph",
          text: "In Habita il legno è il materiale protagonista: non una scelta estetica, ma un'opzione tecnicamente superiore. Regola naturalmente temperatura e umidità, non produce muffe, ha un'acustica eccellente e non risente delle oscillazioni stagionali tipiche del Delta del Po.",
        },
      ],
    },
    {
      type: "section",
      eyebrow: "03 · Tecnologia costruttiva",
      title: "Il sistema X-Lam: struttura solida, naturalmente antisismica",
      blocks: [
        {
          type: "paragraph",
          html: true,
          text: "Habita è realizzata con il sistema costruttivo <strong>X-Lam (Cross Laminated Timber)</strong>, una soluzione all'avanguardia per la costruzione di edifici in legno anche a più piani. I pannelli lamellari di legno massiccio, con spessori variabili dai 5 ai 30 cm, vengono realizzati incollando strati incrociati di tavole e poi tagliati con aperture per porte, finestre e vani scala già integrate.",
        },
        {
          type: "paragraph",
          text: "I pannelli vengono assemblati e collegati con angolari metallici, chiodi a rilievo troncoconici e viti autoforanti. Il risultato è una struttura che unisce leggerezza, solidità, durabilità e resistenza sismica naturale — ecocompatibile, e con grande flessibilità progettuale.",
        },
        {
          type: "univ-badge",
          title: "Monitorata per tre anni dall'Università degli Studi di Padova",
          text: "Rilevamenti trimestrali di temperatura, umidità, qualità dell'aria e caratteristiche del legno strutturale, per certificare le reali differenze di comfort tra costruzione in legno e tradizionale.",
          logo: "/images/loghi-partner/logo-unipd.webp",
        },
        {
          type: "image",
          src: "/images/cantieri/casa-passiva-porto-viro/habita-14.webp",
          alt: "Struttura X-Lam in legno durante il montaggio — Habita Porto Viro",
          caption: "Montaggio dei pannelli X-Lam in cantiere",
        },
      ],
    },
    {
      type: "section",
      eyebrow: "04 · Efficienza energetica",
      title: "Impianti modulari, rinnovabili, quasi zero emissioni",
      blocks: [
        {
          type: "paragraph",
          html: true,
          text: "Gli impianti di Habita sono stati progettati per massimizzare il recupero energetico e ridurre al minimo la dipendenza dalle fonti tradizionali. I sistemi adottati comprendono la <strong>ventilazione meccanica controllata con recupero di calore passivo</strong>, il riscaldamento e raffrescamento con recupero attivo, la produzione di acqua calda sanitaria e la regolazione termica attraverso <strong>pompa di calore geotermica o aerotermica</strong>.",
        },
        {
          type: "paragraph",
          text: "Il risultato concreto è una riduzione sostanziale delle emissioni di CO₂ e dello sfruttamento delle riserve di energia convenzionale. Non solo risparmio in bolletta: un contributo reale alla sostenibilità ambientale del territorio.",
        },
      ],
    },
    {
      type: "advantages",
      eyebrow: "05 · Perché sceglierla",
      title: "Otto ragioni per cui Habita rappresenta",
      titleItalic: "il futuro dell'abitare.",
      items: [
        {
          title: "Comfort e benessere",
          description:
            "Temperatura costante tutto l'anno, assenza di muffa, qualità dell'aria e acustica superiori.",
        },
        {
          title: "Ecosostenibilità",
          description:
            "Basse emissioni, materiali naturali e rinnovabili. Il legno usato è certificato e ripiantato.",
        },
        {
          title: "Tempi certi",
          description:
            "Pannelli assemblati in fabbrica e montati in cantiere in tempi rapidi e definiti.",
        },
        {
          title: "Risparmio in bolletta",
          description: "Microclima quasi autonomo: costi energetici drasticamente abbattuti.",
        },
        {
          title: "Progettazione su misura",
          description: "Ogni casa è unica. Lavoriamo con cliente e architetto su stile e spazi.",
        },
        {
          title: "Valore immobiliare",
          description: "Le case in legno mantengono e accrescono il loro valore nel tempo.",
        },
        {
          title: "Sicurezza antisismica",
          description:
            "Resistenza naturale alle scosse, dimostrata da test rigorosi a forte magnitudo.",
        },
        {
          title: "Cantieri puliti",
          description:
            "Costruzione a secco. Assemblaggi in fabbrica, al riparo dagli agenti atmosferici.",
        },
      ],
    },
    {
      type: "section",
      eyebrow: "06 · Collaborazioni",
      title: "Un network di partner d'eccellenza",
      blocks: [
        {
          type: "paragraph",
          text: "La qualità di Habita è frutto di un sistema di collaborazioni con realtà d'eccellenza, ognuna contribuente in modo specifico alla riuscita del progetto.",
        },
        {
          type: "partners",
          items: [
            {
              name: "Zennaro Giuseppe Legnami",
              role: "Sistema costruttivo X-Lam",
              description:
                "Storica nel commercio del larice siberiano e nella progettazione di abitazioni ecosostenibili, Zennaro ha fornito e progettato l'intero sistema strutturale in pannelli X-Lam che costituisce l'ossatura di Habita.",
              logo: "/images/loghi-partner/logo_zennaro.webp",
            },
            {
              name: "Università degli Studi di Padova",
              role: "Monitoraggio scientifico",
              description:
                "Programma triennale di rilevazione su temperatura, umidità, qualità dell'aria e caratteristiche del legno strutturale, per certificare l'efficacia del sistema costruttivo.",
              logo: "/images/loghi-partner/logo-unipd.webp",
            },
            {
              name: "Lago",
              role: "Interior design",
              description:
                "Gli interni della prima casa passiva certificata nel Delta del Po sono stati curati da Lago, brand leader dell'interior design, con sistemi d'arredamento modulari ed essenziali.",
            },
            {
              name: "Favini",
              role: "Comunicazione sostenibile",
              description:
                "Tutti i supporti cartacei di Habita sono stampati su Crush di Favini: carta certificata FSC, senza OGM, con 30% di riciclato post-consumo e 100% energia verde.",
            },
            {
              name: "Tumiati Impianti · Unifix · Riwega",
              role: "Impianti e tenute",
              description:
                "Tumiati ha progettato e installato i sistemi impiantistici ad alta efficienza. Unifix e Riwega hanno fornito soluzioni di fissaggio e tenuta all'aria — fondamentali per le prestazioni certificate.",
            },
          ],
        },
      ],
    },
    {
      type: "section",
      eyebrow: "07 · Caso studio",
      title: "Porto Viro: la prima casa passiva certificata nel Delta del Po",
      blocks: [
        {
          type: "paragraph",
          text: "La prima casa realizzata con il sistema Habita si trova a Porto Viro. La sua posizione nel Delta del Po, zona paludosa con condizioni climatiche tra le più impegnative del Nord-Est, ne fa un banco di prova ideale per certificare le reali prestazioni di una casa passiva in legno.",
        },
        {
          type: "image",
          src: "/images/cantieri/casa-passiva-porto-viro/habita-10.webp",
          alt: "Habita — vista esterna della casa passiva completata a Porto Viro",
          caption: "La casa ultimata nel paesaggio del Delta del Po",
        },
        {
          type: "paragraph",
          text: "Il monitoraggio scientifico condotto dall'Università di Padova ha permesso di raccogliere dati reali sull'efficienza dell'involucro, sulla qualità dell'aria interna, sull'umidità, sulla resistenza alle muffe e sul comfort termico stagionale. I dati confermano standard di comfort eccellenti, particolarmente adatti a contrastare le condizioni climatiche del Delta del Po.",
        },
        {
          type: "image",
          src: "/images/cantieri/casa-passiva-porto-viro/habita-19.webp",
          alt: "Habita — dettaglio involucro e serramenti triplo vetro",
          caption: "Dettaglio dell'involucro ad alta efficienza e dei serramenti in triplo vetro",
        },
        {
          type: "specs",
          rows: [
            ["Ubicazione", "Porto Viro, Rovigo (Delta del Po)"],
            ["Anno di realizzazione", "2016"],
            ["Sistema costruttivo", "Pannelli X-Lam (Cross Laminated Timber)"],
            ["Classificazione energetica", "Casa passiva certificata"],
            ["Impianti", "VMC con recupero di calore, pompa di calore"],
            ["Monitoraggio scientifico", "Università di Padova (3 anni)"],
            [
              "Partner principali",
              "Zennaro Legnami, Tumiati Impianti, Lago, Unifix, Riwega, Favini",
            ],
          ],
        },
      ],
    },
    {
      type: "cta",
      kicker: "Vuoi saperne di più?",
      title: "Realizziamo la tua casa passiva,",
      titleItalic: "su misura per il tuo territorio.",
      text: "Contatta Costruzioni Edilferro per un sopralluogo e una stima preliminare. Risposta entro 48 ore lavorative.",
      ctaLabel: "Richiedi un preventivo",
      ctaHref: "/contatti",
    },
  ],
};
