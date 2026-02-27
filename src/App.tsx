import { useState, useCallback, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Terminal } from './components/Terminal';
import { MatrixRain } from './components/MatrixRain';
import { PillChoice } from './components/PillChoice';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useDocumentMeta } from './hooks/useDocumentMeta';

const ENTER_TRANSITION_MS = 1200;

export function App(): ReactElement {
  useDocumentMeta('/');
  const [showPillChoice, setShowPillChoice] = useState(false);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const handler = (): void => setShowPillChoice(true);
    window.addEventListener('matrix-easter-egg', handler);
    return (): void => window.removeEventListener('matrix-easter-egg', handler);
  }, []);

  const handleRedPill = useCallback((): void => {
    setEntering(true);
    setTimeout(() => {
      setEntering(false);
      setShowPillChoice(false);
    }, ENTER_TRANSITION_MS);
  }, []);

  const handleDismiss = useCallback((): void => {
    setShowPillChoice(false);
  }, []);

  return (
    <>
      <Terminal />
      <ThemeSwitcher currentTheme="matrix" />

      {showPillChoice && (
        <div className="fixed inset-0 z-40 bg-terminal-bg/90">
          <MatrixRain />
          <PillChoice onEnter={handleRedPill} onDismiss={handleDismiss} />
        </div>
      )}

      {entering && (
        <div className="fixed inset-0 z-50 animate-enter-matrix pointer-events-none" />
      )}
    </>
  );
}
