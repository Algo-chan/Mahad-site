import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Static export output.
    "dist/**",
    // Runtime config file uses CommonJS.
    "next.config.js",
  ]),
  {
    // Static export uses plain <img> (next/image requires an optimizer);
    // placeholders are replaced with real photos later.
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
