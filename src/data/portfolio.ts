export type Link = {
  readonly label: string;
  readonly href: string;
};

export type Profile = {
  readonly name: string;
  readonly fullName: string;
  readonly title: string;
  readonly statement: { readonly agents: string; readonly mine: string };
  readonly subhead: string;
  readonly location: string;
  readonly site: string;
  readonly languages: readonly string[];
};

export type ShipLogId =
  | 'commissions'
  | 'socialpro'
  | 'portal'
  | 'cliphub'
  | 'gravity-room'
  | 'piroboom';

export type Project = {
  readonly id: string;
  readonly shipLogId?: ShipLogId;
  readonly name: string;
  readonly kind: string;
  readonly pitch: string;
  readonly points: readonly string[];
  readonly links: readonly Link[];
};

type Highlight = {
  readonly text: string;
  readonly shipLogId?: ShipLogId;
};

export type Job = {
  readonly id: string;
  readonly title: string;
  readonly company?: string;
  readonly url?: string;
  readonly period: string;
  readonly description?: string;
  readonly highlights: readonly Highlight[];
};

export type SkillGroup = {
  readonly category: string;
  readonly items: readonly string[];
};

export type Education = {
  readonly title: string;
  readonly period: string;
};

export type SocialLink = {
  readonly id: 'github' | 'linkedin' | 'email' | 'cv';
  readonly label: string;
  readonly href: string;
};

export type ShipLine = {
  readonly id: ShipLogId;
  readonly label: string;
  readonly detail: string;
};

export const PROFILE: Profile = {
  name: 'Luis Reche',
  fullName: 'Luis Lucas Reche',
  title: 'Applied AI Product Engineer',
  statement: {
    agents: 'Coding agents write the code.',
    mine: 'I decide what to build and answer for what ships.',
  },
  subhead:
    'Since 2023 I have taken products from a customer’s problem to production: web, mobile, desktop, backend and infrastructure.',
  location: 'Palma, Spain',
  site: 'luisreche.dev',
  languages: ['Spanish (native)', 'Catalan (native)', 'English (advanced)'],
};

export const CONTACT = {
  email: 'rechedev@hotmail.com',
  github: 'https://github.com/rechedev9',
  linkedin: 'https://www.linkedin.com/in/luisrecheamado',
  cvPage: '/cv/',
  cv: '/Luis-Reche-Applied-AI-Engineer-CV.pdf',
  cvFileName: 'Luis-Reche-Applied-AI-Engineer-CV.pdf',
} as const;

export const FLAGSHIP: Project = {
  id: 'cliphub',
  shipLogId: 'cliphub',
  name: 'ClipHub',
  kind: 'Own product · Windows desktop',
  pitch:
    'A Windows app that turns a Counter-Strike 2 demo into an edited video of the player’s best plays. It is my own product, and I share it with SocialPro.',
  points: [
    'Replaced manual recording and editing with one flow: the player loads a demo and gets the video.',
    'Shipped 130+ releases through in-app updates. The app also clips streams and follows FACEIT players.',
    'Ran the whole pipeline on the player’s PC, so making a video uploads nothing.',
  ],
  links: [
    { label: 'Live site', href: 'https://cliphub.gravityroom.app/' },
    { label: 'Releases', href: 'https://github.com/rechedev9/cliphub/releases' },
    { label: 'Source', href: 'https://github.com/rechedev9/cliphub' },
  ],
};

export const FLAGSHIP_FIGURES = [
  { value: 130, label: 'releases' },
  { value: 100, label: 'users' },
] as const;

export const PROJECTS: readonly Project[] = [
  {
    id: 'gravity-room',
    shipLogId: 'gravity-room',
    name: 'Gravity Room',
    kind: 'Own product · web and mobile',
    pitch:
      'A free, open source strength training app. It has 18 programs and calculates the weights, sets and reps of every session.',
    points: [
      'One progression engine for web and mobile raises the load after a completed session and adjusts the plan after a failed one.',
      'A guest mode lets people try it without an account. It is in Spanish and English, has no ads and lets users export their data.',
    ],
    links: [
      { label: 'Live site', href: 'https://gravityroom.app' },
      { label: 'Source', href: 'https://github.com/rechedev9/gravity-room' },
    ],
  },
  {
    id: 'piroboom',
    shipLogId: 'piroboom',
    name: 'Piroboom',
    kind: 'Client · Pirotecnia Elche',
    pitch:
      'The complete website of a fireworks shop in Elche, from the design and the content to the server it runs on.',
    points: [
      'Fireworks cannot be shipped in Spain, so the site is built around store visits and enquiries for weddings, gender reveals and other celebrations.',
      'An 82 MB PDF catalogue became a 16-page online reader with search and zoom.',
    ],
    links: [
      { label: 'Live site', href: 'https://pirotecniaelche.es' },
      { label: 'Source', href: 'https://github.com/rechedev9/piroelche' },
    ],
  },
  {
    id: 'socialpro',
    name: 'SocialPro',
    kind: 'Client · gaming and esports agency',
    pitch: 'The public website, the brand portal and the first internal CRM of a gaming and esports agency.',
    points: [
      'After the launch and the SEO work, monthly Google impressions went from 155 to 18,700 and clicks from 16 to 285 between April and September 2026.',
    ],
    links: [{ label: 'Live site', href: 'https://socialpro.es' }],
  },
  {
    id: 'honey-encryption-proxy',
    name: 'Honey Encryption Proxy',
    kind: 'Developer tool',
    pitch:
      'A local proxy for Claude Code that swaps proprietary names in a prompt’s code for stand-ins and restores them in the reply.',
    points: [],
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/honey-encryption-proxy' }],
  },
  {
    id: 'riskforge',
    name: 'riskforge',
    kind: 'Study project',
    pitch:
      'An insurance quote gateway that asks several carriers for a price in parallel. I built it to learn the insurance domain.',
    points: [],
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/riskforge' }],
  },
];

