import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type ThemeId = 'clean' | 'matrix' | 'cs' | 'pokemon';

interface ThemeOption {
  readonly id: ThemeId;
  readonly label: string;
  readonly icon: string;
  readonly path: string;
}

interface ThemeSwitcherProps {
  readonly currentTheme: ThemeId;
  readonly compact?: boolean;
}

const THEMES: readonly ThemeOption[] = [
  { id: 'clean', label: 'Home', icon: '\u{1F3E0}', path: '/' },
  { id: 'matrix', label: 'Matrix', icon: '\u{1F7E2}', path: '/matrix' },
  { id: 'cs', label: 'CS 1.6', icon: '\u{1F52B}', path: '/cs' },
  { id: 'pokemon', label: 'Pokemon', icon: '\u26A1', path: '/pokemon' },
] as const;

export function ThemeSwitcher({
  currentTheme,
  compact = false,
}: ThemeSwitcherProps): ReactElement {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = useCallback((e: MouseEvent): void => {
    if (
      panelRef.current &&
      !panelRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener('mousedown', handleClickOutside);
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, handleClickOutside]);

  const handleSelect = useCallback(
    (theme: ThemeOption): void => {
      if (theme.id === currentTheme) return;
      setOpen(false);
      navigate(theme.path);
    },
    [currentTheme, navigate],
  );

  return (
    <div className={`theme-switcher theme-switcher--${currentTheme}${compact ? ' theme-switcher--compact' : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className="theme-switcher-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Theme switcher"
      >
        <span className="theme-switcher-btn-icon" aria-hidden="true">
          {'\u{1F3A8}'}
        </span>
        {!compact && <span className="theme-switcher-btn-label">Themes</span>}
      </button>

      {open && (
        <div ref={panelRef} className="theme-switcher-panel" role="listbox" aria-label="Themes">
          <div className="theme-switcher-title">Choose Theme</div>
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              type="button"
              role="option"
              aria-selected={theme.id === currentTheme}
              className={`theme-switcher-option${theme.id === currentTheme ? ' theme-switcher-option--active' : ''}`}
              onClick={() => handleSelect(theme)}
              disabled={theme.id === currentTheme}
            >
              <span className="theme-switcher-option-icon" aria-hidden="true">
                {theme.icon}
              </span>
              <span className="theme-switcher-option-label">{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
