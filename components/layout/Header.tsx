"use client";

// components/layout/Header.tsx
// Client Component — scroll detection for dark-mode sticky header.

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/content/navigation";
import { siteContent } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const ENTER = 120; // scroll down past this → black
    const EXIT = 30; // scroll up below this → white
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

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-in-out ${
        scrolled
          ? "border-white/10 bg-black shadow-[0_2px_20px_rgba(0,0,0,0.18)]"
          : "border-border bg-white shadow-none"
      }`}
    >
      <div
        className={`mx-auto flex max-w-screen-2xl items-center justify-between px-4 transition-[padding] duration-300 ease-in-out ${
          scrolled ? "py-6" : "py-7"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label={`${siteContent.brand.legalName} — home`}
          className="relative block"
        >
          {/* Blue logo — visible on white header */}
          <Image
            src="/images/portfolio/logo-edilferro-blu.svg"
            alt={siteContent.brand.legalName}
            width={240}
            height={60}
            className={`w-auto object-contain transition-all duration-300 ease-in-out ${
              scrolled ? "h-11 scale-95 opacity-0" : "h-13 scale-100 opacity-100"
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
              scrolled ? "h-11 scale-100 opacity-100" : "h-13 scale-95 opacity-0"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-14 md:flex" aria-label="Navigazione principale">
          {primaryNav.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href as Route<string>}
                className={`group flex items-center gap-1 font-[family-name:var(--font-neue-montreal)] text-[18px] font-normal tracking-[0.015em] uppercase ${scrolled ? "text-white" : "text-black"}`}
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

        {/* Mobile zone — click-to-call */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={`tel:${siteContent.contact.phone.tel}`}
            aria-label={`Chiama ${siteContent.brand.name}`}
            className={`rounded-full border p-3 transition-colors ${
              scrolled
                ? "border-white/30 text-white hover:border-white"
                : "border-black/20 text-black hover:border-black/60"
            }`}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
