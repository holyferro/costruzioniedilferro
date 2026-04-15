// lib/utils/cn.ts
// Conditional className helper — clsx for conditional join, tailwind-merge for conflict resolution.
// Standard shadcn/ui pattern, reused throughout the app.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
