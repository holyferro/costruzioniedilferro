/**
 * Webhook endpoint per revalidazione on-demand da Sanity.
 *
 * Configurazione webhook su sanity.io/manage:
 *   URL:     https://costruzioniedilferro.com/api/revalidate
 *   Trigger: on Create / Update / Delete
 *   Filter:  _type == 'realizzazione'
 *   Method:  POST
 *   Secret:  stesso valore di SANITY_REVALIDATE_SECRET (.env.local)
 *
 * Per test locale usa ngrok: ngrok http 3000
 * poi imposta l'URL ngrok nel webhook Sanity temporaneamente.
 */

import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-webhook-secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; _id?: string };
  try {
    body = (await req.json()) as { _type?: string; _id?: string };
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
  }

  const type = body._type;

  switch (type) {
    case "realizzazione":
      revalidatePath("/realizzazioni");
      return NextResponse.json({ revalidated: true, path: "/realizzazioni", type });

    case "newsArticle":
      // Gestione /news — da implementare nella fase /news
      return NextResponse.json({ revalidated: false, message: "newsArticle: not handled yet" });

    default:
      return NextResponse.json({ revalidated: false, message: `Unknown type: ${type}` });
  }
}
