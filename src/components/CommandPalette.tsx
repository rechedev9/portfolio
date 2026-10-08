import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactElement, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { CONTACT, PROFILE, SELECTED_WORK } from '../data/portfolio';
import { toggleTheme } from '../theme';

type PaletteItem = {
  readonly id: string;
  readonly label: string;
  readonly hint: string;
  readonly keywords?: string;
  readonly action: () => void;
};

type CommandPaletteProps = {
  readonly open: boolean;
  readonly onClose: () => void;
};

function scrollToId(id: string): void {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function CommandPalette({ open, onClose }: CommandPaletteProps): ReactElement | null {
  // Mounting the dialog only while open gives it fresh query/activeIndex state
  // on every open, so no reset-in-effect is needed.
  if (!open) return null;
  return <CommandPaletteDialog onClose={onClose} />;
}

function CommandPaletteDialog({ onClose }: { readonly onClose: () => void }): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo<readonly PaletteItem[]>(
    () => [
      {
        id: 'me',
        label: 'Go to top',
        hint: 'section',
        keywords: 'about profile intro',
        action: () => scrollToId('me'),
      },
      {
        id: 'experience',
        label: 'Go to Experience',
        hint: 'section',
        keywords: 'agentero career work',
        action: () => scrollToId('experience'),
      },
      {
        id: 'work',
        label: 'Go to Selected work',
        hint: 'section',
        keywords: 'projects products',
        action: () => scrollToId('work'),
      },
      {
        id: 'education',
        label: 'Go to Education',
        hint: 'section',
        keywords: 'courses diploma',
        action: () => scrollToId('education'),
      },
      ...SELECTED_WORK.map((work) => ({
        id: `work-${work.name}`,
        label: `Open ${work.name}`,
        hint: 'site',
        keywords: `${work.description} ${work.domain}`,
        action: () => window.open(work.href, '_blank', 'noopener,noreferrer'),
      })),
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'link',
        action: () => window.open(CONTACT.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        hint: 'link',
        action: () => window.open(CONTACT.linkedin, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'email',
        label: `Email ${CONTACT.email}`,
        hint: 'link',
        keywords: 'mail contact',
        action: () => {
          window.location.href = `mailto:${CONTACT.email}`;
        },
      },
      {
        id: 'cv',
        label: 'Download CV',
        hint: 'link',
        keywords: 'resume pdf',
        action: () => {
          const a = document.createElement('a');
          a.href = CONTACT.cv;
          a.download = CONTACT.cvFileName;
          a.click();
        },
      },
      {
        id: 'theme',
        label: 'Toggle light / dark',
        hint: 'action',
        keywords: 'mode appearance',
        action: toggleTheme,
      },
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const hay = `${item.label} ${item.hint} ${item.keywords ?? ''}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return (): void => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const runItem = useCallback(
    (item: PaletteItem): void => {
      item.action();
      onClose();
    },
    [onClose],
  );

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (item) runItem(item);
      }
    },
    [activeIndex, filtered, onClose, runItem],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-[12vh] backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-background shadow-xl">
        <div className="border-b border-border px-3 py-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder={`Search ${PROFILE.name.toLowerCase()}…`}
            className="w-full bg-transparent py-2.5 text-[1.05rem] text-foreground outline-none placeholder:text-muted/70"
            aria-label="Search commands"
            aria-controls="command-palette-list"
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <ul
          id="command-palette-list"
          ref={listRef}
          className="max-h-80 overflow-y-auto py-1"
          role="listbox"
        >
          {filtered.length === 0 && (
            <li className="px-4 py-3 text-muted">No matches</li>
          )}
          {filtered.map((item, index) => (
            <li key={item.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                data-index={index}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors ${
                  index === activeIndex ? 'bg-foreground/[0.06]' : 'hover:bg-foreground/[0.03]'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runItem(item)}
              >
                <span className="truncate text-foreground">{item.label}</span>
                <span className="shrink-0 text-[0.65rem] tracking-[0.16em] text-muted uppercase">{item.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border px-4 py-2 text-[0.8rem] text-muted">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span>esc close</span>
          <span>⌘K</span>
        </div>
      </div>
    </div>
  );
}
