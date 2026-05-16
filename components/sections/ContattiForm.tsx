"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitContattiForm, type ContattiFormState } from "@/app/(site)/contatti/actions";

const initialState: ContattiFormState = { status: "idle" };

export function ContattiForm() {
  const [state, action] = useActionState(submitContattiForm, initialState);

  if (state.status === "success") {
    return (
      <div className="flex min-h-[480px] flex-col items-start justify-center py-12">
        <span className="text-brand mb-6 block h-12 w-12 rounded-full border-2 border-current p-2.5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <h3 className="text-ink font-serif text-2xl font-medium">Richiesta inviata.</h3>
        <p className="text-ink/70 mt-3 max-w-[44ch] text-base leading-relaxed">
          Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative al tuo indirizzo
          email.
        </p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Nome e Cognome" required>
          <input
            type="text"
            name="nome"
            id="nome"
            autoComplete="name"
            required
            placeholder="Mario Rossi"
            className={inputClass}
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            placeholder="mario@example.it"
            className={inputClass}
          />
        </Field>
      </div>

      <div className="sm:max-w-[calc(50%-12px)]">
        <Field label="Telefono">
          <input
            type="tel"
            name="telefono"
            id="telefono"
            autoComplete="tel"
            placeholder="+39 041 000 0000"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Descrizione del progetto" required>
        <textarea
          name="messaggio"
          id="messaggio"
          required
          rows={5}
          placeholder="Descrivi brevemente il progetto, la località e la tempistica indicativa..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      {/* Honeypot — non visibile agli utenti reali */}
      <input type="text" name="website" className="sr-only" aria-hidden tabIndex={-1} />

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="privacy"
          id="privacy"
          required
          className="border-border bg-surface mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border accent-[#291572]"
        />
        <label htmlFor="privacy" className="text-ink/65 cursor-pointer text-sm leading-relaxed">
          Ho letto e accetto l&apos;
          <a href="/privacy" className="text-ink hover:text-brand underline underline-offset-2">
            informativa sulla privacy
          </a>
          . Acconsento al trattamento dei miei dati personali per rispondere alla mia richiesta.
        </label>
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm font-medium text-red-600">
          {state.message}
        </p>
      )}

      <SubmitButton />

      <p className="text-ink/40 text-xs leading-relaxed">
        <span className="font-semibold">Nota:</span> il sistema di invio è in fase di sviluppo. Nel
        frattempo puoi contattarci direttamente per telefono o email.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-ink/70 text-xs font-semibold tracking-[0.18em] uppercase">
        {label}
        {required && <span className="text-brand ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-brand hover:bg-brand/90 text-panna disabled:bg-brand/50 mt-2 inline-flex w-full items-center justify-between rounded-full px-7 py-5 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.04em] uppercase transition-colors sm:w-auto"
    >
      {pending ? "Invio in corso…" : "Richiedi un sopralluogo"}
      {!pending && <span aria-hidden="true">→</span>}
    </button>
  );
}

const inputClass =
  "border-border bg-surface text-ink placeholder:text-ink/35 focus:border-brand w-full rounded-sm border px-4 py-3.5 text-base outline-none transition-colors";
