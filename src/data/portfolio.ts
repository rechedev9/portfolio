export type Language = {
  readonly name: string;
  readonly level: string;
};

export type Profile = {
  readonly name: string;
  readonly fullName: string;
  readonly title: string;
  readonly tagline: string;
  readonly summary: string;
  readonly location: string;
  readonly site: string;
  readonly languages: readonly Language[];
};

export type SkillGroup = {
  readonly category: string;
  readonly items: readonly string[];
};

export type Job = {
  readonly title: string;
  readonly company: string;
  readonly url: string;
  readonly period: string;
  readonly description: string;
  readonly highlights: readonly string[];
};

export type Project = {
  readonly name: string;
  readonly url?: string;
  readonly github?: string;
  readonly tech: readonly string[];
  readonly highlights: readonly string[];
};

export type ProjectCategory = {
  readonly title: string;
  readonly emoji: string;
  readonly items: readonly {
    readonly name: string;
    readonly href: string;
  }[];
};

export type Highlight = {
  readonly text: string;
  readonly link?: { readonly label: string; readonly href: string };
  readonly suffix?: string;
};

export type LiveProject = {
  readonly name: string;
  readonly description: string;
  readonly href: string;
  readonly initial: string;
  readonly icon: string;
};

export type Education = {
  readonly title: string;
  readonly period: string;
};

export type Contact = {
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
  readonly cv: string;
};

export type SocialLink = {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly download?: boolean;
};

export const PROFILE: Profile = {
  name: 'Luis Reche',
  fullName: 'Luis Lucas Reche',
  title: 'Applied AI Backend Engineer',
  tagline: 'building reliable LLM workflows and cloud systems in Go.',
  summary:
    'Applied AI backend engineer building reliable LLM workflows and cloud systems in Go. Production experience spans AI-assisted document processing, cloud data services, correctness-sensitive operations, and internal agent tooling on GCP. Designs bounded multi-agent delivery systems with explicit verification gates and persistent implementation memory.',
  location: 'Spain',
  site: 'luisreche.dev',
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'Catalan', level: 'Native' },
    { name: 'English', level: 'Advanced' },
  ],
};

export const ALWAYS = 'Shipping Go backends, agent systems, and local-first tooling 🚀';

export const HIGHLIGHTS: readonly Highlight[] = [
  {
    text: 'Building Go backend services and AI-assisted workflows at ',
    link: { label: 'Agentero', href: 'https://agentero.com' },
    suffix: ' — insurance marketplace, RPC APIs, document processing 🛡️',
  },
  {
    text: 'Running scheduled cloud data services on GCP with Terraform, streaming, and parallel execution under production load ☁️',
  },
  {
    text: 'Shipping ',
    link: { label: 'TickCut', href: 'https://tickcut.gravityroom.app/' },
    suffix: ' — local-first CS2 demo → highlight reels pipeline in Go 🎮',
  },
  {
    text: 'Designing high-assurance multi-agent delivery with ',
    link: { label: 'Shenron', href: 'https://github.com/rechedev9/shenron' },
    suffix: ' — dual adversarial review + durable memory 🐉',
  },
  {
    text: 'Running a fullstack strength product at ',
    link: { label: 'gravityroom.app', href: 'https://gravityroom.app' },
    suffix: ' (web + Expo) 💪',
  },
];

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  {
    title: 'Desktop / Creator',
    emoji: '🖥️',
    items: [
      { name: 'TickCut', href: 'https://tickcut.gravityroom.app/' },
    ],
  },
  {
    title: 'Apps',
    emoji: '📱',
    items: [
      { name: 'Gravity Room', href: 'https://gravityroom.app' },
    ],
  },
  {
    title: 'AI / Agents',
    emoji: '🤖',
    items: [
      { name: 'Shenron', href: 'https://github.com/rechedev9/shenron' },
      { name: 'Tealium MCP Server', href: 'https://github.com/rechedev9/tealium-mcp-server' },
    ],
  },
  {
    title: 'Infra / Go',
    emoji: '☁️',
    items: [
      { name: 'riskforge', href: 'https://github.com/rechedev9/riskforge' },
      { name: 'Honey Encryption Proxy', href: 'https://github.com/rechedev9/honey-encryption-proxy' },
    ],
  },
  {
    title: 'Templates',
    emoji: '📐',
    items: [
      { name: 'nextrespawn', href: 'https://github.com/rechedev9/nextrespawn' },
    ],
  },
  {
    title: 'Extensions',
    emoji: '🧩',
    items: [
      { name: 'Berrus Helper', href: 'https://github.com/rechedev9/berrus-helper' },
    ],
  },
];

