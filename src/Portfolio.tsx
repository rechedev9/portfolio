import { useEffect, useState, useSyncExternalStore } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { CONTACT, EDUCATION, EXPERIENCE, PROFILE, PROJECTS, SKILLS, SOCIAL_LINKS } from './data/portfolio';
import { CommandPalette } from './components/CommandPalette';
import { ArrowUpRightIcon, MoonIcon, SunIcon } from './components/icons';
import { isDark, subscribeTheme, toggleTheme } from './theme';

const FOCUS = 'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground';

const LINK = `underline decoration-foreground/50 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-foreground ${FOCUS}`;

// Padding with a matching negative margin: a taller tap target that does not move the text.
const TAP = '-my-1.5 py-1.5';

const NEW_TAB = ' (opens in a new tab)';

const ROW = 'grid gap-2 md:grid-cols-[12rem_1fr] md:gap-8';

// Every screenshot is captured at the same viewport, so one intrinsic size fits all.
const SHOT = { width: 1280, height: 800 } as const;

function Section({
  id,
  title,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <section
      id={id}
      aria-labelledby={`heading-${id}`}
      className="grid scroll-mt-4 gap-6 pt-20 sm:pt-28 lg:grid-cols-[10rem_1fr] lg:gap-8"
    >
      <h2 id={`heading-${id}`} className="font-serif text-[1.375rem] leading-6 italic">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

function ExternalLink({
  href,
  label,
  children,
}: {
  readonly href: string;
  readonly label?: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group inline-flex items-center gap-1 ${TAP} ${LINK}`}
    >
      {children}
      <span className="sr-only">{NEW_TAB}</span>
      <ArrowUpRightIcon className="size-3 text-neutral-ink transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function Portfolio(): ReactElement {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const dark = useSyncExternalStore(subscribeTheme, isDark);
  const year = new Date().getFullYear();

  useEffect(() => {
    document.title = `${PROFILE.name} · ${PROFILE.title}`;
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

  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-foreground"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-5xl px-6 text-[0.9375rem] leading-relaxed sm:px-8">
        <header className="flex min-h-[min(100svh,54rem)] flex-col pt-8 pb-14 sm:pt-10 sm:pb-20">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="font-semibold tracking-tight">{PROFILE.name}</h1>
              <p className="text-neutral-ink">
                {PROFILE.title} · {PROFILE.location}
              </p>
            </div>
            <button
              type="button"
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
              className={`-mt-2.5 -mr-3 grid size-11 cursor-pointer place-items-center text-neutral-ink transition-[color,scale] duration-150 ease-out hover:text-foreground active:scale-95 ${FOCUS}`}
            >
              {dark ? <SunIcon className="size-[1.125rem]" /> : <MoonIcon className="size-[1.125rem]" />}
            </button>
          </div>

          <div className="mt-auto pt-24">
            <p className="hero-statement rise max-w-[20ch] font-semibold text-balance">{PROFILE.headline}</p>
            <p className="rise mt-8 max-w-[38rem] text-lg leading-relaxed text-pretty text-neutral-ink sm:text-xl sm:leading-relaxed [animation-delay:80ms]">
              {PROFILE.subhead.map((segment) =>
                segment.strong ? (
                  <strong key={segment.text} className="font-normal text-foreground">
                    {segment.text}
                  </strong>
                ) : (
                  segment.text
                ),
              )}
            </p>
            <ul className="rise mt-8 flex flex-wrap gap-x-7 gap-y-2 [animation-delay:160ms]">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  {link.id === 'github' || link.id === 'linkedin' ? (
                    <ExternalLink href={link.href}>{link.label}</ExternalLink>
                  ) : (
                    <a href={link.href} download={link.download} className={`inline-block ${TAP} ${LINK}`}>
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <main id="main">
          <Section id="experience" title="Experience">
            <ol className="space-y-12">
              {EXPERIENCE.map((job) => (
                <li key={job.company} className={ROW}>
                  <div>
                    <h3 className="font-medium">
                      {job.url ? <ExternalLink href={job.url}>{job.company}</ExternalLink> : job.company}
                    </h3>
                    <p className="text-neutral-ink tabular-nums">{job.period}</p>
                  </div>
                  <div className="max-w-xl">
                    <p className="font-medium">{job.title}</p>
                    <p className="mt-1 text-pretty text-neutral-ink">{job.description}</p>
                    <ul className="mt-4 space-y-2">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="text-pretty">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="projects" title="Projects">
            <ul className="space-y-12">
              {PROJECTS.map((project) => (
                <li key={project.name} className={ROW}>
                  <div>
                    <h3 className="font-medium">{project.name}</h3>
                    {project.client ? (
                      <p className="text-neutral-ink">
                        For{' '}
                        <a href={project.client.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                          {project.client.label}
                          <span className="sr-only">{NEW_TAB}</span>
                        </a>
                      </p>
                    ) : null}
                    <p className="text-neutral-ink">{project.kind}</p>
                  </div>
                  <div className="max-w-xl">
                    <p className="text-pretty">{project.pitch}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                      {project.links.map((link) => (
                        <li key={link.href}>
                          <ExternalLink
                            href={link.href}
                            label={`${project.name}: ${link.label}${NEW_TAB}`}
                          >
                            {link.label}
                          </ExternalLink>
                        </li>
                      ))}
                    </ul>
                    {project.image ? (
                      <img
                        src={project.image.src}
                        alt={project.image.alt}
                        width={SHOT.width}
                        height={SHOT.height}
                        loading="lazy"
                        decoding="async"
                        className="mt-5 h-auto w-full rounded-lg border border-border"
                      />
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="stack" title="Stack">
            <dl className="space-y-4">
              {SKILLS.map((group) => (
                <div key={group.category} className={ROW}>
                  <dt className="font-medium">{group.category}</dt>
                  <dd className="max-w-xl">{group.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="education" title="Education">
            <dl className="space-y-4">
              {EDUCATION.map((item) => (
                <div key={item.title} className={ROW}>
                  <dt className="text-neutral-ink tabular-nums">{item.period}</dt>
                  <dd className="max-w-xl">{item.title}</dd>
                </div>
              ))}
              <div className={ROW}>
                <dt className="text-neutral-ink">Languages</dt>
                <dd className="max-w-xl">{PROFILE.languages.join(' · ')}</dd>
              </div>
            </dl>
          </Section>

          <Section id="contact" title="Contact">
            <p className="max-w-xl text-pretty text-neutral-ink">
              Open to applied AI and product engineering roles. Remote from {PROFILE.location}.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`mt-4 inline-block text-[clamp(1.5rem,4.5vw,2.75rem)] leading-tight font-semibold tracking-tight decoration-1 underline-offset-8 ${LINK}`}
            >
              {CONTACT.email}
            </a>
          </Section>
        </main>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border py-8 text-sm text-neutral-ink sm:mt-32">
          <span>
            © {year} {PROFILE.fullName} · {PROFILE.site}
          </span>
          <button
            type="button"
            aria-keyshortcuts="Control+K Meta+K"
            onClick={() => setPaletteOpen(true)}
            className={`cursor-pointer transition-colors duration-150 hover:text-foreground ${FOCUS}`}
          >
            Command palette · Ctrl+K
          </button>
        </footer>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
