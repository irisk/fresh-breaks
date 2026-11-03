import { useEffect, useState } from 'react';

// 2000ms lets the breath ring complete its visible "inhale" (peaks at
// 1.6s of the 4s loop), which makes the splash read as a breath rather
// than a static circle. Pairs with the wellness-app convention of
// 1.5-2.5s splashes and reinforces the "slow down" promise of the app.
const MIN_VISIBLE_MS = 2000;
const FADE_MS = 240;

/**
 * App splash. Renders as a fixed overlay for at least MIN_VISIBLE_MS, then
 * fades out over FADE_MS and unmounts. Visually matches the inline pre-JS
 * splash in index.html so the handoff is seamless.
 */
export default function Splash() {
  const [phase, setPhase] = useState<'showing' | 'fading' | 'gone'>('showing');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), MIN_VISIBLE_MS);
    const t2 = setTimeout(() => setPhase('gone'), MIN_VISIBLE_MS + FADE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--fb-white)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--fb-font-body)',
        opacity: phase === 'fading' ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease`,
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 96,
          height: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid var(--fb-sunglow)',
            opacity: 0,
            animation: 'fb-splash-ring 4s var(--fb-ease-breath) infinite',
          }}
        />
        <img src="/mark.svg" width="96" height="96" alt="" />
      </div>
      <div
        style={{
          marginTop: 32,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          color: 'var(--fb-ocean)',
        }}
      >
        Fresh Breaks
      </div>
      <style>{`
        @keyframes fb-splash-ring {
          0%   { transform: scale(0.85); opacity: 0;   }
          40%  { transform: scale(1.25); opacity: 0.7; }
          70%  { transform: scale(1.6);  opacity: 0;   }
          100% { transform: scale(1.6);  opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-fb-splash-ring] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
