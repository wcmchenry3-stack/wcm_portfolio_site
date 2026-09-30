/**
 * Case-study structure for `/work/:slug`. Copy lives in the `work`
 * namespace under `<id>.<section>.*`; this file only describes each
 * section's shape (how many items, which layout) plus the facts that are
 * never translated (product name, stack, source link, screenshots).
 *
 * Section `type`s, each rendered by CaseStudy.jsx:
 * - `cards`     — heading, intro, `items` title/body cards
 * - `rows`      — heading, `items` title/body rows
 * - `system`    — heading, intro, optional `nodes` flow diagram, `bullets`
 * - `table`     — heading, `rows` question/decision/why
 * - `prose`     — heading, `paragraphs`
 * - `checklist` — heading, `items` short labels
 */
export const caseStudies = [
  {
    id: 'bookshelfai',
    name: 'BookshelfAI',
    stack:
      'Expo / React Native · FastAPI · PostgreSQL · Cloudflare · OpenAI · Sentry',
    repo: 'https://github.com/wcmchenry3-stack/BookshelfAI',
    sections: [
      { key: 'problem', type: 'cards', items: 3 },
      { key: 'decisions', type: 'rows', items: 4 },
      { key: 'system', type: 'system', nodes: 4, bullets: 4 },
      { key: 'tradeoffs', type: 'table', rows: 3 },
      { key: 'validation', type: 'prose', paragraphs: 2 },
      { key: 'built', type: 'checklist', items: 9 },
    ],
  },
  {
    id: 'bc-arcade',
    name: 'BC Arcade',
    stack:
      'Expo / React Native · FastAPI · Playwright · GitHub Actions · Sentry',
    repo: 'https://github.com/wcmchenry3-stack/BC-Arcade',
    sections: [
      { key: 'problem', type: 'cards', items: 3 },
      { key: 'decisions', type: 'rows', items: 4 },
      { key: 'system', type: 'system', nodes: 0, bullets: 4 },
      { key: 'tradeoffs', type: 'table', rows: 3 },
      { key: 'validation', type: 'prose', paragraphs: 2 },
      { key: 'built', type: 'checklist', items: 9 },
    ],
  },
];

/** @param {string | undefined} id */
export function getCaseStudy(id) {
  return caseStudies.find((study) => study.id === id);
}
