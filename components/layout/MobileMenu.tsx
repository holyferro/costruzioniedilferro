"use client";

// components/layout/MobileMenu.tsx
// Mobile-only slide-in navigation panel. Desktop nav is handled in Header.tsx.

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { primaryNav } from "@/content/navigation";

interface MobileMenuProps {
  scrolled: boolean;
}

export function MobileMenu({ scrolled }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  // Derive open state from the pathname at which the menu was opened.
  // When the user navigates, pathname changes → isOpen becomes false automatically
  // with no effect needed (avoids react-hooks/set-state-in-effect lint error).
  const [openSince, setOpenSince] = useState<string | null>(null);
  const isOpen = openSince === pathname;

  // ESC to close + focus management
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenSince(null);
        openButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOpen = () => setOpenSince(pathname);
  const handleClose = () => {
    setOpenSince(null);
    openButtonRef.current?.focus();
  };

  return (
    <>
      {/* Hamburger trigger — shown only on mobile via parent's md:hidden */}
      <button
        ref={openButtonRef}
        aria-label="Apri menu di navigazione"
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={handleOpen}
        className={`flex items-center gap-1.5 rounded p-1.5 transition-colors ${
          scrolled ? "text-white hover:bg-white/10" : "text-brand hover:bg-brand/8"
        }`}
      >
        <Menu size={26} strokeWidth={1.5} aria-hidden />
        <span className="font-[family-name:var(--font-neue-montreal)] text-[11px] font-medium tracking-[0.12em] uppercase">
          Menu
        </span>
      </button>

      {/* Full-screen container — always in DOM so transitions work correctly */}
      <div
        className={`fixed inset-0 z-50 ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isOpen}
      >
        {/* Dark overlay — covers the 20% of screen not used by the panel */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleClose}
          aria-label="Chiudi menu"
        />

        {/* White panel — slides in from the right, always white */}
        <div
          id="mobile-menu-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          className={`absolute top-0 right-0 flex h-full w-4/5 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Panel header — close button */}
          <div className="flex items-center justify-end px-5 py-5">
            <button
              ref={closeButtonRef}
              aria-label="Chiudi menu di navigazione"
              onClick={handleClose}
              className="text-brand hover:bg-brand/8 active:bg-brand/12 flex items-center justify-center rounded p-2 transition-colors"
            >
              <X size={24} strokeWidth={1.5} aria-hidden />
            </button>
          </div>

          {/* Nav items */}
          <nav aria-label="Navigazione mobile" className="flex-1 overflow-y-auto px-8 pt-2">
            <ul role="list" className="flex flex-col">
              {primaryNav.map((item) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href as Route<string>}
                      onClick={handleClose}
                      className={`group flex items-center justify-between border-b border-black/10 py-5 font-[family-name:var(--font-neue-montreal)] text-[22px] font-normal tracking-[0.01em] uppercase transition-colors duration-150 ${
                        isActive ? "text-brand" : "hover:text-brand text-black"
                      }`}
                    >
                      {item.label}
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden
                        className={`text-brand transition-opacity duration-200 ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
