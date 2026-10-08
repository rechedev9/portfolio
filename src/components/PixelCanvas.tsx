import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { isDarkTheme } from '../theme';
import type { Ink, Painter, Put } from '../pixel/core';

const INK_VARS: Record<Ink, string> = {
  k: '--color-foreground',
  m: '--color-muted',
  r: '--color-accent',
  b: '--color-border',
  p: '--color-background',
};

function readPalette(): Record<Ink, string> {
  const style = getComputedStyle(document.documentElement);
  const read = (ink: Ink): string => style.getPropertyValue(INK_VARS[ink]).trim() || 'currentColor';
  return { k: read('k'), m: read('m'), r: read('r'), b: read('b'), p: read('p') };
}

type PixelCanvasProps = {
  readonly width: number;
  readonly height: number;
  readonly paint: Painter;
  readonly fps?: number;
  /** Frame shown when the visitor prefers reduced motion. */
  readonly still?: number;
  /** CSS pixels per art pixel. Omit to stretch to the container width. */
  readonly scale?: number;
  /** Accessible description. Omit for decorative art. */
  readonly label?: string;
  readonly className?: string;
};

export function PixelCanvas({ width, height, paint, fps = 6, still = 0, scale, label, className }: PixelCanvasProps): ReactElement {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let palette = readPalette();
    let dark = isDarkTheme();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = reduced ? still : 0;
    let timer: number | undefined;

    const put: Put = (x, y, ink) => {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      ctx.fillStyle = palette[ink];
      ctx.fillRect(Math.floor(x), Math.floor(y), 1, 1);
    };
    const draw = (): void => {
      ctx.clearRect(0, 0, width, height);
      paint(put, frame, dark);
    };
    const start = (): void => {
      if (reduced || timer !== undefined) return;
      timer = window.setInterval(() => {
        frame += 1;
        draw();
      }, 1000 / fps);
    };
    const stop = (): void => {
      if (timer === undefined) return;
      window.clearInterval(timer);
      timer = undefined;
    };
    const onTheme = (): void => {
      palette = readPalette();
      dark = isDarkTheme();
      draw();
    };

    draw();
    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener('theme-change', onTheme);
    return (): void => {
      stop();
      io.disconnect();
      window.removeEventListener('theme-change', onTheme);
    };
  }, [width, height, paint, fps, still]);

  const style: CSSProperties = {
    imageRendering: 'pixelated',
    ...(scale ? { width: width * scale, height: height * scale } : { width: '100%', height: 'auto' }),
  };

  return (
    <canvas
      ref={ref}
      width={width}
      height={height}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
      style={style}
    />
  );
}
