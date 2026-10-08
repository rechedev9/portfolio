export type Profile = {
  readonly name: string;
  readonly fullName: string;
  readonly title: string;
  readonly location: string;
  readonly intro: string;
  readonly site: string;
};

export type Job = {
  readonly role: string;
  readonly org: string;
  readonly href?: string;
  readonly period: string;
  readonly points: readonly string[];
};

/** Pixel-art sprite drawn in the margin next to each piece of work. */
export type WorkArt = 'clapper' | 'lifter' | 'firework';

export type Work = {
  readonly name: string;
  readonly art: WorkArt;
  readonly description: string;
  readonly href: string;
  readonly domain: string;
};

export type Education = {
  readonly title: string;
  readonly period: string;
};

export type ContactLink = {
  readonly id: 'github' | 'linkedin' | 'email' | 'cv';
  readonly label: string;
  readonly href: string;
  readonly download?: string;
};

export const PROFILE: Profile = {
  name: 'Luis Reche',
  fullName: 'Luis Lucas Reche',
  title: 'Applied AI Engineer',
  location: 'Palma, Spain',
  intro:
    'I turn LLMs and coding agents into software people use, and build the guardrails that keep them honest. Go and TypeScript, from the service to the interface.',
  site: 'luisreche.dev',
};

export const CONTACT = {
  email: 'rechedev@hotmail.com',
  github: 'https://github.com/rechedev9',
  linkedin: 'https://www.linkedin.com/in/luisrecheamado',
  cv: '/Luis-Reche-Applied-AI-Engineer-CV.pdf',
  cvFileName: 'Luis-Reche-Applied-AI-Engineer-CV.pdf',
} as const;

export const EXPERIENCE: readonly Job[] = [
  {
    role: 'Applied AI Engineer',
    org: 'Agentero',
    href: 'https://www.agentero.com',
    period: 'Apr 2026 – Present',
    points: [
      'Google Cloud infrastructure, Go backend services, and the Next.js marketplace.',
      'End-to-end ownership of marketplace features and critical internal tooling.',
    ],
  },
  {
    role: 'Freelance product engineer',
    org: 'RecheDev',
    period: '2025 – Present',
    points: [
      'ClipHub for SocialPro, as their software consultant. 100+ users.',
      'Berrus (2025 – present): Discord notifications, faster SQL, and an Electron desktop client.',
      'Piroboom: a Next.js storefront for a fireworks shop in Elche.',
    ],
  },
];

export const SELECTED_WORK: readonly Work[] = [
  {
    name: 'ClipHub',
    art: 'clapper',
    description: 'A Windows app that turns a CS2 demo into an edited video of the best plays.',
    href: 'https://cliphub.gravityroom.app/',
    domain: 'cliphub.gravityroom.app',
  },
  {
    name: 'Gravity Room',
    art: 'lifter',
    description: 'A strength tracker with automatic progression, on the web and on mobile.',
    href: 'https://gravityroom.app',
    domain: 'gravityroom.app',
  },
  {
    name: 'Piroboom',
    art: 'firework',
    description: 'A storefront for a fireworks shop in Elche: catalogue, product and event enquiries.',
    href: 'https://pirotecniaelche.es',
    domain: 'pirotecniaelche.es',
  },
];

export const EDUCATION: readonly Education[] = [
  { title: 'Higher technical diploma in web application development (DAW)', period: '2024 – 2026' },
  { title: 'Harvard CS50, Introduction to Computer Science', period: '2024' },
  { title: 'University of Helsinki, Java Programming MOOC', period: '2024' },
  { title: 'Anthropic, Claude Code in Action', period: '2026' },
];

export const CONTACT_LINKS: readonly ContactLink[] = [
  { id: 'email', label: 'Email', href: `mailto:${CONTACT.email}` },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.linkedin },
  { id: 'github', label: 'GitHub', href: CONTACT.github },
  { id: 'cv', label: 'Curriculum vitae', href: CONTACT.cv, download: CONTACT.cvFileName },
];
