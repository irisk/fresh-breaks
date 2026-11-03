/**
 * 16-pip ring rendered around the breath disc.
 *
 * v1 simplification (vs design-handoff/motion.md): pips are colored by
 * phase membership only — pips owned by the current phase are deep-sage,
 * other pips are calm-faded. The "one pip per second active highlight"
 * isn't implemented here because the engine ticks at 1Hz and non-Box
 * patterns (Resonance, Energize) would need sub-second granularity to
 * advance through 8-pips-per-phase smoothly. The disc scale + counter
 * carry the rhythm; the pips communicate phase progress.
 */

import type { BreathingPattern } from '@/data/breathing';

interface PipRingProps {
  /** Outer container is 290px square — this ring sits at 135px radius from center. */
  size?: number;
  /** Current phase from the breathing engine. */
  currentPhase: 'inhale' | 'hold1' | 'exhale' | 'hold2';
  pattern: BreathingPattern;
}

const TOTAL_PIPS = 16;

export default function PipRing({ size = 290, currentPhase, pattern }: PipRingProps) {
  const cx = size / 2;
  const cy = size / 2;
  const ringRadius = 135;

  // Which pip indices belong to which phase?
  // Phases with 0 duration get 0 pips. The remaining 16 are split
  // proportionally across active phases.
  const phaseOrder: Array<keyof BreathingPattern> = ['inhale', 'hold1', 'exhale', 'hold2'];
  const activePhases = phaseOrder.filter((p) => pattern[p] > 0);
  const pipsPerPhase = Math.floor(TOTAL_PIPS / activePhases.length);
  const remainder = TOTAL_PIPS - pipsPerPhase * activePhases.length;

  const ownership: Array<keyof BreathingPattern> = [];
  activePhases.forEach((phase, i) => {
    const count = pipsPerPhase + (i < remainder ? 1 : 0);
    for (let j = 0; j < count; j++) ownership.push(phase);
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {ownership.map((owner, i) => {
        const angle = (i / TOTAL_PIPS) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * ringRadius;
        const y = cy + Math.sin(angle) * ringRadius;
        const isActivePhase = owner === currentPhase;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={isActivePhase ? 3.8 : 3}
            fill={isActivePhase ? 'var(--fb-calm-deep)' : 'var(--fb-calm)'}
            opacity={isActivePhase ? 1 : 0.4}
            style={{
              transition: 'fill 180ms ease, opacity 180ms ease',
            }}
          />
        );
      })}
    </svg>
  );
}
