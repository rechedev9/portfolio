import { drawSprite } from './core';
import type { Painter, Put } from './core';

// Palma de Mallorca from the sea: the cathedral on the old sea wall, palms,
// the Tramuntana behind, a sailboat and two gulls. Hand-drawn, pixel by pixel.

export const PALMA_WIDTH = 88;
export const PALMA_HEIGHT = 28;

const CATHEDRAL = [
  '.k..................................k...',
  '.k.................................kkk..',
  'kkk...k....k....k....k....k....k..kkkkk.',
  'kkk...k....k....k....k....k....k.kkkkkkk',
  'kkk..kkk..kkk..kkk..kkk..kkk..kkkkkpppkk',
  'kkkk.kkk..kkk..kkk..kkk..kkk..kkkkkpkpkk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkpppkk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
  'kkkkkkkkpkkkkpkkkkpkkkkpkkkkpkkkkkkkkkkk',
  'kkkkkkkkpkkkkpkkkkpkkkkpkkkkpkkkkkkkkkkk',
  'kkkkkkkkpkkkkpkkkkpkkkkpkkkkpkkkkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkppkkkkkkkk',
  'kpkkkkkkkkkkkkkkkkkkkkkkkkkkkkppkkkkkkkk',
  'kpkkkkkkkkkkkkkkkkkkkkkkkkkkkkppkkkkkkkk',
  'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',
];

const PALM = [
  '.....kkk.....',
  '..kkkkkkkkk..',
  '.kk..kkk..kk.',
  'k...k.k.k...k',
  '...k..k..k...',
  '..k...k...k..',
  '......k......',
  '......k......',
  '.....k.......',
  '.....k.......',
  '.....k.......',
  '....kk.......',
];

const PALM_LEFT = PALM.map((row) => [...row].reverse().join(''));

const BOAT = [
  '....r...',
  '...k....',
  '..kk.k..',
  '.kkk.kk.',
  'kkkk.kkk',
  '...k....',
  'kkkkkkkk',
  '.kkkkkk.',
];

const GULL = [
  ['k...k', '.kkk.'],
  ['.kkk.', 'k...k'],
];

// Ridge of the Tramuntana, as (x, y) control points.
const RIDGE: readonly (readonly [number, number])[] = [
  [0, 13], [7, 10], [13, 11], [21, 7], [29, 9], [37, 6], [45, 8],
  [53, 11], [59, 10], [66, 13], [74, 15], [81, 17], [87, 18],
];

const STARS: readonly (readonly [number, number])[] = [
  [3, 2], [11, 6], [19, 1], [27, 3], [33, 1], [44, 4], [51, 1],
  [57, 5], [63, 2], [84, 3], [86, 9], [66, 8], [80, 11],
];

const SUN = { x: 73, y: 6, r: 3.6 };
const WALL_END = 64;
const SEA_TOP = 20;

function ridgeY(x: number): number {
  for (let i = 1; i < RIDGE.length; i++) {
    const [x0, y0] = RIDGE[i - 1]!;
    const [x1, y1] = RIDGE[i]!;
    if (x <= x1) return Math.round(y0 + ((y1 - y0) * (x - x0)) / (x1 - x0));
  }
  return RIDGE[RIDGE.length - 1]![1];
}

function disc(put: Put, cx: number, cy: number, r: number, ink: 'k' | 'r', cut?: { x: number; y: number; r: number }): void {
  for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y++) {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++) {
      if ((x - cx) ** 2 + (y - cy) ** 2 > r * r) continue;
      if (cut && (x - cut.x) ** 2 + (y - cut.y) ** 2 <= cut.r * cut.r) continue;
      put(x, y, ink);
    }
  }
}

export const paintPalma: Painter = (put, frame, dark) => {
  // Sky: sun by day, moon and stars by night.
  if (dark) {
    STARS.forEach(([x, y], i) => {
      const phase = (frame + i * 7) % 28;
      if (phase < 22) put(x, y, phase < 4 ? 'k' : 'm');
    });
    disc(put, SUN.x, SUN.y, SUN.r, 'k', { x: SUN.x + 2, y: SUN.y - 1, r: 3 });
  } else {
    disc(put, SUN.x, SUN.y, SUN.r, 'r');
  }

  // Mountains, a single faint ridge line.
  let prev = ridgeY(0);
  for (let x = 0; x < PALMA_WIDTH; x++) {
    const y = ridgeY(x);
    for (let fill = Math.min(prev, y); fill <= Math.max(prev, y); fill++) put(x, fill, 'b');
    prev = y;
  }

  // Gulls drift left and flap.
  const gullX = PALMA_WIDTH + 8 - (Math.floor(frame / 2) % (PALMA_WIDTH + 24));
  drawSprite(put, GULL[Math.floor(frame / 3) % 2]!, gullX, 4);
  drawSprite(put, GULL[Math.floor(frame / 3 + 1) % 2]!, gullX + 8, 7);

  // City: cathedral, palms, sea wall.
  drawSprite(put, CATHEDRAL, 6, 3);
  drawSprite(put, PALM_LEFT, 45, 6);
  drawSprite(put, PALM, 54, 8);
  for (let x = 0; x <= WALL_END + 1; x++) {
    if (x <= WALL_END - 1) put(x, 18, 'k');
    put(x, 19, 'k');
  }
  for (let x = WALL_END + 2; x < PALMA_WIDTH; x++) put(x, 19, 'b');

  // Sea: rows of short wave crests, drifting in alternate directions.
  for (let y = SEA_TOP; y < PALMA_HEIGHT; y++) {
    const depth = y - SEA_TOP;
    const period = 9 + depth * 2;
    const length = 1 + Math.floor(depth / 3);
    const drift = Math.floor(frame / (9 - depth)) * (depth % 2 === 0 ? 1 : -1);
    for (let x = 0; x < PALMA_WIDTH; x++) {
      const k = (((x + drift + depth * 5) % period) + period) % period;
      if (k < length) put(x, y, depth < 3 ? 'b' : 'm');
    }
    // Glitter under the sun or moon: a few short streaks that move about.
    const spread = 1 + Math.floor(depth / 2);
    const seed = Math.imul(y * 31 + Math.floor(frame / 3), 2654435761) >>> 0;
    const gx = SUN.x - spread + (seed % (2 * spread + 1));
    put(gx, y, dark ? 'k' : 'r');
    if (depth > 3) put(gx + 1, y, dark ? 'k' : 'r');
  }

  // Sailboat crossing left to right, bobbing.
  const boatX = ((60 + Math.floor(frame / 3)) % (PALMA_WIDTH + 16)) - 10;
  drawSprite(put, BOAT, boatX, 19 + (Math.floor(frame / 8) % 2));
};
