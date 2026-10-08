import { useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_LINKS, EDUCATION, EXPERIENCE, PROFILE, SELECTED_WORK } from './data/portfolio';
import { CommandPalette } from './components/CommandPalette';
import { CommandIcon, MoonIcon, SunIcon } from './components/icons';
import { PixelCanvas } from './components/PixelCanvas';
import type { Painter } from './pixel/core';
import { LAPTOP_STILL, MARGINALIA_SIZE, WORK_ART, laptop, mortarboard } from './pixel/marginalia';
import { PALMA_HEIGHT, PALMA_WIDTH, paintPalma } from './pixel/palma';
import { isDarkTheme, syncThemeColor, toggleTheme } from './theme';

const FOCUS =
  'focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent';

const LINK = `text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent ${FOCUS}`;

function Marginalia({ paint, still }: { readonly paint: Painter; readonly still?: number }): ReactElement {
  return <PixelCanvas width={MARGINALIA_SIZE} height={MARGINALIA_SIZE} scale={3} fps={4} paint={paint} still={still} />;
}

function Section({
  id,
  title,
  delay,
  art,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly delay: number;
  readonly art?: { readonly paint: Painter; readonly still?: number };
  readonly children: ReactNode;
}): ReactElement {
  return (
    <section
      id={id}
      aria-labelledby={`heading-${id}`}
      className="reveal mt-16 grid scroll-mt-10 gap-y-6 border-t border-border pt-8 md:grid-cols-[9.5rem_1fr] md:gap-x-8"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <h2 id={`heading-${id}`} className="label-caps md:pt-[0.4rem]">
          {title}
        </h2>
        {art && (
          <div className="mt-5 hidden md:block">
            <Marginalia paint={art.paint} still={art.still} />
          </div>
        )}
      </div>
      <div>{children}</div>
    </section>
  );
}

function EntryHeader({ title, aside }: { readonly title: ReactNode; readonly aside: ReactNode }): ReactElement {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <h3 className="text-[1.2rem] leading-snug">{title}</h3>
      <p className="shrink-0 text-[0.95rem] text-muted tabular-nums">{aside}</p>
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
      aria-label={label}
      className={`grid size-10 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:text-foreground ${FOCUS}`}
    >
      {children}
    </button>
  );
}

