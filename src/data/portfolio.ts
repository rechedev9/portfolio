export type Language = {
  readonly name: string;
  readonly level: string;
};

export type Profile = {
  readonly name: string;
  readonly title: string;
  readonly summary: string;
  readonly location: string;
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

export type Education = {
  readonly title: string;
  readonly period: string;
};

export type Contact = {
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
};

export const PROFILE: Profile = {
  name: 'Luis Lucas Reche',
  title: 'Fullstack Software Developer',
  summary:
    'Fullstack Developer with experience in TypeScript, React, and Node.js. Focused on code quality, testing, and continuous delivery. Trained in Agile methodology.',
  location: 'Spain',
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'Catalan', level: 'Native' },
    { name: 'English', level: 'B2 — Upper Intermediate' },
  ],
};

export const SKILLS: readonly SkillGroup[] = [
  {
    category: 'Languages & Frameworks',
    items: ['HTML', 'CSS', 'TypeScript', 'JavaScript', 'React', 'TanStack Query', 'Node.js', 'Bun', 'Express'],
  },
  {
    category: 'Backend & APIs',
    items: ['REST', 'ElysiaJS', 'Drizzle ORM', 'Zod', 'Discord Webhooks', 'MCP'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL', 'MariaDB', 'MongoDB'],
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Git', 'GitHub Actions (CI/CD)', 'Nginx', 'Playwright', 'ESLint', 'Prettier'],
  },
  {
    category: 'Testing',
    items: ['Bun Test', 'HappyDOM', 'Playwright (E2E)', 'Jest'],
  },
  {
    category: 'Other',
    items: ['Chrome Extensions (Manifest V3)', 'Tailwind CSS', 'Vite', 'Agile'],
  },
];

export const EXPERIENCE: readonly Job[] = [
  {
    title: 'Fullstack Developer Freelance',
    company: 'berrus.app',
    url: 'https://berrus.app',
    period: 'Sep 2025 — Present',
    description:
      'Integration of the game marketplace with Discord for a post-apocalyptic RPG in beta (Steam Q1:2027). Collaboration through PRs and code review.',
    highlights: [
      'Webhook notification system with 99.2% delivery rate and <80ms latency',
      'Optimized SQL queries: 53% faster response time (145ms → 68ms)',
      'Event pipeline handling 500+ marketplace notifications/hour',
      'Chrome extension for improved game UX',
      '35% database load reduction via connection pooling',
    ],
  },
];

export const PROJECTS: readonly Project[] = [
  {
    name: 'Gravity Room',
    url: 'https://gravityroom.app',
    github: 'https://github.com/rechedev9/gravity-room',
    tech: ['React 19', 'Vite', 'ElysiaJS', 'Drizzle ORM', 'PostgreSQL', 'Zod', 'TanStack Query', 'Bun'],
    highlights: [
      'Fullstack fitness app used by real people',
      'Self-hosted on my own server, built from scratch',
    ],
  },
  {
    name: 'Berrus Helper',
    github: 'https://github.com/rechedev9/berrus-helper',
    tech: ['TypeScript', 'Bun', 'Chrome Extension (Manifest V3)', 'HappyDOM'],
    highlights: [
      'Chrome extension: idle timers, price tracking with sparklines, hiscores',
      '133 tests (integration + unit) with Bun Test and HappyDOM',
      'Service worker for message routing, alarms, and session management',
    ],
  },
  {
    name: 'Tealium MCP Server',
    github: 'https://github.com/rechedev9/tealium-mcp-server',
    tech: ['TypeScript', 'Model Context Protocol (MCP)'],
    highlights: [
      '5 tools (validation, debugging, docs, codegen, parsing) + 6 resources',
      'Zod schemas for e-commerce and hospitality sectors',
    ],
  },
  {
    name: 'SDD Workflow',
    github: 'https://github.com/rechedev9/sdd-workflow',
    tech: ['TypeScript', 'Claude Code'],
    highlights: [
      'Spec-Driven Development for Claude Code — structured AI coding pipeline',
    ],
  },
  {
    name: 'Honey Encryption Proxy',
    github: 'https://github.com/rechedev9/honey-encryption-proxy',
    tech: ['TypeScript', 'Bun'],
    highlights: [
      'Local proxy applying Format-Preserving and Honey Encryption to obfuscate source identifiers',
    ],
  },
];

export const EDUCATION: readonly Education[] = [
  { title: 'Advanced Diploma in Web App Development (DAW)', period: '2024 — 2026' },
  { title: 'Harvard CS50 — Intro to Computer Science', period: '2024' },
  { title: 'Claude Code in Action — Anthropic', period: '2026' },
];

export const CONTACT: Contact = {
  email: 'rechedev@hotmail.com',
  github: 'github.com/rechedev9',
  linkedin: 'linkedin.com/in/luisrecheamado',
};

export const ASCII_NAME = [
  '╦  ╦ ╦╦╔═╗  ╦═╗╔═╗╔═╗╦ ╦╔═╗',
  '║  ║ ║║╚═╗  ╠╦╝║╣ ║  ╠═╣║╣ ',
  '╩═╝╚═╝╩╚═╝  ╩╚═╚═╝╚═╝╩ ╩╚═╝',
].join('\n');

export const COMMANDS = ['about', 'skills', 'experience', 'projects', 'education', 'contact'] as const;

export const ALL_COMMANDS = [...COMMANDS, 'help', 'clear', 'whoami', 'matrix'] as const;
