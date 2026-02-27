import { useRef, useEffect } from 'react';
import type { ReactElement } from 'react';

const CHAR_SET = 'ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789';
const FONT_SIZE = 14;
const FADE_ALPHA = 0.04;
const DROP_RESET_THRESHOLD = 0.975;
const MAX_RESET_OFFSET = 20;
const MIN_SPEED = 0.3;
const SPEED_RANGE = 0.7;
const HEAD_OPACITY = 0.9;

function randomChar(): string {
  return CHAR_SET[Math.floor(Math.random() * CHAR_SET.length)] ?? '0';
}

export function MatrixRain(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drops: number[] = [];
    let speeds: number[] = [];

    const resize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const columns = Math.floor(canvas.width / FONT_SIZE);
      const maxRow = canvas.height / FONT_SIZE;
      const newDrops: number[] = [];
      const newSpeeds: number[] = [];

      for (let i = 0; i < columns; i++) {
        newDrops.push(drops[i] ?? Math.random() * -maxRow);
        newSpeeds.push(speeds[i] ?? MIN_SPEED + Math.random() * SPEED_RANGE);
      }

      drops = newDrops;
      speeds = newSpeeds;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (): void => {
      ctx.fillStyle = `rgba(10, 10, 10, ${FADE_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const drop = drops[i] ?? 0;
        const speed = speeds[i] ?? MIN_SPEED;
        const y = drop * FONT_SIZE;

        ctx.fillStyle = '#ceffce';
        ctx.globalAlpha = HEAD_OPACITY;
        ctx.fillText(randomChar(), x, y);

        if (y > canvas.height && Math.random() > DROP_RESET_THRESHOLD) {
          drops[i] = Math.random() * -MAX_RESET_OFFSET;
          speeds[i] = MIN_SPEED + Math.random() * SPEED_RANGE;
        }

        drops[i] = drop + speed;
      }

      ctx.globalAlpha = 1;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return (): void => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-30"
      aria-hidden="true"
    />
  );
}
