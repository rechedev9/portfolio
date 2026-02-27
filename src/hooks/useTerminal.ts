import { useState, useCallback, useEffect } from 'react';
import { ALL_COMMANDS } from '../data/portfolio';

export type HistoryEntry = {
  readonly id: string;
  readonly command: string;
};

type UseTerminalReturn = {
  readonly entries: readonly HistoryEntry[];
  readonly inputValue: string;
  readonly setInputValue: (value: string) => void;
  readonly executeCommand: (input: string) => void;
  readonly navigateHistory: (direction: 'up' | 'down') => void;
  readonly tabComplete: () => void;
  readonly bootComplete: boolean;
  readonly visibleBootLines: number;
};

const BOOT_DELAYS = [200, 600, 1000] as const;
const BOOT_COMPLETE_DELAY = 1400;

export function useTerminal(): UseTerminalReturn {
  const [entries, setEntries] = useState<readonly HistoryEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<readonly string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const [visibleBootLines, setVisibleBootLines] = useState(0);

  useEffect(() => {
    const timers = BOOT_DELAYS.map((delay, i) =>
      setTimeout(() => setVisibleBootLines(i + 1), delay),
    );
    const completeTimer = setTimeout(() => setBootComplete(true), BOOT_COMPLETE_DELAY);

    return (): void => {
      timers.forEach(clearTimeout);
      clearTimeout(completeTimer);
    };
  }, []);

  const executeCommand = useCallback((input: string): void => {
    const trimmed = input.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setEntries([]);
    } else {
      setEntries(prev => [...prev, { id: crypto.randomUUID(), command: trimmed }]);
    }

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputValue('');
  }, []);

  const navigateHistory = useCallback(
    (direction: 'up' | 'down'): void => {
      if (commandHistory.length === 0) return;

      if (direction === 'up') {
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex] ?? '');
      } else {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInputValue('');
        } else {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex] ?? '');
        }
      }
    },
    [commandHistory, historyIndex],
  );

  const tabComplete = useCallback((): void => {
    if (!inputValue) return;
    const match = ALL_COMMANDS.find(cmd => cmd.startsWith(inputValue.toLowerCase()));
    if (match) setInputValue(match);
  }, [inputValue]);

  return {
    entries,
    inputValue,
    setInputValue,
    executeCommand,
    navigateHistory,
    tabComplete,
    bootComplete,
    visibleBootLines,
  };
}
