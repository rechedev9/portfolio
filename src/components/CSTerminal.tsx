import type { ReactElement, KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { CSCommandOutput } from './CSCommandOutput';
import { COMMANDS } from '../data/portfolio';

const CS_BOOT_MESSAGES = [
  'Console initialized.',
  'Loading map de_portfolio...',
  'Connecting to server 127.0.0.1:27015...',
  'Connected.',
] as const;

const VOLUME_ICON_ON = '\u266B';
const VOLUME_ICON_OFF = '\u266A';

type CSTerminalProps = {
  readonly musicPlaying: boolean;
  readonly onToggleMusic: () => void;
};

function CSPrompt(): ReactElement {
  return <span className="cs-text-green shrink-0">] </span>;
}

export function CSTerminal({ musicPlaying, onToggleMusic }: CSTerminalProps): ReactElement {
  const {
    entries,
    inputValue,
    setInputValue,
    executeCommand,
    navigateHistory,
    tabComplete,
    bootComplete,
    visibleBootLines,
  } = useTerminal();

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries, bootComplete]);

  useEffect(() => {
    if (bootComplete) {
      inputRef.current?.focus();
    }
  }, [bootComplete]);

  const handleTerminalClick = (): void => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete();
    }
  };

  const handleCommandClick = (cmd: string): void => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="h-screen flex flex-col font-mono">
      {/* CS-style header bar */}
      <div className="flex items-center justify-between px-4 py-2 cs-header border-b border-[#4a4a2a] shrink-0">
        <div className="flex items-center gap-3">
          <span className="cs-text-amber font-bold text-sm tracking-wider">COUNTER-STRIKE</span>
          <span className="text-[#8a8a6a] text-xs">Console</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMusic}
            className="cs-text-amber hover:text-[#ffd700] text-sm cursor-pointer bg-transparent border-0 font-mono transition-colors"
            title={musicPlaying ? 'Pause music' : 'Play CS 1.6 theme'}
          >
            {musicPlaying ? VOLUME_ICON_ON : VOLUME_ICON_OFF} {musicPlaying ? 'ON' : 'OFF'}
          </button>
          <span className="text-[#8a8a6a] text-xs">v1.6</span>
        </div>
      </div>

      {/* Console body */}
      <div
        ref={bodyRef}
        onClick={handleTerminalClick}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 text-sm leading-relaxed cursor-text cs-console-body"
      >
        {/* Boot sequence */}
        <div className="space-y-1 mb-4">
          {CS_BOOT_MESSAGES.slice(0, visibleBootLines).map((msg, i) => (
            <div key={i} className="text-[#8a8a6a] text-xs">
              {msg}
            </div>
          ))}
        </div>

        {bootComplete && (
          <div className="animate-fade-in">
            {/* CS-style ASCII banner */}
            <pre className="cs-text-amber text-[9px] sm:text-xs leading-none mb-3 select-none overflow-x-auto">
{`   ╔══════════════════════════════════════════╗
   ║   LUIS LUCAS RECHE                       ║
   ║   Fullstack Software Developer           ║
   ║   TypeScript Wizard                      ║
   ╚══════════════════════════════════════════╝`}
            </pre>

            {/* Welcome */}
            <div className="text-[#c8c8a8] mb-4 text-xs sm:text-sm">
              Type <span className="cs-text-amber">'help'</span> for available commands, or click below.
            </div>

            {/* Command buttons */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              {COMMANDS.map(cmd => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => handleCommandClick(cmd)}
                  className="px-2 py-0.5 text-xs border border-[#4a4a2a] text-[#8a8a6a] hover:cs-text-amber hover:border-[#b89b00] rounded transition-colors duration-200 cursor-pointer bg-transparent font-mono"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Command history */}
            {entries.map(entry => (
              <div key={entry.id} className="mb-4">
                <div className="flex items-start cs-text-green mb-1">
                  <CSPrompt />
                  <span>{entry.command}</span>
                </div>
                <CSCommandOutput command={entry.command} />
              </div>
            ))}

            {/* Active input */}
            <div className="flex items-center">
              <CSPrompt />
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent cs-text-green outline-none font-mono text-sm p-0 border-0"
                style={{ caretColor: '#4ade80' }}
                autoFocus
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                aria-label="Console command input"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
