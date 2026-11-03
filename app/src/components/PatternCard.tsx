import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import type { BreathingExercise } from '@/data/breathing';

interface PatternCardProps {
  exercise: BreathingExercise;
  featured?: boolean;
}

/**
 * Pattern card for the breathing picker.
 * Featured (first in list): solid --fb-calm-mid background, no border.
 * Non-featured: white background + 1.5px --fb-calm border.
 */
export default function PatternCard({ exercise, featured = false }: PatternCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/breathing/${exercise.id}`)}
      style={{
        width: '100%',
        textAlign: 'left',
        background: featured ? 'var(--fb-calm-mid)' : 'var(--fb-white)',
        border: featured ? 'none' : '1.5px solid var(--fb-calm)',
        borderRadius: 'var(--fb-r-l)',
        padding: '16px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontFamily: 'var(--fb-font-body)',
        color: 'var(--fb-text-1)',
      }}
    >
      <CadencePips pattern={exercise.pattern} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: 700,
            fontSize: 'var(--fb-size-h3)',
            letterSpacing: 'var(--fb-track-snug)',
            lineHeight: 1.15,
          }}
        >
          {exercise.name}
        </div>
        <div
          style={{
            fontWeight: 400,
            fontSize: 'var(--fb-size-body-s)',
            color: 'var(--fb-text-2)',
            marginTop: 4,
            lineHeight: 1.35,
          }}
        >
          {exercise.description}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginTop: 10,
          }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.04em',
              padding: '3px 10px',
              borderRadius: 'var(--fb-r-pill)',
              background: featured ? 'rgba(4, 15, 50, 0.08)' : 'var(--fb-calm-soft)',
              color: 'var(--fb-text-1)',
              whiteSpace: 'nowrap',
            }}
          >
            {cadenceLabel(exercise.pattern)}
          </span>
          <span
            style={{
              fontWeight: 400,
              fontSize: 12,
              color: 'var(--fb-text-3)',
              whiteSpace: 'nowrap',
            }}
          >
            {formatDuration(exercise.duration)}
          </span>
        </div>
      </div>

      <span
        aria-hidden
        style={{
          color: 'var(--fb-text-2)',
          flexShrink: 0,
        }}
      >
        <Icon name="arrow" size={18} stroke={1.8} />
      </span>
    </button>
  );
}

/**
 * Cadence indicator: 54×54 with a 22px inner disc and pips around it.
 * Inhale/exhale pips are filled; hold pips are outlined.
 */
function CadencePips({ pattern }: { pattern: BreathingExercise['pattern'] }) {
  // Build a sequence of pips: one per second per phase.
  const sequence: Array<{ filled: boolean }> = [];
  for (let i = 0; i < pattern.inhale; i++) sequence.push({ filled: true });
  for (let i = 0; i < pattern.hold1; i++) sequence.push({ filled: false });
  for (let i = 0; i < pattern.exhale; i++) sequence.push({ filled: true });
  for (let i = 0; i < pattern.hold2; i++) sequence.push({ filled: false });

  const n = sequence.length;
  const size = 54;
  const cx = size / 2;
  const cy = size / 2;
  const r = 22; // distance from center to pip

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={{ flexShrink: 0 }}
    >
      {/* Inner disc */}
      <circle cx={cx} cy={cy} r={11} fill="var(--fb-calm)" opacity="0.85" />
      {/* Pips */}
      {sequence.map((p, i) => {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        return p.filled ? (
          <circle key={i} cx={x} cy={y} r={2.2} fill="var(--fb-calm-deep)" />
        ) : (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2}
            fill="none"
            stroke="var(--fb-calm-deep)"
            strokeWidth="1.2"
          />
        );
      })}
    </svg>
  );
}

function cadenceLabel(pattern: BreathingExercise['pattern']): string {
  const parts: number[] = [pattern.inhale];
  if (pattern.hold1 > 0) parts.push(pattern.hold1);
  parts.push(pattern.exhale);
  if (pattern.hold2 > 0) parts.push(pattern.hold2);
  return parts.join(' — ') + 's';
}

function formatDuration(seconds: number): string {
  const m = Math.round(seconds / 60);
  return m === 1 ? '1 min' : `${m} min`;
}
