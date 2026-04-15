// scripts/check-layout.mjs
// Asserts that app/layout.tsx mounts the required global elements.
// Run: `pnpm check:layout`

import fs from "node:fs";
import process from "node:process";

const LAYOUT = "app/layout.tsx";

if (!fs.existsSync(LAYOUT)) {
  console.error(`check:layout FAILED — ${LAYOUT} does not exist`);
  process.exit(1);
}

const source = fs.readFileSync(LAYOUT, "utf8");

const REQUIRED = [
  { pattern: /<Header\b/, name: "<Header />" },
  { pattern: /<Footer\b/, name: "<Footer />" },
  { pattern: /<Analytics\b/, name: "<Analytics />" },
  { pattern: /<SpeedInsights\b/, name: "<SpeedInsights />" },
  { pattern: /lang="it"/, name: 'lang="it" attribute on <html>' },
];

const missing = REQUIRED.filter((req) => !req.pattern.test(source));

if (missing.length > 0) {
  console.error(`check:layout FAILED — ${LAYOUT} is missing:`);
  for (const m of missing) {
    console.error(`  - ${m.name}`);
  }
  console.error(
    "\nThese elements are required on every route per FND-07 / FND-08. See 01-CONTEXT.md D-13..D-17, D-21.",
  );
  process.exit(1);
}

console.log(`check:layout passed — ${REQUIRED.length} required elements present in ${LAYOUT}.`);
