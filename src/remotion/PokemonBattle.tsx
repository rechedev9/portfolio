import type { ReactElement } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

/* ──────────────────────────────────────────────
   Deterministic pseudo-random (same seed → same value)
   ────────────────────────────────────────────── */
function seeded(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/* ──────────────────────────────────────────────
   Pixel particles — small squares in Gen-1 palette
   ────────────────────────────────────────────── */
const PIXEL_COUNT = 40;

const PIXEL_COLORS = [
  '#e63946', // red (fire)
  '#f4a261', // orange
  '#e9c46a', // yellow (electric)
  '#2a9d8f', // teal (water)
  '#4cc9f0', // light blue (ice)
  '#a8dadc', // pale cyan
  '#f1faee', // white (normal)
  '#7209b7', // purple (psychic)
] as const;

interface PixelParticle {
  readonly x: number;
  readonly baseY: number;
  readonly size: number;
  readonly speed: number;
  readonly driftAmp: number;
  readonly phase: number;
  readonly maxOpacity: number;
  readonly color: string;
  readonly cycleOffset: number;
}

function generatePixels(): readonly PixelParticle[] {
  const result: PixelParticle[] = [];
  for (let i = 0; i < PIXEL_COUNT; i++) {
    result.push({
      x: seeded(i * 3) * 100,
      baseY: seeded(i * 5) * 100,
      size: 3 + Math.floor(seeded(i * 7) * 5),
      speed: 0.06 + seeded(i * 11) * 0.14,
      driftAmp: 5 + seeded(i * 13) * 20,
      phase: seeded(i * 17) * Math.PI * 2,
      maxOpacity: 0.2 + seeded(i * 19) * 0.5,
      color: PIXEL_COLORS[Math.floor(seeded(i * 23) * PIXEL_COLORS.length)],
      cycleOffset: seeded(i * 29) * 120,
    });
  }
  return result;
}

const pixels = generatePixels();

/* ──────────────────────────────────────────────
   Pokeball shapes — floating in the background
   ────────────────────────────────────────────── */
const POKEBALL_COUNT = 5;

interface Pokeball {
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly rotSpeed: number;
  readonly floatAmp: number;
  readonly phase: number;
  readonly opacity: number;
}

function generatePokeballs(): readonly Pokeball[] {
  const result: Pokeball[] = [];
  for (let i = 0; i < POKEBALL_COUNT; i++) {
    result.push({
      x: 10 + seeded(i * 41) * 80,
      y: 15 + seeded(i * 43) * 65,
      size: 30 + seeded(i * 47) * 50,
      rotSpeed: 0.3 + seeded(i * 51) * 0.8,
      floatAmp: 8 + seeded(i * 53) * 15,
      phase: seeded(i * 59) * Math.PI * 2,
      opacity: 0.06 + seeded(i * 61) * 0.1,
    });
  }
  return result;
}

const pokeballs = generatePokeballs();

/* ──────────────────────────────────────────────
   Battle flash — periodic bright pulse
   ────────────────────────────────────────────── */
const FLASH_INTERVAL = 180; // frames between flashes
const FLASH_DURATION = 12; // frames per flash
const FLASH_COLORS = [
  'rgba(255, 220, 60, ALPHA)', // electric yellow
  'rgba(255, 80, 60, ALPHA)', // fire red
  'rgba(80, 180, 255, ALPHA)', // water blue
  'rgba(120, 255, 120, ALPHA)', // grass green
] as const;

/* ──────────────────────────────────────────────
   Attack beam — periodic particle burst
   ────────────────────────────────────────────── */
const BEAM_PARTICLE_COUNT = 12;
const BEAM_INTERVAL = 150;
const BEAM_DURATION = 40;

/* ──────────────────────────────────────────────
   Composition
   ────────────────────────────────────────────── */
export function PokemonBattle(): ReactElement {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = (frame / durationInFrames) * Math.PI * 2;

  // --- Flash ---
  const flashIndex = Math.floor(frame / FLASH_INTERVAL);
  const flashFrame = frame % FLASH_INTERVAL;
  const flashActive = flashFrame < FLASH_DURATION;
  const flashColor = FLASH_COLORS[flashIndex % FLASH_COLORS.length];
  const flashAlpha = flashActive
    ? Math.sin((flashFrame / FLASH_DURATION) * Math.PI) * 0.15
    : 0;

  // --- Beam attack timing ---
  const beamFrame = frame % BEAM_INTERVAL;
  const beamActive = beamFrame < BEAM_DURATION;
  const beamProgress = beamActive ? beamFrame / BEAM_DURATION : 0;
  const beamDirection = Math.floor(frame / BEAM_INTERVAL) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a1a', overflow: 'hidden' }}>
      {/* Dark gradient sky — battle arena ambiance */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(
            180deg,
            #0a0a1e 0%,
            #12122e 30%,
            #1a1a3e 60%,
            #22223e 80%,
            #2a1a2e 100%
          )`,
        }}
      />

      {/* Subtle terrain at bottom — pixel-art ground line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '18%',
          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(34, 80, 34, 0.15) 30%,
            rgba(34, 80, 34, 0.25) 60%,
            rgba(20, 50, 20, 0.35) 100%
          )`,
        }}
      />
      {/* Pixelated grass edge */}
      <div
        style={{
          position: 'absolute',
          bottom: '17%',
          left: 0,
          right: 0,
          height: '4px',
          background:
            'repeating-linear-gradient(90deg, rgba(50, 120, 50, 0.3) 0px, rgba(50, 120, 50, 0.3) 8px, transparent 8px, transparent 16px)',
          imageRendering: 'pixelated',
        }}
      />

      {/* Floating Pokeballs */}
      {pokeballs.map((pb, i) => {
        const floatY = Math.sin(frame * 0.015 + pb.phase) * pb.floatAmp;
        const floatX = Math.cos(frame * 0.01 + pb.phase * 1.3) * (pb.floatAmp * 0.5);
        const rotation = frame * pb.rotSpeed;
        const half = pb.size / 2;
        const bandH = Math.max(2, pb.size * 0.08);
        const centerDot = Math.max(4, pb.size * 0.18);

        return (
          <div
            key={`pb-${i}`}
            style={{
              position: 'absolute',
              left: `${pb.x}%`,
              top: `${pb.y}%`,
              width: pb.size,
              height: pb.size,
              borderRadius: '50%',
              opacity: pb.opacity + Math.sin(frame * 0.02 + pb.phase) * 0.03,
              transform: `translate(${floatX}px, ${floatY}px) rotate(${rotation}deg)`,
              overflow: 'hidden',
              border: `1px solid rgba(40, 40, 60, ${pb.opacity * 3})`,
              willChange: 'transform',
            }}
          >
            {/* Top half — red */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: half,
                backgroundColor: `rgba(220, 50, 50, 0.8)`,
                borderRadius: `${half}px ${half}px 0 0`,
              }}
            />
            {/* Bottom half — white */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: half,
                backgroundColor: `rgba(240, 240, 240, 0.8)`,
                borderRadius: `0 0 ${half}px ${half}px`,
              }}
            />
            {/* Center band */}
            <div
              style={{
                position: 'absolute',
                top: `calc(50% - ${bandH / 2}px)`,
                left: 0,
                right: 0,
                height: bandH,
                backgroundColor: 'rgba(30, 30, 40, 0.9)',
              }}
            />
            {/* Center button */}
            <div
              style={{
                position: 'absolute',
                top: `calc(50% - ${centerDot / 2}px)`,
                left: `calc(50% - ${centerDot / 2}px)`,
                width: centerDot,
                height: centerDot,
                borderRadius: '50%',
                backgroundColor: 'rgba(240, 240, 240, 0.9)',
                border: `1px solid rgba(30, 30, 40, 0.8)`,
              }}
            />
          </div>
        );
      })}

      {/* Floating pixel particles */}
      {pixels.map((p, i) => {
        const cycleLen = 120 / p.speed;
        const localFrame = (frame + p.cycleOffset / p.speed) % cycleLen;
        const yOffset = localFrame * p.speed;
        const currentY = p.baseY + 15 - yOffset;

        const currentX = p.x + Math.sin(frame * 0.018 + p.phase) * p.driftAmp;

        let opacity = p.maxOpacity;
        if (currentY > 95) opacity *= Math.max(0, (105 - currentY) / 10);
        if (currentY < 5) opacity *= currentY / 5;
        if (opacity <= 0.01) return null;

        const pulse = 0.6 + Math.sin(frame * 0.05 + p.phase) * 0.4;

        return (
          <div
            key={`px-${i}`}
            style={{
              position: 'absolute',
              left: `${currentX}%`,
              top: `${currentY}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: opacity * pulse,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              imageRendering: 'pixelated',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Attack beam particles */}
      {beamActive &&
        Array.from({ length: BEAM_PARTICLE_COUNT }).map((_, i) => {
          const particleProgress = Math.min(
            1,
            beamProgress * 1.5 - (i / BEAM_PARTICLE_COUNT) * 0.5,
          );
          if (particleProgress <= 0) return null;

          const startX = beamDirection ? 20 : 80;
          const endX = beamDirection ? 80 : 20;
          const startY = beamDirection ? 70 : 30;
          const endY = beamDirection ? 30 : 70;

          const px = startX + (endX - startX) * particleProgress;
          const py =
            startY +
            (endY - startY) * particleProgress +
            Math.sin(particleProgress * Math.PI * 3 + i) * 8;

          const beamColorIndex = Math.floor(frame / BEAM_INTERVAL) % FLASH_COLORS.length;
          const baseColor = FLASH_COLORS[beamColorIndex];
          const color = baseColor.replace('ALPHA', '0.9');

          const pSize = 4 + seeded(i * 71 + flashIndex) * 6;
          const pOpacity = 0.6 + Math.sin(particleProgress * Math.PI) * 0.4;

          return (
            <div
              key={`beam-${i}`}
              style={{
                position: 'absolute',
                left: `${px}%`,
                top: `${py}%`,
                width: pSize,
                height: pSize,
                backgroundColor: color,
                opacity: pOpacity,
                boxShadow: `0 0 ${pSize * 3}px ${color}, 0 0 ${pSize * 6}px ${color}`,
                pointerEvents: 'none',
              }}
            />
          );
        })}

      {/* Battle flash overlay */}
      {flashAlpha > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: flashColor.replace('ALPHA', String(flashAlpha)),
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Ambient glow — pulsing center light */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(
            ellipse 40% 35% at 50% 50%,
            rgba(100, 80, 180, ${0.04 + Math.sin(t * 0.6) * 0.02}) 0%,
            transparent 70%
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Sweeping colored light — cycles through types */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: `${35 + Math.sin(t * 0.4) * 30}%`,
          width: '3px',
          height: '80%',
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${PIXEL_COLORS[Math.floor((frame / 120) % PIXEL_COLORS.length)]}33 40%,
            ${PIXEL_COLORS[Math.floor((frame / 120) % PIXEL_COLORS.length)]}11 60%,
            transparent 100%
          )`,
          filter: 'blur(12px)',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}
