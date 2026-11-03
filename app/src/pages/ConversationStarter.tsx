import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import Icon from '@/components/Icon';
import { questions } from '@/data/questions';
import { useCycleItems } from '@/hooks/useCycleItems';

export default function ConversationStarter() {
  const navigate = useNavigate();
  const { current, fading, showNext } = useCycleItems(questions);

  return (
    <ScreenShell>
      <SubBar eyebrow="Conversation" eyebrowDotColor="var(--fb-sunglow)" />

      <div
        style={{
          marginTop: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontWeight: 500,
            fontSize: 'var(--fb-size-eyebrow)',
            letterSpacing: 'var(--fb-track-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--fb-text-3)',
          }}
        >
          Ask someone today
        </span>

        {/* Signature: question card with "tap for another" affordance */}
        <button
          type="button"
          onClick={showNext}
          style={{
            width: '100%',
            textAlign: 'left',
            background: 'var(--fb-sunglow-soft)',
            border: 'none',
            borderRadius: 'var(--fb-r-l)',
            padding: '28px 24px 22px',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            color: 'var(--fb-text-1)',
            position: 'relative',
            minHeight: 220,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 14,
            transition: 'opacity 200ms ease',
            opacity: fading ? 0 : 1,
          }}
          aria-label="Tap to get another question"
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: 24,
              lineHeight: 1.25,
              letterSpacing: 'var(--fb-track-snug)',
              margin: 0,
            }}
          >
            {current?.text}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontWeight: 500,
              fontSize: 12,
              color: 'var(--fb-text-2)',
            }}
          >
            <span>Tap for another</span>
            <Icon name="reset" size={14} />
          </div>
        </button>

        <p
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 400,
            fontSize: 'var(--fb-size-body-s)',
            color: 'var(--fb-text-3)',
            margin: 0,
            textAlign: 'center',
            maxWidth: 280,
            lineHeight: 1.45,
          }}
        >
          Carry this with you. Ask a friend, a colleague, or even a stranger.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 32,
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/done')}
          style={{
            padding: '14px 28px',
            borderRadius: 'var(--fb-r-m)',
            background: 'var(--fb-ocean)',
            color: 'var(--fb-cream)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: 'var(--fb-track-snug)',
          }}
        >
          I'll take this one
        </button>
      </div>
    </ScreenShell>
  );
}
