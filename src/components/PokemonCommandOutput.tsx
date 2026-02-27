import type { ReactElement } from 'react';
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, CONTACT } from '../data/portfolio';

const TYPE_MAP: Record<string, string> = {
  'Languages & Frameworks': 'ELECTRIC',
  'Backend & APIs': 'FIRE',
  'Databases': 'WATER',
  'DevOps': 'STEEL',
  'Testing': 'PSYCHIC',
  'Other': 'NORMAL',
};

function PokeSection({ title, children }: { readonly title: string; readonly children: React.ReactNode }): ReactElement {
  return (
    <div className="poke-section">
      <div className="poke-line poke-line-title">{title}</div>
      <div className="poke-divider" />
      {children}
    </div>
  );
}

function HelpOutput(): ReactElement {
  const commands = [
    { name: 'about', desc: 'Trainer info' },
    { name: 'skills', desc: 'Moves list' },
    { name: 'experience', desc: 'Battle log' },
    { name: 'projects', desc: 'Pokemon caught' },
    { name: 'education', desc: 'Badges earned' },
    { name: 'contact', desc: 'PC Box' },
    { name: 'clear', desc: 'Clear screen' },
    { name: 'help', desc: 'Show this' },
  ] as const;

  return (
    <div className="poke-output poke-dialogue">
      <div className="poke-line poke-line-title">COMMANDS</div>
      <div className="poke-divider" />
      {commands.map(({ name, desc }) => (
        <div key={name} className="poke-line">
          <span className="poke-line-highlight">{`${name.toUpperCase().padEnd(14)}`}</span>{desc}
        </div>
      ))}
    </div>
  );
}

function AboutOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="TRAINER INFO">
        <div className="poke-trainer-card">
          <div className="poke-line">
            <span className="poke-line-highlight">NAME:    </span>{PROFILE.name.toUpperCase()}
          </div>
          <div className="poke-line">
            <span className="poke-line-highlight">CLASS:   </span>{PROFILE.title}
          </div>
          <div className="poke-line">
            <span className="poke-line-highlight">REGION:  </span>{PROFILE.location}
          </div>
          <div className="poke-line">&nbsp;</div>
          <div className="poke-line">{PROFILE.summary}</div>
          <div className="poke-line">&nbsp;</div>
          <div className="poke-line poke-line-highlight">LANGUAGES:</div>
          {PROFILE.languages.map(l => (
            <div key={l.name} className="poke-line">
              {'  '}{l.name} — {l.level}
            </div>
          ))}
        </div>
      </PokeSection>
    </div>
  );
}

function SkillsOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="MOVES">
        {SKILLS.map(({ category, items }) => {
          const type = TYPE_MAP[category] ?? 'NORMAL';
          return (
            <div key={category} className="poke-move-group">
              <div className="poke-line">
                <span className={`poke-type-badge poke-type-${type.toLowerCase()}`}>
                  {type}
                </span>
                {' '}{category}
              </div>
              <div className="poke-line poke-move-list">
                {'  '}{items.join(', ')}
              </div>
            </div>
          );
        })}
      </PokeSection>
    </div>
  );
}

function ExperienceOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="BATTLE LOG">
        {EXPERIENCE.map(job => (
          <div key={job.company} className="poke-battle-entry">
            <div className="poke-line poke-line-highlight">
              {job.title.toUpperCase()}
            </div>
            <div className="poke-line">
              {'  @ '}
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="poke-link">
                {job.company}
              </a>
              {'  |  '}{job.period}
            </div>
            <div className="poke-line">&nbsp;</div>
            <div className="poke-hp-bar">
              <div className="poke-hp-label">EXP</div>
              <div className="poke-hp-track">
                <div className="poke-hp-fill" />
              </div>
            </div>
            <div className="poke-line">&nbsp;</div>
            <div className="poke-line">{job.description}</div>
            <div className="poke-line">&nbsp;</div>
            <div className="poke-line poke-line-effective">It{"'"}s super effective!</div>
            {job.highlights.map((h, i) => (
              <div key={i} className="poke-line">{'  '}* {h}</div>
            ))}
            <div className="poke-line">&nbsp;</div>
          </div>
        ))}
      </PokeSection>
    </div>
  );
}

function ProjectsOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="POKEMON CAUGHT">
        {PROJECTS.map((project, idx) => (
          <div key={project.name} className="poke-dex-entry">
            <div className="poke-line poke-line-highlight">
              No. {String(idx + 1).padStart(3, '0')} {project.name.toUpperCase()}
            </div>
            {project.url ? (
              <div className="poke-line">
                {'  '}
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="poke-link">
                  {project.url.replace('https://', '')}
                </a>
              </div>
            ) : null}
            <div className="poke-line poke-line-type">
              {'  TYPE: '}{project.tech.join(' / ')}
            </div>
            {project.highlights.map((h, i) => (
              <div key={i} className="poke-line">{'  '}* {h}</div>
            ))}
            <div className="poke-line">&nbsp;</div>
          </div>
        ))}
      </PokeSection>
    </div>
  );
}

function EducationOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="BADGES EARNED">
        {EDUCATION.map(({ title, period }) => (
          <div key={title} className="poke-badge-entry">
            <div className="poke-line">
              <span className="poke-badge-icon" />
              {' '}{title}
            </div>
            <div className="poke-line poke-line-dim">{'  '}{period}</div>
          </div>
        ))}
      </PokeSection>
    </div>
  );
}

function ContactOutput(): ReactElement {
  return (
    <div className="poke-output poke-dialogue">
      <PokeSection title="PC BOX">
        <div className="poke-line">LUIS accessed the PC!</div>
        <div className="poke-line">&nbsp;</div>
        <div className="poke-line">
          <span className="poke-line-highlight">EMAIL:    </span>
          <a href={`mailto:${CONTACT.email}`} className="poke-link">{CONTACT.email}</a>
        </div>
        <div className="poke-line">
          <span className="poke-line-highlight">GITHUB:   </span>
          <a href={`https://${CONTACT.github}`} target="_blank" rel="noopener noreferrer" className="poke-link">
            {CONTACT.github}
          </a>
        </div>
        <div className="poke-line">
          <span className="poke-line-highlight">LINKEDIN: </span>
          <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noopener noreferrer" className="poke-link">
            {CONTACT.linkedin}
          </a>
        </div>
      </PokeSection>
    </div>
  );
}

export function PokemonCommandOutput({ command }: { readonly command: string }): ReactElement {
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
        <div className="poke-output poke-dialogue">
          <div className="poke-line poke-line-highlight">
            ASH-- I mean, LUIS RECHE
          </div>
        </div>
      );
    case 'sudo':
      return (
        <div className="poke-output poke-dialogue">
          <div className="poke-line poke-line-error">
            Wild MISSINGNO. appeared!
          </div>
          <div className="poke-line poke-line-error">
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608; GLITCH &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </div>
        </div>
      );
    case 'ls':
      return (
        <div className="poke-output poke-dialogue">
          <div className="poke-line">
            about/  skills/  experience/  projects/  education/  contact/
          </div>
        </div>
      );
    case 'pwd':
      return (
        <div className="poke-output poke-dialogue">
          <div className="poke-line">/home/luis/pallet-town</div>
        </div>
      );
    case 'date':
      return (
        <div className="poke-output poke-dialogue">
          <div className="poke-line">{new Date().toString()}</div>
        </div>
      );
    default:
      return (
        <div className="poke-output poke-dialogue">
          <div className="poke-line poke-line-error">
            {"'"}{command}{"'"} is not a known MOVE! Type {"'"}help{"'"} for commands.
          </div>
        </div>
      );
  }
}
