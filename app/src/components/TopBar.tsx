/**
 * Home-only top bar.
 * 14px sunglow brand dot with a 4px-inset sage inner + "FRESH BREAKS" wordmark.
 * 1px bottom rule.
 */
export default function TopBar() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 14,
        borderBottom: '1px solid var(--fb-rule)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          aria-hidden
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: 'var(--fb-sunglow)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 4,
              borderRadius: '50%',
              background: 'var(--fb-calm)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--fb-font-body)',
            fontWeight: 700,
            fontSize: 'var(--fb-size-meta)',
            letterSpacing: 'var(--fb-track-label)',
            textTransform: 'uppercase',
            color: 'var(--fb-text-1)',
            whiteSpace: 'nowrap',
          }}
        >
          Fresh Breaks
        </span>
      </div>
    </div>
  );
}
