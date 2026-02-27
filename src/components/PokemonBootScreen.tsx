import type { ReactElement } from 'react';
import { useState, useEffect, useCallback } from 'react';

type BootPhase = 'logo' | 'title' | 'press-start';

type PokemonBootScreenProps = {
  readonly onBootComplete: () => void;
};

const AUTO_SKIP_MS = 10000;
const LOGO_DURATION_MS = 2500;
const TITLE_DURATION_MS = 3000;

export function PokemonBootScreen({ onBootComplete }: PokemonBootScreenProps): ReactElement {
  const [phase, setPhase] = useState<BootPhase>('logo');

  const skip = useCallback((): void => {
    onBootComplete();
  }, [onBootComplete]);

  useEffect(() => {
    const logoTimer = setTimeout(() => setPhase('title'), LOGO_DURATION_MS);
    const titleTimer = setTimeout(() => setPhase('press-start'), LOGO_DURATION_MS + TITLE_DURATION_MS);
    const autoSkip = setTimeout(skip, AUTO_SKIP_MS);

    return (): void => {
      clearTimeout(logoTimer);
      clearTimeout(titleTimer);
      clearTimeout(autoSkip);
    };
  }, [skip]);

  useEffect(() => {
    const handleSkip = (): void => {
      if (phase === 'press-start') {
        skip();
      }
    };

    document.addEventListener('click', handleSkip);
    document.addEventListener('keydown', handleSkip);

    return (): void => {
      document.removeEventListener('click', handleSkip);
      document.removeEventListener('keydown', handleSkip);
    };
  }, [phase, skip]);

  return (
    <div className="poke-boot">
      {phase === 'logo' && (
        <div className="poke-boot-logo">
          <div className="poke-logo-drop">RECHE</div>
        </div>
      )}

      {phase === 'title' && (
        <div className="poke-boot-title">
          <div className="poke-title-pikachu">
            {'    (\\_/)\n'}
            {'   ( o.o )\n'}
            {'    > ^ <\n'}
            {'   /|   |\\\n'}
            {'   _|   |_'}
          </div>
          <div className="poke-title-text">POKEMON YELLOW</div>
          <div className="poke-title-sub">Special Developer Edition</div>
        </div>
      )}

      {phase === 'press-start' && (
        <div className="poke-boot-start">
          <div className="poke-title-pikachu">
            {'    (\\_/)\n'}
            {'   ( o.o )\n'}
            {'    > ^ <\n'}
            {'   /|   |\\\n'}
            {'   _|   |_'}
          </div>
          <div className="poke-title-text">POKEMON YELLOW</div>
          <div className="poke-title-sub">Special Developer Edition</div>
          <div className="poke-press-start">Press START</div>
        </div>
      )}
    </div>
  );
}
