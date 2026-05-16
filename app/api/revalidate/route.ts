/**
 * Webhook endpoint per revalidazione on-demand da Sanity.
 *
 * Configurazione webhook su sanity.io/manage:
 *   URL:     https://costruzioniedilferro.com/api/revalidate
 *   Trigger: on Create / Update / Delete
 *   Filter:  _type == 'realizzazione'
 *   Method:  POST
 *   Secret:  stesso valore di SANITY_REVALIDATE_SECRET (.env.local / Vercel env vars)
 *
 * Sanity firma il body con HMAC SHA-256 e invia la firma nell'header
 * "sanity-webhook-signature" (formato: t=<timestamp>,v1=<digest>).
 * La verifica avviene tramite isValidSignature() di @sanity/webhook.
 */

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);
  const body = await req.text();

  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || !signature || !(await isValidSignature(body, signature, secret))) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let parsed: { _type?: string; _id?: string };
  try {
    parsed = JSON.parse(body) as { _type?: string; _id?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  console.log("[revalidate] webhook received, type:", parsed._type);

  switch (parsed._type) {
    case "realizzazione":
      revalidateTag("realizzazioni", "default");
      revalidatePath("/realizzazioni");
      console.log(
        "[revalidate] tag realizzazioni + path /realizzazioni revalidated for",
        parsed._id,
      );
      return NextResponse.json(
        { revalidated: true, path: "/realizzazioni", type: parsed._type },
        { headers: { "Cache-Control": "no-store" } },
      );

    case "newsArticle":
      // Gestione /news — da implementare nella fase /news
      return NextResponse.json({ revalidated: false, message: "newsArticle: not handled yet" });

    default:
      return NextResponse.json({ revalidated: false, message: `Unknown type: ${parsed._type}` });
  }
}
