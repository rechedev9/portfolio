export type Profile = {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly site: string;
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
  readonly icon: string;
};

export type SocialLink = {
  readonly id: 'github' | 'linkedin' | 'email' | 'cv';
  readonly label: string;
  readonly href: string;
  readonly download?: string;
};

export const PROFILE: Profile = {
  name: 'Luis Reche',
  title: 'Applied AI Engineer',
  tagline: 'turning LLMs and coding agents into software people use.',
  site: 'luisreche.dev',
};

export const CONTACT = {
  email: 'rechedev@hotmail.com',
  github: 'https://github.com/rechedev9',
  linkedin: 'https://www.linkedin.com/in/luisrecheamado',
  cv: '/Luis-Reche-Applied-AI-Engineer-CV.pdf',
  cvFileName: 'Luis-Reche-Applied-AI-Engineer-CV.pdf',
} as const;

export const ALWAYS = 'Shipping products with LLMs and coding agents, and the guardrails that keep them honest 🚀';

export const HIGHLIGHTS: readonly Highlight[] = [
  {
    text: 'Applied AI Engineer at ',
    link: { label: 'Agentero', href: 'https://www.agentero.com' },
    suffix: ' — Google Cloud infrastructure, Go backend services, and the Next.js marketplace 🛡️',
  },
  {
    text: 'Built ',
    link: { label: 'ClipHub', href: 'https://cliphub.gravityroom.app/' },
    suffix: ' for SocialPro as their software consultant — CS2 demo → edited video, 100+ users 🎮',
  },
  {
    text: 'Shipping ',
    link: { label: 'agent-git-toolkit', href: 'https://github.com/luis-reche-ag/agent-git-toolkit' },
    suffix: ' — a coding agent cannot commit or push until the checks pass 🤖',
  },
  {
    text: 'Freelancing for ',
    link: { label: 'Berrus', href: 'https://berrus.app' },
    suffix: ' (2025 — present) — Discord notifications, faster SQL, and an Electron desktop client ⚔️',
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
    items: [{ name: 'ClipHub', href: 'https://cliphub.gravityroom.app/' }],
  },
  {
    title: 'Apps',
    emoji: '📱',
    items: [
      { name: 'Gravity Room', href: 'https://gravityroom.app' },
      { name: 'Piroboom', href: 'https://pirotecniaelche.es' },
    ],
  },
  {
    title: 'AI / Agents',
    emoji: '🤖',
    items: [
      { name: 'agent-git-toolkit', href: 'https://github.com/luis-reche-ag/agent-git-toolkit' },
      { name: 'Honey Encryption Proxy', href: 'https://github.com/rechedev9/honey-encryption-proxy' },
    ],
  },
  {
    title: 'Infra / Go',
    emoji: '☁️',
    items: [{ name: 'riskforge', href: 'https://github.com/rechedev9/riskforge' }],
  },
];

export const LIVE_PROJECTS: readonly LiveProject[] = [
  {
    name: 'ClipHub',
    description: 'CS2 demo → edited video. 100+ users.',
    href: 'https://cliphub.gravityroom.app/',
    icon: '/images/live/cliphub.svg',
  },
  {
    name: 'Gravity Room',
    description: 'Strength tracker with automatic progression — web + mobile.',
    href: 'https://gravityroom.app',
    icon: '/images/live/gravity.svg',
  },
  {
    name: 'Piroboom',
    description: 'Next.js storefront for a fireworks shop in Elche.',
    href: 'https://pirotecniaelche.es',
    icon: '/images/live/piroboom.svg',
  },
];

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'github', label: 'GitHub', href: CONTACT.github },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
  { id: 'email', label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  { id: 'cv', label: 'Download CV', href: CONTACT.cv, download: CONTACT.cvFileName },
];

export const FOOTER_LINKS: readonly { readonly label: string; readonly href: string }[] = [
  { label: 'GitHub', href: CONTACT.github },
  { label: 'LinkedIn', href: CONTACT.linkedin },
  { label: 'CV', href: CONTACT.cv },
];
