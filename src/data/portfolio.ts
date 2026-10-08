export type Link = {
  readonly label: string;
  readonly href: string;
};

export type Profile = {
  readonly name: string;
  readonly fullName: string;
  readonly title: string;
  readonly headline: string;
  readonly subhead: string;
  readonly location: string;
  readonly site: string;
  readonly languages: readonly string[];
};

export type Flagship = {
  readonly name: string;
  readonly client: string;
  readonly clientRole: string;
  readonly clientUrl: string;
  readonly metric: string;
  readonly pitch: string;
  readonly points: readonly string[];
  readonly tech: readonly string[];
  readonly links: readonly Link[];
};

export type Project = {
  readonly name: string;
  readonly kind: string;
  readonly pitch: string;
  readonly tech: readonly string[];
  readonly links: readonly Link[];
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
  subhead:
    'Go and TypeScript, from the service to the interface. I ship the product, and the guardrails that keep the agents honest.',
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

export const PROOF_POINTS: readonly string[] = [
  'Products with users',
  'Agent guardrails',
  'Go · TypeScript',
  'Interface included',
];

export const PIPELINE: readonly { readonly label: string; readonly text: string }[] = [
  { label: 'In', text: 'A CS2 demo' },
  { label: 'Plan', text: 'Pick the plays worth keeping' },
  { label: 'Make', text: 'Capture, edit, package' },
  { label: 'Out', text: 'An edited video. 100+ users.' },
];

export const FLAGSHIP: Flagship = {
  name: 'ClipHub',
  client: 'SocialPro',
  clientRole: 'software consultant',
  clientUrl: 'https://socialpro.es',
  metric: '100+ users',
  pitch:
    'Send a CS2 demo, get an edited video of the best plays. A Windows desktop app I built for SocialPro as their software consultant.',
  points: [
    'Go services for the pipeline, a Next.js studio, and an Electron shell that ships the Windows app.',
    '130 versioned releases. The latest public release is ClipHub Studio 5.4.4.',
    'Built for SocialPro as their software consultant. 100+ people use it.',
  ],
  tech: ['Go', 'TypeScript', 'Next.js', 'Electron', 'FFmpeg'],
  links: [
    { label: 'Live site', href: 'https://cliphub.gravityroom.app/' },
    { label: 'Source', href: 'https://github.com/rechedev9/cliphub' },
  ],
};

export const PROJECTS: readonly Project[] = [
  {
    name: 'agent-git-toolkit',
    kind: 'Agent guardrails',
    pitch:
      'A git shim, a commit checker and a comment linter so a coding agent cannot stage, commit or push unless the checks pass. Scope rules started from Agentero’s monorepo.',
    tech: ['TypeScript', 'Bun'],
    links: [{ label: 'Source', href: 'https://github.com/luis-reche-ag/agent-git-toolkit' }],
  },
  {
    name: 'Honey Encryption Proxy',
    kind: 'LLM privacy',
    pitch:
      'A local proxy in front of Claude Code. It swaps proprietary names for format-preserving stand-ins before the request leaves the machine, then restores them in the stream.',
    tech: ['TypeScript', 'Bun'],
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/honey-encryption-proxy' }],
  },
  {
    name: 'Gravity Room',
    kind: 'Product · web and mobile',
    pitch:
      'A live strength tracker with automatic progression. React and TanStack on the web, Expo on mobile, Elysia and Postgres behind them.',
    tech: ['React', 'TanStack', 'Expo', 'Elysia', 'PostgreSQL'],
    links: [
      { label: 'Live site', href: 'https://gravityroom.app' },
      { label: 'Source', href: 'https://github.com/rechedev9/gravity-room' },
    ],
  },
  {
    name: 'riskforge',
    kind: 'Portfolio · insurance systems',
    pitch:
      'A quote gateway I built to study the domain: parallel carrier calls in Go, and Terraform for Cloud Run, Spanner and Pub/Sub. A portfolio project, not a production system.',
    tech: ['Go', 'Terraform', 'GCP'],
    links: [{ label: 'Source', href: 'https://github.com/rechedev9/riskforge' }],
  },
  {
    name: 'Piroboom',
    kind: 'Client product',
    pitch:
      'A Next.js storefront for a fireworks shop in Elche: catalogue, product and event enquiries, built to work on a phone.',
    tech: ['Next.js', 'TypeScript', 'Playwright'],
    links: [
      { label: 'Live site', href: 'https://pirotecniaelche.es' },
      { label: 'Source', href: 'https://github.com/rechedev9/piroelche' },
    ],
  },
];

export const EXPERIENCE: readonly Job[] = [
  {
    title: 'Applied AI Engineer',
    company: 'Agentero',
    url: 'https://www.agentero.com',
    period: 'Apr 2026 — Present',
    description:
      'US network that gives independent insurance agents carrier access and the software to run an agency. I work from Spain.',
    highlights: [
      'Infrastructure on Google Cloud, backend services in Go, and the marketplace interface in Next.js.',
      'End-to-end ownership of marketplace features and critical internal tooling.',
      'One of those tools is public: a coding agent cannot commit or push until the checks pass. The rules started from Agentero’s codebase.',
    ],
  },
  {
    title: 'Freelance product engineer',
    company: 'RecheDev',
    url: 'https://rechedev.cloud',
    period: '2025 — Present',
    description: 'I design and build the product, from the first meeting to production.',
    highlights: [
      'ClipHub for SocialPro, as their software consultant: a CS2 demo-to-video app with 100+ users.',
      'Berrus (2025 — present): Discord notifications, faster SQL, and an Electron desktop client.',
      'Piroboom: a Next.js storefront for a shop in Elche.',
    ],
  },
];

export const SKILLS: readonly SkillGroup[] = [
  {
    category: 'Applied AI',
    items: ['Claude Code', 'Codex', 'MCP', 'Tool and skill design', 'Human approval gates'],
  },
  {
    category: 'Backend and cloud',
    items: ['Go', 'PostgreSQL', 'GCP', 'Terraform', 'Docker'],
  },
  {
    category: 'Product interface',
    items: ['TypeScript', 'React', 'Next.js', 'TanStack', 'Expo', 'Electron', 'Tailwind CSS'],
  },
  {
    category: 'Quality',
    items: ['Adversarial review', 'Playwright', 'GitHub Actions'],
  },
];

export const EDUCATION: readonly Education[] = [
  { title: 'Higher technical diploma in web application development (DAW)', period: '2024 — 2026' },
  { title: 'Harvard CS50 — Introduction to Computer Science', period: '2024' },
  { title: 'University of Helsinki — Java Programming MOOC', period: '2024' },
  { title: 'Anthropic — Claude Code in Action', period: '2026' },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'email', label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
  { id: 'github', label: 'GitHub', href: CONTACT.github },
  { id: 'cv', label: 'Download CV', href: CONTACT.cv, download: CONTACT.cvFileName },
];
