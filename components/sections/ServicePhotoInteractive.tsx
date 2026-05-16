"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  number: string;
  className?: string;
  variant?: "panna" | "white";
};

export function ServicePhotoInteractive({
  src,
  alt,
  caption,
  number,
  className = "",
  variant = "white",
}: Props) {
  const [shown, setShown] = useState(false);

  return (
    <div
      className={`group/img relative overflow-hidden ${className}`}
      onClick={() => setShown((v) => !v)}
      role="img"
      aria-label={caption ? `${alt} — ${caption}` : alt}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"
      />
      <span
        aria-hidden="true"
        className={`absolute top-4 left-5 font-serif text-6xl leading-none font-medium tracking-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] md:text-7xl ${variant === "panna" ? "text-panna/85" : "text-white/85"}`}
      >
        {number}
      </span>
      {caption && (
        <p
          aria-hidden="true"
          className={`absolute right-5 bottom-4 font-serif text-[11px] tracking-wide text-white/70 italic transition-opacity duration-500 ${
            shown ? "opacity-100" : "opacity-0 group-hover/img:opacity-100"
          }`}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
