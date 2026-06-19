// Thin wrapper over gtag for GA4 custom events. Safe to call anywhere:
// - On the server / during prerender there's no window, so it no-ops.
// - If GA never loaded (dev/preview builds omit the gtag snippet), it no-ops.
// - When the visitor hasn't consented, GA4 Consent Mode holds the event back
//   (analytics_storage 'denied'), so we can fire unconditionally and let
//   consent gate delivery — the canonical pattern.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function useAnalytics() {
  function track(event: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined') return
    window.gtag?.('event', event, params)
  }

  return { track }
}
