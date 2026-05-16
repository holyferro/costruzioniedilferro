/**
 * scripts/migrate-news.ts
 *
 * Migra i due articoli news legacy → Sanity CMS come newsArticle.
 *
 * Legge da:
 *   content/news.legacy.ts              (metadati)
 *   content/articles/habita.legacy.ts   (body habita)
 *   content/articles/palestra-gramsci.legacy.ts (body palestra-gramsci)
 *
 * Dry run (nessuna scrittura):
 *   pnpm migrate:news --dry-run
 *
 * Esecuzione reale:
 *   pnpm migrate:news
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { createClient } from "next-sanity";

// ─── Load .env.local ──────────────────────────────────────────────────────────
function loadEnvLocal(): void {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let val = trimmed.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (key && !(key in process.env)) process.env[key] = val;
  }
}
loadEnvLocal();

// ─── Config ───────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const TOKEN = process.env.SANITY_API_WRITE_TOKEN;

if (!PROJECT_ID || !DATASET || !TOKEN) {
  console.error(
    "\n❌  Env vars mancanti. Verifica che .env.local contenga:\n" +
      "    NEXT_PUBLIC_SANITY_PROJECT_ID\n" +
      "    NEXT_PUBLIC_SANITY_DATASET\n" +
      "    SANITY_API_WRITE_TOKEN\n",
  );
  process.exit(1);
}

const writeClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  useCdn: false,
  apiVersion: "2024-10-01",
});

// ─── Portable Text helpers ────────────────────────────────────────────────────
type PTSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type PTBlock = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: PTMarkDef[];
  children: PTSpan[];
};

type PTMarkDef = {
  _type: string;
  _key: string;
  href?: string;
  blank?: boolean;
};

type PTImage = {
  _type: "image";
  _key: string;
  asset: { _type: "reference"; _ref: string };
  alt: string;
  caption?: string;
};

type PTNode = PTBlock | PTImage;

function span(text: string, marks: string[] = []): PTSpan {
  return { _type: "span", _key: crypto.randomUUID(), text, marks };
}

function block(style: string, children: PTSpan[], markDefs: PTMarkDef[] = []): PTBlock {
  return { _type: "block", _key: crypto.randomUUID(), style, markDefs, children };
}

function plainBlock(style: string, text: string): PTBlock {
  return block(style, [span(text)]);
}

/** Converte testo con tag <strong> e <a href> in spans Portable Text. */
function parseInlineHtml(html: string): { spans: PTSpan[]; markDefs: PTMarkDef[] } {
  // Rimuovi wrapper <p style="...">...</p>
  let raw = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1").trim();
  // Normalizza spazi
  raw = raw.replace(/\s+/g, " ").trim();

  const spans: PTSpan[] = [];
  const markDefs: PTMarkDef[] = [];
  let cursor = 0;

  const tagRe = /<(strong|a)([^>]*)>(.*?)<\/\1>/gi;
  let match: RegExpExecArray | null;

  while ((match = tagRe.exec(raw)) !== null) {
    // Testo prima del tag
    if (match.index > cursor) {
      spans.push(span(raw.slice(cursor, match.index)));
    }

    const tagName = (match[1] ?? "").toLowerCase();
    const attrs = match[2] ?? "";
    const innerText = (match[3] ?? "").replace(/<[^>]+>/g, ""); // strip nested tags

    if (tagName === "strong") {
      spans.push(span(innerText, ["strong"]));
    } else if (tagName === "a") {
      const hrefMatch = /href="([^"]+)"/.exec(attrs);
      const blankMatch = /target="_blank"/.exec(attrs);
      const linkKey = crypto.randomUUID();
      markDefs.push({
        _type: "link",
        _key: linkKey,
        href: hrefMatch?.[1] ?? "#",
        blank: !!blankMatch,
      });
      spans.push(span(innerText, [linkKey]));
    }

    cursor = match.index + match[0].length;
  }

  // Testo rimanente
  if (cursor < raw.length) {
    const remaining = raw
      .slice(cursor)
      .replace(/<[^>]+>/g, "")
      .trim();
    if (remaining) spans.push(span(remaining));
  }

  if (spans.length === 0) spans.push(span(raw.replace(/<[^>]+>/g, "").trim()));

  return { spans, markDefs };
}

