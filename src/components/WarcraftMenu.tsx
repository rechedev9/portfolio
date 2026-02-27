import type { ReactElement } from 'react';
import { useState } from 'react';
import { useWarcraftSound } from '../hooks/useWarcraftSound';
import { WarcraftCommandOutput } from './WarcraftCommandOutput';

type MenuCommand = 'about' | 'skills' | 'experience' | 'projects' | 'education' | 'contact';

const MENU_ITEMS: readonly { readonly cmd: MenuCommand; readonly label: string }[] = [
  { cmd: 'about', label: 'Hero Attributes' },
  { cmd: 'skills', label: 'Ability Tree' },
  { cmd: 'experience', label: 'Campaign Log' },
  { cmd: 'projects', label: 'Custom Maps' },
  { cmd: 'education', label: 'Tome of Knowledge' },
  { cmd: 'contact', label: 'Allied Forces' },
] as const;

export function WarcraftMenu(): ReactElement {
  const [activePanel, setActivePanel] = useState<MenuCommand | null>(null);
  const { play } = useWarcraftSound();

  const handleMenuClick = (cmd: MenuCommand): void => {
    play('click');
    setActivePanel(cmd);
  };

  const handleBack = (): void => {
    play('click');
    setActivePanel(null);
  };

  const handleHover = (): void => {
    play('hover');
  };

  return (
    <>
      {/* Content panel — appears when a menu item is selected */}
      {activePanel && (
        <div className="wc3-content-panel">
          <div className="wc3-content-header">
            <span className="wc3-content-title">
              {MENU_ITEMS.find(m => m.cmd === activePanel)?.label}
            </span>
          </div>
          <div className="wc3-content-body">
            <WarcraftCommandOutput command={activePanel} />
          </div>
          <div className="wc3-content-footer">
            <button
              type="button"
              onClick={handleBack}
              onMouseEnter={handleHover}
              className="wc3-btn wc3-menu-btn wc3-back-btn"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Right-side menu buttons — like the real WC3 main menu */}
      <nav className="wc3-menu-panel">
        {MENU_ITEMS.map(({ cmd, label }) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleMenuClick(cmd)}
            onMouseEnter={handleHover}
            className={`wc3-btn wc3-menu-btn ${activePanel === cmd ? 'wc3-menu-btn-active' : ''}`}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
