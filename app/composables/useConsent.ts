// KVKK / GDPR analytics consent, persisted to localStorage. SSR-safe: state
// stays 'unset' on the server so the banner never renders in prerendered HTML
// (it mounts client-side on first paint). Accepting or rejecting flips GA4
// Consent Mode live via gtag('consent', 'update', …); the gtag snippet in
// nuxt.config.ts already reads a prior 'granted' choice before its first hit.
const CONSENT_KEY = 'yd:consent'

type Consent = 'unset' | 'granted' | 'denied'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function useConsent() {
  const consent = useState<Consent>('yd-consent', () => 'unset')
  // Stays false through SSR/prerender and until the client reads localStorage,
  // so the banner never appears in static HTML and never flashes for a
  // returning visitor who already chose.
  const ready = useState<boolean>('yd-consent-ready', () => false)

  if (import.meta.client) {
    onMounted(() => {
      try {
        const saved = localStorage.getItem(CONSENT_KEY)
        if (saved === 'granted' || saved === 'denied') consent.value = saved
      } catch (_) {}
      ready.value = true
    })
  }

  function set(value: 'granted' | 'denied') {
    consent.value = value
    try { localStorage.setItem(CONSENT_KEY, value) } catch (_) {}
    // Only analytics_storage is in play — we don't run ad/remarketing tags.
    window.gtag?.('consent', 'update', { analytics_storage: value })
  }

  const accept = () => set('granted')
  const reject = () => set('denied')

  return { consent, ready, accept, reject }
}
