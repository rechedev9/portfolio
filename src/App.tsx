import { useState, useCallback } from 'react';
import type { ReactElement } from 'react';
import { Terminal } from './components/Terminal';
import { MatrixRain } from './components/MatrixRain';
import { PillChoice } from './components/PillChoice';

const ENTER_TRANSITION_MS = 1200;

type Phase = 'choice' | 'entering' | 'terminal';

export function App(): ReactElement {
  const [phase, setPhase] = useState<Phase>('choice');

  const handleEnter = useCallback((): void => {
    setPhase('entering');
    setTimeout(() => setPhase('terminal'), ENTER_TRANSITION_MS);
  }, []);

  if (phase === 'terminal') {
    return <Terminal />;
  }

  return (
    <div className="h-screen relative overflow-hidden bg-terminal-bg">
      <MatrixRain />
      <PillChoice onEnter={handleEnter} />
      {phase === 'entering' && (
        <div className="fixed inset-0 z-50 animate-enter-matrix pointer-events-none" />
      )}
    </div>
  );
}
