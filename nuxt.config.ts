// Workaround for Nuxt 4 + macOS: Nuxt's vite-node opens a Unix domain socket
// under os.tmpdir(). On macOS that's `/var/folders/<hash>/T/` (~49 chars), and
// the full socket path overflows the kernel's 104-char `sun_path` limit,
// failing dev with `EINVAL` (Nuxt 4 has no config knob for this yet). Pointing
// TMPDIR at a short path keeps the socket under the limit. Dev-only — Nitro
// (prod) doesn't use this socket.
if (process.env.NODE_ENV !== 'production' && process.platform === 'darwin' && !process.env.TMPDIR?.startsWith('/tmp')) {
  process.env.TMPDIR = '/tmp/'
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
      title: 'YazbirDilekçe — Resmî dilekçenizi dakikalar içinde yazın',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Resmî dilekçenizi dakikalar içinde yazın. Durumunuzu birkaç cümleyle anlatın; yapay zeka resmî biçimde dilekçe hazırlasın.' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      // Default to the local Rails server in dev and to the prod API in
      // every other build (preview, production). Set NUXT_PUBLIC_API_BASE
      // to override — e.g. when a preview branch needs to point at staging.
      apiBase: process.env.NUXT_PUBLIC_API_BASE
        || (process.env.NODE_ENV === 'production'
          ? 'https://api.yazbirdilekce.com/api/v1'
          : 'http://localhost:3012/api/v1')
    }
  },
  routeRules: {
    '/panel':       { ssr: false },
    '/gecmis':      { ssr: false },
    '/ayarlar':     { ssr: false },
    '/plan':        { ssr: false },
    '/sonuc':       { ssr: false },
    '/olustur':     { ssr: false }
  }
})
