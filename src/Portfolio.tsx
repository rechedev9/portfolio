import { useCallback, useEffect, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ALWAYS,
  FOOTER_LINKS,
  HIGHLIGHTS,
  LIVE_PROJECTS,
  PROFILE,
  PROJECT_CATEGORIES,
  SOCIAL_LINKS,
} from './data/portfolio';
import { CommandPalette } from './components/CommandPalette';
import { CommandIcon, MoonIcon, SunIcon } from './components/icons';
import { socialIconFor } from './components/SocialIcons';
import { ThemeSwitcher } from './components/ThemeSwitcher';

function SectionHeading({
  children,
  id,
}: {
  readonly children: string;
  readonly id?: string;
}): ReactElement {
  return (
    <h2
      id={id ?? `heading-${children}`}
      className="mt-16 mb-4 font-mono text-2xl text-neutral-500 opacity-75 dark:text-neutral-300"
    >
      /{children}
    </h2>
  );
}

function ArrowLine({ children }: { readonly children: ReactNode }): ReactElement {
  return (
    <p className="relative mb-0 pl-7 text-xl leading-relaxed text-gray-500 dark:text-gray-400">
      <span
        className="pointer-events-none absolute top-0 left-0 select-none font-mono text-neutral-300 dark:text-neutral-600"
        aria-hidden="true"
      >
        ↳
      </span>
      {children}
    </p>
  );
}

function NavIconButton({
  title,
  label,
  onClick,
  children,
}: {
  readonly title: string;
  readonly label: string;
  readonly onClick: () => void;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="cursor-pointer rounded-md border-2 border-transparent p-2 transition-all hover:border-primary focus-visible:border-primary focus-visible:outline-none"
      aria-label={label}
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
      const isDark = document.documentElement.classList.contains('dark');
      setDark(isDark);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', isDark ? '#0a0a0a' : '#ffffff');
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

  const toggleDark = useCallback((): void => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next ? '#0a0a0a' : '#ffffff');
    setDark(next);
    window.dispatchEvent(new Event('theme-change'));
  }, []);

  return (
    <main className="p-6 sm:p-12 md:p-16">
      <div className="mx-auto md:max-w-[37.5rem]">
        <header className="reveal">
          <nav className="flex items-center justify-between" aria-label="Primary">
            <Link
              to="/"
              className="block h-8 w-8 border border-transparent bg-linear-to-r from-primary to-accent transition-all will-change-auto hover:w-16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={PROFILE.site}
            >
              <span className="sr-only">{PROFILE.site}</span>
            </Link>

            <div className="flex items-center gap-0.5">
              <NavIconButton
                title={dark ? 'Light mode' : 'Dark mode'}
                label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                onClick={toggleDark}
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </NavIconButton>

              <NavIconButton
                title="⌘K"
                label="Open command palette"
                onClick={() => setPaletteOpen(true)}
              >
                <CommandIcon className="h-[25px] w-[25px]" />
              </NavIconButton>

              <ThemeSwitcher currentTheme="clean" compact />
            </div>
          </nav>
        </header>

        <div>
          {/* /me */}
          <section
            id="me"
            aria-labelledby="heading-me"
            className="reveal scroll-mt-8"
            style={{ animationDelay: '60ms' }}
          >
            <h2
              id="heading-me"
              className="mt-16 mb-4 font-mono text-2xl text-neutral-500 opacity-75 dark:text-neutral-300"
            >
              /me
            </h2>
            <h1 className="text-3xl font-semibold tracking-tight text-accent">{PROFILE.name}</h1>
            <div className="mt-2 mb-4">
              <ArrowLine>
                <span className="text-black dark:text-white">{PROFILE.title}</span>
                {', '}
                {PROFILE.tagline}
              </ArrowLine>
            </div>
            <ul className="flex flex-wrap gap-2 text-black dark:text-white">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id} title={link.label}>
                  <a
                    href={link.href}
                    target={link.download || link.id === 'email' ? undefined : '_blank'}
                    rel={link.download || link.id === 'email' ? undefined : 'noreferrer'}
                    download={link.download || undefined}
                    aria-label={link.label}
                    className="block rounded rounded-b-none border-2 border-b-0 border-dashed border-border/80 p-2 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-neutral-900"
                  >
                    {socialIconFor(link.id)}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* /always */}
          <section
            id="always"
            aria-labelledby="heading-always"
            className="reveal scroll-mt-8"
            style={{ animationDelay: '120ms' }}
          >
            <SectionHeading>always</SectionHeading>
            <div className="space-y-4">
              <ArrowLine>{ALWAYS}</ArrowLine>
            </div>
          </section>

          {/* /highlights */}
          <section
            id="highlights"
            aria-labelledby="heading-highlights"
            className="reveal scroll-mt-8"
            style={{ animationDelay: '180ms' }}
          >
            <SectionHeading>highlights</SectionHeading>
            <div className="space-y-4">
              {HIGHLIGHTS.map((h) => (
                <ArrowLine key={h.text}>
                  {h.text}
                  {h.link && (
                    <a
                      href={h.link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {h.link.label}
                    </a>
                  )}
                  {h.suffix}
                </ArrowLine>
              ))}
            </div>
          </section>

          {/* /projects */}
          <section
            id="projects"
            aria-labelledby="heading-projects"
            className="reveal scroll-mt-8"
            style={{ animationDelay: '240ms' }}
          >
            <SectionHeading>projects</SectionHeading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {PROJECT_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="border-2 border-dashed border-border/80 p-4 transition-colors hover:border-border"
                >
                  <h3 className="mb-3 flex items-center justify-between text-base text-foreground">
                    <span>{cat.title}</span>
                    <span aria-hidden="true">{cat.emoji}</span>
                  </h3>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-base text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-12 pb-12">
          {/* /live */}
          <section
            id="live"
            className="reveal flex scroll-mt-8 flex-col font-mono"
            aria-labelledby="heading-live"
            style={{ animationDelay: '300ms' }}
          >
            <h2
              id="heading-live"
              className="mb-4 font-mono text-2xl text-neutral-500 opacity-75 dark:text-neutral-300"
            >
              /live
            </h2>
            <div className="flex flex-col gap-2">
              {LIVE_PROJECTS.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-6 border border-dashed border-border px-4 py-4 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-gray-900"
                >
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate text-accent">{p.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{p.description}</span>
                  </div>
                  <img
                    src={p.icon}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 object-contain transition-transform group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </div>
          </section>

          <footer
            className="reveal flex flex-col justify-between gap-4 border-t border-dashed border-border pt-6 font-mono text-sm sm:flex-row sm:items-center"
            style={{ animationDelay: '360ms' }}
          >
            <Link to="/" className="hover:underline focus-visible:underline">
              {PROFILE.site} ✨ {year}
            </Link>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {FOOTER_LINKS.map((link, i) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={
                    i < FOOTER_LINKS.length - 1
                      ? "relative hover:underline after:absolute after:top-0 after:right-[-16px] after:text-gray-500 after:content-['/'] focus-visible:underline"
                      : 'relative hover:underline focus-visible:underline'
                  }
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </footer>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </main>
  );
}