export const LIVE_PROJECTS: readonly LiveProject[] = [
  {
    name: 'TickCut',
    description: 'Local-first CS2 demos → vertical highlight reels.',
    href: 'https://tickcut.gravityroom.app/',
    initial: 'T',
    icon: '/images/live/tickcut.svg',
  },
  {
    name: 'Gravity Room',
    description: 'GZCLP strength tracker — web + mobile.',
    href: 'https://gravityroom.app',
    initial: 'G',
    icon: '/images/live/gravity.svg',
  },
  {
    name: 'Shenron',
    description: 'Multi-agent delivery with dual adversarial review.',
    href: 'https://github.com/rechedev9/shenron',
    initial: 'S',
    icon: '/images/live/shenron.svg',
  },
];

export const SKILLS: readonly SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Go', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Backend & data',
    items: [
      'Connect RPC',
      'gRPC',
      'Protobuf',
      'REST',
      'Cloud Spanner',
      'PostgreSQL',
      'BigQuery',
      'ElysiaJS',
      'Drizzle ORM',
    ],
  },
  {
    category: 'Applied AI',
    items: [
      'LLM document extraction',
      'Agent orchestration',
      'MCP',
      'Tool design',
      'Structured outputs',
      'Human-in-the-loop safety',
    ],
  },
  {
    category: 'Cloud & infrastructure',
    items: [
      'GCP',
      'Cloud Run',
      'Pub/Sub',
      'GCS',
      'Terraform',
      'Docker',
      'GitHub Actions',
    ],
  },
  {
    category: 'Quality',
    items: [
      'Golden-master testing',
      'Playwright',
      'Adversarial review',
      'Agent-based QA',
      'Bun Test',
    ],
  },
  {
    category: 'Frontend & product',
    items: ['React', 'Expo', 'Next.js', 'Electron', 'TanStack', 'Tailwind CSS', 'Vite'],
  },
];

