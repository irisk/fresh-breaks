import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenShell from '@/components/ScreenShell';
import SubBar from '@/components/SubBar';
import Icon from '@/components/Icon';
import { getRandomVideo, type VideoResult } from '@/lib/pexels';

const MODES = [
  { label: 'Calm nature', query: 'calm nature landscape water' },
  { label: 'Cute animals', query: 'cute animals pets funny' },
] as const;

export default function NatureVideo() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [video, setVideo] = useState<VideoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const fetchVideo = useCallback(async (modeIndex: number) => {
    setSelectedMode(modeIndex);
    setError(null);
    setLoading(true);
    setVideo(null);

    try {
      const result = await getRandomVideo(MODES[modeIndex].query);
      if (!result) {
        setError('No clips found. Try the other category.');
        return;
      }
      setVideo(result);
    } catch (err) {
      console.error('Failed to load video:', err);
      setError('Could not load video. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVideoEnded = () => navigate('/done');

  useEffect(() => {
    if (!video) return;
    const timeout = setTimeout(() => {
      videoRef.current?.pause();
      navigate('/done');
    }, 30_000);
    return () => clearTimeout(timeout);
  }, [video, navigate]);

  return (
    <ScreenShell>
      <SubBar eyebrow="Nature & Animals" eyebrowDotColor="var(--fb-nature)" />

      <div
        style={{
          display: 'flex',
          gap: 8,
          marginTop: 22,
          marginBottom: 22,
          justifyContent: 'center',
        }}
      >
        {MODES.map((mode, i) => {
          const isActive = selectedMode === i;
          return (
            <button
              key={mode.label}
              type="button"
              onClick={() => fetchVideo(i)}
              disabled={loading}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--fb-r-pill)',
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 600,
                fontSize: 13,
                border: 'none',
                cursor: loading ? 'wait' : 'pointer',
                background: isActive ? 'var(--fb-nature)' : 'var(--fb-tint)',
                color: isActive ? 'var(--fb-cream)' : 'var(--fb-text-2)',
              }}
            >
              {mode.label}
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
          <div
            aria-hidden
            style={{
              width: 22,
              height: 22,
              border: '2px solid var(--fb-nature)',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'fb-spin 0.8s linear infinite',
            }}
          />
          <p style={{ fontSize: 13, color: 'var(--fb-text-3)' }}>Finding a clip…</p>
          <style>{`@keyframes fb-spin { to { transform: rotate(360deg); } }`}</style>
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
            onClick={() => selectedMode !== null && fetchVideo(selectedMode)}
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

      {video && !loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Signature: a single full-bleed photo/video card with a short label */}
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              aspectRatio: '9 / 16',
              borderRadius: 'var(--fb-r-l)',
              overflow: 'hidden',
              background: 'var(--fb-nature-soft)',
              position: 'relative',
              boxShadow: 'var(--fb-shadow-card)',
            }}
          >
            <video
              ref={videoRef}
              src={video.url}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnded}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <button
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
                if (videoRef.current) videoRef.current.muted = !isMuted;
              }}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'rgba(0, 0, 0, 0.45)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Icon name={isMuted ? 'sound' : 'sound'} size={16} />
              {isMuted && (
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  /
                </span>
              )}
            </button>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--fb-font-body)',
                fontWeight: 700,
                fontSize: 14,
                color: 'var(--fb-text-1)',
              }}
            >
              {MODES[selectedMode ?? 0].label}
            </div>
            <div
              style={{
                fontSize: 11,
                color: 'var(--fb-text-3)',
                marginTop: 2,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              via Pexels
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              marginTop: 12,
            }}
          >
            <button
              type="button"
              onClick={() => selectedMode !== null && fetchVideo(selectedMode)}
              aria-label="Another video"
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
              <Icon name="reset" size={18} />
            </button>

            <button
              type="button"
              onClick={() => navigate('/done')}
              aria-label="Done"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--fb-nature)',
                color: 'var(--fb-cream)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 14px 24px -8px rgba(16, 185, 129, 0.5)',
              }}
            >
              <Icon name="check" size={22} stroke={2.2} />
            </button>
          </div>
        </div>
      )}

      {!video && !loading && !error && (
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
          Pick a vibe above. We'll find a short clip.
        </p>
      )}
    </ScreenShell>
  );
}
