import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import Icon from '@/components/Icon';
import { getTimeOfDay, getTimeLabel, getFilteredReflections } from '@/data/reflections';
import { useCycleItems } from '@/hooks/useCycleItems';

export default function Reflection() {
  const navigate = useNavigate();

  const timeOfDay = useMemo(() => getTimeOfDay(), []);
  const timeLabel = getTimeLabel(timeOfDay);
  const prompts = useMemo(() => getFilteredReflections(timeOfDay), [timeOfDay]);
  const { current, fading, showNext } = useCycleItems(prompts);

  return (
    <ScreenShell>
      <SubBar eyebrow="Reflection" eyebrowDotColor="var(--fb-reflection)" />

      {/* Signature: oversized open-quote above a centered prompt */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          gap: 18,
          paddingTop: 24,
        }}
      >
        <span
          aria-hidden
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 800,
            fontSize: 140,
            lineHeight: 0.7,
            color: 'var(--fb-reflection)',
            opacity: 0.85,
            userSelect: 'none',
            marginBottom: 8,
          }}
        >
          &ldquo;
        </span>

        <p
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 700,
            fontSize: 26,
            lineHeight: 1.25,
            letterSpacing: 'var(--fb-track-snug)',
            color: 'var(--fb-text-1)',
            margin: 0,
            maxWidth: 300,
            opacity: fading ? 0 : 1,
            transform: fading ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 200ms ease, transform 200ms ease',
          }}
        >
          {current?.text}
        </p>

        <p
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 400,
            fontSize: 'var(--fb-size-body-s)',
            color: 'var(--fb-text-3)',
            margin: 0,
            maxWidth: 260,
            lineHeight: 1.45,
          }}
        >
          {timeLabel
            ? `${timeLabel} · sit with this for a moment.`
            : 'Sit with this for a moment.'}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
          marginTop: 32,
        }}
      >
        <button
          type="button"
          onClick={showNext}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 22px',
            borderRadius: 'var(--fb-r-pill)',
            background: 'var(--fb-tint)',
            color: 'var(--fb-text-2)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          <Icon name="reset" size={16} />
          Show me another
        </button>

        <button
          type="button"
          onClick={() => navigate('/done')}
          style={{
            background: 'transparent',
            color: 'var(--fb-text-3)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 500,
            fontSize: 13,
            padding: '10px 14px',
          }}
        >
          I'm done
        </button>
      </div>
    </ScreenShell>
  );
}