export const EXPERIENCE: readonly Job[] = [
  {
    id: 'agentero',
    title: 'Applied AI Software Engineer',
    company: 'Agentero',
    url: 'https://www.agentero.com',
    period: 'Apr 2026 to present',
    description: 'US network of independent insurance agents. Remote from Spain.',
    highlights: [
      {
        text: 'Built, end to end, the internal app that partly automates month-end commission payments, a critical process for the network.',
        shipLogId: 'commissions',
      },
      {
        text: 'Maintained and extended the marketplace where those agents reach insurance carriers, across the Go backend on Google Cloud and the Next.js interface.',
      },
    ],
  },
  {
    id: 'socialpro',
    title: 'Freelance Applied AI Product Engineer',
    company: 'SocialPro',
    url: 'https://socialpro.es',
    period: '2025 to present',
    description: 'Gaming and esports agency that connects creators with brands.',
    highlights: [
      {
        text: 'Built and launched socialpro.es and did its SEO. Monthly Google impressions went from 155 to 18,700 and clicks from 16 to 285 between April and September 2026.',
        shipLogId: 'socialpro',
      },
      {
        text: 'Built the brand portal and the first CRM of the agency, as its whole product team.',
        shipLogId: 'portal',
      },
      {
        text: 'Delivered the complete website of Pirotecnia Elche, a fireworks shop and client of the agency, from design to deployment.',
      },
    ],
  },
  {
    id: 'rechedev',
    title: 'Freelance Applied AI Product Engineer',
    company: 'RecheDev',
    url: 'https://rechedev.cloud',
    period: '2023 to present',
    description: 'My one-person product practice.',
    highlights: [
      { text: 'Took my own and client products from the first conversation to production.' },
      {
        text: 'Created ClipHub and Gravity Room, my own products. ClipHub has 100+ users after 130+ releases.',
      },
      {
        text: 'Tuned PCs for competitive players to lower latency, overclocked their hardware and built custom machines.',
      },
    ],
  },
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    period: '10 years',
    highlights: [
      { text: 'Decided which products to bring in and when, and how to sell them to different customer profiles.' },
      {
        text: 'Managed the database behind multi-warehouse stock and planned purchasing from stock and sales statistics.',
      },
    ],
  },
];

export const SKILLS: readonly SkillGroup[] = [
  {
    category: 'Product',
    items: ['Product scoping', 'UX and interface design', 'SEO', 'Release management'],
  },
  {
    category: 'AI and agents',
    items: ['Claude Code', 'Codex', 'MCP servers', 'Skills and plugins', 'Multi-agent workflows', 'Review of agent output'],
  },
  {
    category: 'Backend',
    items: ['Go', 'Bun', 'Elysia', 'PostgreSQL', 'Drizzle', 'SQLite'],
  },
  {
    category: 'Web',
    items: ['TypeScript', 'React', 'Next.js', 'TanStack', 'Astro', 'Tailwind CSS'],
  },
  {
    category: 'Mobile and desktop',
    items: ['Expo', 'React Native', 'Electron', 'Rust core with UniFFI'],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'GCP', 'Terraform', 'Vercel', 'GitHub Actions'],
  },
  {
    category: 'Hardware',
    items: ['PC builds', 'Overclocking', 'Latency tuning'],
  },
];

export const EDUCATION: readonly Education[] = [
  { title: 'Higher technical diploma in web application development (DAW)', period: '2024 to 2026' },
  { title: 'Anthropic: Claude Code in Action', period: '2026' },
  { title: 'Harvard CS50: Introduction to Computer Science', period: '2024' },
  { title: 'University of Helsinki: Java Programming MOOC', period: '2024' },
  { title: 'Degree in Pharmacy, UNED', period: '2016' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'email', label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
  { id: 'github', label: 'GitHub', href: CONTACT.github },
  { id: 'cv', label: 'CV', href: CONTACT.cvPage },
];

export const SHIP_LOG_LINES: readonly ShipLine[] = [
  { id: 'commissions', label: 'Commission payments app', detail: 'Internal tool, 2026' },
  { id: 'socialpro', label: 'socialpro.es', detail: '155 to 18,700 impressions a month' },
  { id: 'portal', label: 'Brand portal and CRM', detail: 'For SocialPro' },
  { id: 'cliphub', label: 'ClipHub', detail: '130+ releases, 100+ users' },
  { id: 'gravity-room', label: 'Gravity Room', detail: '18 programs, web and mobile' },
  { id: 'piroboom', label: 'Piroboom', detail: '82 MB PDF to a 16-page reader' },
];
