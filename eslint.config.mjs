// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ---------- Compliance guard rails ----------
  // Applied only to app source files — intentionally excludes eslint.config.mjs
  // and scripts/check-*.mjs which reference forbidden patterns as data, not usage.
  {
    files: ["app/**/*.{ts,tsx,js,jsx}", "components/**/*.{ts,tsx,js,jsx}", "lib/**/*.{ts,tsx,js,jsx}", "content/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Identifier[name='gtag']",
          message:
            "Google Analytics (gtag) is forbidden — see PROJECT.md compliance lock-in and D-21. Use @vercel/analytics.",
        },
        {
          selector: "Literal[value=/googletagmanager\\.com/]",
          message: "Google Tag Manager is forbidden — see PROJECT.md D-21.",
        },
        {
          selector: "Literal[value=/google-analytics\\.com/]",
          message: "google-analytics.com is forbidden — see PROJECT.md D-21.",
        },
        {
          selector: "Literal[value=/fonts\\.googleapis\\.com/]",
          message:
            "Runtime Google Fonts is forbidden — use next/font/google (self-hosted). See D-22.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "react-ga", message: "GA4 is forbidden per D-21." },
            { name: "react-ga4", message: "GA4 is forbidden per D-21." },
          ],
          patterns: [
            {
              group: ["@next/third-parties/google"],
              message:
                "Google third-party embeds (Analytics, Maps, reCAPTCHA) are forbidden in this project. See PROJECT.md D-21 and the 'Out of Scope' section of REQUIREMENTS.md.",
            },
          ],
        },
      ],
    },
  },

  // prettier LAST
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "_design/**"]),
]);

export default eslintConfig;
