import { useCallback, useRef } from 'react';

const SOUND_PATHS = {
  select: '/pokemon/sfx-menu-select.wav',
  confirm: '/pokemon/sfx-press-ab.wav',
  save: '/pokemon/sfx-save.wav',
  boot: '/pokemon/sfx-boot-ping.wav',
} as const;

type SoundName = keyof typeof SOUND_PATHS;

type UsePokemonSound = {
  readonly play: (name: SoundName) => void;
};

export function usePokemonSound(): UsePokemonSound {
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());

  const play = useCallback((name: SoundName): void => {
    const path = SOUND_PATHS[name];
    let audio = audioCache.current.get(path);

    if (!audio) {
      audio = new Audio(path);
      audioCache.current.set(path, audio);
    }

    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  return { play };
}
