import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Player } from '@remotion/player';
import { GameBoyFrame } from './components/GameBoyFrame';
import { PokemonBootScreen } from './components/PokemonBootScreen';
import { PokemonTerminal } from './components/PokemonTerminal';
import { PokemonBattle } from './remotion/PokemonBattle';
import { ThemeSwitcher } from './components/ThemeSwitcher';

type Phase = 'off' | 'booting' | 'ready';

const PALLET_TOWN_PATH = '/pokemon/pallet-town.mp3';
const OPENING_PATH = '/pokemon/opening.mp3';
const GBC_BOOT_PATH = '/pokemon/gbc-boot.mp3';
const MUSIC_VOLUME = 0.4;

const BG_FPS = 30;
const BG_DURATION_FRAMES = 900; // 30-second loop
const BG_WIDTH = 1920;
const BG_HEIGHT = 1080;

export function PokemonApp(): ReactElement {
  const [phase, setPhase] = useState<Phase>('off');
  const [musicPlaying, setMusicPlaying] = useState(true);
  const palletRef = useRef<HTMLAudioElement>(null);
  const openingRef = useRef<HTMLAudioElement>(null);
  const bootChimeRef = useRef<HTMLAudioElement>(null);

  const handlePowerOn = useCallback((): void => {
    if (phase !== 'off') return;

    // Play GBC boot chime
    const chime = bootChimeRef.current;
    if (chime) {
      chime.volume = 0.6;
      chime.currentTime = 0;
      chime.play().catch(() => {});
    }

    // Play Pokemon Yellow opening after a short delay (GBC logo fades, then game starts)
    setTimeout(() => {
      const opening = openingRef.current;
      if (opening) {
        opening.volume = MUSIC_VOLUME;
        opening.currentTime = 0;
        opening.play().catch(() => {});
      }
    }, 1200);

    setPhase('booting');
  }, [phase]);

  const handleBootComplete = useCallback((): void => {
    // Stop opening music, start Pallet Town
    const opening = openingRef.current;
    if (opening) {
      opening.pause();
      opening.currentTime = 0;
    }

    const pallet = palletRef.current;
    if (pallet) {
      pallet.volume = MUSIC_VOLUME;
      pallet.play().catch(() => {});
    }

    setPhase('ready');
  }, []);

  const toggleMusic = useCallback((): void => {
    const audio = palletRef.current;
    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setMusicPlaying(prev => !prev);
  }, [musicPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return (): void => {
      openingRef.current?.pause();
      palletRef.current?.pause();
    };
  }, []);

  return (
    <div className="poke-page">
      <audio ref={palletRef} src={PALLET_TOWN_PATH} loop />
      <audio ref={openingRef} src={OPENING_PATH} />
      <audio ref={bootChimeRef} src={GBC_BOOT_PATH} />
      <div className="poke-background">
        <Player
          component={PokemonBattle}
          durationInFrames={BG_DURATION_FRAMES}
          compositionWidth={BG_WIDTH}
          compositionHeight={BG_HEIGHT}
          fps={BG_FPS}
          autoPlay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {phase === 'ready' && (
        <button
          type="button"
          onClick={toggleMusic}
          className="poke-music-toggle"
        >
          {musicPlaying ? '\u266B Music ON' : '\u266A Music OFF'}
        </button>
      )}

      <ThemeSwitcher currentTheme="pokemon" />

      <GameBoyFrame powered={phase !== 'off'} onPowerPress={handlePowerOn}>
        {phase === 'booting' && (
          <PokemonBootScreen onBootComplete={handleBootComplete} />
        )}
        {phase === 'ready' && <PokemonTerminal />}
      </GameBoyFrame>
    </div>
  );
}
