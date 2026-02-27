import { useState, useCallback, useRef, useEffect } from 'react';
import type { ReactElement } from 'react';
import { CSTerminal } from './components/CSTerminal';

const ENTER_DELAY_MS = 800;
const CS_MUSIC_PATH = '/cs-theme.mp3';

type Phase = 'intro' | 'terminal';

export function CSApp(): ReactElement {
  const [phase, setPhase] = useState<Phase>('intro');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEnter = useCallback((): void => {
    setTimeout(() => setPhase('terminal'), ENTER_DELAY_MS);
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

  useEffect(() => {
    if (phase === 'intro') {
      handleEnter();
    }
  }, [phase, handleEnter]);

  if (phase === 'terminal') {
    return (
      <div className="h-screen relative cs-bg">
        <audio ref={audioRef} src={CS_MUSIC_PATH} loop />
        <CSTerminal musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />
      </div>
    );
  }

  return (
    <div className="h-screen cs-bg flex items-center justify-center">
      <div className="cs-text-amber text-xl font-mono animate-fade-in">
        Loading Counter-Strike...
      </div>
    </div>
  );
}
