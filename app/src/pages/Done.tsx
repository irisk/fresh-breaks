import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import Icon from '@/components/Icon';

export default function Done() {
  const navigate = useNavigate();

  return (
    <ScreenShell
      background={
        'radial-gradient(ellipse 80% 55% at 50% 0%, var(--fb-sunglow-soft), transparent 70%), var(--fb-white)'
      }
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 60,
        }}
      >
        {/* Sunglow disc with sun icon */}
        <div
          className="animate-scale-in"
          aria-hidden
          style={{
            width: 116,
            height: 116,
            borderRadius: '50%',
            background: 'var(--fb-sunglow)',
            color: 'var(--fb-ocean)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--fb-shadow-sunglow)',
            marginBottom: 32,
          }}
        >
          <Icon name="sun" size={52} stroke={1.8} />
        </div>

        {/* Eyebrow */}
        <div
          className="animate-fade-in-d1"
          style={{
            fontWeight: 500,
            fontSize: 'var(--fb-size-eyebrow)',
            letterSpacing: 'var(--fb-track-eyebrow)',
            textTransform: 'uppercase',
            color: 'var(--fb-calm-deep)',
            marginBottom: 12,
          }}
        >
          Break complete
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-d1"
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 800,
            fontSize: 'var(--fb-size-h1)',
            lineHeight: 1.1,
            letterSpacing: 'var(--fb-track-tight)',
            color: 'var(--fb-text-1)',
            margin: 0,
            maxWidth: 320,
          }}
        >
          Nice. You took a moment for yourself.
        </h1>

        <p
          className="animate-fade-in-d2"
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 400,
            fontSize: 'var(--fb-size-body)',
            color: 'var(--fb-text-2)',
            marginTop: 14,
            marginBottom: 56,
          }}
        >
          That's all it takes.
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="animate-fade-in-d3"
          style={{
            width: '100%',
            maxWidth: 320,
            height: 56,
            borderRadius: 'var(--fb-r-m)',
            background: 'var(--fb-ocean)',
            color: 'var(--fb-cream)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 600,
            fontSize: 16,
            letterSpacing: 'var(--fb-track-snug)',
            boxShadow: 'var(--fb-shadow-cta)',
            marginBottom: 18,
          }}
        >
          Back to your day
        </button>

        {/* Tertiary link */}
        <button
          type="button"
          onClick={() => {
            // Best-effort: window.close only works for windows opened via script.
            // For a PWA, this is a no-op; falls back to going home.
            window.close();
            navigate('/');
          }}
          className="animate-fade-in-d3"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 500,
            fontSize: 13,
            color: 'var(--fb-text-3)',
            padding: '8px 12px',
          }}
        >
          Done for today — close the app
        </button>
      </div>
    </ScreenShell>
  );
}
