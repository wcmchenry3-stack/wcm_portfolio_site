/**
 * Featured projects get a full case study at `/work/<id>`; supporting
 * projects link straight out to the live product or repo. Copy lives in
 * the `home` namespace under `work.<id>.*`; the English here is the
 * `defaultValue` fallback.
 */
export const featuredProjects = [
  {
    id: 'bookshelfai',
    name: 'BookshelfAI',
    category: 'AI product · iOS, Android & Web',
    tagline:
      'Photograph a shelf; get a library. Multimodal AI identifies every book in the frame, enriches it, and carries it from wishlist to read.',
    bullets: [
      'One scan flow for one book or a whole shelf — the model infers the count',
      'Server-side AI orchestration and a tiered model-cost design',
      'OAuth with rotating tokens, offline capture, Sentry, 10 languages',
    ],
    images: [
      {
        src: '/work/bookshelfai/wishlist.jpg',
        alt: 'BookshelfAI wishlist with three books to buy',
      },
      {
        src: '/work/bookshelfai/library.jpg',
        alt: 'BookshelfAI library showing books by reading status',
      },
      {
        src: '/work/bookshelfai/book-detail.jpg',
        alt: 'BookshelfAI book detail with an enriched description and page count',
      },
    ],
    logo: '/work/bookshelfai/logo.jpg',
  },
  {
    id: 'bc-arcade',
    name: 'BC Arcade',
    category: 'Mobile platform · iOS, Android & Web',
    tagline:
      'Quick, genuinely fun games with no freemium pressure, no wagering and no artificial walls — and the engineering discipline to ship them.',
    bullets: [
      'Playtest-driven redesigns, seeded simulations and measurable release criteria',
      '~44 CI quality gates, Playwright end-to-end tests, performance instrumentation',
      'An AI triage agent that merges only low-risk updates, behind deterministic guards',
    ],
    images: [
      {
        src: '/work/bc-arcade/lobby.jpg',
        alt: 'BC Arcade lobby with game cards for Yacht, 2048, Solitaire and FreeCell',
      },
      {
        src: '/work/bc-arcade/sudoku.jpg',
        alt: 'A Sudoku puzzle in progress in BC Arcade',
      },
      {
        src: '/work/bc-arcade/solitaire.jpg',
        alt: 'A fresh Solitaire deal in BC Arcade',
      },
    ],
  },
];

export const supportingProjects = [
  {
    id: 'rulersai',
    name: 'RulersAI',
    tagline:
      'Messy public data turned into a structured, monitored dataset with automated quality checks.',
    href: 'https://rulersai.buffingchi.com',
  },
  {
    id: 'powerplays',
    name: 'Power Plays History',
    tagline:
      'Long-form historical research — synthesis, sourcing and structured writing.',
    href: 'https://github.com/wcmchenry3-stack/powerplayshistory_site',
  },
];