export const EXPERIENCE: readonly Job[] = [
  {
    title: 'Go Backend Engineer',
    company: 'Agentero',
    url: 'https://agentero.com',
    period: 'Apr 2026 — Present',
    description:
      'US insurance marketplace connecting independent agents with carriers. Build and operate Go backend services and AI-assisted workflows spanning RPC APIs, document processing, and data operations.',
    highlights: [
      'Deliver scheduled cloud data services on GCP with streaming and parallel execution under production workloads; infrastructure managed with Terraform',
      'Modernize correctness-sensitive operations with self-service tooling and golden-master tests that preserve output parity',
      'Build internal AI tooling with safeguards for data freshness, naming variation, and schema changes',
    ],
  },
  {
    title: 'Full-Stack Developer (Freelance)',
    company: 'berrus.app',
    url: 'https://berrus.app',
    period: 'Sep 2025 — Present',
    description:
      'Marketplace integrations for a post-apocalyptic RPG. Discord webhooks, SQL optimization, and a Windows desktop client with Electron.',
    highlights: [
      'Built a Discord webhook notification service and contributed through pull-request review',
      'Optimized SQL query paths and connection pooling',
      'Building a Windows desktop client with Electron',
    ],
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: 'TickCut',
    url: 'https://tickcut.gravityroom.app/',
    github: 'https://github.com/rechedev9/tickcut',
    tech: ['Go', 'Electron', 'Next.js', 'FFmpeg', 'HLAE', 'Lua'],
    highlights: [
      'Local-first Go pipeline: CS2 demos → deterministic kill plans → HLAE/CS2 capture → FFmpeg/Lua vertical reels',
      'CLI + Electron/Next.js Studio with recovery-aware capture, human approval/QA gates, versioned Windows installers + SHA-256',
    ],
  },
  {
    name: 'Gravity Room',
    url: 'https://gravityroom.app',
    github: 'https://github.com/rechedev9/gravity-room',
    tech: [
      'TypeScript',
      'Bun',
      'ElysiaJS',
      'PostgreSQL',
      'React',
      'Expo',
      'TanStack',
    ],
    highlights: [
      'GZCLP linear-progression tracker: monorepo with API, React web, Expo mobile, shared packages',
      'Free, self-hosted product used by real people',
    ],
  },
  {
    name: 'Shenron',
    github: 'https://github.com/rechedev9/shenron',
    tech: ['Python', 'Claude Code', 'Codex', 'Multi-agent'],
    highlights: [
      'High-assurance multi-agent delivery: isolated worktrees, dual adversarial review, durable implementation memory',
      '12-agent QA skill pack with bounded correction loops',
    ],
  },
  {
    name: 'riskforge',
    github: 'https://github.com/rechedev9/riskforge',
    tech: ['Go', 'Terraform', 'GCP', 'Cloud Run', 'Spanner', 'Pub/Sub'],
    highlights: [
      'Multi-carrier insurance quote gateway with appetite pre-filter, parallel fan-out, and OWASP-hardened security',
    ],
  },
  {
    name: 'Tealium MCP Server',
    github: 'https://github.com/rechedev9/tealium-mcp-server',
    tech: ['TypeScript', 'MCP'],
    highlights: [
      '5 tools (validation, debugging, docs, codegen, parsing) + 6 resources with Zod schemas',
    ],
  },
  {
    name: 'Honey Encryption Proxy',
    github: 'https://github.com/rechedev9/honey-encryption-proxy',
    tech: ['TypeScript', 'Bun'],
    highlights: [
      'Local proxy applying Format-Preserving and Honey Encryption before identifiers reach LLM APIs',
    ],
  },
  {
    name: 'Berrus Helper',
    github: 'https://github.com/rechedev9/berrus-helper',
    tech: ['TypeScript', 'Bun', 'Chrome Extension (Manifest V3)'],
    highlights: [
      'Chrome extension: idle timers, price tracking, hiscores — 133 tests with Bun Test + HappyDOM',
    ],
  },
  {
    name: 'nextrespawn',
    github: 'https://github.com/rechedev9/nextrespawn',
    tech: ['Next.js 16', 'TypeScript', 'Prisma', 'Stripe', 'Auth.js'],
    highlights: [
      'Clone-ready SaaS boilerplate: auth, payments, email, blog',
    ],
  },
];

export const EDUCATION: readonly Education[] = [
  {
    title: 'Higher Technical Diploma in Web Application Development (DAW)',
    period: 'Completed 2025',
  },
  {
    title: 'Harvard CS50 — Introduction to Computer Science',
    period: '2024',
  },
  {
    title: 'University of Helsinki — Java Programming MOOC',
    period: '2024',
  },
  {
    title: 'Claude Code in Action — Anthropic',
    period: '2026',
  },
];

export const CONTACT: Contact = {
  email: 'rechedev@hotmail.com',
  github: 'github.com/rechedev9',
  linkedin: 'linkedin.com/in/luisrecheamado',
  cv: '/luis-reche-cv.pdf',
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: `https://${CONTACT.github}`,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: `https://${CONTACT.linkedin}`,
  },
  {
    id: 'email',
    label: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
  },
  {
    id: 'cv',
    label: 'Download CV',
    href: CONTACT.cv,
    download: true,
  },
];

export const FOOTER_LINKS = [
  { label: 'Matrix', href: '/matrix' },
  { label: 'CS 1.6', href: '/cs' },
  { label: 'Pokemon', href: '/pokemon' },
] as const;

export const ASCII_NAME = [
  '╦  ╦ ╦╦╔═╗  ╦═╗╔═╗╔═╗╦ ╦╔═╗',
  '║  ║ ║║╚═╗  ╠╦╝║╣ ║  ╠═╣║╣ ',
  '╩═╝╚═╝╩╚═╝  ╩╚═╚═╝╚═╝╩ ╩╚═╝',
].join('\n');

export const COMMANDS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'] as const;

export const ALL_COMMANDS = [...COMMANDS, 'help', 'clear', 'whoami', 'matrix'] as const;