export function Portfolio(): ReactElement {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    document.title = `${PROFILE.name} — ${PROFILE.title}`;
    document.body.classList.add('clean-body');

    const syncDark = (): void => {
      setDark(isDarkTheme());
      syncThemeColor();
    };
    syncDark();
    window.addEventListener('theme-change', syncDark);

    return (): void => {
      document.body.classList.remove('clean-body');
      window.removeEventListener('theme-change', syncDark);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return (): void => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!paletteOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return (): void => {
      document.body.style.overflow = prev;
    };
  }, [paletteOpen]);

  return (
    <main className="px-6 pt-8 pb-12 sm:px-10 sm:pt-12">
      <div className="mx-auto max-w-[44rem]">
        <nav className="reveal flex items-center justify-between" aria-label="Primary">
          <Link to="/" aria-label={PROFILE.site} className={`rounded-full ${FOCUS}`}>
            <span className="relative grid size-11 place-items-center rounded-full border border-accent/80">
              <span aria-hidden="true" className="absolute inset-[3px] rounded-full border border-accent/30" />
              <span aria-hidden="true" className="text-[0.8rem] font-medium tracking-[0.08em] text-accent">
                LR
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <NavIconButton label={dark ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
              {dark ? <SunIcon className="size-[18px]" /> : <MoonIcon className="size-[18px]" />}
            </NavIconButton>
            <NavIconButton label="Open command palette" onClick={() => setPaletteOpen(true)}>
              <CommandIcon className="size-4" />
            </NavIconButton>
          </div>
        </nav>

        <header id="me" className="reveal mt-20 scroll-mt-10 sm:mt-24" style={{ animationDelay: '60ms' }}>
          <h1 className="text-5xl font-normal tracking-[-0.02em] sm:text-6xl">{PROFILE.name}</h1>
          <p className="mt-3 text-xl text-muted italic">
            {PROFILE.title} · {PROFILE.location}
          </p>
          <div aria-hidden="true" className="mt-8 h-px w-12 bg-accent" />
          <p className="mt-8 max-w-[36rem] text-[1.3rem] leading-[1.55] text-pretty">{PROFILE.intro}</p>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {CONTACT_LINKS.map((link) => {
              const external = link.id === 'github' || link.id === 'linkedin';
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noreferrer' : undefined}
                    download={link.download}
                    aria-label={link.id === 'cv' ? 'Download CV' : undefined}
                    className={`text-[0.78rem] tracking-[0.16em] uppercase ${LINK}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <figure className="mt-14">
            <PixelCanvas
              width={PALMA_WIDTH}
              height={PALMA_HEIGHT}
              fps={8}
              paint={paintPalma}
              label="Pixel-art drawing of Palma de Mallorca from the sea: the cathedral on the old sea wall, palm trees, a sailboat and gulls."
            />
            <figcaption className="mt-3 text-[0.95rem] text-muted italic">
              Fig. 1. Palma de Mallorca, seen from the sea. Drawn by hand, pixel by pixel.
            </figcaption>
          </figure>
        </header>

        <Section id="experience" title="Experience" delay={120} art={{ paint: laptop, still: LAPTOP_STILL }}>
          <div className="space-y-10">
            {EXPERIENCE.map((job) => (
              <article key={job.org}>
                <EntryHeader
                  title={
                    <>
                      {job.role}
                      <span className="text-muted">, </span>
                      {job.href ? (
                        <a href={job.href} target="_blank" rel="noreferrer" className={LINK}>
                          {job.org}
                        </a>
                      ) : (
                        job.org
                      )}
                    </>
                  }
                  aside={job.period}
                />
                <ul className="mt-3 space-y-1.5 text-[1.05rem] leading-relaxed text-muted">
                  {job.points.map((point) => (
                    <li key={point} className="relative pl-5">
                      <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-muted/50" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="work" title="Projects" delay={180}>
          <ul className="space-y-8">
            {SELECTED_WORK.map((work) => (
              <li key={work.name} className="relative">
                <div aria-hidden="true" className="absolute top-0 -left-[3.25rem] hidden md:block">
                  <Marginalia paint={WORK_ART[work.art].paint} still={WORK_ART[work.art].still} />
                </div>
                <a href={work.href} target="_blank" rel="noopener noreferrer" className={`group block ${FOCUS}`}>
                  <EntryHeader
                    title={<span className="transition-colors group-hover:text-accent">{work.name}</span>}
                    aside={
                      <>
                        {work.domain} <span aria-hidden="true">↗</span>
                      </>
                    }
                  />
                  <p className="mt-1.5 text-[1.05rem] leading-relaxed text-muted">{work.description}</p>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title="Education" delay={240} art={{ paint: mortarboard }}>
          <ul className="space-y-3">
            {EDUCATION.map((item) => (
              <li
                key={item.title}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-[1.05rem] leading-snug">{item.title}</span>
                <span className="shrink-0 text-[0.95rem] text-muted tabular-nums">{item.period}</span>
              </li>
            ))}
          </ul>
        </Section>

        <footer
          className="reveal mt-20 flex flex-col gap-2 border-t border-border pt-6 text-[0.95rem] text-muted sm:flex-row sm:items-center sm:justify-between"
          style={{ animationDelay: '300ms' }}
        >
          <p>
            © {year} {PROFILE.fullName}
          </p>
          <p className="hidden sm:block">
            <kbd className="rounded border border-border px-1.5 py-0.5 font-sans text-[0.75rem]">⌘K</kbd> to navigate
          </p>
        </footer>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </main>
  );
}
