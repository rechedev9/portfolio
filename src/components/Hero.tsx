import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import '../hero.css';

export type HeroLink = {
  readonly label: string;
  readonly href: string;
  readonly download?: boolean | string;
};

export type HeroStep = {
  readonly label: string;
  readonly text: string;
};

export type HeroFlagship = {
  readonly kicker: string;
  readonly name: string;
  readonly detail: string;
  readonly href: string;
};

export type HeroProps = {
  readonly name: string;
  readonly role: string;
  readonly headline: string;
  readonly subhead: string;
  readonly status?: { readonly label: string; readonly href?: string };
  readonly location?: string;
  readonly proofPoints: readonly string[];
  readonly ctas: {
    readonly projects: HeroLink;
    readonly cv: HeroLink;
    readonly contact: HeroLink;
  };
  readonly pipelineTitle?: string;
  readonly pipeline?: readonly HeroStep[];
  readonly flagship?: HeroFlagship;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Hero({
  name,
  role,
  headline,
  subhead,
  status,
  location,
  proofPoints,
  ctas,
  pipelineTitle = 'ClipHub',
  pipeline = [],
  flagship,
}: HeroProps): ReactElement {
  const [shown, setShown] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? pipeline.length
      : 0,
  );
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const root = document.getElementById('hero');
    if (!root || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry?.isIntersecting ?? true),
      { threshold: 0.05 },
    );
    io.observe(root);
    return (): void => io.disconnect();
  }, []);

  useEffect(() => {
    if (pipeline.length === 0 || prefersReducedMotion()) return;
    const timers = pipeline.map((_, index) =>
      window.setTimeout(() => setShown(index + 1), 280 + index * 620),
    );
    return (): void => {
      for (const timer of timers) window.clearTimeout(timer);
    };
  }, [pipeline]);

  const pipelineText = pipeline.map((step) => `${step.label}: ${step.text}`).join('. ');

  return (
    <section id="hero" className={`hero${onScreen ? '' : ' is-paused'}`} aria-labelledby="hero-heading">
      <div className="hero-stage" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-orb hero-orb-c" />
      </div>

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-reveal hero-kicker" style={{ animationDelay: '40ms' }}>
            {location ? <span>{location}</span> : null}
            {location && status ? <span className="hero-dot" aria-hidden="true" /> : null}
            {status ? (
              status.href ? (
                <a href={status.href} target="_blank" rel="noopener noreferrer">
                  {status.label}
                </a>
              ) : (
                <span>{status.label}</span>
              )
            ) : null}
          </p>

          <h1 id="hero-heading" className="hero-title">
            <span className="hero-reveal hero-name" style={{ animationDelay: '90ms' }}>
              {name}
            </span>
            <span className="hero-reveal hero-role" style={{ animationDelay: '180ms' }}>
              {role}
            </span>
          </h1>

          <p className="hero-reveal hero-headline" style={{ animationDelay: '280ms' }}>
            {headline}
          </p>
          <p className="hero-reveal hero-sub" style={{ animationDelay: '380ms' }}>
            {subhead}
          </p>

          <div className="hero-reveal hero-ctas" style={{ animationDelay: '480ms' }}>
            <a className="hero-btn hero-btn-primary" href={ctas.projects.href}>
              <span>{ctas.projects.label}</span>
            </a>
            <a
              className="hero-btn hero-btn-secondary"
              href={ctas.cv.href}
              download={ctas.cv.download || undefined}
            >
              {ctas.cv.label}
            </a>
            <a className="hero-btn hero-btn-ghost" href={ctas.contact.href}>
              {ctas.contact.label}
            </a>
          </div>

          <ul className="hero-reveal hero-chips" style={{ animationDelay: '560ms' }}>
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        {pipeline.length > 0 ? (
          <div className="hero-reveal hero-panel-wrap" style={{ animationDelay: '320ms' }}>
            <p className="sr-only">{pipelineText}</p>
            <div className="hero-panel" aria-hidden="true">
              <div className="hero-panel-bar">
                <span className="hero-panel-dots" />
                <span className="hero-panel-title">{pipelineTitle}</span>
              </div>
              <ol className="hero-pipeline">
                {pipeline.map((step, index) => (
                  <li key={step.label} className={index < shown ? 'is-on' : undefined}>
                    <span className="hero-step-index">{String(index + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="hero-step-label">{step.label}</span>
                      <span className="hero-step-text">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}
      </div>

      {flagship ? (
        <a className="hero-flagship" href={flagship.href}>
          <span className="hero-flagship-kicker">{flagship.kicker}</span>
          <span className="hero-flagship-name">{flagship.name}</span>
          <span className="hero-flagship-detail">{flagship.detail}</span>
          <span className="hero-flagship-go" aria-hidden="true">
            →
          </span>
        </a>
      ) : null}
    </section>
  );
}
