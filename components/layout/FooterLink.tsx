"use client";

// components/layout/FooterLink.tsx
// Renders a footer nav link with an ArrowUpRight icon that becomes visible
// when the current route matches (active) or on hover — mirrors the Header behaviour.

import { usePathname } from "next/navigation";
import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface FooterLinkProps {
  href: string;
  label: string;
  className?: string;
  iconSize?: number;
}

export function FooterLink({ href, label, className = "", iconSize = 14 }: FooterLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href as Route<string>}
      className={`group inline-flex items-center gap-0.5 transition-colors hover:text-white ${className}`}
    >
      {label}
      <ArrowUpRight
        size={iconSize}
        strokeWidth={1.5}
        aria-hidden="true"
        className={`shrink-0 transition-opacity duration-150 ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      />
    </Link>
  );
}
