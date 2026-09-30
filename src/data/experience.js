/**
 * Resume experience, newest first. English here is the `defaultValue`
 * fallback; translations live in the `resume` namespace under
 * `experience.<i18nKey>.*` (title, location, promotion, description,
 * bullet_<n>). A company may instead list `roles` (each resolved under
 * `experience.<i18nKey>.role_<n>`), but the resume currently collapses
 * promotions into one entry with a `promotion` line.
 */
export const experience = [
  {
    company: 'eXp Realty',
    i18nKey: 'exprealty',
    location: 'Remote',
    title: 'Principal Product Manager',
    startDate: { year: 2024, month: 4 },
    endDate: null,
    promotion:
      'Promoted from Senior Product Manager to Principal Product Manager, Aug 2025.',
    description:
      'My eXp — the web and mobile app built to be the one-stop shop for everything an agent needs to run their business.',
    bullets: [
      'Consolidated legacy experiences for 88K agents into My eXp, avoiding ~$6M in three-year licensing costs.',
      'Expanded My eXp globally across ~20 countries, increasing monthly active users from 26K to 59K (+127%).',
      'Led strategy across a multi-product portfolio spanning performance insights, transactions, revenue share, team management, accounting and payments, mentoring, and other core workflows.',
      'Developed four business analysts into independent product managers and restructured ownership around accountable domains, shifting the team toward customer problems, measurable outcomes, and stronger engineering partnerships.',
      'Introduced direct user discovery to an organization historically reliant on internal stakeholders, personally conducting 50+ user conversations and making customer evidence a routine roadmap input.',
      'Turned around an unreliable AI copilot, reshaping data, authorization, and response behavior to achieve approximately 95% measured answer accuracy.',
      'Trained approximately 20 product managers and partners in AI-assisted workflows, redirecting time toward discovery, stakeholder engagement, and higher-value product decisions.',
      'Led product decisions across large datasets, APIs, authentication, logging, performance, feature flags, observability, incident response, and production reliability.',
    ],
  },
  {
    company: 'Virbela',
    i18nKey: 'virbela',
    location: 'Remote',
    title: 'Lead Product Manager',
    startDate: { year: 2021, month: 3 },
    endDate: { year: 2024, month: 4 },
    description:
      'A 3D virtual office where enterprise teams meet, host clients, and work together. (An eXp World Holdings company.)',
    bullets: [
      'Promoted within eight months to lead Virbela’s product organization, directly managing and coaching three product managers across server, desktop/client, and web/data product domains.',
      'Set strategy and OKRs across three product domains, refocusing investment on priority customer problems and contributing to 28% adoption growth over two years.',
      'Led product strategy across interconnected client, server, web, and data systems, partnering with engineering on scalability, performance, and platform evolution.',
      'Developed API products and commercial models spanning provisioning, usage, attendance, and customer data.',
      'Advanced enterprise readiness through SSO, role-based access, GDPR/privacy controls, accessibility, and security hardening.',
      'Established release and incident practices across desktop and web products, including staged migrations, fallback planning, and production issue management.',
    ],
  },
  {
    company: 'project44',
    i18nKey: 'project44',
    location: 'Remote',
    title: 'Product Manager',
    startDate: { year: 2020, month: 8 },
    endDate: { year: 2021, month: 2 },
    description:
      'Real-time freight visibility network connecting shippers and carriers.',
    bullets: [],
  },
  {
    company: 'Omnitracs',
    i18nKey: 'omnitracs',
    location: 'Dallas, TX · Oakville, ON · Evanston, IL',
    title: 'Senior Product Manager',
    startDate: { year: 2015, month: 6 },
    endDate: { year: 2020, month: 6 },
    promotion:
      'Promoted from Product Manager to Senior Product Manager, Feb 2017.',
    description:
      'Freight tracking, transportation management, and Canadian-market products in a fleet-management SaaS portfolio.',
    bullets: [
      'Led NIHITO customer visits, observing customer operations firsthand to uncover market problems beyond stated feature requests.',
      'Turned Virtual Load View from a retirement candidate into a strategic data product, bringing development in-house and growing revenue 180% YoY.',
      "Led product strategy for Omnitracs' approximately $30M Canadian business, preserving an $8M product through market-specific priorities.",
      'Defined APIs, authorization, data contracts, pricing, and packaging for a SaaS product integrating approximately eight telematics/GPS sources.',
      'Managed and coached the Product Manager responsible for day-to-day execution of the ~$13.6M Sylectus SaaS portfolio, while retaining strategic product oversight.',
      'Led mobile and IoT product initiatives supporting operational workflows, including iOS/Android applications and in-cab technology.',
    ],
  },
  {
    company: 'CROSSMARK',
    i18nKey: 'crossmark',
    location: 'Plano, TX · Grand Rapids, MI',
    title: 'Business Analyst',
    startDate: { year: 2011, month: 6 },
    endDate: { year: 2015, month: 6 },
    promotion:
      'Promoted from Management Trainee to Business Analyst (Product Owner), Aug 2013.',
    description:
      'Client reporting products proving the value delivered to retail brands and manufacturers.',
    bullets: [
      'Oversaw an eight-person Agile team launching a client-insights reporting system, saving internal users 30% of their time.',
      'Led a six-person Agile team building a promotion insights dashboard for 25 corporate clients.',
      'Designed and built an automated report supporting a $10M+ Coca-Cola business line.',
    ],
  },
];
