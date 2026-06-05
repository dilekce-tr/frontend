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
  modules: ['@vercel/analytics', '@nuxt/content', '@nuxtjs/sitemap'],
  compatibilityDate: '2025-07-15',
  // Canonical origin for absolute URLs in the generated sitemap.
  site: { url: 'https://yazbirdilekce.com' },
  // @nuxtjs/sitemap auto-discovers prerendered routes (the /ornekler pages)
  // and static pages, so the sitemap stays in sync with content without
  // hand-editing. Exclude the app-only, no-index routes — these mirror the
  // Disallow list in public/robots.txt.
  sitemap: {
    exclude: [
      '/olustur',
      '/sonuc',
      '/panel',
      '/gecmis',
      '/ayarlar',
      '/plan',
      '/playground/**',
      '/build-cost'
    ]
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'tr' },
      title: 'YazbirDilekçe — Resmî dilekçenizi dakikalar içinde yazın',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Resmî dilekçenizi dakikalar içinde yazın. Durumunuzu birkaç cümleyle anlatın; yapay zeka resmî biçimde dilekçe hazırlasın.' },
        { name: 'theme-color', content: '#1B6E50' },

        // Open Graph — how Facebook, WhatsApp, LinkedIn, iMessage render the link.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'YazbirDilekçe' },
        { property: 'og:title', content: 'YazbirDilekçe — Resmî dilekçenizi dakikalar içinde yazın' },
        { property: 'og:description', content: 'Durumunuzu birkaç cümleyle anlatın; yapay zekâ resmî biçimde dilekçe hazırlasın. Belediye, iş, kira, okul, tüketici şikayeti ve daha fazlası.' },
        { property: 'og:url', content: 'https://yazbirdilekce.com/' },
        { property: 'og:locale', content: 'tr_TR' },
        { property: 'og:image', content: 'https://yazbirdilekce.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'YazbirDilekçe — resmî dilekçe örneği' },

        // Twitter / X — `summary_large_image` widens the card to a hero crop.
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'YazbirDilekçe — Resmî dilekçenizi dakikalar içinde yazın' },
        { name: 'twitter:description', content: 'Durumunuzu birkaç cümleyle anlatın; yapay zekâ resmî biçimde dilekçe hazırlasın.' },
        { name: 'twitter:image', content: 'https://yazbirdilekce.com/og-image.png' }
      ],
      link: [
        // SVG first for modern browsers; .ico is the legacy fallback. Apple
        // touch icon doubles as the iOS home-screen icon.
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        // Canonical defaults to the apex domain. Per-page useSeoMeta calls
        // can override this with a more specific path.
        { rel: 'canonical', href: 'https://yazbirdilekce.com/' }
      ],
      script: [
        // JSON-LD: Organization + WebSite. Gives Google an entity to attach
        // to the result, and the WebSite block enables the sitelinks
        // search box once the site is indexed.
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://yazbirdilekce.com/#organization',
                name: 'YazbirDilekçe',
                url: 'https://yazbirdilekce.com/',
                logo: 'https://yazbirdilekce.com/icon-512.png',
                description: 'Resmî dilekçenizi dakikalar içinde yazın. Yapay zekâ destekli Türkçe dilekçe asistanı.'
              },
              {
                '@type': 'WebSite',
                '@id': 'https://yazbirdilekce.com/#website',
                url: 'https://yazbirdilekce.com/',
                name: 'YazbirDilekçe',
                description: 'Resmî dilekçenizi dakikalar içinde yazın.',
                inLanguage: 'tr-TR',
                publisher: { '@id': 'https://yazbirdilekce.com/#organization' }
              }
            ]
          })
        }
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
          : 'http://localhost:3012/api/v1'),
      // Contact form endpoint on the shared Sylow forms API. Site-scoped to
      // yazbirdilekce.com so the backend routes messages to the right
      // inbox. Override locally with NUXT_PUBLIC_FORMS_ENDPOINT (e.g.
      // http://localhost:3013/api/v1/forms/yazbirdilekce.com/contact when
      // running the Sylow API on your laptop).
      formsEndpoint: process.env.NUXT_PUBLIC_FORMS_ENDPOINT
        || 'https://api.sylow.net/api/v1/forms/yazbirdilekce.com/contact'
    }
  },
  routeRules: {
    '/panel':       { ssr: false },
    '/gecmis':      { ssr: false },
    '/ayarlar':     { ssr: false },
    '/plan':        { ssr: false },
    '/sonuc':       { ssr: false },
    '/olustur':     { ssr: false },
    // Prerender every ornekler page to static HTML at build time. Two
    // reasons: (1) @nuxt/content uses better-sqlite3 which doesn't ship a
    // native binary inside Vercel's serverless function bundle, so a
    // runtime queryCollection() silently returns []. (2) these pages
    // change rarely and benefit from being plain files on the edge.
    '/ornekler':                 { prerender: true },
    '/ornekler/**':              { prerender: true },
    '/rehber':                   { prerender: true },
    '/rehber/**':                { prerender: true }
  },
  // Prerender the örnekler index and every example detail page. We pre-list
  // each URL explicitly rather than enabling crawlLinks: true so the
  // prerenderer doesn't wander into the rest of the site (which may still
  // have stale links during development). When adding a new example md
  // file, append its route here.
  nitro: {
    prerender: {
      failOnError: true,
      routes: [
        // Emit the @nuxtjs/sitemap output as a static file at build time so
        // Vercel serves /sitemap.xml without a runtime function. The module
        // serves it dynamically otherwise (no static file in .output/public).
        '/sitemap.xml',
        '/ornekler',
        '/ornekler/belediye/sokak-lambasi-arizasi',
        '/ornekler/belediye/cop-toplama-aksamasi',
        '/ornekler/is/istifa-dilekcesi',
        '/ornekler/is/yillik-izin-talebi',
        '/ornekler/is/askerlik-nedeniyle-istifa',
        '/ornekler/kira/kira-zammina-itiraz',
        '/ornekler/kira/depozito-iade-talebi',
        '/ornekler/okul/mazeret-devamsizlik',
        '/ornekler/okul/burs-basvurusu',
        '/ornekler/tuketici/kombi-arizasi',
        '/ornekler/tuketici/arizali-urun-iadesi',
        '/ornekler/tuketici/fatura-itirazi',
        '/ornekler/itiraz/trafik-cezasina-itiraz',
        '/ornekler/itiraz/sinav-sonucuna-itiraz',
        '/ornekler/izin/ucretsiz-izin-talebi',
        '/ornekler/diger/genel-talep-dilekcesi',
        '/rehber',
        '/rehber/kira-artis-orani-nedir',
        '/rehber/ihbar-suresi-ne-kadar'
      ]
    }
  }
})
