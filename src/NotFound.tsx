import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NotFound(): ReactElement {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = '404 | Luis Reche';
  }, []);

  return (
    <main className="mx-auto flex min-h-svh max-w-5xl items-center px-6 sm:px-8">
      <div>
        <h1 className="text-neutral-ink">404</h1>
        <p className="hero-statement mt-4 font-semibold">Page not found</p>
        <p className="mt-8 text-lg text-neutral-ink">
          Nothing lives at <code className="font-mono text-base break-all text-foreground">{pathname}</code>.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-sm underline decoration-foreground/50 underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          ← Back to luisreche.dev
        </Link>
      </div>
    </main>
  );
}
