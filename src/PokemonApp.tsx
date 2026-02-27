import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { GameBoyFrame } from './components/GameBoyFrame';
import { PokemonBootScreen } from './components/PokemonBootScreen';
import { PokemonTerminal } from './components/PokemonTerminal';

const MUSIC_PATH = '/pokemon/pallet-town.mp3';
const MUSIC_VOLUME = 0.4;

export function PokemonApp(): ReactElement {
  const [booting, setBooting] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = MUSIC_VOLUME;

    const tryPlay = (): void => {
      audio.play().catch(() => {});
    };

    tryPlay();
    const handleInteraction = (): void => {
      tryPlay();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return (): void => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleBootComplete = useCallback((): void => {
    setBooting(false);
  }, []);

  const toggleMusic = useCallback((): void => {
    const audio = audioRef.current;
    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setMusicPlaying(prev => !prev);
  }, [musicPlaying]);

  return (
    <div className="poke-page">
      <audio ref={audioRef} src={MUSIC_PATH} loop />

      <button
        type="button"
        onClick={toggleMusic}
        className="poke-music-toggle"
      >
        {musicPlaying ? '\u266B Music ON' : '\u266A Music OFF'}
      </button>

      <GameBoyFrame>
        {booting ? (
          <PokemonBootScreen onBootComplete={handleBootComplete} />
        ) : (
          <PokemonTerminal />
        )}
      </GameBoyFrame>
    </div>
  );
}
