/**
 * Term base / glossary for the portfolio site.
 *
 * This is the single source of truth for protected and notable terms.
 * It is used by:
 *   - scripts/translate.js  → injected into OpenAI system prompts
 *   - Components            → injected as i18next interpolation values so
 *                             translators never see or touch these strings
 *
 * Schema per entry:
 *   category        — 'brand' | 'technology' | 'acronym' | 'person' | 'geography'
 *   doNotTranslate  — true = inject as interpolation; never hand to translator
 *   reason          — why this term is protected (for humans and AI context)
 *   definition      — what it is (injected into OpenAI prompt for context)
 *   notes           — casing, stylistic, or locale-specific guidance
 */
export const glossary = {
  // ─── Brands ──────────────────────────────────────────────────────────────

  Virbela: {
    category: 'brand',
    doNotTranslate: true,
    reason:
      'Registered company name. Translation would cause factual error or brand harm.',
    definition:
      'Virtual 3D workspace platform company; employer March 2021–present.',
    notes: 'Capitalize exactly as shown.',
  },

  project44: {
    category: 'brand',
    doNotTranslate: true,
    reason: 'Registered company name with intentional lowercase-p styling.',
    definition:
      'Supply chain visibility SaaS company; employer Aug 2020–Feb 2021.',
    notes: 'The lowercase "p" is mandatory — it is not a typo.',
  },

  Omnitracs: {
    category: 'brand',
    doNotTranslate: true,
    reason: 'Registered company name.',
    definition:
      'Fleet management and ELD compliance software company; employer Jun 2015–Jun 2020.',
    notes: null,
  },

  CROSSMARK: {
    category: 'brand',
    doNotTranslate: true,
    reason: 'Registered company name rendered in all-caps (brand standard).',
    definition:
      'Sales and marketing services company; employer Jun 2011–Jun 2015.',
    notes: 'All-caps is the brand standard, not an acronym.',
  },

  LinkedIn: {
    category: 'brand',
    doNotTranslate: true,
    reason: 'Platform name; universally recognized across all target locales.',
    definition: 'Professional networking platform owned by Microsoft.',
    notes: null,
  },

  // ─── Technologies ────────────────────────────────────────────────────────

  Alteryx: {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Registered product name.',
    definition: 'Data analytics and automation platform.',
    notes: null,
  },

  Jira: {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Registered product name (Atlassian).',
    definition: 'Issue and project tracking software.',
    notes: null,
  },

  Python: {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Programming language name; used in its original form universally.',
    definition: 'General-purpose programming language.',
    notes: null,
  },

  Splunk: {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Registered product name.',
    definition: 'Machine data search, monitoring, and SIEM platform.',
    notes: null,
  },

  SQL: {
    category: 'technology',
    doNotTranslate: true,
    reason:
      'Industry-standard technology name; no target-language equivalent in common usage.',
    definition:
      'Structured Query Language — relational database query language.',
    notes: null,
  },

  Tableau: {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Registered product name (Salesforce).',
    definition: 'Business intelligence and data visualization tool.',
    notes: null,
  },

  'Microsoft Excel / PowerQuery': {
    category: 'technology',
    doNotTranslate: true,
    reason: 'Registered Microsoft product names.',
    definition:
      'Microsoft Excel spreadsheet software with Power Query data transformation add-in.',
    notes:
      'The slash-separated form is intentional — both products are referenced together.',
  },

  // ─── Acronyms ────────────────────────────────────────────────────────────

  API: {
    category: 'acronym',
    doNotTranslate: true,
    reason:
      'Universal technical acronym with no localized equivalent in common business usage.',
    definition: 'Application Programming Interface.',
    notes: null,
  },

  ARR: {
    category: 'acronym',
    doNotTranslate: true,
    reason:
      'Standard SaaS finance acronym used globally in English even in other-language business contexts.',
    definition: 'Annual Recurring Revenue.',
    notes: null,
  },

  CPG: {
    category: 'acronym',
    doNotTranslate: true,
    reason: 'Standard industry acronym.',
    definition: 'Consumer Packaged Goods — retail industry category.',
    notes: null,
  },

  EDI: {
    category: 'acronym',
    doNotTranslate: true,
    reason: 'Standard logistics and supply-chain acronym.',
    definition:
      'Electronic Data Interchange — standard format for business document exchange.',
    notes: 'Appears in the project44 experience bullets.',
  },

  ELD: {
    category: 'acronym',
    doNotTranslate: true,
    reason:
      'US/Canadian regulatory term; the mandate is officially named in English.',
    definition:
      'Electronic Logging Device — US and Canadian federal trucking compliance mandate.',
    notes:
      'Context is the Canadian ELD mandate. Do not translate; a parenthetical may be added if helpful for comprehension.',
  },

  OKR: {
    category: 'acronym',
    doNotTranslate: true,
    reason:
      'Industry-standard goal-setting acronym used globally in English even in non-English business environments.',
    definition: 'Objectives and Key Results — a goal-setting framework.',
    notes:
      'Do not expand or translate. If a translator note is needed, a parenthetical in the target language is acceptable (e.g., fr-CA: "OKR (Objectifs et Résultats Clés)").',
  },

  PRD: {
    category: 'acronym',
    doNotTranslate: true,
    reason:
      'Standard product management document type; used in English globally.',
    definition: 'Product Requirements Document.',
    notes: null,
  },

  QA: {
    category: 'acronym',
    doNotTranslate: true,
    reason: 'Standard software quality acronym used globally.',
    definition: 'Quality Assurance.',
    notes: null,
  },

  SaaS: {
    category: 'acronym',
    doNotTranslate: true,
    reason: 'Industry-standard business model acronym.',
    definition: 'Software as a Service.',
    notes: 'Casing is S-a-a-S — preserve exactly.',
  },

  YoY: {
    category: 'acronym',
    doNotTranslate: true,
    reason: 'Standard finance and analytics abbreviation.',
    definition: 'Year over Year — period-over-period comparison metric.',
    notes: null,
  },

  // ─── Persons ─────────────────────────────────────────────────────────────

  'Bill McHenry': {
    category: 'person',
    doNotTranslate: true,
    reason:
      'Proper name of the portfolio owner. Personal names are not translated.',
    definition:
      'Product Management leader based in Calgary, Alberta; the subject of this portfolio.',
    notes:
      'When used as the navbar brand or in image alt text, must appear exactly as shown. Do not transliterate into other scripts (Hindi/Arabic).',
  },

  // ─── Geography ───────────────────────────────────────────────────────────

  Calgary: {
    category: 'geography',
    doNotTranslate: false,
    reason:
      'City name — may be transliterated in Hindi and Arabic; English form is also acceptable.',
    definition: 'City in Alberta, Canada where Bill McHenry is based.',
    notes:
      'fr-CA: "Calgary" (same). es: "Calgary" (same). hi: कैलगरी (transliteration preferred). ar: كالغاري (transliteration preferred).',
  },

  Alberta: {
    category: 'geography',
    doNotTranslate: false,
    reason:
      'Province name — established translated/transliterated forms exist.',
    definition: 'Canadian province.',
    notes:
      'fr-CA: "Alberta" (same). es: "Alberta" (same). hi: अल्बर्टा. ar: ألبرتا.',
  },
};

/**
 * Flat list of terms that must never be modified in translated strings.
 * Used by scripts/translate.js to build the OpenAI "do not translate" block
 * and to validate translation output.
 */
export const doNotTranslateTerms = Object.entries(glossary)
  .filter(([, meta]) => meta.doNotTranslate)
  .map(([term]) => term);
