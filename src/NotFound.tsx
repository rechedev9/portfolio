import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { syncThemeColor } from './theme';

export function NotFound(): ReactElement {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = '404 | Luis Reche';
    document.body.classList.add('clean-body');
    syncThemeColor();
    return (): void => {
      document.body.classList.remove('clean-body');
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center px-6 sm:px-10">
      <div className="reveal mx-auto w-full max-w-[44rem]">
        <p className="label-caps">Error 404</p>
        <h1 className="mt-4 text-4xl font-normal tracking-[-0.02em] sm:text-5xl">Page not found</h1>
        <div aria-hidden="true" className="mt-6 h-px w-12 bg-accent" />
        <p className="mt-6 text-[1.2rem] leading-relaxed text-muted">
          Nothing lives at <code className="font-mono text-[0.95rem] text-foreground">{pathname}</code>.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-[0.78rem] tracking-[0.16em] text-accent uppercase underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          ← Back to luisreche.dev
        </Link>
      </div>
    </main>
  );
}
