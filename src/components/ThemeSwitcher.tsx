import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type ThemeId = 'matrix' | 'cs' | 'pokemon';

interface ThemeOption {
  readonly id: ThemeId;
  readonly label: string;
  readonly icon: string;
  readonly path: string;
}

interface ThemeSwitcherProps {
  readonly currentTheme: ThemeId;
}

const THEMES: readonly ThemeOption[] = [
  { id: 'matrix', label: 'Matrix', icon: '\u{1F7E2}', path: '/' },
  { id: 'cs', label: 'CS 1.6', icon: '\u{1F52B}', path: '/cs' },
  { id: 'pokemon', label: 'Pokemon', icon: '\u26A1', path: '/pokemon' },
] as const;

export function ThemeSwitcher({ currentTheme }: ThemeSwitcherProps): ReactElement {
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
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
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
    <div className={`theme-switcher theme-switcher--${currentTheme}`}>
      <button
        ref={buttonRef}
        type="button"
        className="theme-switcher-btn"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-label="Theme switcher"
      >
        <span className="theme-switcher-btn-icon">{'\u{1F3A8}'}</span>
        <span className="theme-switcher-btn-label">Themes</span>
      </button>

      {open && (
        <div ref={panelRef} className="theme-switcher-panel">
          <div className="theme-switcher-title">Choose Theme</div>
          {THEMES.map(theme => (
            <button
              key={theme.id}
              type="button"
              className={`theme-switcher-option${theme.id === currentTheme ? ' theme-switcher-option--active' : ''}`}
              onClick={() => handleSelect(theme)}
              disabled={theme.id === currentTheme}
            >
              <span className="theme-switcher-option-icon">{theme.icon}</span>
              <span className="theme-switcher-option-label">{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
