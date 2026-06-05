import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: false },
});

const titolare = [
  ["Ragione sociale", "Costruzioni Edilferro S.r.l."],
  ["Sede legale", "Via dei Salici 7, 45014 Porto Viro (RO), Italia"],
  ["P.IVA / C.F.", "00580810299"],
  ["REA", "RO-85037 — Camera di Commercio di Venezia Rovigo"],
  ["Email", "info@costruzioniedilferro.com"],
  ["PEC", "costruzioniedilferro@pec-neispa.com"],
  ["Tel", "0426 633 875"],
] as const;

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-panna">
      <div className="mx-auto max-w-3xl px-4 py-20 lg:py-28">
        {/* Header */}
        <p className="text-ink/50 text-xs font-semibold tracking-[0.38em] uppercase">
          Informativa legale
        </p>
        <h1 className="text-ink mt-4 font-serif text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] leading-[1.05] font-medium tracking-tight">
          Informativa sul trattamento dei dati personali
        </h1>
        <p className="text-ink/75 mt-4 text-base leading-relaxed">
          ai sensi del Regolamento UE 2016/679 — GDPR e del D.Lgs. 196/2003
        </p>
        <p className="text-ink/40 mt-2 text-sm">Ultimo aggiornamento: 5 giugno 2026</p>

        {/* 1. Titolare */}
        <Section number="1" title="Titolare del trattamento">
          <p className="text-ink/75 text-base leading-relaxed">
            Il Titolare del trattamento dei dati personali raccolti tramite il sito web{" "}
            costruzioniedilferro.com è:
          </p>
          <div className="border-ink/10 mt-6 overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <tbody>
                {titolare.map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 0 ? "bg-ink/[0.02]" : ""}>
                    <td className="text-ink/60 w-40 px-4 py-3 align-top font-medium">{label}</td>
                    <td className="text-ink/75 px-4 py-3 break-all">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 2. Dati personali trattati */}
        <Section number="2" title="Dati personali trattati">
          <p className="text-ink/75 text-base leading-relaxed">
            Il sito raccoglie dati personali esclusivamente attraverso il form di contatto. Non
            vengono installati cookie di profilazione né strumenti di tracciamento pubblicitario.
          </p>
          <p className="text-ink/75 mt-4 text-base leading-relaxed">
            I dati forniti volontariamente dall&apos;utente tramite il form sono:
          </p>
          <BulletList
            items={[
              "nome e cognome",
              "indirizzo email",
              "numero di telefono (facoltativo)",
              "contenuto del messaggio",
            ]}
          />
          <p className="text-ink/75 mt-4 text-base leading-relaxed">
            Vengono inoltre raccolti in forma aggregata e anonima dati tecnici di navigazione
            (pagine visitate, tipo di browser, paese di provenienza) tramite Vercel Analytics,
            strumento cookieless che non traccia gli utenti individualmente.
          </p>
        </Section>

        {/* 3. Finalità e base giuridica */}
        <Section number="3" title="Finalità e base giuridica">
          <p className="text-ink/75 text-base leading-relaxed">
            I dati del form sono trattati per:
          </p>
          <BulletList
            items={[
              "rispondere alle richieste di informazioni (base giuridica: misure precontrattuali, art. 6 par. 1 lett. b GDPR)",
              "adempimenti di legge (art. 6 par. 1 lett. c GDPR)",
            ]}
          />
          <p className="text-ink/75 mt-4 text-base leading-relaxed">
            Il conferimento è facoltativo, ma senza nome, email e messaggio non è possibile
            elaborare la richiesta.
          </p>
        </Section>

        {/* 4. Modalità di trattamento */}
        <Section number="4" title="Modalità di trattamento e conservazione">
          <p className="text-ink/75 text-base leading-relaxed">
            I dati sono trattati con strumenti informatici con misure di sicurezza adeguate. Sono
            conservati per il tempo necessario a evadere la richiesta e, in caso di rapporto
            contrattuale, per il periodo previsto dagli obblighi di legge (in genere 10 anni ai
            sensi del Codice Civile).
          </p>
        </Section>

        {/* 5. Comunicazione a terzi */}
        <Section number="5" title="Comunicazione a terzi">
          <p className="text-ink/75 text-base leading-relaxed">
            I dati non sono ceduti né venduti a terzi per finalità commerciali. Per il recapito
            delle email del form viene utilizzato{" "}
            <strong className="text-ink/90 font-medium">Resend, Inc.</strong> (2261 Market Street
            #5039, San Francisco, CA 94114, USA) come Responsabile del trattamento (art. 28 GDPR),
            certificato ai sensi del Data Privacy Framework UE–USA. Il sito è ospitato su{" "}
            <strong className="text-ink/90 font-medium">Vercel Inc.</strong> (440 N Barranca Ave
            #4133, Covina, CA 91723, USA), anch&apos;essa aderente al Data Privacy Framework UE–USA,
            con server nella regione Frankfurt (UE).
          </p>
        </Section>

        {/* 6. Vercel Analytics */}
        <Section number="6" title="Vercel Analytics">
          <p className="text-ink/75 text-base leading-relaxed">
            Il sito utilizza Vercel Analytics per monitorare le prestazioni in forma anonima e
            aggregata, senza cookie e senza profili individuali. Non è richiesto il consenso
            dell&apos;interessato né il cookie banner per questo strumento.
          </p>
        </Section>

        {/* 7. Diritti dell'interessato */}
        <Section number="7" title="Diritti dell'interessato">
          <p className="text-ink/75 text-base leading-relaxed">
            Ai sensi degli artt. 15–22 GDPR l&apos;interessato ha diritto di:
          </p>
          <BulletList
            items={[
              "accesso",
              "rettifica",
              "cancellazione",
              "limitazione",
              "opposizione",
              "portabilità",
              "revoca del consenso",
              "reclamo al Garante (garanteprivacy.it)",
            ]}
          />
          <p className="text-ink/75 mt-4 text-base leading-relaxed">
            Le richieste vanno inviate a{" "}
            <a
              href="mailto:info@costruzioniedilferro.com"
              className="text-brand underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              info@costruzioniedilferro.com
            </a>{" "}
            o PEC{" "}
            <a
              href="mailto:costruzioniedilferro@pec-neispa.com"
              className="text-brand underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              costruzioniedilferro@pec-neispa.com
            </a>
            . Il Titolare risponde entro 30 giorni.
          </p>
        </Section>

        {/* 8. Cookie */}
        <Section number="8" title="Cookie">
          <p className="text-ink/75 text-base leading-relaxed">
            Il sito utilizza esclusivamente cookie tecnici strettamente necessari alla navigazione.
            Non sono installati cookie di profilazione, marketing o di terze parti. Non è presente
            un banner di consenso ai cookie.
          </p>
        </Section>

        {/* 9. Modifiche */}
        <Section number="9" title="Modifiche">
          <p className="text-ink/75 text-base leading-relaxed">
            Il Titolare si riserva il diritto di aggiornare questa informativa. La versione
            aggiornata sarà pubblicata su questa pagina con la data di ultimo aggiornamento.
          </p>
        </Section>

        {/* Footer note */}
        <div className="border-ink/10 mt-16 border-t pt-8">
          <p className="text-ink/35 text-xs">
            Costruzioni Edilferro S.r.l. — Via dei Salici 7, 45014 Porto Viro (RO) — P.IVA
            00580810299 — REA RO-85037
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`section-${number}`}>
      <h2
        id={`section-${number}`}
        className="border-ink/10 text-ink mt-12 border-b pb-3 font-serif text-2xl font-medium"
      >
        {number}. {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="bg-brand mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
          <span className="text-ink/75 text-base leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}
