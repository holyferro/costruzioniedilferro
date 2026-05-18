import { InternalHero } from "@/components/sections/InternalHero";

type ServicesHeroProps = {
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
};

export function ServicesHero({
  eyebrow,
  titleStart,
  titleAccent,
  titleEnd,
  subtitle,
}: ServicesHeroProps) {
  return (
    <InternalHero
      eyebrow={eyebrow}
      titleStart={titleStart}
      titleAccent={titleAccent}
      titleEnd={titleEnd}
      subtitle={subtitle}
      breadcrumbPage="Servizi"
      imageSrc="/images/heroservizi2.webp"
      imageAlt="Cantiere edilferro — panoramica lavori"
    />
  );
}
