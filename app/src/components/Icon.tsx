// =============================================================
// Fresh Breaks — icon set
// v0.1 · Direction E
//
// Six category icons + UI glyphs. All 32×32 viewBox, 1.6 stroke,
// currentColor — set color via CSS `color`, size via the `size` prop.
//
// Usage:
//   <Icon name="breathing" size={28} />
//   <Icon name="play" />
//   <span style={{ color: 'var(--fb-calm)' }}><Icon name="breathing" /></span>
// =============================================================

import * as React from 'react';

export type IconName =
  // Category icons
  | 'breathing'
  | 'reflection'
  | 'sound'
  | 'nature'
  | 'conversation'
  | 'gratitude'
  // UI glyphs
  | 'arrow'
  | 'back'
  | 'close'
  | 'play'
  | 'pause'
  | 'reset'
  | 'skip'
  | 'check'
  | 'sun';

export interface IconProps {
  name: IconName;
  /** Pixel size of the rendered SVG square. Default 28. */
  size?: number;
  /** Stroke width applied to outlined paths. Default 1.6. */
  stroke?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

/**
 * Single Fresh Breaks icon. Picks up its color from `currentColor`,
 * so set color on a parent (`color: var(--fb-calm)`) or inline.
 */
export function Icon({
  name,
  size = 28,
  stroke = 1.6,
  className,
  'aria-hidden': ariaHidden = true,
}: IconProps): React.ReactElement | null {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': ariaHidden,
  };

  switch (name) {
    // ── Category icons ───────────────────────────────────────────
    case 'breathing':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11.5" opacity="0.45" />
          <circle cx="16" cy="16" r="6.5" />
          <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'reflection':
      return (
        <svg {...common}>
          <path d="M22 6.2A11 11 0 1 0 25.8 19 7.6 7.6 0 0 1 22 6.2Z" />
          <circle cx="11" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'sound':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="2.1" fill="currentColor" stroke="none" />
          <path d="M11.5 11.5a6.4 6.4 0 0 1 9 9" />
          <path d="M7.5 7.5a12 12 0 0 1 17 17" opacity="0.55" />
        </svg>
      );

    case 'nature':
      return (
        <svg {...common}>
          <path d="M6 26C12 22 17 16 22 8" />
          <path d="M22 8C19.5 8.6 15.3 10.7 14.3 14.6c-.4 1.6.7 3.2 2.4 3.3 2.6.2 5.6-3.5 5.3-9.9Z" />
          <path d="M18.5 14.4 17 17" opacity="0.6" />
        </svg>
      );

    case 'conversation':
      return (
        <svg {...common}>
          <path d="M6 13c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v2c0 3.3-2.7 6-6 6h-1.6L10 24v-3.4C7.7 19.6 6 17.4 6 15v-2Z" />
          <circle cx="25" cy="9.5" r="3.2" opacity="0.55" />
        </svg>
      );

    case 'gratitude':
      return (
        <svg {...common}>
          <circle cx="16" cy="17" r="1.8" fill="currentColor" stroke="none" />
          <circle cx="16" cy="17" r="5.5" />
          <circle cx="16" cy="17" r="10" opacity="0.45" strokeDasharray="1.5 3" />
          <path d="M19 7l-2 2 2 2" opacity="0.7" />
        </svg>
      );

    // ── UI glyphs ────────────────────────────────────────────────
    case 'arrow':
      return (
        <svg {...common}>
          <path d="M8 16h16M18 10l6 6-6 6" />
        </svg>
      );

    case 'back':
      return (
        <svg {...common}>
          <path d="M20 8l-8 8 8 8" />
        </svg>
      );

    case 'close':
      return (
        <svg {...common}>
          <path d="M10 10l12 12M22 10L10 22" />
        </svg>
      );

    case 'play':
      return (
        <svg {...common}>
          <path d="M11 8.5L23 16 11 23.5z" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'pause':
      return (
        <svg {...common}>
          <rect x="11" y="9"   width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
          <rect x="17.5" y="9" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'reset':
      return (
        <svg {...common}>
          <path d="M9 16a7 7 0 1 0 2-4.9L9 13M9 8v5h5" />
        </svg>
      );

    case 'skip':
      return (
        <svg {...common}>
          <path d="M9 10l8 6-8 6V10ZM22 9v14" />
        </svg>
      );

    case 'check':
      return (
        <svg {...common}>
          <path d="M8 17l5 5 11-12" strokeWidth="2.2" />
        </svg>
      );

    case 'sun':
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="5.5" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i / 8) * Math.PI * 2;
            const x1 = 16 + Math.cos(a) * 9;
            const y1 = 16 + Math.sin(a) * 9;
            const x2 = 16 + Math.cos(a) * 12;
            const y2 = 16 + Math.sin(a) * 12;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </svg>
      );

    default:
      return null;
  }
}

export default Icon;
