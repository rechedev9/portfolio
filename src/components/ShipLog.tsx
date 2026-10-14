import { useSyncExternalStore } from 'react';
import type { ReactElement } from 'react';
import { SHIP_LOG_LINES } from '../data/portfolio';

function subscribeMounted(): () => void {
  return () => {};
}

function useMounted(): boolean {
  return useSyncExternalStore(subscribeMounted, () => true, () => false);
}

const FOCUS = 'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

type LogProps = {
  readonly stamped: ReadonlySet<string>;
};

function Tick(): ReactElement {
  return (
    <svg
      className="mt-[0.3125rem] size-3 shrink-0 text-accent"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path className="ship-tick" d="M1.5 6.5 4.5 9.5 10.5 2.5" />
    </svg>
  );
}

type FolioProps = LogProps & {
  readonly chapter: string;
  readonly closing: boolean;
};

export function MarginFolio({ stamped, chapter, closing }: FolioProps): ReactElement {
  const logLive = useMounted();
  return (
    <aside className="hidden lg:block print:hidden">
      <div className="sticky top-0 flex h-svh flex-col py-10">
        <p key={chapter} aria-hidden="true" className="folio-title font-serif text-[1.375rem] leading-6 italic">
          {chapter}
        </p>
        <nav
          aria-label="Shipped"
          data-log-live={logLive ? '' : undefined}
          className={`mt-12 text-[0.8125rem] leading-snug transition-[opacity,visibility] duration-300 ease-out ${closing ? 'invisible opacity-0' : ''}`}
        >
          <p className="ship-label text-neutral-ink" data-empty={stamped.size === 0 ? '' : undefined}>
            Shipped
          </p>
          <ol className="mt-4 space-y-3.5">
            {SHIP_LOG_LINES.map((line) => (
              <li key={line.id} className="ship-line" data-stamped={stamped.has(line.id) ? '' : undefined}>
                <a href={`#ship-${line.id}`} className={`group flex gap-2 ${FOCUS}`}>
                  <Tick />
                  <span>
                    <span className="block font-medium underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 group-hover:decoration-foreground/50">
                      {line.label}
                    </span>
                    <span className="block text-neutral-ink tabular-nums">{line.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </aside>
  );
}

export function PhoneLog({ stamped, hidden }: LogProps & { readonly hidden: boolean }): ReactElement {
  const last = SHIP_LOG_LINES.filter((line) => stamped.has(line.id)).at(-1);
  const shown = last !== undefined && !hidden;
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background px-6 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-[0.8125rem] leading-snug transition-[translate,opacity] duration-300 ease-out sm:px-10 lg:hidden print:hidden ${
        shown ? '' : 'translate-y-full opacity-0'
      }`}
    >
      {last === undefined ? null : (
        <p key={last.id} className="folio-title flex gap-2">
          <Tick />
          <span className="min-w-0 truncate">
            <span className="font-medium">{last.label}</span>
            <span className="text-neutral-ink tabular-nums"> · {last.detail}</span>
          </span>
        </p>
      )}
    </div>
  );
}

export function ShipRecord(): ReactElement {
  return (
    <ol data-ship-record="" className="max-w-xl border-t border-border text-[0.8125rem] leading-snug">
      {SHIP_LOG_LINES.map((line) => (
        <li key={line.id} className="grid grid-cols-[1fr_auto] gap-x-6 border-b border-border py-2.5">
          <a
            href={`#ship-${line.id}`}
            className={`font-medium underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-150 hover:decoration-foreground/50 ${FOCUS}`}
          >
            {line.label}
          </a>
          <span className="text-right text-neutral-ink tabular-nums">{line.detail}</span>
        </li>
      ))}
    </ol>
  );
}
