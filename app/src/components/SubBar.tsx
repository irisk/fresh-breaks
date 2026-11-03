import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

interface SubBarProps {
  /** Centered eyebrow text. Will be uppercased + tracked. e.g. "BREATHING". */
  eyebrow: string;
  /** Color of the small dot rendered before the eyebrow text. Defaults to text-3. */
  eyebrowDotColor?: string;
  /** Override the back chip behavior. Defaults to navigate(-1). */
  onBack?: () => void;
  /** Optional aria-label for the back chip. */
  backLabel?: string;
  /** Use a close (×) glyph instead of back (‹). */
  closeIcon?: boolean;
}

/**
 * Sub-screen top bar.
 * Left: back/close chip (tint background, ocean glyph).
 * Center: eyebrow with a small accent dot.
 */
export default function SubBar({
  eyebrow,
  eyebrowDotColor,
  onBack,
  backLabel = 'Go back',
  closeIcon = false,
}: SubBarProps) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));

  return (
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
        onClick={handleBack}
        aria-label={backLabel}
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
        <Icon name={closeIcon ? 'close' : 'back'} size={22} />
      </button>

      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--fb-font-body)',
          fontWeight: 500,
          fontSize: 'var(--fb-size-eyebrow)',
          letterSpacing: 'var(--fb-track-eyebrow)',
          textTransform: 'uppercase',
          color: 'var(--fb-text-3)',
          whiteSpace: 'nowrap',
        }}
      >
        <span
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: eyebrowDotColor ?? 'var(--fb-text-3)',
          }}
        />
        {eyebrow}
      </span>

      {/* Right-side spacer to keep the eyebrow visually centered. */}
      <span aria-hidden style={{ width: 44, height: 44 }} />
    </div>
  );
}
