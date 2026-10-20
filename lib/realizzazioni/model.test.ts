import { test } from "node:test";
import assert from "node:assert/strict";
import { CATEGORIE, toRealizzazioni } from "./model.ts";
import type { RealizzazioneDoc, SanityImage } from "../../sanity/lib/types";

const image = (ref: string, alt = ""): SanityImage => ({
  _type: "image",
  asset: { _type: "reference", _ref: ref },
  alt,
});

const doc = (over: Partial<RealizzazioneDoc> = {}): RealizzazioneDoc => ({
  _id: "id",
  _type: "realizzazione",
  _createdAt: "2026-01-01",
  title: "Studentato",
  slug: { current: "studentato" },
  category: "pubblico",
  anno: 2024,
  luogo: "Rovigo",
  immagini: [image("a", "Facciata"), image("b")],
  ...over,
});

const url = (img: SanityImage) => `https://cdn/${img.asset._ref}`;

test("maps a document to the view model", () => {
  const [r] = toRealizzazioni(
    [
      doc({
        righe: [{ label: "Committente", valore: "Comune" }],
        link: [{ label: "Sito", url: "https://x.it", esterno: true }],
      }),
    ],
    url,
  );
  assert.deepEqual(r, {
    slug: "studentato",
    title: "Studentato",
    place: "Rovigo",
    year: "2024",
    description: "",
    category: "pubblico",
    categoryLabel: "Opere pubbliche",
    images: [
      { src: "https://cdn/a", alt: "Facciata" },
      { src: "https://cdn/b", alt: "Studentato — Rovigo" },
    ],
    rows: [{ label: "Committente", value: "Comune" }],
    links: [{ label: "Sito", href: "https://x.it", external: true }],
    wide: false,
  });
});

test("drops realizzazioni without images and keeps the order", () => {
  const out = toRealizzazioni(
    [
      doc({ slug: { current: "a" } }),
      doc({ slug: { current: "vuota" }, immagini: [] }),
      doc({ slug: { current: "b" } }),
    ],
    url,
  );
  assert.deepEqual(
    out.map((r) => r.slug),
    ["a", "b"],
  );
});

test("every category has a label", () => {
  for (const { value, label } of CATEGORIE) {
    const [r] = toRealizzazioni([doc({ category: value })], url);
    assert.equal(r?.categoryLabel, label);
  }
});