// ─── Legacy body types ────────────────────────────────────────────────────────
type LegacyBlock =
  | { type: "lead"; text: string }
  | { type: "paragraph"; text: string; html?: boolean }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "section"; eyebrow: string; title: string; blocks: LegacyBlock[] }
  | { type: "univ-badge"; title: string; text: string; logo?: string }
  | { type: "specs"; rows: [string, string][] }
  | {
      type: "advantages";
      eyebrow?: string;
      title?: string;
      titleItalic?: string;
      items: { title: string; description: string }[];
    }
  | {
      type: "partners";
      items: { name: string; role: string; description: string; logo?: string }[];
    }
  | {
      type: "cta";
      kicker?: string;
      title?: string;
      titleItalic?: string;
      text?: string;
      ctaLabel?: string;
      ctaHref?: string;
    };

/** Converte il body legacy in blocchi Portable Text (senza immagini — quelle vanno uplodate separatamente). */
function convertBlocks(
  legacyBlocks: LegacyBlock[],
  pendingImages: { src: string; alt: string; caption?: string }[],
): PTNode[] {
  const nodes: PTNode[] = [];

  for (const b of legacyBlocks) {
    switch (b.type) {
      case "lead": {
        nodes.push(plainBlock("lead", b.text));
        break;
      }
      case "paragraph": {
        if (b.html) {
          const { spans, markDefs } = parseInlineHtml(b.text);
          if (spans.length > 0) nodes.push(block("normal", spans, markDefs));
        } else {
          nodes.push(plainBlock("normal", b.text));
        }
        break;
      }
      case "image": {
        // Placeholder — verrà sostituito dopo l'upload
        pendingImages.push({ src: b.src, alt: b.alt, caption: b.caption });
        nodes.push({
          _type: "image",
          _key: `img-placeholder-${pendingImages.length - 1}`,
          asset: { _type: "reference", _ref: `__pending__${pendingImages.length - 1}` },
          alt: b.alt,
          ...(b.caption ? { caption: b.caption } : {}),
        } as PTImage);
        break;
      }
      case "quote": {
        nodes.push(plainBlock("blockquote", b.text));
        break;
      }
      case "section": {
        // eyebrow → h3, title → h2, poi ricorsivo
        nodes.push(plainBlock("h3", b.eyebrow));
        nodes.push(plainBlock("h2", b.title));
        nodes.push(...convertBlocks(b.blocks, pendingImages));
        break;
      }
      case "univ-badge": {
        nodes.push(plainBlock("h3", b.title));
        nodes.push(plainBlock("normal", b.text));
        break;
      }
      case "specs": {
        for (const [label, value] of b.rows) {
          nodes.push(plainBlock("normal", `${label}: ${value}`));
        }
        break;
      }
      case "advantages": {
        if (b.title) nodes.push(plainBlock("h2", b.title));
        for (const item of b.items) {
          nodes.push(plainBlock("h3", item.title));
          nodes.push(plainBlock("normal", item.description));
        }
        break;
      }
      case "partners": {
        for (const partner of b.items) {
          nodes.push(plainBlock("h3", `${partner.name} — ${partner.role}`));
          nodes.push(plainBlock("normal", partner.description));
        }
        break;
      }
      case "cta": {
        // Skip: UI component, non contenuto redazionale
        break;
      }
    }
  }

  return nodes;
}

// ─── Image upload ─────────────────────────────────────────────────────────────
async function uploadLocalImage(
  imgPath: string,
  altText: string,
): Promise<{ _type: "reference"; _ref: string } | null> {
  const absPath = path.join(process.cwd(), "public", imgPath);
  if (!fs.existsSync(absPath)) {
    console.error(`    ❌ File non trovato: ${absPath}`);
    return null;
  }

  const filename = path.basename(imgPath);

  if (DRY_RUN) {
    console.log(`    [DRY RUN] upload: ${filename} (${altText})`);
    return { _type: "reference", _ref: `dry-run-ref-${crypto.randomUUID()}` };
  }

  const buffer = fs.readFileSync(absPath);
  const ext = path.extname(filename).slice(1).toLowerCase();
  const contentType = ext === "webp" ? "image/webp" : ext === "jpg" ? "image/jpeg" : `image/${ext}`;
  const asset = await writeClient.assets.upload("image", buffer, { filename, contentType });
  return { _type: "reference", _ref: asset._id };
}

