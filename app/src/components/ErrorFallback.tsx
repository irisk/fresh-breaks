import { useNavigate } from 'react-router-dom';

export default function ErrorFallback({ onReset }: { onReset: () => void }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--fb-pad-screen-x)',
        background: 'var(--fb-white)',
        textAlign: 'center',
        fontFamily: 'var(--fb-font-body)',
      }}
    >
      <p
        style={{
          fontWeight: 800,
          fontSize: 'var(--fb-size-h2)',
          letterSpacing: 'var(--fb-track-snug)',
          color: 'var(--fb-text-1)',
          marginBottom: 8,
        }}
      >
        Something went wrong
      </p>
      <p
        style={{
          fontWeight: 400,
          fontSize: 'var(--fb-size-body)',
          color: 'var(--fb-text-3)',
          marginBottom: 28,
        }}
      >
        The app ran into an unexpected error.
      </p>
      <button
        type="button"
        onClick={() => {
          onReset();
          navigate('/', { replace: true });
        }}
        style={{
          padding: '12px 24px',
          borderRadius: 'var(--fb-r-pill)',
          background: 'var(--fb-ocean)',
          color: 'var(--fb-cream)',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--fb-font-body)',
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        Back to home
      </button>
    </div>
  );
}
