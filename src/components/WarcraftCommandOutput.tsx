import type { ReactElement } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from '../data/portfolio';

function AboutOutput(): ReactElement {
  return (
    <div className="wc3-output">
      <div className="wc3-stat-row">
        <span className="wc3-label">Hero</span>
        <span className="wc3-value">{PROFILE.name}</span>
      </div>
      <div className="wc3-stat-row">
        <span className="wc3-label">Class</span>
        <span className="wc3-value">{PROFILE.title}</span>
      </div>
      <div className="wc3-stat-row">
        <span className="wc3-label">Location</span>
        <span className="wc3-value">{PROFILE.location}</span>
      </div>
      <div className="wc3-divider" />
      <p className="wc3-text">{PROFILE.summary}</p>
      <div className="wc3-divider" />
      <div className="wc3-stat-row">
        <span className="wc3-label">Languages</span>
        <span className="wc3-value">
          {PROFILE.languages.map(l => `${l.name} (${l.level})`).join(' | ')}
        </span>
      </div>
    </div>
  );
}

function SkillsOutput(): ReactElement {
  return (
    <div className="wc3-output">
      {SKILLS.map(({ category, items }) => (
        <div key={category} className="wc3-spell-group">
          <div className="wc3-spell-school">{category}</div>
          <div className="wc3-spell-list">
            {items.map(item => (
              <span key={item} className="wc3-spell-tag">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceOutput(): ReactElement {
  return (
    <div className="wc3-output">
      {EXPERIENCE.map(job => (
        <div key={job.company} className="wc3-quest-entry">
          <div className="wc3-quest-title">{job.title}</div>
          <div className="wc3-quest-meta">
            <a href={job.url} target="_blank" rel="noopener noreferrer" className="wc3-link">
              {job.company}
            </a>
            <span className="wc3-quest-period">{job.period}</span>
          </div>
          <p className="wc3-text">{job.description}</p>
          <ul className="wc3-quest-highlights">
            {job.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput(): ReactElement {
  return (
    <div className="wc3-output">
      {PROJECTS.map(project => (
        <div key={project.name} className="wc3-quest-entry">
          <div className="wc3-quest-title">
            {project.name}
            {project.url ? (
              <>
                {' — '}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="wc3-link">
                  {project.url.replace('https://', '')}
                </a>
              </>
            ) : null}
          </div>
          <div className="wc3-tech-row">
            {project.tech.map(t => (
              <span key={t} className="wc3-spell-tag">{t}</span>
            ))}
          </div>
          <ul className="wc3-quest-highlights">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function EducationOutput(): ReactElement {
  return (
    <div className="wc3-output">
      {EDUCATION.map(({ title, period }) => (
        <div key={title} className="wc3-quest-entry wc3-edu-entry">
          <div className="wc3-quest-title">{title}</div>
          <div className="wc3-quest-period">{period}</div>
        </div>
      ))}
    </div>
  );
}

function ContactOutput(): ReactElement {
  return (
    <div className="wc3-output">
      <div className="wc3-stat-row">
        <span className="wc3-label">Email</span>
        <a href={`mailto:${CONTACT.email}`} className="wc3-link">{CONTACT.email}</a>
      </div>
      <div className="wc3-stat-row">
        <span className="wc3-label">GitHub</span>
        <a href={`https://${CONTACT.github}`} target="_blank" rel="noopener noreferrer" className="wc3-link">
          {CONTACT.github}
        </a>
      </div>
      <div className="wc3-stat-row">
        <span className="wc3-label">LinkedIn</span>
        <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener noreferrer" className="wc3-link">
          {CONTACT.linkedin}
        </a>
      </div>
    </div>
  );
}

export function WarcraftCommandOutput({ command }: { readonly command: string }): ReactElement {
  const normalized = command.trim().toLowerCase();

  switch (normalized) {
    case 'about':
      return <AboutOutput />;
    case 'skills':
      return <SkillsOutput />;
    case 'experience':
      return <ExperienceOutput />;
    case 'projects':
      return <ProjectsOutput />;
    case 'education':
      return <EducationOutput />;
    case 'contact':
      return <ContactOutput />;
    default:
      return <AboutOutput />;
  }
}