// ─── Articles to migrate ──────────────────────────────────────────────────────
type ArticleDef = {
  docId: string;
  slug: string;
  title: string;
  titleItalic?: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readTime?: string;
  coverSrc: string;
  coverAlt: string;
  heroSubtitle: string;
  heroMeta: { label: string; valore: string }[];
  featured: boolean;
  body: LegacyBlock[];
};

const ARTICLES: ArticleDef[] = [
  {
    docId: "newsarticle-palestra-gramsci",
    slug: "palestra-gramsci",
    title: "Al via i lavori della nuova palestra",
    titleItalic: "al polo scolastico della Gazzera",
    excerpt:
      "Costruzioni Edilferro Srl è la ditta incaricata di realizzare la nuova palestra del Liceo Morin e dell'Istituto Gramsci/Luzzatti a Mestre, commissionata dalla Città Metropolitana di Venezia. Consegna prevista entro novembre 2026.",
    category: "Opere pubbliche",
    publishedAt: "2026-05-14T00:00:00.000Z",
    author: "Redazione Edilferro",
    readTime: "4 min",
    coverSrc: "/images/prima-pietra-palestra-gramsci.webp",
    coverAlt:
      "Cerimonia della prima pietra per la nuova palestra del polo scolastico della Gazzera a Mestre — autorità e studenti presenti",
    heroSubtitle:
      "Costruzioni Edilferro Srl è incaricata della costruzione della nuova palestra, commissionata dalla Città Metropolitana di Venezia. Inizio lavori marzo 2026, consegna prevista novembre 2026.",
    heroMeta: [
      { label: "Committente", valore: "Città Metropolitana di Venezia" },
      { label: "Inizio lavori", valore: "Marzo 2026" },
      { label: "Fine prevista", valore: "Novembre 2026" },
    ],
    featured: true,
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
        text: 'Fonte: <a href="https://cittametropolitana.ve.it/notizie/notizie-dalla-citta-metropolitana/posata-nel-polo-scolastico-della-gazzera-mestre-la-prima" target="_blank" rel="noopener noreferrer">Città Metropolitana di Venezia</a>',
      },
    ],
  },
  {
    docId: "newsarticle-habita",
    slug: "habita",
    title: "Habita —",
    titleItalic: "la prima casa passiva in legno",
    excerpt:
      "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, monitorata per tre anni dall'Università di Padova. Un progetto che dimostra come comfort, sostenibilità e bellezza possano convivere anche nelle condizioni climatiche più impegnative.",
    category: "Progetto",
    publishedAt: "2016-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    author: "Redazione Edilferro",
    readTime: "9 min",
    coverSrc: "/images/design/proj-passiva.webp",
    coverAlt: "Casa passiva Habita a Porto Viro nel Delta del Po",
    heroSubtitle:
      "Realizzata nel 2016 in collaborazione con Zennaro Giuseppe Legnami, certificata casa passiva e monitorata per tre anni dall'Università degli Studi di Padova.",
    heroMeta: [
      { label: "Anno", valore: "2016" },
      { label: "Luogo", valore: "Porto Viro, Rovigo" },
      { label: "Tipologia", valore: "Casa passiva, X-Lam" },
      { label: "Certificazione", valore: "Casa passiva certificata" },
    ],
    featured: false,
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
        title: "Otto ragioni per cui Habita rappresenta il futuro dell'abitare.",
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
            text: "Il monitoraggio scientifico condotto dall'Università di Padova ha permesso di raccogliere dati reali sull'efficienza dell'involucro, sulla qualità dell'aria interna, sull'umidità, sulla resistenza alle muffe e sul comfort termico stagionale.",
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
    ],
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log("\n📰  Migrazione news → Sanity");
  console.log(`   Project:  ${PROJECT_ID}`);
  console.log(`   Dataset:  ${DATASET}`);
  console.log(
    DRY_RUN
      ? "   Modalità: DRY RUN — nessuna scrittura\n"
      : "   Modalità: REALE — i documenti verranno creati\n",
  );

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const article of ARTICLES) {
    const { docId, slug, coverSrc, coverAlt, body, heroMeta } = article;

    console.log(`\n── ${article.title} ${article.titleItalic ?? ""}`);
    console.log(`   _id: ${docId}`);

    // 1. Controlla esistenza
    const existingId = await writeClient.fetch<string | null>(
      `*[_type == "newsArticle" && (_id == $id || _id == $draftId || slug.current == $slug)][0]._id`,
      { id: docId, draftId: `drafts.${docId}`, slug },
    );

    if (existingId) {
      console.log(`   ⏭️  Già presente in Sanity (id: ${existingId}), skip`);
      skipped++;
      continue;
    }

    // 2. Upload copertina
    console.log(`   📸 Upload copertina: ${path.basename(coverSrc)}`);
    const coverRef = await uploadLocalImage(coverSrc, coverAlt);
    if (!coverRef) {
      console.error(`   ❌ Copertina non caricata, skip articolo`);
      errors++;
      continue;
    }

    // 3. Converti body in Portable Text (raccogliendo immagini inline)
    const pendingImages: { src: string; alt: string; caption?: string }[] = [];
    const rawNodes = convertBlocks(body as LegacyBlock[], pendingImages);

    // 4. Upload immagini inline e sostituisci placeholder
    const resolvedRefs: Map<number, { _type: "reference"; _ref: string } | null> = new Map();
    for (let i = 0; i < pendingImages.length; i++) {
      const img = pendingImages[i];
      if (!img) continue;
      console.log(`   📸 Upload immagine inline [${i}]: ${path.basename(img.src)}`);
      resolvedRefs.set(i, await uploadLocalImage(img.src, img.alt));
    }

    // Sostituisci placeholder con ref reali (filtra quelle non riuscite)
    const resolvedNodes: PTNode[] = rawNodes
      .map((node) => {
        if (node._type !== "image") return node;
        const match = /^__pending__(\d+)$/.exec((node as PTImage).asset._ref);
        if (!match) return node;
        const idx = parseInt(match[1] ?? "0", 10);
        const ref = resolvedRefs.get(idx);
        if (!ref) return null; // immagine non trovata → rimuovi
        return { ...node, asset: ref } as PTImage;
      })
      .filter((n): n is PTNode => n !== null);

    // 5. Heroeta con _key
    const heroMetaWithKeys = heroMeta.map((m) => ({
      _type: "object" as const,
      _key: crypto.randomUUID(),
      label: m.label,
      valore: m.valore,
    }));

    // 6. Documento completo
    const doc = {
      _type: "newsArticle",
      _id: docId,
      title: article.title,
      ...(article.titleItalic ? { titleItalic: article.titleItalic } : {}),
      slug: { _type: "slug" as const, current: slug },
      coverImage: {
        _type: "image" as const,
        asset: coverRef,
        alt: coverAlt,
      },
      category: article.category,
      publishedAt: article.publishedAt,
      ...(article.updatedAt ? { updatedAt: article.updatedAt } : {}),
      author: article.author,
      ...(article.readTime ? { readTime: article.readTime } : {}),
      excerpt: article.excerpt,
      heroSubtitle: article.heroSubtitle,
      heroMeta: heroMetaWithKeys,
      body: resolvedNodes,
      featured: article.featured,
    };

    // 7. Dry run o scrittura
    if (DRY_RUN) {
      console.log(`   [DRY RUN] creerebbe documento:`);
      console.log(`     _id:        ${doc._id}`);
      console.log(`     slug:       ${slug}`);
      console.log(`     category:   ${doc.category}`);
      console.log(`     featured:   ${doc.featured}`);
      console.log(`     body nodes: ${resolvedNodes.length}`);
      console.log(`     immagini inline: ${pendingImages.length}`);
      console.log(`     heroMeta:   ${heroMetaWithKeys.length} voci`);
      created++;
      continue;
    }

    try {
      await writeClient.createOrReplace(doc);
      console.log(`   ✅ Articolo "${article.title}" creato e pubblicato`);
      created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`   ❌ Errore su "${article.title}": ${msg}`);
      errors++;
    }
  }

  const sep = "─".repeat(52);
  console.log(`\n${sep}`);
  console.log(`📊 Riepilogo migrazione news:`);
  console.log(`   ✅ Creati:   ${created}`);
  console.log(`   ⏭️  Skippati: ${skipped}`);
  console.log(`   ❌ Errori:   ${errors}`);
  if (DRY_RUN) {
    console.log(`\n   Nessuna scrittura effettuata (--dry-run).`);
    console.log(`   Esegui senza flag per la migrazione reale.`);
  }
  console.log();
}

main().catch((err: unknown) => {
  console.error("\n❌ Errore fatale:", err);
  process.exit(1);
});
