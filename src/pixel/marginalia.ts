import { drawSprite, framesPainter } from './core';
import type { WorkArt } from '../data/portfolio';
import type { Ink, Painter } from './core';

// Small hand-drawn sprites for the page margin, 12×12 each.

export const MARGINALIA_SIZE = 12;

const LAPTOP = [
  '............',
  '............',
  '.kkkkkkkkkk.',
  '.k........k.',
  '.k........k.',
  '.k........k.',
  '.k........k.',
  '.k........k.',
  '.kkkkkkkkkk.',
  'kkkkkkkkkkkk',
  '.kkkkkkkkkk.',
  '............',
];

// What ends up on the laptop screen, typed one pixel at a time.
const CODE = [
  'rr.kkk',
  '.kk.kkk',
  '.kkkk',
  'rr.kk',
];

const CODE_PIXELS: readonly { readonly x: number; readonly y: number; readonly ink: Ink }[] = CODE.flatMap((line, row) =>
  [...line].flatMap((ch, col) => (ch === 'k' || ch === 'r' ? [{ x: 2 + col, y: 3 + row, ink: ch as Ink }] : [])),
);

/** Frame with all the code typed, for reduced motion. */
export const LAPTOP_STILL = CODE_PIXELS.length;

export const laptop: Painter = (put, frame) => {
  drawSprite(put, LAPTOP, 0, 0);
  const hold = 8;
  const step = frame % (CODE_PIXELS.length + hold);
  const typed = CODE_PIXELS.slice(0, Math.min(step, CODE_PIXELS.length));
  typed.forEach(({ x, y, ink }) => put(x, y, ink));
  // Blinking cursor after the last typed pixel.
  const last = typed[typed.length - 1];
  const cursor = last ? { x: last.x + 1, y: last.y } : { x: 2, y: 3 };
  if (Math.floor(frame / 2) % 2 === 0 && cursor.x <= 9) put(cursor.x, cursor.y, 'm');
};

const CLAPPER_BOARD = [
  'kkkkkkkkkkkk',
  'kkrrkkrrkkrr',
  'kkkkkkkkkkkk',
  'k..........k',
  'k.kkkk.kk..k',
  'k..........k',
  'k.kkkkkkk..k',
  'kkkkkkkkkkkk',
];

const CLAPPER_OPEN = [
  '.........krr',
  '......krrk..',
  '...krrk.....',
  'krrk........',
  ...CLAPPER_BOARD,
];

const CLAPPER_SHUT = [
  '............',
  '............',
  '............',
  'krrkkrrkkrrk',
  ...CLAPPER_BOARD,
];

export const clapper = framesPainter([CLAPPER_OPEN, CLAPPER_OPEN, CLAPPER_OPEN, CLAPPER_SHUT, CLAPPER_SHUT, CLAPPER_SHUT, CLAPPER_SHUT]);

const LIFT_UP = [
  'r..........r',
  'rkkkkkkkkkkr',
  'r..k....k..r',
  '...k.kk.k...',
  '....kkkk....',
  '.....kk.....',
  '.....kk.....',
  '.....kk.....',
  '....k..k....',
  '....k..k....',
  '....k..k....',
  '...kk..kk...',
];

const LIFT_DOWN = [
  '............',
  '............',
  '.....kk.....',
  'r....kk....r',
  'rkkkkkkkkkkr',
  'r...kkkk...r',
  '.....kk.....',
  '.....kk.....',
  '....k..k....',
  '...k....k...',
  '...k....k...',
  '..kk....kk..',
];

export const lifter = framesPainter([LIFT_DOWN, LIFT_DOWN, LIFT_DOWN, LIFT_UP, LIFT_UP, LIFT_UP]);

// A rocket climbs, bursts and fades.
const DIRECTIONS: readonly (readonly [number, number])[] = [
  [0, -1], [0, 1], [-1, 0], [1, 0], [-0.7, -0.7], [0.7, -0.7], [-0.7, 0.7], [0.7, 0.7],
];

const BURST_RADII = [1.5, 2.5, 3.5, 4.5, 5, 5.5, 5.5];

export const firework: Painter = (put, frame) => {
  const t = frame % 16;
  const cx = 6;
  const cy = 5;
  if (t < 4) {
    // Rocket: two pixels and a fading trail.
    const y = 10 - t * 2;
    put(cx, y, 'k');
    put(cx, y + 1, 'k');
    put(cx, y + 2, 'm');
    return;
  }
  const radius = BURST_RADII[t - 4];
  if (radius === undefined) return;
  const fading = t - 4 >= 4;
  const fall = fading ? t - 7 : 0;
  put(cx, cy + fall, fading ? 'm' : 'r');
  DIRECTIONS.forEach(([dx, dy]) => {
    put(Math.round(cx + dx * radius), Math.round(cy + dy * radius) + fall, fading ? 'm' : 'r');
    if (radius > 2.5) put(Math.round(cx + dx * (radius - 1.5)), Math.round(cy + dy * (radius - 1.5)) + fall, fading ? 'b' : 'm');
  });
};

/** Frame with the burst fully open, for reduced motion. */
export const FIREWORK_STILL = 7;

const CAP = [
  '............',
  '.....kk.....',
  '...kk..kk...',
  '.kk......kk.',
  'k..........k',
  '.kk......kk.',
  '...kkkkkk...',
  '...kkkkkk...',
  '...kkkkkk...',
  '....kkkk....',
  '............',
  '............',
];

// Button in the middle of the board, cord to the corner, tassel hanging off it.
const TASSEL_REST = ['', '', '', '', '.....rrrrrr.', '...........r', '...........r', '...........r', '...........r', '..........rr'];
const TASSEL_SWAY = ['', '', '', '', '.....rrrrrr.', '...........r', '...........r', '..........r.', '..........r.', '.........rr.'];

export const mortarboard: Painter = (put, frame) => {
  drawSprite(put, CAP, 0, 0);
  drawSprite(put, Math.floor(frame / 2) % 2 === 0 ? TASSEL_REST : TASSEL_SWAY, 0, 0);
};

export const WORK_ART: Record<WorkArt, { readonly paint: Painter; readonly still: number }> = {
  clapper: { paint: clapper, still: 3 },
  lifter: { paint: lifter, still: 3 },
  firework: { paint: firework, still: FIREWORK_STILL },
};
