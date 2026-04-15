// scripts/check-compliance.mjs
// Fails with exit code 1 if any forbidden pattern is found in tracked source.
// Run: `pnpm check:compliance`

import { execSync } from "node:child_process";
import process from "node:process";

const FORBIDDEN = [
  { pattern: "gtag", reason: "Google Analytics (gtag) is forbidden — see D-21." },
  { pattern: "_ga", reason: "Google Analytics (_ga cookie / global) is forbidden — see D-21." },
  { pattern: "googletagmanager", reason: "Google Tag Manager is forbidden — see D-21." },
  { pattern: "google-analytics.com", reason: "google-analytics.com reference forbidden — see D-21." },
  {
    pattern: "fonts.googleapis.com",
    reason: "Runtime Google Fonts forbidden — use next/font/google self-hosted. See D-22.",
  },
  {
    pattern: "google.com/maps",
    reason:
      "Google Maps iframe embed is forbidden — use a static AVIF screenshot + link. See REQUIREMENTS.md Out of Scope + Phase 6 CON-09.",
  },
  {
    pattern: "recaptcha",
    reason:
      "Google reCAPTCHA is forbidden — use Cloudflare Turnstile. See REQUIREMENTS.md Out of Scope.",
  },
  {
    pattern: "<iframe",
    reason:
      "Third-party iframes are generally forbidden (privacy + cookie banner risk). Remove or add an explicit exemption to scripts/check-compliance.mjs.",
  },
];

const SCAN_DIRS = ["app", "components", "content", "lib", "scripts"];
const INCLUDE_EXTS = /\.(ts|tsx|js|jsx|mjs|cjs|md|mdx|json|css|html)$/i;

// Files to skip even inside SCAN_DIRS (self-reference safety).
// scripts/check-compliance.mjs contains the forbidden patterns as data — it must not
// flag itself.
const EXEMPT_FILES = new Set([
  "scripts/check-compliance.mjs",
]);

function listTrackedFiles() {
  try {
    const out = execSync("git ls-files", { encoding: "utf8" });
    return out.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

async function main() {
  const files = listTrackedFiles().filter(
    (f) =>
      SCAN_DIRS.some((d) => f.startsWith(`${d}/`) || f === d) &&
      INCLUDE_EXTS.test(f) &&
      !EXEMPT_FILES.has(f),
  );

  const fs = await import("node:fs");
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    for (const rule of FORBIDDEN) {
      if (content.includes(rule.pattern)) {
        violations.push({ file, rule });
      }
    }
  }

  if (violations.length > 0) {
    console.error("\nCompliance check FAILED:\n");
    for (const v of violations) {
      console.error(`  ${v.file}`);
      console.error(`    matched "${v.rule.pattern}" — ${v.rule.reason}`);
    }
    console.error(
      `\n${violations.length} violation(s). Fix or add an exemption in scripts/check-compliance.mjs.\n`,
    );
    process.exit(1);
  }

  console.log(`Compliance check passed (${files.length} files scanned).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
