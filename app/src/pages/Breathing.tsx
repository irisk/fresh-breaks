import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import BreathDisc from '@/components/breath/BreathDisc';
import Icon from '@/components/Icon';
import { exercises } from '@/data/breathing';
import { useBreathingEngine } from '@/hooks/useBreathingEngine';
import { formatTime } from '@/lib/utils';

export default function Breathing() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const exercise = exercises.find((ex) => ex.id === id) ?? exercises[0];
  const engine = useBreathingEngine(exercise);

  useEffect(() => {
    if (engine.isComplete) {
      navigate('/done');
    }
  }, [engine.isComplete, navigate]);

  const phaseDuration = exercise.pattern[engine.currentPhase];
  const eyebrow = `${shortName(exercise.name)} · ${cadenceLabel(exercise.pattern)}`;

  return (
    <ScreenShell>
      {/* Top row: close chip + centered pattern label / remaining time */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          minHeight: 44,
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/')}
          aria-label="Close"
          style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--fb-r-xs)',
            background: 'var(--fb-tint)',
            color: 'var(--fb-ocean)',
            border: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <Icon name="close" size={20} />
        </button>

        <div style={{ textAlign: 'center', lineHeight: 1.2 }}>
          <div
            style={{
              fontWeight: 500,
              fontSize: 'var(--fb-size-eyebrow)',
              letterSpacing: 'var(--fb-track-eyebrow)',
              textTransform: 'uppercase',
              color: 'var(--fb-text-3)',
              whiteSpace: 'nowrap',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontWeight: 500,
              fontSize: 13,
              color: 'var(--fb-text-2)',
              marginTop: 2,
            }}
          >
            {formatTime(engine.totalRemaining)} remaining
          </div>
        </div>

        <span aria-hidden style={{ width: 44, height: 44 }} />
      </div>

      {/* Breath disc */}
      <div
        className="animate-fade-in-d1"
        style={{
          marginTop: 36,
          marginBottom: 36,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BreathDisc
          pattern={exercise.pattern}
          currentPhase={engine.currentPhase}
          phaseLabel={engine.phaseLabel}
          phaseCountdown={engine.phaseCountdown}
          hint={exercise.instructions}
          isRunning={engine.isRunning}
          hasStarted={engine.hasStarted}
          phaseDuration={phaseDuration}
        />
      </div>

      {/* Controls: Reset — Play/Pause — Skip */}
      <div
        className="animate-fade-in-d2"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        <ControlChip onClick={engine.reset} ariaLabel="Restart">
          <Icon name="reset" size={20} />
        </ControlChip>

        <button
          type="button"
          onClick={engine.toggle}
          aria-label={engine.isRunning ? 'Pause' : 'Play'}
          style={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            background: 'var(--fb-ocean)',
            color: 'var(--fb-cream)',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--fb-shadow-sunglow)',
          }}
        >
          <Icon name={engine.isRunning ? 'pause' : 'play'} size={26} />
        </button>

        <ControlChip onClick={() => navigate('/done')} ariaLabel="Skip to end">
          <Icon name="skip" size={20} />
        </ControlChip>
      </div>
    </ScreenShell>
  );
}

function ControlChip({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        width: 48,
        height: 48,
        borderRadius: 'var(--fb-r-pill)',
        background: 'var(--fb-tint)',
        color: 'var(--fb-text-2)',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

function shortName(name: string): string {
  return name.split(' ')[0].toUpperCase();
}

function cadenceLabel(pattern: {
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}): string {
  const parts: number[] = [pattern.inhale];
  if (pattern.hold1 > 0) parts.push(pattern.hold1);
  parts.push(pattern.exhale);
  if (pattern.hold2 > 0) parts.push(pattern.hold2);
  return parts.join('-');
}
