import type { ReactElement } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from '../data/portfolio';

function CSHeader({ title }: { readonly title: string }): ReactElement {
  const border = '═'.repeat(title.length + 4);
  return (
    <div className="cs-text-amber text-xs mb-3 whitespace-pre leading-tight overflow-x-auto">
      {`╔${border}╗\n║  ${title}  ║\n╚${border}╝`}
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
    { name: 'help', desc: 'Show commands' },
  ] as const;

  return (
    <div className="text-[#c8c8a8]">
      <div className="cs-text-amber mb-2">Available commands:</div>
      <div className="space-y-0.5">
        {commands.map(({ name, desc }) => (
          <div key={name} className="flex gap-4">
            <span className="cs-text-green w-24 shrink-0">{name}</span>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutOutput(): ReactElement {
  return (
    <div className="text-[#c8c8a8]">
      <CSHeader title="PLAYER INFO" />
      <p className="mb-3 leading-relaxed">{PROFILE.summary}</p>
      <div className="space-y-0.5">
        <div className="flex gap-2">
          <span className="cs-text-amber w-20 shrink-0">Location</span>
          <span className="text-[#8a8a6a]">»</span>
          <span>{PROFILE.location}</span>
        </div>
        <div className="flex gap-2">
          <span className="cs-text-amber w-20 shrink-0">Languages</span>
          <span className="text-[#8a8a6a]">»</span>
          <span>{PROFILE.languages.map(l => `${l.name} (${l.level})`).join(' · ')}</span>
        </div>
      </div>
    </div>
  );
}

function SkillsOutput(): ReactElement {
  return (
    <div className="text-[#c8c8a8]">
      <CSHeader title="WEAPON LOADOUT" />
      <div className="space-y-2">
        {SKILLS.map(({ category, items }) => (
          <div key={category}>
            <span className="cs-text-amber">{category}</span>
            <div className="ml-2">
              <span className="text-[#8a8a6a]">» </span>
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
    <div className="text-[#c8c8a8]">
      <CSHeader title="MATCH HISTORY" />
      {EXPERIENCE.map(job => (
        <div key={job.company}>
          <div className="cs-text-amber font-bold">{job.title}</div>
          <div className="flex flex-wrap justify-between items-center mb-1 gap-2">
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cs-text-green hover:underline"
            >
              @ {job.company}
            </a>
            <span className="text-[#8a8a6a] text-xs">{job.period}</span>
          </div>
          <p className="text-xs mb-2 leading-relaxed">{job.description}</p>
          <div className="space-y-1 ml-1">
            {job.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-[#8a8a6a] shrink-0">»</span>
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
    <div className="text-[#c8c8a8]">
      <CSHeader title="CUSTOM MAPS" />
      <div className="space-y-4">
        {PROJECTS.map(project => (
          <div key={project.name}>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="cs-text-amber font-bold">▸ {project.name}</span>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-text-green text-xs hover:underline"
                >
                  {project.url.replace('https://', '')}
                </a>
              ) : null}
            </div>
            <div className="text-[#8a8a6a] text-xs ml-2 mb-1">
              {project.tech.join(' · ')}
            </div>
            <div className="space-y-1 ml-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-[#8a8a6a] shrink-0">»</span>
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
    <div className="text-[#c8c8a8]">
      <CSHeader title="TRAINING CAMP" />
      <div className="space-y-1">
        {EDUCATION.map(({ title, period }) => (
          <div key={title} className="flex flex-wrap justify-between gap-2">
            <span>{title}</span>
            <span className="text-[#8a8a6a] text-xs shrink-0">{period}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactOutput(): ReactElement {
  return (
    <div className="text-[#c8c8a8]">
      <CSHeader title="ADD TO FRIENDS" />
      <div className="space-y-1">
        <div className="flex gap-2">
          <span className="cs-text-amber w-16 shrink-0">Email</span>
          <span className="text-[#8a8a6a]">»</span>
          <a
            href={`mailto:${CONTACT.email}`}
            className="cs-text-green hover:underline"
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="flex gap-2">
          <span className="cs-text-amber w-16 shrink-0">GitHub</span>
          <span className="text-[#8a8a6a]">»</span>
          <a
            href={`https://${CONTACT.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-text-green hover:underline"
          >
            {CONTACT.github}
          </a>
        </div>
        <div className="flex gap-2">
          <span className="cs-text-amber w-16 shrink-0">LinkedIn</span>
          <span className="text-[#8a8a6a]">»</span>
          <a
            href={`https://${CONTACT.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="cs-text-green hover:underline"
          >
            {CONTACT.linkedin}
          </a>
        </div>
      </div>
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
        <div className="cs-text-amber">
          {PROFILE.name} — {PROFILE.title}
        </div>
      );
    case 'sudo':
      return <div className="text-red-400">Access denied. VAC ban incoming.</div>;
    case 'ls':
      return (
        <div className="text-[#c8c8a8]">
          <span className="cs-text-green">about/</span>{' '}
          <span className="cs-text-green">skills/</span>{' '}
          <span className="cs-text-green">experience/</span>{' '}
          <span className="cs-text-green">projects/</span>{' '}
          <span className="cs-text-green">education/</span>{' '}
          <span className="cs-text-green">contact/</span>
        </div>
      );
    case 'pwd':
      return <div className="text-[#c8c8a8]">/home/luis/de_portfolio</div>;
    case 'date':
      return <div className="text-[#c8c8a8]">{new Date().toString()}</div>;
    default:
      return (
        <div className="text-red-400">
          Unknown command: {command}. Type{' '}
          <span className="cs-text-amber">'help'</span> for available commands.
        </div>
      );
  }
}
