import { useState, useCallback, useRef } from 'react';
import type { ReactElement } from 'react';
import { CSTerminal } from './components/CSTerminal';

const CS_MUSIC_PATH = '/cs-theme.mp3';

export function CSApp(): ReactElement {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
        COUNTER<span className="cs-logo-dash">-</span>STRIKE
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
    </div>
  );
}
