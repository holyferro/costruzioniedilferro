"use server";

// Stub per Phase 6. Email integration (Resend) arriva nel piano definitivo.
// La firma e il tipo di ritorno sono già definitivi per non rompere il client.
export type ContattiFormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitContattiForm(
  _prev: ContattiFormState,
  formData: FormData,
): Promise<ContattiFormState> {
  const nome = String(formData.get("nome") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const messaggio = String(formData.get("messaggio") ?? "").trim();
  const privacy = formData.get("privacy");

  if (!nome || !email || !messaggio) {
    return { status: "error", message: "Compila tutti i campi obbligatori." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Inserisci un indirizzo email valido." };
  }
  if (!privacy) {
    return { status: "error", message: "Accetta l'informativa sulla privacy per procedere." };
  }

  // TODO Phase 6: integrare Resend per l'invio email.
  // await resend.emails.send({ from: "noreply@edilferro.it", to: "info@...", ... });
  return { status: "success" };
}
