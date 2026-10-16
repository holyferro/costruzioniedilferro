// scripts/mobile.mjs
// Opens a page in WebKit (Safari's engine) emulating an iPhone: real touch events, mobile viewport.
// The built-in browser sends taps as mouse clicks and runs Chromium, so touch and iOS-only
// performance bugs only show up here.
//
// CLI:    node scripts/mobile.mjs <url> [screenshot.png]
// Module: import { openMobile } from "./scripts/mobile.mjs";
//         const { page, close } = await openMobile(url);
//         await page.tap("button[aria-label^='01']");
// Missing browser? Run `pnpm exec playwright install webkit` once.

import process from "node:process";
import { devices, webkit } from "playwright";

export async function openMobile(url, { device = "iPhone 13" } = {}) {
  const browser = await webkit.launch();
  const context = await browser.newContext(devices[device]);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: "load" });
  return { page, close: () => browser.close() };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [url, shot] = process.argv.slice(2);
  if (!url) {
    console.error("Usage: node scripts/mobile.mjs <url> [screenshot.png]");
    process.exit(1);
  }
  const { page, close } = await openMobile(url);
  const info = await page.evaluate(() => ({
    width: innerWidth,
    coarsePointer: matchMedia("(pointer: coarse)").matches,
    horizontalScroll: document.documentElement.scrollWidth > innerWidth,
  }));
  console.log(info);
  if (shot) await page.screenshot({ path: shot, fullPage: true });
  await close();
}
