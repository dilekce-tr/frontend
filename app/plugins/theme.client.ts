// Apply the saved theme before paint so dark-mode reloads don't flash.
export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined') return
  try {
    const saved = localStorage.getItem('yd:theme')
    const theme = saved === 'dark' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  } catch (_) {
    document.documentElement.setAttribute('data-theme', 'light')
  }
})
