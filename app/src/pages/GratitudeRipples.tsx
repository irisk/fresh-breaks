import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import Icon from '@/components/Icon';

const OPENERS = [
  { starter: 'Thanks for…', hint: 'something specific they did' },
  { starter: 'I appreciated when you…', hint: 'a moment you noticed' },
  { starter: 'Just wanted you to know…', hint: 'what they mean to you' },
];

export default function GratitudeRipples() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [composeText, setComposeText] = useState('');

  const openComposeFor = (index: number) => {
    setSelectedIndex(index);
    setComposeText(`${OPENERS[index].starter} `);
  };

  const send = () => {
    if (navigator.share) {
      navigator.share({ text: composeText }).catch(() => {});
    }
    navigate('/done');
  };

  return (
    <ScreenShell>
      <SubBar
        eyebrow="Gratitude Ripples"
        eyebrowDotColor="var(--fb-sunset)"
        onBack={
          selectedIndex !== null
            ? () => {
                setSelectedIndex(null);
                setComposeText('');
              }
            : undefined
        }
      />

      {selectedIndex === null ? (
        <>
          <div style={{ marginTop: 24, marginBottom: 18 }}>
            <h1
              style={{
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 800,
                fontSize: 'var(--fb-size-h1)',
                lineHeight: 1.1,
                letterSpacing: 'var(--fb-track-tight)',
                color: 'var(--fb-text-1)',
                margin: 0,
                maxWidth: 280,
              }}
            >
              Send a quiet thanks.
            </h1>
            <p
              style={{
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 400,
                fontSize: 'var(--fb-size-body)',
                color: 'var(--fb-text-2)',
                lineHeight: 1.45,
                marginTop: 10,
                marginBottom: 0,
              }}
            >
              Pick an opener. It expands into a quick note you can share.
            </p>
          </div>

          {/* Signature: three tappable opener cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginTop: 8,
            }}
          >
            {OPENERS.map((opener, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openComposeFor(i)}
                style={{
                  textAlign: 'left',
                  background: 'var(--fb-sunset-soft)',
                  border: 'none',
                  borderRadius: 'var(--fb-r-l)',
                  padding: '18px 20px',
                  cursor: 'pointer',
                  fontFamily: 'var(--fb-font-body)',
                  color: 'var(--fb-text-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 'var(--fb-size-h3)',
                      letterSpacing: 'var(--fb-track-snug)',
                    }}
                  >
                    “{opener.starter}”
                  </div>
                  <div
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      color: 'var(--fb-text-2)',
                      marginTop: 4,
                    }}
                  >
                    {opener.hint}
                  </div>
                </div>
                <span
                  aria-hidden
                  style={{
                    color: 'var(--fb-sunset)',
                    flexShrink: 0,
                  }}
                >
                  <Icon name="arrow" size={18} stroke={1.8} />
                </span>
              </button>
            ))}
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
              Maybe later
            </button>
          </div>
        </>
      ) : (
        /* Compose flow: opener expands into editable text + send */
        <>
          <div style={{ marginTop: 24, marginBottom: 18 }}>
            <span
              style={{
                fontWeight: 500,
                fontSize: 'var(--fb-size-eyebrow)',
                letterSpacing: 'var(--fb-track-eyebrow)',
                textTransform: 'uppercase',
                color: 'var(--fb-sunset)',
              }}
            >
              Your note
            </span>
            <h2
              style={{
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 800,
                fontSize: 'var(--fb-size-h2)',
                lineHeight: 1.2,
                letterSpacing: 'var(--fb-track-snug)',
                color: 'var(--fb-text-1)',
                margin: '6px 0 0',
                maxWidth: 320,
              }}
            >
              {OPENERS[selectedIndex].hint
                ? `Add ${OPENERS[selectedIndex].hint}.`
                : 'Finish the thought.'}
            </h2>
          </div>

          <textarea
            value={composeText}
            onChange={(e) => setComposeText(e.target.value)}
            autoFocus
            rows={6}
            style={{
              width: '100%',
              background: 'var(--fb-sunset-soft)',
              border: 'none',
              borderRadius: 'var(--fb-r-l)',
              padding: '16px 18px',
              fontFamily: 'var(--fb-font-body)',
              fontSize: 'var(--fb-size-h3)',
              fontWeight: 500,
              color: 'var(--fb-text-1)',
              lineHeight: 1.4,
              resize: 'none',
              outline: 'none',
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginTop: 22,
            }}
          >
            <button
              type="button"
              onClick={send}
              style={{
                width: '100%',
                height: 56,
                borderRadius: 'var(--fb-r-m)',
                background: 'var(--fb-sunset)',
                color: 'var(--fb-cream)',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: 'var(--fb-track-snug)',
                boxShadow: '0 14px 24px -8px rgba(230, 95, 75, 0.5)',
              }}
            >
              Send
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedIndex(null);
                setComposeText('');
              }}
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
              Pick a different opener
            </button>
          </div>
        </>
      )}
    </ScreenShell>
  );
}
