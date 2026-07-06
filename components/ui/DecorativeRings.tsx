// components/ui/DecorativeRings.tsx
// RSC. Anelli ornamentali concentrici usati sugli sfondi bg-brand, con una
// leggera "respirazione" (scale) via CSS puro, sfalsata anello per anello.

type DecorativeRingsProps = {
  side?: "left" | "right";
};

export function DecorativeRings({ side = "right" }: DecorativeRingsProps) {
  const horizontal = side === "right" ? "right-[-100px]" : "left-[-100px]";

  return (
    <>
      <span
        aria-hidden="true"
        className={`border-panna/10 animate-ring-breathe pointer-events-none absolute top-[-120px] ${horizontal} h-[520px] w-[520px] rounded-full border [animation-delay:0s]`}
      />
      <span
        aria-hidden="true"
        className={`border-panna/[0.07] animate-ring-breathe pointer-events-none absolute top-[-220px] ${side === "right" ? "right-[-200px]" : "left-[-200px]"} h-[740px] w-[740px] rounded-full border [animation-delay:-4s]`}
      />
      <span
        aria-hidden="true"
        className={`border-panna/[0.04] animate-ring-breathe pointer-events-none absolute top-[-320px] ${side === "right" ? "right-[-300px]" : "left-[-300px]"} h-[960px] w-[960px] rounded-full border [animation-delay:-8s]`}
      />
    </>
  );
}
