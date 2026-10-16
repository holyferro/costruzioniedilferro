// scripts/check-layout.mjs
// Asserts that the root layout and the (site) layout mount the required global elements.
// Header/Footer live in app/(site)/layout.tsx so that /studio (Sanity) renders without them.
// Run: `pnpm check:layout`

import fs from "node:fs";
import process from "node:process";

const REQUIRED = {
  "app/layout.tsx": [
    { pattern: /<Analytics\b/, name: "<Analytics />" },
    { pattern: /<SpeedInsights\b/, name: "<SpeedInsights />" },
    { pattern: /lang="it"/, name: 'lang="it" attribute on <html>' },
  ],
  "app/(site)/layout.tsx": [
    { pattern: /<Header\b/, name: "<Header />" },
    { pattern: /<Footer\b/, name: "<Footer />" },
  ],
};

let failed = false;
let count = 0;

for (const [file, checks] of Object.entries(REQUIRED)) {
  if (!fs.existsSync(file)) {
    console.error(`check:layout FAILED — ${file} does not exist`);
    failed = true;
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  const missing = checks.filter((req) => !req.pattern.test(source));
  count += checks.length;
  if (missing.length > 0) {
    console.error(`check:layout FAILED — ${file} is missing:`);
    for (const m of missing) console.error(`  - ${m.name}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    "\nThese elements are required on every route per FND-07 / FND-08. See 01-CONTEXT.md D-13..D-17, D-21.",
  );
  process.exit(1);
}

console.log(`check:layout passed — ${count} required elements present.`);
