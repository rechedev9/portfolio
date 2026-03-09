import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from './data/portfolio';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: `https://${CONTACT.github}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: `https://${CONTACT.linkedin}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </svg>
    ),
  },
] as const;

const THEME_LINKS = [
  { path: '/matrix', label: 'Matrix', icon: '\u{1F7E2}' },
  { path: '/cs', label: 'CS 1.6', icon: '\u{1F52B}' },
  { path: '/pokemon', label: 'Pokemon', icon: '\u26A1' },
] as const;

function SectionHeading({ children }: { readonly children: string }): ReactElement {
  return (
    <h2 className="clean-section-heading">
      <span className="clean-slash">/</span>{children}
    </h2>
  );
}

function gravityRoomProject(): Project | undefined {
  return PROJECTS.find(p => p.name === 'Workout Tracker');
}

type Project = (typeof PROJECTS)[number];

function ProjectCard({ project, featured }: { readonly project: Project; readonly featured?: boolean }): ReactElement {
  return (
    <div className={featured ? 'clean-project clean-project--featured' : 'clean-project'}>
      <div className="clean-project-header">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="clean-project-name">
            {featured ? 'Gravity Room' : project.name}
            <span className="clean-arrow" aria-hidden="true">&thinsp;&nearr;</span>
          </a>
        ) : (
          <span className="clean-project-name">{project.name}</span>
        )}
      </div>
      {featured && (
        <p className="clean-project-tagline">
          A fullstack fitness app for tracking workouts and strength progression.
        </p>
      )}
      <div className="clean-tech-list">
        {project.tech.map(t => (
          <span key={t} className="clean-tech-badge">{t}</span>
        ))}
      </div>
      <ul className="clean-highlights">
        {project.highlights.map(h => (
          <li key={h}>{h}</li>
        ))}
      </ul>
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

  const featured = gravityRoomProject();
  const otherProjects = PROJECTS.filter(p => p.name !== 'Workout Tracker');

  return (
    <div className="clean-page">
      {/* Header */}
      <header className="clean-header">
        <span className="clean-header-name">Luis Reche</span>
        <nav className="clean-header-links" aria-label="Social links">
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              target={link.label !== 'Email' ? '_blank' : undefined}
              rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
              className="clean-social-link"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </nav>
      </header>

      <main className="clean-main">
        {/* Hero */}
        <section className="clean-hero">
          <h1 className="clean-hero-name">{PROFILE.name}</h1>
          <p className="clean-hero-title">{PROFILE.title}</p>
          <p className="clean-hero-meta">
            {PROFILE.location} &middot; {PROFILE.languages.map(l => l.name).join(', ')}
          </p>
        </section>

        {/* About */}
        <section className="clean-section">
          <SectionHeading>about</SectionHeading>
          <p className="clean-text">{PROFILE.summary}</p>
        </section>

        {/* Experience */}
        <section className="clean-section">
          <SectionHeading>experience</SectionHeading>
          {EXPERIENCE.map(job => (
            <div key={job.company} className="clean-experience">
              <div className="clean-experience-header">
                <div>
                  <span className="clean-experience-title">{job.title}</span>
                  <span className="clean-experience-at"> at </span>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="clean-experience-company">
                    {job.company}
                  </a>
                </div>
                <span className="clean-experience-period">{job.period}</span>
              </div>
              <p className="clean-text">{job.description}</p>
              <ul className="clean-highlights">
                {job.highlights.map(h => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Featured Project — Gravity Room */}
        {featured && (
          <section className="clean-section">
            <SectionHeading>featured</SectionHeading>
            <ProjectCard project={featured} featured />
          </section>
        )}

        {/* Other Projects */}
        <section className="clean-section">
          <SectionHeading>projects</SectionHeading>
          <div className="clean-projects-grid">
            {otherProjects.map(p => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="clean-section">
          <SectionHeading>skills</SectionHeading>
          <div className="clean-skills">
            {SKILLS.map(group => (
              <div key={group.category} className="clean-skill-group">
                <h3 className="clean-skill-category">{group.category}</h3>
                <div className="clean-tech-list">
                  {group.items.map(item => (
                    <span key={item} className="clean-tech-badge">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="clean-section">
          <SectionHeading>education</SectionHeading>
          <div className="clean-education-list">
            {EDUCATION.map(e => (
              <div key={e.title} className="clean-education-item">
                <span className="clean-education-title">{e.title}</span>
                <span className="clean-education-period">{e.period}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="clean-footer">
        <div className="clean-footer-top">
          <span className="clean-footer-copy">luisreche.dev &middot; 2026</span>
          <div className="clean-footer-themes">
            {THEME_LINKS.map(t => (
              <Link key={t.path} to={t.path} className="clean-theme-link">
                <span aria-hidden="true">{t.icon}</span> {t.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
