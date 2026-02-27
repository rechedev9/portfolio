import { useCallback, useRef } from 'react';

const SOUND_PATHS = {
  click: '/sounds/buttonclick.wav',
  release: '/sounds/buttonclickrelease.wav',
  hover: '/sounds/buttonrollover.wav',
  confirm: '/sounds/weapon_confirm.wav',
  blip: '/sounds/blip2.wav',
  hint: '/sounds/hint.wav',
} as const;

type SoundName = keyof typeof SOUND_PATHS;

type UseCSSound = {
  readonly play: (name: SoundName) => void;
};

export function useCSSound(): UseCSSound {
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
