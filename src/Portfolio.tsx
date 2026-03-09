import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from './data/portfolio';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: `https://${CONTACT.github}`,
    color: '#333',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: `https://${CONTACT.linkedin}`,
    color: '#0a66c2',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    color: '#e84393',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
  },
] as const;

function SectionHeading({ children }: { readonly children: string }): ReactElement {
  return (
    <div className="clean-section-heading">
      <span className="clean-section-label">/{children}</span>
      <div className="clean-section-line" />
    </div>
  );
}

function HighlightItem({ children }: { readonly children: React.ReactNode }): ReactElement {
  return (
    <div className="clean-highlight-item">
      <span className="clean-highlight-bracket" aria-hidden="true" />
      <p className="clean-highlight-text">{children}</p>
    </div>
  );
}

type Project = (typeof PROJECTS)[number];

function ProjectCategory({ title, projects }: { readonly title: string; readonly projects: readonly Project[] }): ReactElement {
  return (
    <div className="clean-project-category">
      <h3 className="clean-category-title">{title}</h3>
      {projects.map(p => (
        <div key={p.name} className="clean-project-link-row">
          {p.url ? (
            <a href={p.url} target="_blank" rel="noopener noreferrer" className="clean-project-link">
              {p.name}
            </a>
          ) : (
            <span className="clean-project-link-static">{p.name}</span>
          )}
        </div>
      ))}
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
    <div className="clean-page">
      {/* Top bar: avatar left, theme switcher right */}
      <div className="clean-topbar">
        <div className="clean-avatar">LR</div>
        <ThemeSwitcher currentTheme="clean" />
      </div>

      <main className="clean-main">
        {/* /me — Hero */}
        <section className="clean-section">
          <SectionHeading>me</SectionHeading>
          <h1 className="clean-name">{PROFILE.name}</h1>
          <p className="clean-role">
            <span className="clean-role-bracket" aria-hidden="true" />
            <strong>{PROFILE.title}</strong>, {PROFILE.summary.toLowerCase().replace('fullstack developer with experience in typescript, react, and node.js. ', '')}
          </p>
          <div className="clean-social-row">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== 'Email' ? '_blank' : undefined}
                rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="clean-social-icon"
                style={{ color: link.color }}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </section>

        {/* /highlights — Experience highlights as prose */}
        <section className="clean-section">
          <SectionHeading>highlights</SectionHeading>
          {EXPERIENCE.map(job => (
            <div key={job.company}>
              {job.highlights.map(h => (
                <HighlightItem key={h}>
                  {h}
                  {' at '}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="clean-inline-link">
                    {job.company}
                  </a>
                  .
                </HighlightItem>
              ))}
            </div>
          ))}
        </section>

        {/* /featured — Gravity Room */}
        {gravityRoom && (
          <section className="clean-section">
            <SectionHeading>featured</SectionHeading>
            <div className="clean-featured">
              <div className="clean-featured-info">
                <h3 className="clean-featured-name">Gravity Room</h3>
                <p className="clean-featured-desc">
                  A fullstack fitness app for tracking workouts and strength progression.
                </p>
                <div className="clean-featured-tech">
                  {gravityRoom.tech.map(t => (
                    <span key={t} className="clean-tech-pill">{t}</span>
                  ))}
                </div>
              </div>
              {gravityRoom.url && (
                <a href={gravityRoom.url} target="_blank" rel="noopener noreferrer" className="clean-featured-cta">
                  Visit Gravity Room &nearr;
                </a>
              )}
            </div>
          </section>
        )}

        {/* /projects */}
        <section className="clean-section">
          <SectionHeading>projects</SectionHeading>
          <div className="clean-projects-grid">
            <ProjectCategory title="Web Apps" projects={otherProjects.filter(p => p.tech.some(t => t.includes('TypeScript')))} />
          </div>
        </section>

        {/* /skills */}
        <section className="clean-section">
          <SectionHeading>skills</SectionHeading>
          <div className="clean-skills-grid">
            {SKILLS.map(group => (
              <div key={group.category} className="clean-skill-group">
                <h3 className="clean-skill-category">{group.category}</h3>
                <div className="clean-skill-pills">
                  {group.items.map(item => (
                    <span key={item} className="clean-tech-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* /education */}
        <section className="clean-section">
          <SectionHeading>education</SectionHeading>
          {EDUCATION.map(e => (
            <HighlightItem key={e.title}>
              <strong>{e.title}</strong>
              <span className="clean-education-period"> &middot; {e.period}</span>
            </HighlightItem>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="clean-footer">
        luisreche.dev &middot; 2026
      </footer>
    </div>
  );
}
