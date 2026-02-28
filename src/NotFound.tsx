import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function NotFound(): ReactElement {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = '404 | Luis Reche';
  }, []);

  return (
    <main className="min-h-screen bg-terminal-bg flex items-center justify-center font-mono text-terminal-green p-4">
      <div className="max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-terminal-dim mb-2">{'>'} cd {pathname}</p>
        <p className="text-terminal-red mb-6">
          bash: cd: {pathname}: No such file or directory
        </p>
        <p className="text-terminal-dim mb-1">Available routes:</p>
        <ul className="mb-6 space-y-1">
          <li>
            <Link to="/" className="underline hover:text-terminal-cyan">
              /
            </Link>
            {' — Matrix Terminal'}
          </li>
          <li>
            <Link to="/cs" className="underline hover:text-terminal-cyan">
              /cs
            </Link>
            {' — CS 1.6'}
          </li>
          <li>
            <Link to="/pokemon" className="underline hover:text-terminal-cyan">
              /pokemon
            </Link>
            {' — Pokémon'}
          </li>
        </ul>
        <p className="animate-blink">█</p>
      </div>
    </main>
  );
}
