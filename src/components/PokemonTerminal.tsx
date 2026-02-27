import type { ReactElement, KeyboardEvent } from 'react';
import { useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { usePokemonSound } from '../hooks/usePokemonSound';
import { PokemonCommandOutput } from './PokemonCommandOutput';
import { COMMANDS } from '../data/portfolio';

export function PokemonTerminal(): ReactElement {
  const {
    entries,
    inputValue,
    setInputValue,
    executeCommand,
    navigateHistory,
    tabComplete,
  } = useTerminal();
  const { play } = usePokemonSound();

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [entries]);

  useEffect(() => {
    play('boot');
    inputRef.current?.focus();
  }, [play]);

  const handleScreenClick = (): void => {
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
    play('select');
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const handleButtonHover = (): void => {
    play('select');
  };

  return (
    <div className="poke-terminal" onClick={handleScreenClick}>
      <div ref={bodyRef} className="poke-terminal-output">
        {/* Welcome */}
        <div className="poke-dialogue poke-welcome">
          <div className="poke-line poke-line-title">
            PROF. OAK: Welcome!
          </div>
          <div className="poke-line">
            This world is inhabited by creatures called POKEMON!
          </div>
          <div className="poke-line">&nbsp;</div>
          <div className="poke-line">
            People use them for... well, type
            {' '}<span className="poke-line-highlight">{"'"}help{"'"}</span> to find out.
          </div>
        </div>

        <div className="poke-line">&nbsp;</div>

        {/* Quick command buttons */}
        <div className="poke-commands-row">
          {COMMANDS.map(cmd => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommandClick(cmd)}
              onMouseEnter={handleButtonHover}
              className="poke-cmd-btn"
            >
              {cmd.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="poke-line">&nbsp;</div>

        {/* Command history */}
        {entries.map(entry => (
          <div key={entry.id} className="poke-entry">
            <div className="poke-line poke-line-input">
              {'\u25B6'} {entry.command}
            </div>
            <PokemonCommandOutput command={entry.command} />
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div className="poke-input-bar">
        <span className="poke-prompt">{'\u25B6'}</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="poke-input"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Pokedex command input"
        />
      </div>
    </div>
  );
}
