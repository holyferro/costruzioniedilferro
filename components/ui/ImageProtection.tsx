"use client";

import { useEffect } from "react";

/** Blocca il menu contestuale (salva immagine con nome) solo sulle immagini del sito. */
export function ImageProtection() {
  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "IMG") {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return null;
}
