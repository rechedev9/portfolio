import type { ReactElement, KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { useCSSound } from '../hooks/useCSSound';
import { CSCommandOutput } from './CSCommandOutput';
import { COMMANDS } from '../data/portfolio';

const BOOT_MESSAGES = [
  'Console initialized.',
  'Loading map de_portfolio...',
  'BUILD 3266 SERVER (0 CRC)',
  'Server # 1',
  'luis_reche | connected',
  'luis_reche is joining the Developer force',
  'Connection established.',
] as const;

export function CSTerminal(): ReactElement {
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
  const { play } = useCSSound();

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries, bootComplete]);

  useEffect(() => {
    if (bootComplete) {
      play('hint');
      inputRef.current?.focus();
    }
  }, [bootComplete, play]);

  const handleConsoleClick = (): void => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      play('confirm');
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
    play('click');
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const handleSubmit = (): void => {
    play('confirm');
    executeCommand(inputValue);
    inputRef.current?.focus();
  };

  const handleButtonHover = (): void => {
    play('hover');
  };

  return (
    <div className="cs-console-window">
      {/* Title bar — like the real CS console */}
      <div className="cs-console-titlebar">
        <div className="cs-console-titlebar-left">
          <div className="cs-console-icon" />
          <span>Console</span>
        </div>
        <div className="cs-console-titlebar-right">
          <button type="button" className="cs-btn cs-console-close">×</button>
        </div>
      </div>

      {/* Scrollable console output */}
      <div
        ref={bodyRef}
        onClick={handleConsoleClick}
        className="cs-console-output"
      >
        {/* Boot messages */}
        {BOOT_MESSAGES.slice(0, visibleBootLines).map((msg, i) => (
          <div key={i} className="cs-line">
            {msg}
          </div>
        ))}

        {bootComplete && (
          <>
            {/* Blank separator */}
            <div className="cs-line">&nbsp;</div>

            {/* Welcome banner */}
            <div className="cs-line cs-line-highlight">
              ═══════════════════════════════════════
            </div>
            <div className="cs-line cs-line-highlight">
              LUIS LUCAS RECHE — Fullstack Developer
            </div>
            <div className="cs-line cs-line-highlight">
              TypeScript Wizard
            </div>
            <div className="cs-line cs-line-highlight">
              ═══════════════════════════════════════
            </div>
            <div className="cs-line">&nbsp;</div>

            <div className="cs-line">
              Type <span className="cs-line-highlight">'help'</span> for available commands.
            </div>
            <div className="cs-line">&nbsp;</div>

            {/* Quick command buttons */}
            <div className="cs-commands-row">
              {COMMANDS.map(cmd => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => handleCommandClick(cmd)}
                  onMouseEnter={handleButtonHover}
                  className="cs-btn cs-cmd-btn"
                >
                  {cmd}
                </button>
              ))}
            </div>
            <div className="cs-line">&nbsp;</div>

            {/* Command history */}
            {entries.map(entry => (
              <div key={entry.id} className="cs-entry">
                <div className="cs-line cs-line-input">
                  ] {entry.command}
                </div>
                <CSCommandOutput command={entry.command} />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Bottom input area — input + Submit button */}
      <div className="cs-console-input-bar">
        <span className="cs-console-prompt">]</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="cs-input cs-console-input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Console command input"
        />
        <button
          type="button"
          onClick={handleSubmit}
          onMouseEnter={handleButtonHover}
          className="cs-btn cs-submit-btn"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
