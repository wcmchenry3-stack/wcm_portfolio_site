/* eslint-disable security/detect-non-literal-fs-filename */
import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(__dirname, '../..');
const read = (path) => readFileSync(join(ROOT, path), 'utf8');

function files(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}

const indexHtml = read('index.html');
const jsonLdSource = indexHtml.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
)[1];

describe('structured data (JSON-LD)', () => {
  it('is valid JSON with the factual title and the management scope', () => {
    const person = JSON.parse(jsonLdSource);
    expect(person.jobTitle).toBe('Principal Product Manager');
    expect(person.description).toMatch(
      /six years directly managing product managers/i
    );
  });

  // The CSP allowlists the JSON-LD block by hash in three places. Editing
  // the block without updating all three leaves them out of sync.
  it('matches the sha256 hash in every CSP declaration', () => {
    const hash = createHash('sha256').update(jsonLdSource).digest('base64');
    for (const path of ['index.html', 'public/_headers', 'render.yaml']) {
      expect(read(path), path).toContain(`'sha256-${hash}'`);
    }
  });
});

describe('page metadata', () => {
  it('positions Bill as a product management leader, not by job title', () => {
    expect(indexHtml).toContain(
      '<title>Bill McHenry | Product Management Leader</title>'
    );
    expect(indexHtml).toMatch(
      /name="description"\s+content="[^"]*six years managing product managers/
    );
  });
});

describe('llms.txt', () => {
  const llms = read('public/llms.txt');

  it('states the management tenure in plain language', () => {
    expect(llms).toMatch(/^# Bill McHenry/);
    expect(llms).toMatch(/directly managed product managers for six years/);
    expect(llms).toMatch(/hiring decisions, performance reviews/);
  });

  it('links to the main pages', () => {
    for (const path of ['/resume', '/work', '/contact']) {
      expect(llms).toContain(`https://billmchenry.org${path}`);
    }
  });
});

describe('public disclosure boundaries', () => {
  // Kept off the public site: proprietary or sensitive details that stay
  // on private, targeted resumes only.
  const targets = [
    'index.html',
    'public/llms.txt',
    ...files(join(ROOT, 'public/locales/en')).map((f) =>
      f.slice(ROOT.length + 1)
    ),
    ...files(join(ROOT, 'src/data')).map((f) => f.slice(ROOT.length + 1)),
  ];

  it.each(targets)('%s has no $6M figure or sensitive specifics', (path) => {
    const text = read(path);
    expect(text).not.toContain('$6M');
    expect(text).not.toMatch(/influencer|chairman|separation|\bfired\b/i);
  });
});
