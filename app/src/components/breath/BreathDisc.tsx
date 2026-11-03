import { useEffect, useState } from 'react';
import PipRing from './PipRing';
import type { BreathingPattern } from '@/data/breathing';

interface BreathDiscProps {
  pattern: BreathingPattern;
  currentPhase: 'inhale' | 'hold1' | 'exhale' | 'hold2';
  phaseLabel: string;
  phaseCountdown: number;
  /** Phase guidance text rendered below the counter (e.g. "through your nose, slowly"). */
  hint: string;
  isRunning: boolean;
  hasStarted: boolean;
  /** Total seconds for the current phase (so the scale transition can match). */
  phaseDuration: number;
}

/**
 * The signature breath disc.
 *
 * Layout: 290px square wrapper. PipRing rendered absolutely behind. Sage
 * inner disc (--fb-calm-mid) inset 30px from the wrapper edge, with a 1.5px
 * deep-sage inner border 16px in from the disc edge. Inside the disc:
 * eyebrow → counter → hint.
 *
 * Scale (per motion.md):
 *   inhale         : 0.72 → 1.00 over phaseDuration, --fb-ease-breath
 *   hold-after-inhale : hold at 1.00
 *   exhale         : 1.00 → 0.72 over phaseDuration, --fb-ease-breath
 *   hold-after-exhale : hold at 0.72
 *
 * Reduced motion: disc does not scale; stays at 0.9. The counter and pip
 * recolor still update — they carry the phase rhythm.
 */
export default function BreathDisc({
  pattern,
  currentPhase,
  phaseLabel,
  phaseCountdown,
  hint,
  isRunning,
  hasStarted,
  phaseDuration,
}: BreathDiscProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const scale = prefersReducedMotion
    ? 0.9
    : !hasStarted
    ? 0.72
    : currentPhase === 'inhale' || currentPhase === 'hold1'
    ? 1.0
    : 0.72;

  // Use the current phase duration as the transition length so the disc grows /
  // shrinks in sync with the phase. Holds get a snap (0s) since they don't move.
  const isHold = currentPhase === 'hold1' || currentPhase === 'hold2';
  const transitionDuration =
    !isRunning || isHold || prefersReducedMotion ? '0s' : `${phaseDuration}s`;

  const size = 290;
  const ringInset = 30; // sage disc starts 30px in from the outer ring
  const discSize = size - ringInset * 2;

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        margin: '0 auto',
      }}
      role="img"
      aria-label={`Breath disc — ${hasStarted ? phaseLabel : 'Ready'}, ${phaseCountdown} seconds remaining in phase`}
    >
      {/* Pips first so the disc renders above them */}
      <PipRing size={size} currentPhase={currentPhase} pattern={pattern} />

      {/* Inner disc */}
      <div
        className="breathing-circle"
        style={{
          position: 'absolute',
          top: ringInset,
          left: ringInset,
          width: discSize,
          height: discSize,
          borderRadius: '50%',
          background: 'var(--fb-calm-mid)',
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          transitionProperty: 'transform',
          transitionDuration,
          transitionTimingFunction: 'var(--fb-ease-breath)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 1.5px deep-sage inner border, 16px inset from the disc edge */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 16,
            borderRadius: '50%',
            border: '1.5px solid var(--fb-calm-deep)',
            pointerEvents: 'none',
          }}
        />

        {/* Eyebrow + counter + hint */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <div
            key={`eyebrow-${currentPhase}`}
            style={{
              fontWeight: 500,
              fontSize: 'var(--fb-size-eyebrow)',
              letterSpacing: 'var(--fb-track-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--fb-text-2)',
              animation: prefersReducedMotion ? 'none' : 'fb-eyebrow-fade 240ms ease',
            }}
          >
            {hasStarted ? phaseLabel : 'Ready'}
          </div>

          <div
            key={`count-${phaseCountdown}-${currentPhase}`}
            style={{
              fontWeight: 800,
              fontSize: 'var(--fb-size-breath)',
              letterSpacing: '-0.06em',
              color: 'var(--fb-ocean)',
              lineHeight: 1,
              animation: prefersReducedMotion ? 'none' : 'fb-digit-fade 180ms ease',
            }}
          >
            {phaseCountdown}
          </div>

          <div
            style={{
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--fb-text-3)',
              lineHeight: 1.35,
              maxWidth: 180,
            }}
          >
            {hint}
          </div>
        </div>
      </div>

      {/* Inline keyframes — kept local so we don't pollute index.css with disc-only animations. */}
      <style>{`
        @keyframes fb-eyebrow-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fb-digit-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);
  return prefers;
}
