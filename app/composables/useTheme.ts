// Light/dark theme, persisted to localStorage. SSR-safe: theme stays light on
// the server; the client plugin applies the saved value before paint.
const THEME_KEY = 'yd:theme'

export function useTheme() {
  const theme = useState<'light' | 'dark'>('yd-theme', () => 'light')

  if (import.meta.client) {
    onMounted(() => {
      const saved = localStorage.getItem(THEME_KEY)
      if (saved === 'dark' || saved === 'light') theme.value = saved
    })

    watch(theme, (v) => {
      document.documentElement.setAttribute('data-theme', v)
      try { localStorage.setItem(THEME_KEY, v) } catch (_) {}
    })
  }

  const toggle = () => { theme.value = theme.value === 'dark' ? 'light' : 'dark' }
  return { theme, toggle }
}
