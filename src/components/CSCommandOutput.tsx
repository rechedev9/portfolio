import type { ReactElement } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from '../data/portfolio';

function CSSection({ title, children }: { readonly title: string; readonly children: React.ReactNode }): ReactElement {
  return (
    <div className="cs-section">
      <div className="cs-line cs-line-warning">--- {title} ---</div>
      {children}
    </div>
  );
}

function HelpOutput(): ReactElement {
  const commands = [
    { name: 'about', desc: 'Player info' },
    { name: 'skills', desc: 'Weapon loadout' },
    { name: 'experience', desc: 'Match history' },
    { name: 'projects', desc: 'Custom maps' },
    { name: 'education', desc: 'Training camp' },
    { name: 'contact', desc: 'Add to friends' },
    { name: 'clear', desc: 'Clear console' },
    { name: 'help', desc: 'Show this message' },
  ] as const;

  return (
    <div className="cs-output">
      <div className="cs-line cs-line-highlight">Available commands:</div>
      {commands.map(({ name, desc }) => (
        <div key={name} className="cs-line">
          <span className="cs-line-highlight">{name.padEnd(14)}</span>{desc}
        </div>
      ))}
    </div>
  );
}

function AboutOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="PLAYER INFO">
        <div className="cs-line">{PROFILE.summary}</div>
        <div className="cs-line">&nbsp;</div>
        <div className="cs-line">
          <span className="cs-line-highlight">Location:   </span>{PROFILE.location}
        </div>
        <div className="cs-line">
          <span className="cs-line-highlight">Languages:  </span>
          {PROFILE.languages.map(l => `${l.name} (${l.level})`).join(' | ')}
        </div>
      </CSSection>
    </div>
  );
}

function SkillsOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="WEAPON LOADOUT">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            <div className="cs-line cs-line-highlight">{category}</div>
            <div className="cs-line">  {items.join(', ')}</div>
          </div>
        ))}
      </CSSection>
    </div>
  );
}

function ExperienceOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="MATCH HISTORY">
        {EXPERIENCE.map(job => (
          <div key={job.company}>
            <div className="cs-line cs-line-highlight">{job.title}</div>
            <div className="cs-line">
              {'  @ '}
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="cs-link">
                {job.company}
              </a>
              {'  |  '}{job.period}
            </div>
            <div className="cs-line">&nbsp;</div>
            <div className="cs-line">  {job.description}</div>
            {job.highlights.map((h, i) => (
              <div key={i} className="cs-line">  - {h}</div>
            ))}
            <div className="cs-line">&nbsp;</div>
          </div>
        ))}
      </CSSection>
    </div>
  );
}

function ProjectsOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="CUSTOM MAPS">
        {PROJECTS.map(project => (
          <div key={project.name}>
            <div className="cs-line">
              <span className="cs-line-highlight">{'> '}{project.name}</span>
              {project.url ? (
                <>
                  {'  '}
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="cs-link">
                    {project.url.replace('https://', '')}
                  </a>
                </>
              ) : null}
            </div>
            <div className="cs-line cs-line-warning">  [{project.tech.join(' | ')}]</div>
            {project.highlights.map((h, i) => (
              <div key={i} className="cs-line">  - {h}</div>
            ))}
            <div className="cs-line">&nbsp;</div>
          </div>
        ))}
      </CSSection>
    </div>
  );
}

function EducationOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="TRAINING CAMP">
        {EDUCATION.map(({ title, period }) => (
          <div key={title} className="cs-line">
            {title}  <span className="cs-line-warning">[{period}]</span>
          </div>
        ))}
      </CSSection>
    </div>
  );
}

function ContactOutput(): ReactElement {
  return (
    <div className="cs-output">
      <CSSection title="ADD TO FRIENDS">
        <div className="cs-line">
          <span className="cs-line-highlight">Email:    </span>
          <a href={`mailto:${CONTACT.email}`} className="cs-link">{CONTACT.email}</a>
        </div>
        <div className="cs-line">
          <span className="cs-line-highlight">GitHub:   </span>
          <a href={`https://${CONTACT.github}`} target="_blank" rel="noopener noreferrer" className="cs-link">
            {CONTACT.github}
          </a>
        </div>
        <div className="cs-line">
          <span className="cs-line-highlight">LinkedIn: </span>
          <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener noreferrer" className="cs-link">
            {CONTACT.linkedin}
          </a>
        </div>
      </CSSection>
    </div>
  );
}

export function CSCommandOutput({ command }: { readonly command: string }): ReactElement {
  const normalized = command.trim().toLowerCase();

  switch (normalized) {
    case 'help':
      return <HelpOutput />;
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
    case 'whoami':
      return (
        <div className="cs-line cs-line-highlight">
          {PROFILE.name} — {PROFILE.title}
        </div>
      );
    case 'sudo':
      return <div className="cs-line cs-line-error">Access denied. VAC ban incoming.</div>;
    case 'ls':
      return (
        <div className="cs-line">
          about/  skills/  experience/  projects/  education/  contact/
        </div>
      );
    case 'pwd':
      return <div className="cs-line">/home/luis/de_portfolio</div>;
    case 'date':
      return <div className="cs-line">{new Date().toString()}</div>;
    default:
      return (
        <div className="cs-line cs-line-error">
          Unknown command: '{command}'. Type 'help' for available commands.
        </div>
      );
  }
}
