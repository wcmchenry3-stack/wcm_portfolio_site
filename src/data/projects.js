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
      'Built for book lovers: capture several books from one photo, then track them from wishlist to read',
      'Tiered models and credits keep accuracy, convenience and inference cost in balance',
      'Server-authoritative AI, identity and spending controls, with bounded offline capture',
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
    category: 'Casual games · iOS, Android & Web',
    tagline:
      'Short, satisfying games for people who want to play and then put the phone down. No freemium pressure and no wagering.',
    bullets: [
      'Built for short sessions, with no freemium pressure and no wagering',
      'Playtests and market research reshaped the lineup, from Blackjack to Daily Word',
      'Offline-first play, server-guarded purchases, and automated release gates',
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
