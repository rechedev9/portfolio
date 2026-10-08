import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NotFound(): ReactElement {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = '404 | Luis Reche';
    document.body.classList.add('clean-body');
    return (): void => {
      document.body.classList.remove('clean-body');
    };
  }, []);

  return (
    <main className="flex min-h-screen items-center p-6 sm:p-12 md:p-16">
      <div className="reveal mx-auto w-full md:max-w-[37.5rem]">
        <h1 className="font-mono text-2xl text-neutral-500 opacity-75 dark:text-neutral-300">
          /404
        </h1>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-accent">Page not found</p>
        <p className="mt-3 text-xl leading-relaxed text-gray-500 dark:text-gray-400">
          Nothing lives at{' '}
          <code className="font-mono text-base text-black dark:text-white">{pathname}</code>.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block rounded border-2 border-dashed border-border px-3 py-2 font-mono text-sm text-black transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-white dark:hover:bg-neutral-900"
        >
          ← Back to luisreche.dev
        </Link>
      </div>
    </main>
  );
}
