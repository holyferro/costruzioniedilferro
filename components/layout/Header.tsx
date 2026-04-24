"use client";

// components/layout/Header.tsx
// Client Component — scroll detection for dark-mode sticky header.

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/content/navigation";
import { siteContent } from "@/content/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ENTER = 120;
    const EXIT = 30;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > ENTER) return true;
        if (prev && y < EXIT) return false;
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sync --header-height CSS variable to actual rendered height
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const update = () =>
      document.documentElement.style.setProperty("--header-height", `${el.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-in-out ${
        scrolled
          ? "border-white/10 bg-black shadow-[0_2px_20px_rgba(0,0,0,0.18)]"
          : "border-border bg-white shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-screen-2xl items-center justify-between px-4 transition-[padding] duration-300 ease-in-out ${
          scrolled ? "py-3 lg:py-6" : "py-4 lg:py-[26px]"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteContent.brand.legalName} — home`}
          className="relative block"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {/* Blue logo — visible on white header */}
          <Image
            src="/images/portfolio/logo-edilferro-blu.svg"
            alt={siteContent.brand.legalName}
            width={240}
            height={60}
            className={`w-auto object-contain transition-all duration-300 ease-in-out ${
              scrolled ? "h-9 scale-95 opacity-0 lg:h-11" : "h-10 scale-100 opacity-100 lg:h-13"
            }`}
            priority
          />
          {/* White logo — visible on black header */}
          <Image
            src="/images/portfolio/logo-edilferro-white.svg"
            alt=""
            aria-hidden
            width={240}
            height={60}
            className={`absolute inset-0 w-auto object-contain transition-all duration-300 ease-in-out ${
              scrolled ? "h-9 scale-100 opacity-100 lg:h-11" : "h-10 scale-95 opacity-0 lg:h-13"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-14"
          aria-label="Navigazione principale"
        >
          {primaryNav.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            if (item.href === "/contatti") {
              return (
                <Link
                  key={item.href}
                  href={item.href as Route<string>}
                  className="bg-brand text-panna hover:bg-brand/85 inline-flex items-center rounded-full px-5 py-2 font-[family-name:var(--font-neue-montreal)] text-[15px] font-medium tracking-[0.015em] uppercase transition-colors"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href as Route<string>}
                className={`group flex items-center gap-1 font-[family-name:var(--font-neue-montreal)] text-[18px] font-normal tracking-[0.015em] whitespace-nowrap uppercase transition-colors duration-200 ${scrolled ? "text-white" : "hover:text-brand text-black"}`}
              >
                {item.label}
                <ArrowUpRight
                  size={22}
                  strokeWidth={1}
                  className={`transition-opacity duration-200 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  } ${scrolled ? "text-white" : "text-brand"}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile zone — hamburger menu */}
        <div className="flex items-center lg:hidden">
          <MobileMenu scrolled={scrolled} />
        </div>
      </div>
    </header>
  );
}
