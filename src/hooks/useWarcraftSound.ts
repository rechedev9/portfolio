import { useCallback, useRef } from 'react';

const SOUND_PATHS = {
  click: '/warcraft/sfx-click.wav',
  hover: '/warcraft/sfx-hover.wav',
  confirm: '/warcraft/sfx-confirm.wav',
  ready: '/warcraft/sfx-ready.wav',
} as const;

type SoundName = keyof typeof SOUND_PATHS;

const SOUND_VOLUMES: Record<SoundName, number> = {
  click: 0.5,
  hover: 0.6,
  confirm: 0.5,
  ready: 0.5,
};

type UseWarcraftSound = {
  readonly play: (name: SoundName) => void;
};

export function useWarcraftSound(): UseWarcraftSound {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const play = useCallback((name: SoundName): void => {
    const path = SOUND_PATHS[name];
    let audio = audioCache.current.get(path);

    if (!audio) {
      audio = new Audio(path);
      audioCache.current.set(path, audio);
    }

    audio.volume = SOUND_VOLUMES[name];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  return { play };
}
