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
      'Photograph a shelf, get a library. Built to be viable from day one: every AI scan has a real cost, so accuracy, convenience and price are decided together.',
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
      'Short, satisfying games for people who want to play and then put the phone down. No freemium pressure and no wagering.',
    bullets: [
      'Playtest-driven redesigns, seeded simulations and measurable release criteria',
      'Automated pull-request quality gates, Playwright end-to-end tests and performance instrumentation',
      'An AI triage agent that merges only low-risk updates, behind deterministic guards',
    ],
    images: [
      {
        src: '/work/bc-arcade/star-swarm.jpg',
        alt: "Star Swarm mid-wave: the player's ship firing on rows of alien invaders",
      },
      {
        src: '/work/bc-arcade/lobby.jpg',
        alt: "BC Arcade lobby with today's Daily Challenge and game cards",
      },
      {
        src: '/work/bc-arcade/blackjack.jpg',
        alt: 'A Blackjack hand in progress, with the table goal and hit, stand and double-down controls',
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
