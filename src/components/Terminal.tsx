import type { ReactElement, KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { CommandOutput } from './CommandOutput';
import { ASCII_NAME, COMMANDS, PROFILE } from '../data/portfolio';

const BOOT_MESSAGES = [
  '[system] Loading portfolio v1.0.0...',
  '[system] Initializing modules...',
  '[system] Connection established.',
] as const;

function Prompt(): ReactElement {
  return (
    <span className="shrink-0">
      <span className="text-terminal-cyan">luis@portfolio</span>
      <span className="text-terminal-muted">:</span>
      <span className="text-terminal-cyan">~</span>
      <span className="text-terminal-muted">$ </span>
    </span>
  );
}

export function Terminal(): ReactElement {
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
    <div className="h-screen bg-terminal-bg flex items-center justify-center p-2 sm:p-4 font-mono">
      <div className="crt-on w-full max-w-4xl h-full max-h-[90vh] flex flex-col rounded-lg border border-terminal-border overflow-hidden terminal-glow">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-terminal-header border-b border-terminal-border shrink-0">
          <div className="w-3 h-3 rounded-full bg-traffic-close" />
          <div className="w-3 h-3 rounded-full bg-traffic-minimize" />
          <div className="w-3 h-3 rounded-full bg-traffic-maximize" />
          <span className="ml-2 text-terminal-muted text-xs">luis@portfolio — bash</span>
        </div>

        {/* Terminal body */}
        <div
          ref={bodyRef}
          onClick={handleTerminalClick}
          className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 text-sm leading-relaxed relative scanlines cursor-text"
        >
          {/* Boot sequence */}
          <div className="space-y-1 mb-4">
            {BOOT_MESSAGES.slice(0, visibleBootLines).map((msg, i) => (
              <div key={i} className="text-terminal-amber/60 text-xs">
                {msg}
              </div>
            ))}
          </div>

          {bootComplete && (
            <div className="animate-fade-in">
              {/* ASCII art name */}
              <pre className="text-terminal-green text-glow text-[10px] sm:text-sm leading-none mb-3 select-none overflow-x-auto">
                {ASCII_NAME}
              </pre>

              {/* Title + tagline */}
              <div className="text-terminal-green text-glow text-base font-bold mb-0.5">
                {PROFILE.title}
              </div>
              <div className="text-terminal-dim text-xs mb-4">
                TypeScript · React · Node.js · Bun
              </div>

              {/* Welcome message */}
              <div className="text-terminal-dim mb-4 text-xs sm:text-sm">
                Welcome! Type{' '}
                <span className="text-terminal-cyan">'help'</span> to see available commands, or
                click one below.
              </div>

              {/* Command suggestion buttons */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
                {COMMANDS.map(cmd => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => handleCommandClick(cmd)}
                    className="px-2 py-0.5 text-xs border border-terminal-border text-terminal-dim hover:text-terminal-green hover:border-terminal-green rounded transition-colors duration-200 cursor-pointer bg-transparent font-mono"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Command history */}
              {entries.map(entry => (
                <div key={entry.id} className="mb-4">
                  <div className="flex items-start text-terminal-green mb-1">
                    <Prompt />
                    <span>{entry.command}</span>
                  </div>
                  <CommandOutput command={entry.command} />
                </div>
              ))}

              {/* Active input line */}
              <div className="flex items-center">
                <Prompt />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green font-mono text-sm p-0 border-0"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Terminal command input"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
