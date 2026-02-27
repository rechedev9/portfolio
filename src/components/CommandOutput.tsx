import type { ReactElement } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from '../data/portfolio';

const SECTION_HEADER_PADDING = 4; // 2 spaces on each side of the title

function SectionHeader({ title }: { readonly title: string }): ReactElement {
  const border = '─'.repeat(title.length + SECTION_HEADER_PADDING);
  return (
    <div className="text-terminal-cyan text-xs mb-3 whitespace-pre leading-tight overflow-x-auto">
      {`┌${border}┐\n│  ${title}  │\n└${border}┘`}
    </div>
  );
}

function HelpOutput(): ReactElement {
  const commands = [
    { name: 'about', desc: 'Who I am' },
    { name: 'skills', desc: 'Technical skills' },
    { name: 'experience', desc: 'Work experience' },
    { name: 'projects', desc: 'Personal projects' },
    { name: 'education', desc: 'Education & certifications' },
    { name: 'contact', desc: 'Get in touch' },
    { name: 'clear', desc: 'Clear terminal' },
    { name: 'help', desc: 'Show this message' },
  ] as const;

  return (
    <div className="text-terminal-dim">
      <div className="text-terminal-green mb-2">Available commands:</div>
      <div className="space-y-0.5">
        {commands.map(({ name, desc }) => (
          <div key={name} className="flex gap-4">
            <span className="text-terminal-cyan w-24 shrink-0">{name}</span>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="ABOUT ME" />
      <p className="mb-3 leading-relaxed">{PROFILE.summary}</p>
      <div className="space-y-0.5">
        <div className="flex gap-2">
          <span className="text-terminal-green w-20 shrink-0">Location</span>
          <span className="text-terminal-muted">→</span>
          <span>{PROFILE.location}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-terminal-green w-20 shrink-0">Languages</span>
          <span className="text-terminal-muted">→</span>
          <span>{PROFILE.languages.map(l => `${l.name} (${l.level})`).join(' · ')}</span>
        </div>
      </div>
    </div>
  );
}

function SkillsOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="TECHNICAL SKILLS" />
      <div className="space-y-2">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            <span className="text-terminal-green">{category}</span>
            <div className="ml-2">
              <span className="text-terminal-muted">→ </span>
              {items.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="WORK EXPERIENCE" />
      {EXPERIENCE.map(job => (
        <div key={job.company}>
          <div className="text-terminal-green font-bold">{job.title}</div>
          <div className="flex flex-wrap justify-between items-center mb-1 gap-2">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-cyan hover:underline"
            >
              @ {job.company}
            </a>
            <span className="text-terminal-muted text-xs">{job.period}</span>
          </div>
          <p className="text-xs mb-2 leading-relaxed">{job.description}</p>
          <div className="space-y-1 ml-1">
            {job.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-terminal-dim shrink-0">•</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="PROJECTS" />
      <div className="space-y-4">
        {PROJECTS.map(project => (
          <div key={project.name}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-terminal-green font-bold">▸ {project.name}</span>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-cyan text-xs hover:underline"
                >
                  {project.url.replace('https://', '')}
                </a>
              ) : null}
            </div>
            <div className="text-terminal-muted text-xs ml-2 mb-1">
              {project.tech.join(' · ')}
            </div>
            <div className="space-y-1 ml-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-terminal-dim shrink-0">•</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="EDUCATION" />
      <div className="space-y-1">
        {EDUCATION.map(({ title, period }) => (
          <div key={title} className="flex flex-wrap justify-between gap-2">
            <span>{title}</span>
            <span className="text-terminal-muted text-xs shrink-0">{period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactOutput(): ReactElement {
  return (
    <div className="text-terminal-dim">
      <SectionHeader title="CONTACT" />
      <div className="space-y-1">
        <div className="flex gap-2">
          <span className="text-terminal-green w-16 shrink-0">Email</span>
          <span className="text-terminal-muted">→</span>
          <a
            href={`mailto:${CONTACT.email}`}
            className="text-terminal-cyan hover:underline"
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="flex gap-2">
          <span className="text-terminal-green w-16 shrink-0">GitHub</span>
          <span className="text-terminal-muted">→</span>
          <a
            href={`https://${CONTACT.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-cyan hover:underline"
          >
            {CONTACT.github}
          </a>
        </div>
        <div className="flex gap-2">
          <span className="text-terminal-green w-16 shrink-0">Phone</span>
          <span className="text-terminal-muted">→</span>
          <span>{CONTACT.phone}</span>
        </div>
      </div>
    </div>
  );
}

export function CommandOutput({ command }: { readonly command: string }): ReactElement {
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
        <div className="text-terminal-green">
          {PROFILE.name} — {PROFILE.title}
        </div>
      );
    case 'sudo':
      return <div className="text-terminal-red">Nice try. No root access here.</div>;
    case 'ls':
      return (
        <div className="text-terminal-dim">
          <span className="text-terminal-cyan">about/</span>{' '}
          <span className="text-terminal-cyan">skills/</span>{' '}
          <span className="text-terminal-cyan">experience/</span>{' '}
          <span className="text-terminal-cyan">projects/</span>{' '}
          <span className="text-terminal-cyan">education/</span>{' '}
          <span className="text-terminal-cyan">contact/</span>
        </div>
      );
    case 'pwd':
      return <div className="text-terminal-dim">/home/luis/portfolio</div>;
    case 'date':
      return <div className="text-terminal-dim">{new Date().toString()}</div>;
    default:
      return (
        <div className="text-terminal-red">
          Command not found: {command}. Type{' '}
          <span className="text-terminal-cyan">'help'</span> for available commands.
        </div>
      );
  }
}
