import { Fragment, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { CommandPalette } from './components/CommandPalette';
import { MarginFolio, PhoneLog, ShipRecord } from './components/ShipLog';
import { ArrowUpRightIcon, MoonIcon, SunIcon } from './components/icons';
import {
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  FLAGSHIP,
  FLAGSHIP_FIGURES,
  PROFILE,
  PROJECTS,
  SHIP_LOG,
  SKILLS,
  SOCIAL_LINKS,
} from './data/portfolio';
import type { Project } from './data/portfolio';
import { actRange } from './scroll/act-context';
import { Cue } from './scroll/cue';
import { InView } from './scroll/in-view';
import { Reveal } from './scroll/reveal';
import { ScrollAct } from './scroll/scroll-act';
import { Stage } from './scroll/stage';
import { isDark, subscribeTheme, toggleTheme } from './theme';

const FOCUS = 'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

const LINK = `underline decoration-foreground/50 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-foreground ${FOCUS}`;

// Padding with a matching negative margin: a taller tap target that does not move the text.
const TAP = '-my-1.5 py-1.5';

const NEW_TAB = ' (opens in a new tab)';

const PAGE = 'mx-auto w-full max-w-[84rem] px-6 sm:px-10';

const ROW = 'grid gap-2 md:grid-cols-[12rem_1fr] md:gap-8';

const SMALL = 'text-[0.8125rem] leading-snug';

// Every screenshot is captured at the same viewport, so one intrinsic size fits all.
const SHOT = { width: 1280, height: 800 } as const;

const MINE_WORDS = PROFILE.statement.mine.split(' ');

// Each word of his sentence takes its ink a little after the one before it.
function wordRange(index: number): string {
  const from = 0.1 + index * 0.055;
  return actRange({ pinned: true, from, to: from + 0.2 });
}

type ReadingPosition = {
  readonly stamped: ReadonlySet<string>;
  readonly chapter: string;
  readonly closing: boolean;
};

// Drives the ship log: which products the reader has passed, the chapter under their eyes, and whether the colophon is on screen.
function useReadingPosition(): ReadingPosition {
  // How many lines of the log are stamped. The log is in page order, so passing one line stamps every line
  // before it: a reader who jumps down the page has still passed them.
  const [reach, setReach] = useState(0);
  const [chapter, setChapter] = useState('Experience');
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const ships = new IntersectionObserver(
      (entries) => {
        const furthest = entries
          .filter((entry) => entry.isIntersecting || entry.boundingClientRect.top < 0)
          .map((entry) => SHIP_LOG.findIndex((line) => line.id === entry.target.getAttribute('data-ship')))
          .reduce((max, index) => Math.max(max, index + 1), 0);
        setReach((previous) => Math.max(previous, furthest));
      },
      { rootMargin: '0px 0px -35% 0px' },
    );
    for (const element of document.querySelectorAll('[data-ship]')) ships.observe(element);

    // A zero-height line 35% down the viewport: the chapter crossing it is the current one.
    const chapters = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = entry.target.getAttribute('data-chapter');
          if (entry.isIntersecting && name !== null) setChapter(name);
        }
      },
      { rootMargin: '-35% 0px -65% 0px' },
    );
    for (const element of document.querySelectorAll('[data-chapter]')) chapters.observe(element);

    // The log leaves the margin once the complete record is on screen or above it. The margin matches the
    // record's own reveal, so the log is never missing from both places.
    const colophon = new IntersectionObserver(
      (entries) => {
        const last = entries.at(-1);
        if (!last) return;
        const reached = last.isIntersecting || last.boundingClientRect.top < 0;
        setClosing(reached);
        if (reached) setReach(SHIP_LOG.length);
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    const record = document.querySelector('[data-ship-record]');
    if (record) colophon.observe(record);

    return (): void => {
      ships.disconnect();
      chapters.disconnect();
      colophon.disconnect();
    };
  }, []);

  const stamped = useMemo(() => new Set(SHIP_LOG.slice(0, reach).map((line) => line.id)), [reach]);
  return { stamped, chapter, closing };
}

