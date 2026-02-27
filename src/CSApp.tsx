import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { CSTerminal } from './components/CSTerminal';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useDocumentMeta } from './hooks/useDocumentMeta';

const CS_MUSIC_PATH = '/cs-theme.mp3';
const MUSIC_VOLUME = 0.5;

export function CSApp(): ReactElement {
  useDocumentMeta('/cs');
  const [musicPlaying, setMusicPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = MUSIC_VOLUME;

    const tryPlay = (): void => {
      audio.play().catch(() => {});
    };

    // Browsers block autoplay until user interacts — play on first click
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
    <div className="cs-page">
      <audio ref={audioRef} src={CS_MUSIC_PATH} loop />

      {/* CS 1.6 background */}
      <div className="cs-background" />

      {/* Counter-Strike logo bottom-left */}
      <div className="cs-logo">
        RECHE<span className="cs-logo-dash">-</span>STRIKE
      </div>

      {/* Music toggle */}
      <button
        type="button"
        onClick={toggleMusic}
        className="cs-btn cs-music-toggle"
      >
        {musicPlaying ? '\u266B Music ON' : '\u266A Music OFF'}
      </button>

      {/* Console window */}
      <CSTerminal />

      <ThemeSwitcher currentTheme="cs" />
    </div>
  );
}
