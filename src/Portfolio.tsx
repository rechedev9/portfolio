import { useCallback, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import {
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  FLAGSHIP,
  PIPELINE,
  PROFILE,
  PROJECTS,
  PROOF_POINTS,
  SKILLS,
  SOCIAL_LINKS,
} from './data/portfolio';
import type { Link as ProjectLink } from './data/portfolio';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './components/Hero';
import { ArrowUpRightIcon, CommandIcon, MoonIcon, SunIcon } from './components/icons';
import { socialIconFor } from './components/SocialIcons';

const FOCUS =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const NAV = [
  { href: '#flagship', label: 'ClipHub' },
  { href: '#projects', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const;

function Section({
  id,
  label,
  title,
  children,
}: {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <section id={id} aria-labelledby={`heading-${id}`} className="reveal-on-scroll scroll-mt-24 pt-20 sm:pt-28">
      <p className="mb-3 font-mono text-xs tracking-[0.16em] text-neutral-ink uppercase">{label}</p>
      <h2 id={`heading-${id}`} className="mb-8 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Tags({ items }: { readonly items: readonly string[] }): ReactElement {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[0.72rem] text-neutral-ink">
          {item}
        </li>
      ))}
    </ul>
  );
}

function ExternalLinks({ links, project }: { readonly links: readonly ProjectLink[]; readonly project: string }): ReactElement {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project}: ${link.label} (opens in a new tab)`}
          className={`group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent ${FOCUS}`}
        >
          {link.label}
          <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

function NavIconButton({
  label,
  onClick,
  children,
}: {
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`grid size-11 cursor-pointer place-items-center rounded-md border border-transparent hover:border-border ${FOCUS}`}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function useScrollReveal(): void {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    nodes.forEach((node) => io.observe(node));
    return (): void => io.disconnect();
  }, []);
}

export function Portfolio(): ReactElement {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const year = new Date().getFullYear();
  useScrollReveal();

  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.title}`;
    document.body.classList.add('clean-body');

    const syncDark = (): void => {
      const isDark = document.documentElement.classList.contains('dark');
      setDark(isDark);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0a0a0a' : '#ffffff');
    };
    syncDark();
    window.addEventListener('theme-change', syncDark);
    return (): void => {
      document.body.classList.remove('clean-body');
      window.removeEventListener('theme-change', syncDark);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent): void => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = previous;
    };
  }, [paletteOpen]);

  const toggleDark = useCallback((): void => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next ? '#0a0a0a' : '#ffffff');
    setDark(next);
    window.dispatchEvent(new Event('theme-change'));
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-accent"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8" aria-label="Primary">
          <a href="#hero" className={`flex items-center gap-2.5 rounded-sm ${FOCUS}`}>
            <span aria-hidden="true" className="block size-6 rounded-[5px] bg-linear-to-br from-primary to-accent" />
            <span className="text-sm font-semibold tracking-tight">{PROFILE.name}</span>
          </a>
          <div className="flex items-center gap-1">
            <ul className="mr-1 hidden items-center gap-5 text-sm text-neutral-ink md:flex">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`rounded-sm hover:text-foreground ${FOCUS}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <NavIconButton label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleDark}>
              {dark ? <SunIcon /> : <MoonIcon />}
            </NavIconButton>
            <NavIconButton label="Open command palette" onClick={() => setPaletteOpen(true)}>
              <CommandIcon className="size-5" />
            </NavIconButton>
          </div>
        </nav>
      </header>

      <main id="main">
        <Hero
          name={PROFILE.name}
          role={PROFILE.title}
          headline={PROFILE.headline}
          subhead={PROFILE.subhead}
          status={{ label: 'Currently at Agentero', href: 'https://www.agentero.com' }}
          location={PROFILE.location}
          proofPoints={PROOF_POINTS}
          pipelineTitle={FLAGSHIP.name}
          pipeline={PIPELINE}
          flagship={{
            kicker: 'Flagship',
            name: FLAGSHIP.name,
            detail: `Built for ${FLAGSHIP.client} · ${FLAGSHIP.metric}`,
            href: '#flagship',
          }}
          ctas={{
            projects: { label: 'See the work', href: '#flagship' },
            cv: { label: 'Download CV', href: CONTACT.cv, download: CONTACT.cvFileName },
            contact: { label: 'Email me', href: `mailto:${CONTACT.email}` },
          }}
        />

        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <Section id="flagship" label="Flagship" title="ClipHub turns a match demo into an edited video.">
            <article className="relative overflow-hidden rounded-2xl border border-border bg-neutral-50/70 p-6 sm:p-10 dark:bg-neutral-900/40">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-linear-to-br from-primary/40 to-accent/30 blur-3xl"
              />
              <div className="relative">
                <dl className="mb-6 flex flex-wrap gap-2 text-sm">
                  <div className="flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3">
                    <dt className="text-neutral-ink">Built for</dt>
                    <dd>
                      <a
                        href={FLAGSHIP.clientUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium text-accent-ink underline decoration-accent/40 underline-offset-4 ${FOCUS}`}
                      >
                        {FLAGSHIP.client}
                      </a>
                    </dd>
                  </div>
                  <div className="flex min-h-9 items-center rounded-full border border-accent/40 bg-background px-3">
                    <dt className="sr-only">Traction</dt>
                    <dd className="font-semibold text-accent-ink">{FLAGSHIP.metric}</dd>
                  </div>
                </dl>
                <p className="max-w-2xl text-lg leading-relaxed text-pretty text-neutral-ink sm:text-xl">{FLAGSHIP.pitch}</p>
                <ul className="mt-8 grid gap-5 sm:grid-cols-3">
                  {FLAGSHIP.points.map((point) => (
                    <li key={point} className="border-t border-border pt-4 text-sm leading-relaxed text-neutral-ink">
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Tags items={FLAGSHIP.tech} />
                  <ExternalLinks links={FLAGSHIP.links} project={FLAGSHIP.name} />
                </div>
              </div>
            </article>
          </Section>

          <Section id="projects" label="Selected work" title="Products, agent tooling, and the interface around them.">
            <ul className="grid gap-4 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <li key={project.name} className="flex flex-col rounded-xl border border-border p-6">
                  <p className="mb-2 font-mono text-[0.7rem] tracking-[0.14em] text-neutral-ink uppercase">{project.kind}</p>
                  <h3 className="mb-2 text-lg font-semibold tracking-tight">{project.name}</h3>
                  <p className="mb-5 flex-1 text-[0.95rem] leading-relaxed text-neutral-ink">{project.pitch}</p>
                  <Tags items={project.tech} />
                  <div className="mt-2">
                    <ExternalLinks links={project.links} project={project.name} />
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="experience" label="Experience" title="Where the work happens.">
            <ol className="space-y-12">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <p className="font-mono text-sm text-neutral-ink">{job.period}</p>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {job.title}
                      <span className="font-normal text-neutral-ink"> · </span>
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-accent-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent ${FOCUS}`}
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <p className="mt-1 mb-3 text-neutral-ink">{job.description}</p>
                    <ul className="space-y-1.5 text-[0.95rem] leading-relaxed">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="relative pl-5">
                          <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="stack" label="Stack" title="What I reach for.">
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {SKILLS.map((group) => (
                <div key={group.category} className="border-t border-border pt-4">
                  <dt className="mb-2 text-sm font-semibold">{group.category}</dt>
                  <dd className="text-[0.95rem] leading-relaxed text-neutral-ink">{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid gap-8 border-t border-border pt-6 text-sm text-neutral-ink sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Education</h3>
                <ul className="space-y-1.5">
                  {EDUCATION.map((item) => (
                    <li key={item.title}>
                      {item.title} <span className="font-mono text-xs">· {item.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Languages</h3>
                <p>{PROFILE.languages.join(' · ')}</p>
              </div>
            </div>
          </Section>

          <Section id="contact" label="Contact" title="Need someone who ships applied AI? Write to me.">
            <div className="flex flex-col gap-6 rounded-2xl border border-border p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="max-w-md text-neutral-ink">
                Open to applied AI and product engineering roles. Based in {PROFILE.location}, working remote.
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className={`inline-flex min-h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background hover:opacity-85 ${FOCUS}`}
              >
                {CONTACT.email}
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((link) => {
                const external = link.id === 'github' || link.id === 'linkedin';
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      download={link.download}
                      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-4 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 ${FOCUS}`}
                    >
                      {socialIconFor(link.id)}
                      {link.id === 'email' ? 'Email' : link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </Section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-xs text-neutral-ink sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>
            © {year} {PROFILE.fullName} · {PROFILE.site}
          </span>
          <span>
            Press <kbd className="rounded border border-border px-1">⌘K</kbd> to navigate
          </span>
        </div>
      </footer>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