// A pinned stage is one viewport tall and clips what does not fit. When its content is taller than the
// viewport (a phone on its side, heavy zoom), the act is marked unpinned and index.css lays it out as an
// ordinary section, so nothing is cut off.
function useStageFit(): void {
  useEffect(() => {
    const stages = [...document.querySelectorAll('.sc-stage')];
    const measure = (): void => {
      for (const stage of stages) {
        const content = stage.firstElementChild;
        const act = stage.closest('.sc-act');
        if (!content || !act) continue;
        const needed = content.scrollHeight + Number.parseFloat(getComputedStyle(stage).paddingTop);
        act.toggleAttribute('data-unpinned', needed > document.documentElement.clientHeight + 1);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    for (const stage of stages) {
      if (stage.firstElementChild) observer.observe(stage.firstElementChild);
    }
    window.addEventListener('resize', measure);
    void document.fonts.ready.then(measure);
    return (): void => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);
}

function Chapter({
  id,
  title,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly children: ReactNode;
}): ReactElement {
  return (
    <section id={id} data-chapter={title} aria-labelledby={`heading-${id}`} className="scroll-mt-4 pt-24 sm:pt-32">
      {/* On a wide screen the margin folio shows the chapter, so the heading is for assistive tech only. */}
      <h2 id={`heading-${id}`} className="mb-8 font-serif text-[1.375rem] leading-6 italic lg:sr-only">
        {title}
      </h2>
      {children}
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

function ProjectLinks({ project, className }: { readonly project: Project; readonly className: string }): ReactElement {
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-1 ${className}`}>
      {project.links.map((link) => (
        <li key={link.href}>
          <ExternalLink href={link.href} label={`${project.name}: ${link.label}${NEW_TAB}`}>
            {link.label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

function ProjectText({ project }: { readonly project: Project }): ReactElement {
  return (
    <div className="max-w-xl">
      <h3 className="text-2xl leading-tight font-semibold tracking-tight">{project.name}</h3>
      <p className="mt-1 text-neutral-ink">{project.kind}</p>
      <p className="mt-4 text-pretty">{project.pitch}</p>
      {project.points.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {project.points.map((point) => (
            <li key={point} className="text-pretty text-neutral-ink">
              {point}
            </li>
          ))}
        </ul>
      ) : null}
      <ProjectLinks project={project} className="mt-4" />
    </div>
  );
}

type ShotProps = {
  readonly project: Project;
  readonly drift?: boolean;
  // Crops to 16:9 below the wide layout, where the pinned stage has to fit one phone screen.
  readonly crop?: boolean;
};

function Shot({ project, drift = false, crop = false }: ShotProps): ReactElement | null {
  if (!project.image) return null;
  return (
    <figure>
      <div className="shot-frame rounded-lg border border-border">
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={SHOT.width}
          height={SHOT.height}
          loading="lazy"
          decoding="async"
          className={`h-auto w-full ${drift ? 'shot-drift' : ''} ${crop ? 'aspect-video object-cover object-top lg:aspect-auto' : ''}`}
        />
      </div>
      <figcaption className={`mt-3 text-neutral-ink ${SMALL}`}>{project.image.caption}</figcaption>
    </figure>
  );
}

// A spread: the screenshot in its own column with a caption, the text beside it. `flip` puts the text first.
function Spread({ project, flip }: { readonly project: Project; readonly flip: boolean }): ReactElement {
  return (
    <article
      id={project.ship ? `ship-${project.ship}` : undefined}
      data-ship={project.ship}
      className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <div className={`lg:col-span-7 ${flip ? 'lg:order-2' : ''}`}>
        <Shot project={project} drift />
      </div>
      <div className="lg:col-span-5">
        <ProjectText project={project} />
      </div>
    </article>
  );
}

export function Portfolio(): ReactElement {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);
  const { stamped, chapter, closing } = useReadingPosition();
  useStageFit();
  const year = new Date().getFullYear();
  const [gravityRoom, piroboom, socialPro, ...smaller] = PROJECTS;

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
        className="sr-only z-50 rounded-md bg-background px-4 py-2 text-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:outline-2 focus:outline-accent"
      >
        Skip to content
      </a>

      <div className="text-[0.9375rem] leading-relaxed">
        {/* Title page. The stage holds while the weight of the statement moves from the agents' sentence to his. */}
        <ScrollAct device="pin" span={1.7}>
          <Stage>
            <header className={`${PAGE} flex h-full flex-col pt-8 pb-12 sm:pt-10 sm:pb-16`}>
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
                  className={`-mt-2.5 -mr-3 grid size-11 cursor-pointer place-items-center text-neutral-ink transition-[color,scale] duration-150 ease-out hover:text-foreground active:scale-95 print:hidden ${FOCUS}`}
                >
                  {dark ? <SunIcon className="size-[1.125rem]" /> : <MoonIcon className="size-[1.125rem]" />}
                </button>
              </div>

              <div className="mt-auto">
                <p className="hero-statement rise font-semibold">
                  <span className="statement-agents block text-balance">{PROFILE.statement.agents}</span>
                  <span className="block text-balance">
                    {MINE_WORDS.map((word, index) => (
                      <Fragment key={`${word}-${index}`}>
                        <span className="statement-word" style={{ animationRange: wordRange(index) }}>
                          {word}
                        </span>{' '}
                      </Fragment>
                    ))}
                  </span>
                </p>
                <p className="rise mt-7 max-w-[38rem] text-lg leading-relaxed text-pretty text-neutral-ink [animation-delay:80ms] sm:mt-8 sm:text-xl sm:leading-relaxed">
                  {PROFILE.subhead}
                </p>
                <ul className="rise mt-7 flex flex-wrap gap-x-7 gap-y-2 [animation-delay:160ms] sm:mt-8">
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
          </Stage>
        </ScrollAct>

        <div className={`${PAGE} lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-14`}>
          <MarginFolio stamped={stamped} chapter={chapter} closing={closing} />

          <main id="main" className="min-w-0">
            <Chapter id="experience" title="Experience">
              <ScrollAct device="flow">
                <InView as="ul" stagger={70} className="space-y-14">
                  {EXPERIENCE.map((job) => (
                    <li key={job.id} className={ROW}>
                      <div>
                        <h3 className="font-medium">
                          {job.url && job.company ? (
                            <ExternalLink href={job.url}>{job.company}</ExternalLink>
                          ) : (
                            (job.company ?? job.title)
                          )}
                        </h3>
                        <p className="text-neutral-ink tabular-nums">{job.period}</p>
                      </div>
                      <div className="max-w-xl">
                        {job.company ? <p className="font-medium">{job.title}</p> : null}
                        {job.description ? <p className="mt-1 text-pretty text-neutral-ink">{job.description}</p> : null}
                        <ul className={`space-y-2 ${job.company ? 'mt-4' : ''}`}>
                          {job.highlights.map((highlight) => (
                            <li
                              key={highlight.text}
                              id={highlight.ship ? `ship-${highlight.ship}` : undefined}
                              data-ship={highlight.ship}
                              className="scroll-mt-28 text-pretty"
                            >
                              {highlight.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </InView>
              </ScrollAct>
            </Chapter>

            <Chapter id="projects" title="Projects">
              {/* The peak. The frame holds, the screenshot wipes open, then three facts arrive one by one. */}
              <ScrollAct device="pin" span={2.6}>
                {/* The log links here: late enough in the pin that the screenshot is open and the facts are lit. */}
                <span id={`ship-${FLAGSHIP.id}`} aria-hidden="true" className="peak-anchor" />
                <Stage className="flex items-start pt-8 lg:items-center lg:pt-0">
                  <article
                    data-ship={FLAGSHIP.ship}
                    className="grid w-full gap-x-12 gap-y-5 pb-14 lg:grid-cols-12 lg:items-center lg:gap-y-6 lg:pb-0"
                  >
                    <div className="lg:col-span-5">
                      <h3 className="text-3xl leading-none font-semibold tracking-[-0.04em] sm:text-5xl">{FLAGSHIP.name}</h3>
                      <p className="stage-wide mt-3 text-neutral-ink">{FLAGSHIP.kind}</p>
                      <p className="mt-4 max-w-md text-pretty">{FLAGSHIP.pitch}</p>
                      <dl className="peak-optional mt-5 flex gap-10">
                        {FLAGSHIP_FIGURES.map((figure) => (
                          <div key={figure.label} className="flex flex-col-reverse">
                            <dt className="text-neutral-ink">{figure.label}</dt>
                            <dd className="text-3xl leading-tight font-semibold tracking-tight tabular-nums">
                              {figure.value}+
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                    <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
                      <Reveal dir="up" from={0.03} to={0.4}>
                        <Shot project={FLAGSHIP} crop />
                      </Reveal>
                    </div>
                    <div className="lg:col-span-5">
                      <ul className="max-w-md space-y-2">
                        {FLAGSHIP.points.map((point, index) => (
                          <li key={point}>
                            <Cue as="p" from={0.44 + index * 0.16} className="text-pretty">
                              {point}
                            </Cue>
                          </li>
                        ))}
                      </ul>
                      <ProjectLinks project={FLAGSHIP} className="peak-optional mt-5" />
                    </div>
                  </article>
                </Stage>
              </ScrollAct>

              <ScrollAct device="flow" className="space-y-24 pt-8 sm:space-y-32">
                <Spread project={gravityRoom} flip={false} />
                <Spread project={piroboom} flip />
                <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
                  <article className="lg:col-span-6">
                    <Shot project={socialPro} drift />
                    <div className="mt-6">
                      <ProjectText project={socialPro} />
                    </div>
                  </article>
                  <div className="space-y-14 lg:col-span-5 lg:col-start-8">
                    {smaller.map((project) => (
                      <article key={project.id}>
                        <ProjectText project={project} />
                      </article>
                    ))}
                  </div>
                </div>
              </ScrollAct>
            </Chapter>

            <Chapter id="stack" title="Stack">
              <ScrollAct device="flow">
                <InView as="ul" stagger={45} className="space-y-4">
                  {SKILLS.map((group) => (
                    <li key={group.category} className={ROW}>
                      <h3 className="font-medium">{group.category}</h3>
                      <p className="max-w-xl">{group.items.join(' · ')}</p>
                    </li>
                  ))}
                </InView>
              </ScrollAct>
            </Chapter>

            <Chapter id="education" title="Education">
              <ScrollAct device="flow">
                <InView as="ul" stagger={45} className="space-y-4">
                  {EDUCATION.map((item) => (
                    <li key={item.title} className={ROW}>
                      <p className="text-neutral-ink tabular-nums">{item.period}</p>
                      <p className="max-w-xl">{item.title}</p>
                    </li>
                  ))}
                  <li className={ROW}>
                    <p className="text-neutral-ink">Languages</p>
                    <p className="max-w-xl">{PROFILE.languages.join(' · ')}</p>
                  </li>
                </InView>
              </ScrollAct>
            </Chapter>

            {/* Colophon. The log, complete, and one address. */}
            <Chapter id="contact" title="Contact">
              <ScrollAct device="flow">
                <InView stagger={70}>
                  <ShipRecord />
                  <p className="mt-14 max-w-[36rem] text-[clamp(1.375rem,2vw+0.875rem,2rem)] leading-[1.15] font-semibold tracking-tight text-balance">
                    Open to applied AI and product engineering roles, remote from {PROFILE.location}. Write to{' '}
                    <a href={`mailto:${CONTACT.email}`} className={`decoration-1 underline-offset-[0.2em] ${LINK}`}>
                      {CONTACT.email}
                    </a>
                    .
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
                    <li>
                      <ExternalLink href={CONTACT.linkedin}>LinkedIn</ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={CONTACT.github}>GitHub</ExternalLink>
                    </li>
                    <li>
                      <a href={CONTACT.cv} download={CONTACT.cvFileName} className={`inline-block ${TAP} ${LINK}`}>
                        Download CV
                      </a>
                    </li>
                  </ul>
                </InView>
              </ScrollAct>
            </Chapter>

            <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-8 pb-20 text-sm text-neutral-ink sm:mt-32 lg:pb-8">
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
          </main>
        </div>
      </div>

      <PhoneLog stamped={stamped} hidden={closing} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
