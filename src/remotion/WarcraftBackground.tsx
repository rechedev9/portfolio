import type { ReactElement } from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';

const PARTICLE_COUNT = 35;

/**
 * Deterministic pseudo-random based on seed.
 * Ensures particles are consistent across renders.
 */
function seeded(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface Particle {
  readonly x: number;
  readonly size: number;
  readonly speed: number;
  readonly drift: number;
  readonly phase: number;
  readonly maxOpacity: number;
  readonly color: string;
  readonly cycleOffset: number;
}

const PARTICLE_COLORS = [
  'rgba(80, 160, 220, 0.8)',
  'rgba(100, 180, 240, 0.6)',
  'rgba(200, 168, 64, 0.5)',
  'rgba(60, 140, 200, 0.7)',
  'rgba(120, 200, 232, 0.4)',
] as const;

function generateParticles(): readonly Particle[] {
  const result: Particle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    result.push({
      x: seeded(i * 3) * 100,
      size: 2 + seeded(i * 11) * 4,
      speed: 0.08 + seeded(i * 13) * 0.18,
      drift: 8 + seeded(i * 17) * 25,
      phase: seeded(i * 19) * Math.PI * 2,
      maxOpacity: 0.3 + seeded(i * 23) * 0.6,
      color: PARTICLE_COLORS[Math.floor(seeded(i * 29) * PARTICLE_COLORS.length)],
      cycleOffset: seeded(i * 31) * 130,
    });
  }
  return result;
}

const particles = generateParticles();

export function WarcraftBackground(): ReactElement {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Normalized progress through the full loop (0 → 2π)
  const t = (frame / durationInFrames) * Math.PI * 2;

  // Background drift — smooth sine-based pan + scale
  const bgScale = 1.1 + Math.sin(t) * 0.03 + Math.sin(t * 2.3) * 0.015;
  const bgX = Math.sin(t * 0.7) * 10 + Math.cos(t * 1.1) * 4;
  const bgY = Math.cos(t * 1.3) * 7 + Math.sin(t * 0.9) * 3;

  return (
    <AbsoluteFill style={{ backgroundColor: '#020408', overflow: 'hidden' }}>
      {/* Background image with cinematic drift */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          backgroundImage: "url('/warcraft/wc3-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(${bgScale}) translate(${bgX}px, ${bgY}px)`,
          willChange: 'transform',
        }}
      />

      {/* Fog layer 1 — slow, large, blue tint */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(
            ellipse 80% 50% at ${48 + Math.sin(t * 0.6) * 12}% ${45 + Math.cos(t * 0.8) * 10}%,
            rgba(30, 60, 120, ${0.06 + Math.sin(t * 0.4) * 0.03}) 0%,
            transparent 70%
          )`,
        }}
      />

      {/* Fog layer 2 — medium, cyan tint */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(
            ellipse 60% 40% at ${55 + Math.cos(t * 0.5) * 15}% ${55 + Math.sin(t * 0.7) * 8}%,
            rgba(40, 90, 160, ${0.04 + Math.sin(t * 0.6 + 1) * 0.025}) 0%,
            transparent 65%
          )`,
        }}
      />

      {/* Fog layer 3 — subtle gold warmth near center */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(
            ellipse 50% 35% at ${42 + Math.sin(t * 0.3 + 2) * 8}% ${40 + Math.cos(t * 0.5 + 1) * 6}%,
            rgba(160, 130, 40, ${0.025 + Math.sin(t * 0.5 + 2) * 0.015}) 0%,
            transparent 60%
          )`,
        }}
      />

      {/* Floating arcane particles */}
      {particles.map((p, i) => {
        // Continuous upward cycle with offset
        const cycleLength = 130 / p.speed;
        const localFrame = (frame + p.cycleOffset / p.speed) % cycleLength;
        const yProgress = localFrame * p.speed;
        const currentY = 110 - yProgress;

        // Horizontal sine drift
        const currentX = p.x + Math.sin(frame * 0.02 + p.phase) * p.drift;

        // Fade in at bottom, fade out at top
        let opacity = p.maxOpacity;
        if (currentY > 95) opacity *= Math.max(0, (110 - currentY) / 15);
        if (currentY < 15) opacity *= currentY / 15;
        if (opacity <= 0.01) return null;

        // Gentle pulse
        const pulse = 0.7 + Math.sin(frame * 0.04 + p.phase) * 0.3;
        const finalOpacity = opacity * pulse;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${currentX}%`,
              top: `${currentY}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity: finalOpacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color}`,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          />
        );
      })}

      {/* Subtle light beam — sweeping across from upper-left */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: `${20 + Math.sin(t * 0.4) * 30}%`,
          width: '2px',
          height: '140%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(80, 160, 220, 0.03) 30%, rgba(80, 160, 220, 0.06) 50%, rgba(80, 160, 220, 0.03) 70%, transparent 100%)',
          transform: `rotate(${15 + Math.sin(t * 0.3) * 10}deg)`,
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />

      {/* Second light beam — golden, from upper-right */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: `${15 + Math.cos(t * 0.35 + 1) * 25}%`,
          width: '1.5px',
          height: '140%',
          background:
            'linear-gradient(180deg, transparent 0%, rgba(200, 170, 60, 0.02) 30%, rgba(200, 170, 60, 0.05) 50%, rgba(200, 170, 60, 0.02) 70%, transparent 100%)',
          transform: `rotate(${-12 + Math.cos(t * 0.25) * 8}deg)`,
          filter: 'blur(10px)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}
