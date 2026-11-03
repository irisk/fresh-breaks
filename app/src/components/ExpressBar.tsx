import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { pickRandom } from '@/lib/utils';

/**
 * Home express bar — H1 ocean pill (the shipped Direction E variant).
 * 66px tall, 22px radius, ocean background, cream text.
 *
 * Tapping picks a random intervention that starts immediately — no
 * secondary picker. Pool intentionally excludes Sound Scape, Nature &
 * Animals, and Gratitude Ripples, since those need a category / opener
 * choice that contradicts the "no decisions" express promise.
 */
const EXPRESS_DESTINATIONS = [
  '/breathing/box',
  '/breathing/resonance',
  '/breathing/energize',
  '/reflection',
  '/conversation',
];

export default function ExpressBar() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(pickRandom(EXPRESS_DESTINATIONS))}
      style={{
        width: '100%',
        height: 66,
        background: 'var(--fb-ocean)',
        color: 'var(--fb-cream)',
        border: 'none',
        borderRadius: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px 0 22px',
        cursor: 'pointer',
        fontFamily: 'var(--fb-font-body)',
        fontWeight: 600,
        fontSize: 16,
        letterSpacing: 'var(--fb-track-snug)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            border: '1.8px solid var(--fb-cream)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--fb-cream)',
            }}
          />
        </span>
        Pick a break for me
      </span>
      <span
        aria-hidden
        style={{
          width: 38,
          height: 38,
          borderRadius: '50%',
          background: 'var(--fb-calm)',
          color: 'var(--fb-ocean)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon name="arrow" size={16} stroke={2} />
      </span>
    </button>
  );
}
