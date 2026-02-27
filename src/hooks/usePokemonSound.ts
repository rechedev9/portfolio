import { useCallback, useRef } from 'react';

const SOUND_PATHS = {
  select: '/pokemon/sfx-menu-select.mp3',
  confirm: '/pokemon/sfx-press-ab.mp3',
  save: '/pokemon/sfx-save.mp3',
  boot: '/pokemon/sfx-boot-ping.mp3',
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
