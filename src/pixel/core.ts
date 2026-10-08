// Shared pieces for the pixel art: palette keys, painters and sprite drawing.

/** Palette keys used in sprite strings. `.` (or any other character) is transparent. */
export type Ink = 'k' | 'm' | 'r' | 'b' | 'p';

export type Put = (x: number, y: number, ink: Ink) => void;

/** Paints one frame. Frames advance at `fps`; `dark` lets a scene swap sun for moon. */
export type Painter = (put: Put, frame: number, dark: boolean) => void;

export function drawSprite(put: Put, rows: readonly string[], x: number, y: number): void {
  rows.forEach((row, dy) => {
    for (let dx = 0; dx < row.length; dx++) {
      const ch = row[dx];
      if (ch === 'k' || ch === 'm' || ch === 'r' || ch === 'b' || ch === 'p') put(x + dx, y + dy, ch);
    }
  });
}

/** Paints a list of hand-drawn frames, one after another. */
export function framesPainter(frames: readonly (readonly string[])[]): Painter {
  return (put, frame) => drawSprite(put, frames[frame % frames.length] ?? [], 0, 0);
}
