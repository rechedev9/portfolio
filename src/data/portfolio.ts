export type Link = {
  readonly label: string;
  readonly href: string;
};

type TextSegment = {
  readonly text: string;
  readonly strong?: boolean;
};

export type Profile = {
  readonly name: string;
  readonly fullName: string;
  readonly title: string;
  readonly headline: string;
  readonly subhead: readonly TextSegment[];
  readonly location: string;
  readonly site: string;
  readonly languages: readonly string[];
};

type Screenshot = {
  readonly src: string;
  readonly alt: string;
};

export type Project = {
  readonly name: string;
  readonly kind: string;
  readonly client?: Link;
  readonly pitch: string;
  readonly links: readonly Link[];
  readonly image?: Screenshot;
};

export type Job = {
  readonly title: string;
  readonly company: string;
  readonly url?: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
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
  readonly download?: string;
};

export const PROFILE: Profile = {
  name: 'Luis Reche',
  fullName: 'Luis Lucas Reche',
  title: 'Applied AI Engineer',
  headline: 'I turn LLMs and coding agents into software people use.',
  subhead: [
    { text: 'I use AI to ' },
    { text: 'accelerate the work', strong: true },
    { text: ' and keep a ' },
    { text: 'human in the loop', strong: true },
    { text: '. I ship the product, from the service to the interface, and the guardrails that keep the agents honest.' },
  ],
  location: 'Palma, Spain',
  site: 'luisreche.dev',
  languages: ['Spanish (native)', 'Catalan (native)', 'English (advanced)'],
};

export const CONTACT = {
  email: 'rechedev@hotmail.com',
  github: 'https://github.com/rechedev9',
  linkedin: 'https://www.linkedin.com/in/luisrecheamado',
  cv: '/Luis-Reche-Applied-AI-Engineer-CV.pdf',
  cvFileName: 'Luis-Reche-Applied-AI-Engineer-CV.pdf',
} as const;

export const PROJECTS: readonly Project[] = [
  {
    name: 'ClipHub',
    kind: '100+ users · 130 releases',
    client: { label: 'SocialPro', href: 'https://socialpro.es' },
    pitch:
      'Send a CS2 demo, get an edited video of the best plays. A Windows desktop app I built for SocialPro as their software consultant.',
    links: [
      { label: 'Live site', href: 'https://cliphub.gravityroom.app/' },
      { label: 'Releases', href: 'https://github.com/rechedev9/cliphub/releases' },
      { label: 'Source', href: 'https://github.com/rechedev9/cliphub' },
    ],
    image: { src: '/shots/cliphub.webp', alt: 'ClipHub home page with a sample video rendered from a CS2 demo' },
  },
  {
    name: 'SocialPro',
    kind: 'Client · gaming and esports agency',
    pitch:
      'The website of a gaming and esports creator agency: creator roster, services, case studies and blog. I designed and built it, along with a brand portal and the first internal CRM, on Next.js and PostgreSQL.',
    links: [{ label: 'Live site', href: 'https://socialpro.es' }],
    image: { src: '/shots/socialpro.webp', alt: 'SocialPro home page: a hero that reads Conectamos creadores con marcas' },
  },
  {
    name: 'Piroboom',
    kind: 'Client · fireworks shop in Elche',
    pitch:
      'The website of a fireworks shop in Elche, live in production. An 82 MB PDF catalogue became a searchable web reader, with enquiry forms for products and events. I designed and built it from the first sketch to launch.',
    links: [
      { label: 'Live site', href: 'https://pirotecniaelche.es' },
      { label: 'Source', href: 'https://github.com/rechedev9/piroelche' },
    ],
    image: { src: '/shots/piroboom.webp', alt: 'Piroboom home page: fireworks shop hero with catalogue and event buttons' },
  },
  {
    name: 'Gravity Room',
    kind: 'Own product · web and mobile',
    pitch:
      'A live strength tracker with automatic progression. React and TanStack on the web, Expo on mobile, Elysia and Postgres behind them.',
    links: [
      { label: 'Live site', href: 'https://gravityroom.app' },
      { label: 'Source', href: 'https://github.com/rechedev9/gravity-room' },
    ],
    image: { src: '/shots/gravity-room.webp', alt: 'Gravity Room home page: strength plan hero with a free plan button' },
  },
  {
    name: 'Honey Encryption Proxy',
    kind: 'LLM privacy',
    pitch:
      'A local proxy in front of Claude Code. It swaps proprietary names for format-preserving stand-ins before the request leaves the machine, then restores them in the stream.',
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/honey-encryption-proxy' }],
  },
  {
    name: 'riskforge',
    kind: 'Portfolio · insurance systems',
    pitch:
      'A quote gateway I built to study the domain: parallel carrier calls in Go, and Terraform for Cloud Run, Spanner and Pub/Sub. A portfolio project, not a production system.',
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/riskforge' }],
  },
];

export const EXPERIENCE: readonly Job[] = [
  {
    title: 'Applied AI Engineer',
    company: 'Agentero',
    url: 'https://www.agentero.com',
    period: 'Apr 2026 to present',
    description:
      'US network that gives independent insurance agents carrier access and the software to run an agency. I work from Spain.',
    highlights: [
      'Infrastructure on Google Cloud, backend services in Go, and the marketplace interface in Next.js.',
      'End-to-end ownership of marketplace features and critical internal tooling.',
    ],
  },
  {
    title: 'Freelance software engineer',
    company: 'SocialPro',
    url: 'https://socialpro.es',
    period: '2025 to present',
    description:
      'Gaming and esports creator agency. I work with them as a freelancer, on their website and for their clients.',
    highlights: [
      'socialpro.es: I designed and built the agency website, a brand portal and the first internal CRM.',
      'Piroboom: the website of a fireworks shop in Elche, from the first sketch to production.',
    ],
  },
  {
    title: 'Freelance product engineer',
    company: 'RecheDev',
    url: 'https://rechedev.cloud',
    period: '2021 to present',
    description:
      'Freelance since 2021. I started with PC optimisation for competitive gaming, and now I design and build the product, from the first meeting to production.',
    highlights: [
      'ClipHub for SocialPro, as their software consultant: a CS2 demo-to-video app with 100+ users.',
      'Berrus, a browser role-playing game: Discord notifications, faster SQL, and an Electron desktop client.',
    ],
  },
];

export const SKILLS: readonly SkillGroup[] = [
  {
    category: 'AI and agents',
    items: ['Claude Code', 'Codex', 'MCP servers', 'Skills and plugins', 'Multi-agent workflows', 'Human approval gates'],
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
];

export const EDUCATION: readonly Education[] = [
  { title: 'Higher technical diploma in web application development (DAW)', period: '2024 to 2026' },
  { title: 'Harvard CS50: Introduction to Computer Science', period: '2024' },
  { title: 'University of Helsinki: Java Programming MOOC', period: '2024' },
  { title: 'Anthropic: Claude Code in Action', period: '2026' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'email', label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
  { id: 'github', label: 'GitHub', href: CONTACT.github },
  { id: 'cv', label: 'Download CV', href: CONTACT.cv, download: CONTACT.cvFileName },
];
