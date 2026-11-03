/**
 * Safe-area spacer for the iOS / Android system status bar when running
 * as an installed PWA in standalone display mode. In the browser tab
 * (where the browser chrome already takes the top area) it renders
 * nothing.
 */
export default function StatusBar() {
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(display-mode: standalone)').matches ||
      // @ts-expect-error iOS-only PWA flag
      window.navigator.standalone === true);

  if (!isStandalone) return null;

  return (
    <div
      aria-hidden
      style={{
        height: 'env(safe-area-inset-top, 0px)',
        width: '100%',
      }}
    />
  );
}
