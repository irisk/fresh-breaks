import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import Icon from '@/components/Icon';
import { getRandomSound, type AudioResult } from '@/lib/freesound';

const CATEGORIES = [
  { label: 'Nature', query: 'nature ambient birds forest' },
  { label: 'Rain', query: 'rain thunder calm' },
  { label: 'Ambient', query: 'ambient calm relaxing meditation' },
] as const;

const MAX_DURATION = 45;

export default function SoundScape() {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sound, setSound] = useState<AudioResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setElapsed((prev) => {
        if (prev + 1 >= MAX_DURATION) {
          audioRef.current?.pause();
          setIsPlaying(false);
          navigate('/done');
          return MAX_DURATION;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, navigate]);

  const fetchAndPlay = useCallback(async (categoryIndex: number) => {
    setSelectedCategory(categoryIndex);
    setError(null);
    setLoading(true);
    setElapsed(0);
    setIsPlaying(false);
    setSound(null);

    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio();
    audio.loop = true;
    audioRef.current = audio;

    try {
      const result = await getRandomSound(CATEGORIES[categoryIndex].query);
      if (!result) {
        setError('No sounds found. Try another category.');
        audioRef.current = null;
        return;
      }
      setSound(result);
      audio.src = result.url;
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error('Failed to load sound:', err);
      setError('Could not load audio. Check your connection.');
      audioRef.current = null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const remaining = MAX_DURATION - elapsed;

  return (
    <ScreenShell>
      <SubBar eyebrow="Sound Scape" eyebrowDotColor="var(--fb-sound)" />

      {/* Category picker */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 22,
          marginBottom: 28,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {CATEGORIES.map((cat, i) => {
          const isActive = selectedCategory === i;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => fetchAndPlay(i)}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--fb-r-pill)',
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 600,
                fontSize: 13,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                background: isActive ? 'var(--fb-sound)' : 'var(--fb-tint)',
                color: isActive ? 'var(--fb-cream)' : 'var(--fb-text-2)',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            marginTop: 60,
          }}
        >
          <Spinner />
          <p style={{ fontSize: 13, color: 'var(--fb-text-3)' }}>Finding a sound…</p>
        </div>
      )}

      {error && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            marginTop: 60,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--fb-text-3)' }}>{error}</p>
          <button
            type="button"
            onClick={() => selectedCategory !== null && fetchAndPlay(selectedCategory)}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--fb-r-pill)',
              background: 'var(--fb-tint)',
              color: 'var(--fb-text-2)',
              border: 'none',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      )}

      {sound && !loading && (
        <>
          {/* Signature: player UI with abstract equalizer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
            }}
          >
            <Equalizer playing={isPlaying} />

            <div style={{ textAlign: 'center', marginTop: 6 }}>
              <div
                style={{
                  fontFamily: 'var(--fb-font-body)',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: 'var(--fb-track-snug)',
                  color: 'var(--fb-text-1)',
                  maxWidth: 280,
                }}
              >
                {sound.title}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--fb-text-3)',
                  marginTop: 4,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                via Freesound · {Math.floor(remaining / 60)}:
                {String(remaining % 60).padStart(2, '0')} remaining
              </div>
            </div>

            {/* Progress */}
            <div
              style={{
                width: '100%',
                maxWidth: 260,
                height: 3,
                borderRadius: 2,
                background: 'var(--fb-rule)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${(elapsed / MAX_DURATION) * 100}%`,
                  height: '100%',
                  background: 'var(--fb-sound)',
                  transition: 'width 1s linear',
                }}
              />
            </div>

            {/* Transport controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                marginTop: 8,
              }}
            >
              <TransportChip
                ariaLabel="New sound"
                onClick={() => selectedCategory !== null && fetchAndPlay(selectedCategory)}
              >
                <Icon name="reset" size={18} />
              </TransportChip>

              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--fb-sound)',
                  color: 'var(--fb-cream)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 14px 24px -8px rgba(139, 92, 246, 0.5)',
                }}
              >
                <Icon name={isPlaying ? 'pause' : 'play'} size={22} />
              </button>

              <TransportChip
                ariaLabel="Done"
                onClick={() => {
                  audioRef.current?.pause();
                  navigate('/done');
                }}
              >
                <Icon name="check" size={18} />
              </TransportChip>
            </div>
          </div>
        </>
      )}

      {!sound && !loading && !error && (
        <p
          style={{
            fontSize: 13,
            color: 'var(--fb-text-3)',
            textAlign: 'center',
            marginTop: 60,
            maxWidth: 260,
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.45,
          }}
        >
          Pick a category to start your moment of elsewhere.
        </p>
      )}
    </ScreenShell>
  );
}

function TransportChip({
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
        width: 44,
        height: 44,
        borderRadius: '50%',
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

function Spinner() {
  return (
    <div
      aria-hidden
      style={{
        width: 22,
        height: 22,
        border: '2px solid var(--fb-sound)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'fb-spin 0.8s linear infinite',
      }}
    >
      <style>{`@keyframes fb-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/**
 * Abstract equalizer: 9 vertical bars that animate (via CSS keyframes)
 * when playing. Replaces the old pulsing-circle visualization.
 */
function Equalizer({ playing }: { playing: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 180,
        marginTop: 8,
      }}
    >
      {bars.map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            borderRadius: 4,
            background: 'var(--fb-sound)',
            opacity: playing ? 1 : 0.4,
            height: playing ? '100%' : '30%',
            animation: playing
              ? `fb-eq-${i % 5} 1.1s ease-in-out ${i * 0.07}s infinite alternate`
              : 'none',
            transition: 'opacity 300ms ease, height 300ms ease',
          }}
        />
      ))}
      <style>{`
        @keyframes fb-eq-0 { from { height: 30%; } to { height: 95%; } }
        @keyframes fb-eq-1 { from { height: 50%; } to { height: 70%; } }
        @keyframes fb-eq-2 { from { height: 80%; } to { height: 40%; } }
        @keyframes fb-eq-3 { from { height: 35%; } to { height: 85%; } }
        @keyframes fb-eq-4 { from { height: 60%; } to { height: 25%; } }
      `}</style>
    </div>
  );
}
