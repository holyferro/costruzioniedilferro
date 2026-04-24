import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Monogramma "EF" su sfondo brand-blue. iOS aggiunge da sé l'arrotondamento.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: 180,
        height: 180,
        background: "#291572",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "Georgia, serif",
          fontSize: 80,
          fontWeight: 500,
          color: "#ffffff",
          letterSpacing: "-2px",
          lineHeight: 1,
        }}
      >
        EF
      </span>
    </div>,
    { ...size },
  );
}
