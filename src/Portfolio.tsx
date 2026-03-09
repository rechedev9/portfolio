import type { ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from './data/portfolio';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: `https://${CONTACT.github}`,
    color: '#24292f',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: `https://${CONTACT.linkedin}`,
    color: '#0a66c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    color: '#d4585a',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
  },
] as const;

function Section({ children, delay }: { readonly children: ReactNode; readonly delay: number }): ReactElement {
  return (
    <section className="p-section" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </section>
  );
}

function SectionHeading({ children }: { readonly children: string }): ReactElement {
  return (
    <div className="p-heading">
      <span className="p-heading__label">/{children}</span>
      <div className="p-heading__line" />
    </div>
  );
}

function Bracket(): ReactElement {
  return <span className="p-bracket" aria-hidden="true" />;
}

function HighlightItem({ children }: { readonly children: ReactNode }): ReactElement {
  return (
    <div className="p-highlight">
      <Bracket />
      <p className="p-highlight__text">{children}</p>
    </div>
  );
}

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project, category }: { readonly project: Project; readonly category: string }): ReactElement {
  return (
    <div className="p-card">
      <h3 className="p-card__category">{category}</h3>
      {project.url ? (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-card__link">
          {project.name}
        </a>
      ) : (
        <span className="p-card__name">{project.name}</span>
      )}
    </div>
  );
}

export function Portfolio(): ReactElement {
  useEffect(() => {
    document.title = 'Luis Reche | Fullstack Developer';
    document.body.classList.add('clean-body');
    return (): void => {
      document.body.classList.remove('clean-body');
    };
  }, []);

  const gravityRoom = PROJECTS.find(p => p.name === 'Workout Tracker');
  const otherProjects = PROJECTS.filter(p => p.name !== 'Workout Tracker');

  return (
    <div className="p-page">
      {/* Top bar */}
      <div className="p-topbar" style={{ animationDelay: '0ms' }}>
        <div className="p-avatar" />
        <ThemeSwitcher currentTheme="clean" />
      </div>

      <main>
        {/* /me */}
        <Section delay={60}>
          <SectionHeading>me</SectionHeading>
          <h1 className="p-name">{PROFILE.name}</h1>
          <div className="p-intro">
            <Bracket />
            <p className="p-intro__text">
              <strong>{PROFILE.title}</strong>
              <span className="p-intro__dim">, focused on code quality, testing, and continuous delivery. Based in {PROFILE.location}.</span>
            </p>
          </div>
          <div className="p-socials">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="p-socials__icon"
                style={{ color: link.color }}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </Section>

        {/* /highlights */}
        <Section delay={140}>
          <SectionHeading>highlights</SectionHeading>
          {EXPERIENCE.map(job => (
            <div key={job.company}>
              {job.highlights.map(h => (
                <HighlightItem key={h}>
                  {h} at{' '}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="p-link">
                    {job.company}
                  </a>
                  .
                </HighlightItem>
              ))}
            </div>
          ))}
        </Section>

        {/* /featured */}
        {gravityRoom && (
          <Section delay={220}>
            <SectionHeading>featured</SectionHeading>
            <div className="p-featured">
              <div className="p-featured__body">
                <h3 className="p-featured__title">Gravity Room</h3>
                <p className="p-featured__desc">
                  A fullstack fitness app for tracking workouts and strength progression.
                </p>
                <div className="p-pills">
                  {gravityRoom.tech.slice(0, 5).map(t => (
                    <span key={t} className="p-pill">{t}</span>
                  ))}
                  {gravityRoom.tech.length > 5 && (
                    <span className="p-pill p-pill--more">+{gravityRoom.tech.length - 5}</span>
                  )}
                </div>
              </div>
              {gravityRoom.url && (
                <a href={gravityRoom.url} target="_blank" rel="noopener noreferrer" className="p-featured__cta">
                  Visit Gravity Room
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}
            </div>
          </Section>
        )}

        {/* /projects */}
        <Section delay={300}>
          <SectionHeading>projects</SectionHeading>
          <div className="p-grid">
            {otherProjects.map(p => (
              <ProjectCard
                key={p.name}
                project={p}
                category={p.tech.some(t => t.includes('Chrome')) ? 'Browser Extensions' : 'Tools'}
              />
            ))}
          </div>
        </Section>

        {/* /skills */}
        <Section delay={380}>
          <SectionHeading>skills</SectionHeading>
          <div className="p-skills">
            {SKILLS.map(group => (
              <div key={group.category} className="p-skills__group">
                <h3 className="p-skills__category">{group.category}</h3>
                <div className="p-pills">
                  {group.items.map(item => (
                    <span key={item} className="p-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* /education */}
        <Section delay={460}>
          <SectionHeading>education</SectionHeading>
          {EDUCATION.map(e => (
            <HighlightItem key={e.title}>
              <strong>{e.title}</strong>
              <span className="p-dim"> &middot; {e.period}</span>
            </HighlightItem>
          ))}
        </Section>
      </main>

      {/* Footer */}
      <footer className="p-footer" style={{ animationDelay: '520ms' }}>
        luisreche.dev &middot; 2026
      </footer>
    </div>
  );
}
