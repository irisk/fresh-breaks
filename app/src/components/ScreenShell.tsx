import type { ReactNode, CSSProperties } from 'react';
import StatusBar from './StatusBar';

interface ScreenShellProps {
  children: ReactNode;
  /** Optional background override (e.g. for the Done screen sunglow wash). */
  background?: string;
  /** Skip the default horizontal/top/bottom padding. Useful for full-bleed screens. */
  noPadding?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Standard screen container. Mounts the status-bar safe-area spacer,
 * applies the shipped spacing tokens, and constrains content to a
 * mobile-first column. Each screen renders its own TopBar or SubBar.
 */
export default function ScreenShell({
  children,
  background,
  noPadding = false,
  className,
  style,
}: ScreenShellProps) {
  const padding: CSSProperties = noPadding
    ? {}
    : {
        paddingLeft: 'var(--fb-pad-screen-x)',
        paddingRight: 'var(--fb-pad-screen-x)',
        paddingTop: 'var(--fb-pad-screen-t)',
        paddingBottom: 'var(--fb-pad-screen-b)',
      };

  return (
    <div
      className={className}
      style={{
        minHeight: '100dvh',
        background: background ?? 'var(--fb-white)',
        color: 'var(--fb-text-1)',
        fontFamily: 'var(--fb-font-body)',
        position: 'relative',
        ...style,
      }}
    >
      <StatusBar />
      <div style={padding}>{children}</div>
    </div>
  );
}
