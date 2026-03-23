#!/usr/bin/env node
/**
 * Checks all non-English locale files for missing or untranslated strings.
 *
 * Usage:
 *   node scripts/check-i18n-strings.js              # human-readable summary
 *   node scripts/check-i18n-strings.js --output-json # JSON for CI consumption
 *
 * Always exits 0 (warn-only). CI uses --output-json and posts a PR comment
 * if totalMissing > 0.
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LOCALES_DIR = join(__dirname, '../public/locales');
const PLACEHOLDER = '__NEEDS_TRANSLATION__';
const NAMESPACES = ['common', 'home', 'resume'];
const TARGET_LOCALES = ['fr-CA', 'es', 'hi', 'ar'];

function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function main() {
  const outputJson = process.argv.includes('--output-json');
  const results = {};
  let totalMissing = 0;

  for (const locale of TARGET_LOCALES) {
    results[locale] = {};
    for (const ns of NAMESPACES) {
      const enSource = loadJson(join(LOCALES_DIR, 'en', `${ns}.json`));
      const target = loadJson(join(LOCALES_DIR, locale, `${ns}.json`));

      if (!enSource) continue;

      const missing = [];
      for (const key of Object.keys(enSource)) {
        const val = target?.[key];
        if (val === undefined || val === null || val === PLACEHOLDER) {
          missing.push(key);
        }
      }

      results[locale][ns] = missing;
      totalMissing += missing.length;
    }
  }

  if (outputJson) {
    console.log(JSON.stringify({ totalMissing, results }, null, 2));
    return;
  }

  // Human-readable output
  if (totalMissing === 0) {
    console.log('✓ All locales fully translated — 0 missing strings.');
    return;
  }

  console.log(
    `⚠  Found ${totalMissing} untranslated string(s) across all locales:\n`
  );

  for (const [locale, nses] of Object.entries(results)) {
    for (const [ns, missing] of Object.entries(nses)) {
      if (missing.length === 0) continue;
      console.log(`  ${locale}/${ns}.json — ${missing.length} missing:`);
      missing.forEach((k) => console.log(`    • ${k}`));
    }
  }

  console.log(
    `\nRun: node scripts/translate.js --locale <code> --namespace <ns>`
  );
}

main();
