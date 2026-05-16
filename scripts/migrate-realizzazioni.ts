/**
 * scripts/migrate-realizzazioni.ts
 *
 * Migra le realizzazioni hardcoded da PROJECTS → Sanity CMS.
 *
 * Esecuzione dry run (nessuna scrittura):
 *   pnpm migrate:realizzazioni --dry-run
 *
 * Esecuzione reale:
 *   pnpm migrate:realizzazioni
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { createClient } from "next-sanity";

// ─── Load .env.local ──────────────────────────────────────────────────────────
// dotenv non è una dipendenza diretta; carichiamo .env.local manualmente.
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

// ─── Types ────────────────────────────────────────────────────────────────────
type ProjectLink = { label: string; href: string; external?: boolean };
type Project = {
  imgs: string[];
  tag: string;
  year: string;
  title: string;
  place: string;
  desc: string;
  rows: [string, string][];
  links?: ProjectLink[];
};

// ─── Tag → Sanity category ────────────────────────────────────────────────────
const TAG_TO_CATEGORY: Record<string, string> = {
  Residenziale: "residenziale",
  Restauro: "restauro",
  "Opere pubbliche": "pubblico",
  Industriale: "industriale",
  Efficientamento: "efficientamento",
};

// ─── 8 realizzazioni da migrare ───────────────────────────────────────────────
// Esclusi: studentato-universitario (già in Sanity), casa-passiva (scelta editoriale).
const TARGETS: [string, Project][] = [
  [
    "habita",
    {
      imgs: [
        "/images/design/proj-passiva.webp",
        "/images/cantieri/casa-passiva-porto-viro/habita-21.webp",
        "/images/cantieri/casa-passiva-porto-viro/habita-14.webp",
        "/images/cantieri/casa-passiva-porto-viro/habita-10.webp",
      ],
      tag: "Residenziale",
      year: "2016",
      title: "Habita — Casa passiva in legno",
      place: "Porto Viro (RO)",
      desc: "Prima casa passiva certificata nel Delta del Po, realizzata con struttura portante in pannelli X-Lam (legno lamellare incrociato). Progetto sviluppato in collaborazione con Zennaro Giuseppe Legnami e Tumiati Impianti. La struttura è stata monitorata per tre anni dall'Università degli Studi di Padova.",
      rows: [
        ["Anno", "2016"],
        ["Luogo", "Porto Viro, Rovigo"],
        ["Sistema costruttivo", "X-Lam — Cross Laminated Timber"],
        ["Certificazione", "Casa passiva certificata"],
        ["Partner", "Zennaro Legnami · Tumiati Impianti"],
        ["Monitoraggio", "Università di Padova (3 anni)"],
      ],
      links: [
        { label: "Leggi l'articolo completo", href: "/news/habita" },
        {
          label: "Visita habita.it",
          href: "https://www.habita.it/",
          external: true,
        },
      ],
    },
  ],
  [
    "abbazia-villaregia",
    {
      imgs: [
        "/images/design/proj-villaregia.webp",
        "/images/design/img-pubblico.webp",
        "/images/design/proj-casa-cura.webp",
      ],
      tag: "Restauro",
      year: "2023",
      title: "Abbazia di Villaregia",
      place: "Porto Viro (RO)",
      desc: "Recupero conservativo di un complesso abbaziale del XVII secolo, sottoposto a vincolo della Soprintendenza. Intervento di consolidamento strutturale, risanamento murature in mattone a vista, ripristino coperture con coppi di recupero. Opera pubblica aggiudicata con procedura aperta.",
      rows: [
        ["Committente", "Comune di Porto Viro"],
        ["Importo lavori", "€ 1.480.000"],
        ["Categoria SOA", "OG2 — Restauro beni vincolati"],
        ["Durata cantiere", "14 mesi"],
        ["Consegna", "Novembre 2023"],
      ],
    },
  ],
  [
    "stabilimento-produttivo",
    {
      imgs: [
        "/images/design/img-industriale.webp",
        "/images/cantieri/efficientamento-energetico/01.webp",
        "/images/design/proj-corti.webp",
      ],
      tag: "Industriale",
      year: "2023",
      title: "Stabilimento produttivo",
      place: "Polesine",
      desc: "Capannone industriale su area di 8.500 mq, struttura prefabbricata in c.a. con tamponamenti sandwich. Uffici direzionali integrati su due livelli, impianto fotovoltaico da 200 kWp in copertura. Cantiere attivo senza interruzione dell'attività produttiva preesistente.",
      rows: [
        ["Committente", "Azienda privata"],
        ["Superficie", "8.500 m²"],
        ["Struttura", "Prefabbricato c.a."],
        ["Impianto FV", "200 kWp"],
        ["Consegna", "Settembre 2023"],
      ],
    },
  ],
  [
    "casa-di-cura",
    {
      imgs: [
        "/images/design/proj-casa-cura.webp",
        "/images/design/img-pubblico.webp",
        "/images/design/proj-villaregia.webp",
      ],
      tag: "Opere pubbliche",
      year: "2022",
      title: "Ampliamento casa di cura",
      place: "Rovigo",
      desc: "Ampliamento di struttura sanitaria accreditata con aggiunta di un nuovo corpo edilizio da 42 posti letto. Progettazione strutturale antisismica, impianti medicali, sistemi di compartimentazione antincendio certificati. Cantiere coordinato con l'attività clinica in essere.",
      rows: [
        ["Committente", "ASL Rovigo"],
        ["Importo lavori", "€ 2.750.000"],
        ["Nuovi posti letto", "42"],
        ["Categoria SOA", "OG1 classifica IV"],
        ["Consegna", "Maggio 2022"],
      ],
    },
  ],
  [
    "policlinico-rovigo",
    {
      imgs: [
        "/images/cantieri/casa-di-cura-città-di-rovigo/foto-csa.webp",
        "/images/cantieri/casa-di-cura-città-di-rovigo/20150403_152429.webp",
        "/images/cantieri/casa-di-cura-città-di-rovigo/20150505_104627.webp",
        "/images/cantieri/casa-di-cura-città-di-rovigo/20150505_104931.webp",
      ],
      tag: "Opere pubbliche",
      year: "2015",
      title: "Policlinico Città di Rovigo",
      place: "Rovigo",
      desc: "Costruzione del nuovo Policlinico Città di Rovigo in via Curiel, struttura sanitaria su tre piani con 220 posti letto complessivi. Opera da 25 milioni di euro interamente autofinanziata, con piano terra destinato ai servizi clinici, primo piano alla residenzialità per anziani e secondo piano all'area sanitaria con reparti di riabilitazione, lungodegenza e chirurgia.",
      rows: [
        ["Committente", "Casa di Cura Città di Rovigo"],
        ["Importo lavori", "€ 25.000.000"],
        ["Piani", "3 fuori terra"],
        ["Capacità ricettiva", "220 posti letto"],
        ["Categoria SOA", "OG1"],
        ["Consegna", "2015"],
      ],
    },
  ],
  [
    "restauro-palazzo",
    {
      imgs: [
        "/images/design/img-pubblico.webp",
        "/images/design/proj-villaregia.webp",
        "/images/design/proj-casa-cura.webp",
      ],
      tag: "Restauro",
      year: "2022",
      title: "Restauro palazzo storico",
      place: "Adria (RO)",
      desc: "Restauro e risanamento conservativo di palazzo ottocentesco nel centro storico di Adria. Consolidamento fondazioni, restauro facciate in intonaco a calce, sostituzione solai lignei, adeguamento sismico con inserimento di tiranti metallici. Supervisione Soprintendenza ai Beni Architettonici.",
      rows: [
        ["Committente", "Privato"],
        ["Importo lavori", "€ 890.000"],
        ["Vincolo", "Soprintendenza ABAP"],
        ["Tecnica", "Consolidamento + restauro"],
        ["Consegna", "Marzo 2022"],
      ],
    },
  ],
  [
    "efficientamento",
    {
      imgs: [
        "/images/cantieri/efficientamento-energetico/01.webp",
        "/images/design/img-residenziale.webp",
        "/images/cantieri/casa-passiva-porto-viro/03.webp",
      ],
      tag: "Efficientamento",
      year: "2024",
      title: "Riqualificazione condominio",
      place: "Rovigo",
      desc: "Intervento di efficientamento energetico su condominio anni '80 da 24 unità. Cappotto termico in EPS grafitato, sostituzione serramenti, rifacimento copertura con pannelli fotovoltaici condominiali da 36 kWp. Passaggio da classe G a classe B. Gestione iter Superbonus completa.",
      rows: [
        ["Committente", "Condominio privato"],
        ["Unità abitative", "24"],
        ["Risparmio energetico", "~68%"],
        ["Agevolazione", "Superbonus 110%"],
        ["Consegna", "Gennaio 2024"],
      ],
    },
  ],
  [
    "villetta-bifamiliare",
    {
      imgs: [
        "/images/cantieri/casa-passiva-porto-viro/03.webp",
        "/images/design/proj-passiva.webp",
        "/images/design/img-residenziale.webp",
      ],
      tag: "Residenziale",
      year: "2023",
      title: "Villetta bifamiliare",
      place: "Porto Viro (RO)",
      desc: "Nuova costruzione bifamiliare in classe A su lotto privato. Struttura in muratura portante con cordoli in c.a., isolamento a cappotto, pompa di calore aria-acqua con underfloor heating, predisposizione per colonnina EV. Finiture personalizzate su capitolato con il committente.",
      rows: [
        ["Committente", "Privato"],
        ["Superficie utile", "2 × 165 m²"],
        ["Riscaldamento", "Pompa di calore + pavimento radiante"],
        ["Classe energetica", "A"],
        ["Consegna", "Ottobre 2023"],
      ],
    },
  ],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isAbsoluteUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

function hasDesignPlaceholder(imgs: string[]): boolean {
  return imgs.some((img) => img.startsWith("/images/design/"));
}

type SanityImageItem = {
  _type: "image";
  _key: string;
  asset: { _type: "reference"; _ref: string };
  alt: string;
};

async function uploadImage(imgPath: string, altText: string): Promise<SanityImageItem | null> {
  const absPath = path.join(process.cwd(), "public", imgPath);

  if (!fs.existsSync(absPath)) {
    console.error(`    ❌ File non trovato: ${absPath}`);
    return null;
  }

  const filename = path.basename(imgPath);

  if (DRY_RUN) {
    console.log(`    [DRY RUN] upload: ${filename}`);
    return {
      _type: "image",
      _key: crypto.randomUUID(),
      asset: {
        _type: "reference",
        _ref: `dry-run-ref-${crypto.randomUUID()}`,
      },
      alt: altText,
    };
  }

  const buffer = fs.readFileSync(absPath);
  const asset = await writeClient.assets.upload("image", buffer, {
    filename,
    contentType: "image/webp",
  });

  return {
    _type: "image",
    _key: crypto.randomUUID(),
    asset: { _type: "reference", _ref: asset._id },
    alt: altText,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log("\n🏗️  Migrazione realizzazioni → Sanity");
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

  for (const [orderIdx, [slug, project]] of TARGETS.entries()) {
    const docId = `realizzazione-${slug}`;
    const { title, place, year, tag, desc, rows, links, imgs } = project;
    // Alt generato automaticamente — modificabile in Studio in seguito
    const altBase = `${title} — ${place}, ${year}`;

    console.log(`\n── ${title}`);

    // 1. Controlla esistenza (per _id deterministico, draft, o slug)
    const existingId = await writeClient.fetch<string | null>(
      `*[_type == "realizzazione" && (
        _id == $id || _id == $draftId || slug.current == $slug
      )][0]._id`,
      { id: docId, draftId: `drafts.${docId}`, slug },
    );

    if (existingId) {
      console.log(`   ⏭️  Già presente in Sanity (id: ${existingId}), skip`);
      skipped++;
      continue;
    }

    // 2. Avviso placeholder design/*
    if (hasDesignPlaceholder(imgs)) {
      console.log(
        `   📸 ${title} — nota: alcune immagini sono placeholder design/, sostituibili in Studio`,
      );
    }

    // 3. Upload immagini
    console.log(`   📸 Uploading ${imgs.length} immagini per ${title}...`);
    const immagini: SanityImageItem[] = [];
    for (const imgPath of imgs) {
      const item = await uploadImage(imgPath, altBase);
      if (item) immagini.push(item);
    }

    if (immagini.length === 0) {
      console.error(`   ❌ Nessuna immagine caricata per ${title}, skip`);
      errors++;
      continue;
    }

    // 4. Righe tecniche
    const righe = rows.map(([label, valore]) => ({
      _type: "object" as const,
      _key: crypto.randomUUID(),
      label,
      valore,
    }));

    // 5. Link — skippa URL interni (non validi come `url` in Sanity)
    const link = (links ?? [])
      .filter((l) => {
        if (!isAbsoluteUrl(l.href)) {
          console.log(`   ⏭️  Skippato link interno ${l.href} (non è un URL assoluto)`);
          return false;
        }
        return true;
      })
      .map((l) => ({
        _type: "object" as const,
        _key: crypto.randomUUID(),
        label: l.label,
        url: l.href,
        esterno: l.external ?? false,
      }));

    // 6. Categoria
    const category = TAG_TO_CATEGORY[tag];
    if (!category) {
      console.error(`   ❌ Tag non mappato: "${tag}" per ${title}`);
      errors++;
      continue;
    }

    // 7. Documento completo
    const doc = {
      _type: "realizzazione",
      _id: docId,
      title,
      slug: { _type: "slug" as const, current: slug },
      category,
      anno: parseInt(year, 10),
      luogo: place,
      descrizione: desc,
      righe,
      immagini,
      ...(link.length > 0 ? { link } : {}),
      featured: false,
      order: orderIdx + 10,
    };

    // 8. Crea in Sanity (o dry-run log)
    if (DRY_RUN) {
      console.log(`   [DRY RUN] creerebbe documento:`);
      console.log(`     _id:      ${doc._id}`);
      console.log(`     category: ${doc.category}`);
      console.log(`     anno:     ${doc.anno}`);
      console.log(`     immagini: ${immagini.length}`);
      console.log(`     righe:    ${righe.length}`);
      console.log(`     link:     ${link.length}`);
      created++;
      continue;
    }

    try {
      await writeClient.createOrReplace(doc);
      console.log(`   ✅ ${title} creato e pubblicato`);
      created++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`   ❌ Errore su ${title}: ${msg}`);
      errors++;
    }
  }

  // Sommario finale
  const sep = "─".repeat(52);
  console.log(`\n${sep}`);
  console.log(`📊 Riepilogo migrazione:`);
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
