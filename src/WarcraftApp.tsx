import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { Player } from '@remotion/player';
import { WarcraftMenu } from './components/WarcraftMenu';
import { WarcraftBackground } from './remotion/WarcraftBackground';
import { ThemeSwitcher } from './components/ThemeSwitcher';

const WC3_MUSIC_PATH = '/warcraft/wc3-theme.mp3';
const MUSIC_VOLUME = 0.4;

const BG_FPS = 30;
const BG_DURATION_FRAMES = 600; // 20-second loop
const BG_WIDTH = 1920;
const BG_HEIGHT = 1080;

export function WarcraftApp(): ReactElement {
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
    <div className="wc3-page">
      <audio ref={audioRef} src={WC3_MUSIC_PATH} loop />

      <div className="wc3-background">
        <Player
          component={WarcraftBackground}
          durationInFrames={BG_DURATION_FRAMES}
          compositionWidth={BG_WIDTH}
          compositionHeight={BG_HEIGHT}
          fps={BG_FPS}
          autoPlay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Logo — top-left like the real game */}
      <div className="wc3-logo">
        <span className="wc3-logo-title">WARCRAFT III</span>
        <span className="wc3-logo-sub">THE FROZEN THRONE</span>
      </div>

      {/* Music toggle — bottom-left, out of the way */}
      <button
        type="button"
        onClick={toggleMusic}
        className="wc3-btn wc3-music-toggle"
      >
        {musicPlaying ? '\u266B ON' : '\u266A OFF'}
      </button>

      <WarcraftMenu />

      <ThemeSwitcher currentTheme="warcraft" />
    </div>
  );
}
