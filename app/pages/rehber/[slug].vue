<script setup lang="ts">
const route = useRoute()

const path = computed(() => `/rehber/${route.params.slug}`)
const { data: guide } = await useAsyncData(
  `rehber-${route.params.slug}`,
  () => queryCollection('rehber').path(path.value).first()
)

if (!guide.value) {
  throw createError({ statusCode: 404, statusMessage: 'Rehber bulunamadı', fatal: true })
}

const g = guide.value

// Format the ISO `updated` date in Turkish long form for display.
const updatedLabel = computed(() => {
  const d = new Date(g.updated)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).format(d)
})

const relatedOrnekHref = computed(() =>
  g.relatedOrnek
    ? `/ornekler/${g.relatedOrnek.kategori}/${g.relatedOrnek.slug}`
    : null
)

const pageUrl = `https://yazbirdilekce.com${path.value}`
useSeoMeta({
  title: `${g.title} — YazbirDilekçe`,
  description: g.description,
  ogTitle: g.title,
  ogDescription: g.description,
  ogUrl: pageUrl,
  ogType: 'article',
  articleModifiedTime: g.updated,
  twitterTitle: g.title,
  twitterDescription: g.description
})

// Article JSON-LD (with dateModified) + optional FAQPage JSON-LD.
const ldScripts = computed(() => {
  const scripts = [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      dateModified: g.updated,
      inLanguage: 'tr-TR',
      mainEntityOfPage: pageUrl,
      publisher: { '@id': 'https://yazbirdilekce.com/#organization' }
    })
  }]
  if (g.faq?.length) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: g.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      })
    })
  }
  return scripts
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  meta: g.keywords?.length
    ? [{ name: 'keywords', content: g.keywords.join(', ') }]
    : [],
  script: ldScripts.value
})
</script>

<template>
  <div v-if="g" class="yd-page">
    <div class="yd-wrap rehber-wrap">
      <NuxtLink to="/rehber" class="yd-back rehber-back">
        <DilekceIcon name="arrowLeft" :size="16" />
        <span>Tüm rehberler</span>
      </NuxtLink>

      <header class="rehber-head">
        <div class="rehber-eyebrow">{{ g.topic }}</div>
        <h1 class="rehber-title">{{ g.title }}</h1>
        <p class="rehber-lead">{{ g.description }}</p>
        <p v-if="updatedLabel" class="rehber-updated">
          Son güncelleme: {{ updatedLabel }}
        </p>
      </header>

      <article class="rehber-body">
        <ContentRenderer :value="g" class="rehber-prose" />
      </article>

      <NuxtLink
        v-if="relatedOrnekHref"
        :to="relatedOrnekHref"
        class="rehber-related-ornek"
      >
        <span class="rehber-related-ornek-body">
          <span class="rehber-related-ornek-label">İlgili dilekçe örneği</span>
          <span class="rehber-related-ornek-name">{{ g.relatedOrnek.label }}</span>
        </span>
        <DilekceIcon name="arrowRight" :size="18" :sw="1.6" />
      </NuxtLink>

      <section v-if="g.faq?.length" class="rehber-faq">
        <h2 class="rehber-faq-title">Sıkça sorulan sorular</h2>
        <details
          v-for="(item, i) in g.faq"
          :key="i"
          class="rehber-faq-item"
        >
          <summary class="rehber-faq-q">{{ item.q }}</summary>
          <p class="rehber-faq-a">{{ item.a }}</p>
        </details>
      </section>

      <footer class="rehber-disclaimer">
        <DilekceIcon name="shield" :size="14" />
        <span>Hukuki tavsiye değildir. Karmaşık hukuki süreçler için bir avukata danışın.</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.rehber-wrap { max-width: 720px; padding-bottom: 80px; }
.rehber-back { margin-bottom: 24px; }

.rehber-head { margin-bottom: 28px; }
.rehber-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}
.rehber-title {
  font-family: var(--font-serif);
  font-size: clamp(30px, 4.2vw, 42px);
  line-height: 1.12;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin: 0 0 16px;
  color: var(--text);
}
.rehber-lead {
  margin: 0; max-width: 60ch;
  font-size: 16.5px; line-height: 1.6; color: var(--text-2);
}
.rehber-updated {
  margin: 14px 0 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-3);
}

.rehber-body { margin-bottom: 32px; }
.rehber-prose :deep(p) {
  margin: 0 0 16px;
  font-size: 16px; line-height: 1.7; color: var(--text);
}
.rehber-prose :deep(h2) {
  font-family: var(--font-serif);
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 36px 0 14px;
  color: var(--text);
}
.rehber-prose :deep(strong) { color: var(--text); font-weight: 600; }
.rehber-prose :deep(ol),
.rehber-prose :deep(ul) {
  margin: 0 0 16px; padding-left: 22px;
}
.rehber-prose :deep(li) {
  margin: 0 0 8px;
  font-size: 16px; line-height: 1.65; color: var(--text);
}
.rehber-prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 24px;
  font-size: 15px;
}
.rehber-prose :deep(th),
.rehber-prose :deep(td) {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}
.rehber-prose :deep(th) {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-2);
  font-weight: 600;
}

.rehber-related-ornek {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 18px;
  margin: 0 0 32px;
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: var(--r-md);
  text-decoration: none;
  color: var(--accent);
  transition: transform 120ms;
}
.rehber-related-ornek:hover { transform: translateY(-1px); }
.rehber-related-ornek-body { flex: 1; display: grid; gap: 3px; }
.rehber-related-ornek-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}
.rehber-related-ornek-name { font-size: 15px; font-weight: 600; }

.rehber-faq { margin: 48px 0 32px; }
.rehber-faq-title {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 0 0 20px;
}
.rehber-faq-item { border-top: 1px solid var(--border); padding: 16px 0; }
.rehber-faq-item:last-child { border-bottom: 1px solid var(--border); }
.rehber-faq-q {
  cursor: pointer;
  font-size: 15.5px; font-weight: 500; color: var(--text);
  list-style: none;
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
}
.rehber-faq-q::-webkit-details-marker { display: none; }
.rehber-faq-q::after {
  content: "+"; font-family: var(--font-mono); font-size: 18px; color: var(--accent);
  transition: transform 120ms ease;
}
.rehber-faq-item[open] .rehber-faq-q::after { content: "−"; }
.rehber-faq-a {
  margin: 12px 0 0;
  font-size: 14.5px; line-height: 1.65; color: var(--text-2);
}

.rehber-disclaimer {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 32px;
  font-size: 12.5px; color: var(--text-3);
}
</style>
