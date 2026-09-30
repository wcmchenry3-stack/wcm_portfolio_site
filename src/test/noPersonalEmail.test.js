/* eslint-disable security/detect-non-literal-fs-filename -- walks a fixed list of repo paths */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Guard: no personal email address may be published in the site or its
 * Worker. Contact goes through the /contact form (workers/contact); the
 * recipient lives only in a Worker secret. Placeholder and own-domain
 * sender addresses are allowed.
 */
const ROOT = join(__dirname, '../..');
const SCAN = ['src', 'public', 'workers', 'index.html', 'render.yaml'];
const SKIP_DIRS = new Set(['node_modules', 'dist', 'coverage']);
const TEXT_EXT = /\.(jsx?|json|html|md|toml|ya?ml|txt|xml|css)$/;
const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const ALLOWED_DOMAINS = ['example.com', 'example.org', 'billmchenry.org'];

function* files(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) {
      if (!SKIP_DIRS.has(entry)) yield* files(join(path, entry));
    }
  } else if (TEXT_EXT.test(path)) {
    yield path;
  }
}

describe('no personal email in published code', () => {
  it('contains only placeholder or own-domain addresses', () => {
    const offenders = [];
    for (const target of SCAN) {
      for (const file of files(join(ROOT, target))) {
        for (const match of readFileSync(file, 'utf8').matchAll(EMAIL)) {
          const domain = match[0].split('@')[1].toLowerCase();
          if (!ALLOWED_DOMAINS.some((d) => domain.endsWith(d))) {
            offenders.push(`${relative(ROOT, file)}: ${match[0]}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it('has no mailto: links in the site source or locales', () => {
    const hits = [];
    for (const target of ['src/components', 'src/pages', 'public/locales']) {
      for (const file of files(join(ROOT, target))) {
        if (file.includes('.test.')) continue;
        if (readFileSync(file, 'utf8').includes('mailto:')) {
          hits.push(relative(ROOT, file));
        }
      }
    }
    expect(hits).toEqual([]);
  });
});
