<script setup lang="ts">
const route = useRoute()
const { trDate } = useTrDate()
const { CATEGORIES } = useCategories()

// Look up the example by its routing path. The collection's `path` is
// derived from the file location (content/ornekler/<kategori>/<slug>.md
// → /ornekler/<kategori>/<slug>), which matches this route's pattern.
const path = computed(() => `/ornekler/${route.params.kategori}/${route.params.slug}`)
const { data: example } = await useAsyncData(
  `ornek-${route.params.kategori}-${route.params.slug}`,
  () => queryCollection('ornekler').path(path.value).first()
)

if (!example.value) {
  throw createError({ statusCode: 404, statusMessage: 'Örnek bulunamadı', fatal: true })
}

const today = trDate()
const ex = example.value
const kategoriName = computed(() => CATEGORIES.find(c => c.id === ex.kategori)?.name ?? '')

// Pre-fill /olustur with the matching form values so "Bu örneği özelleştir"
// drops the user straight into the generator with sensible defaults.
const customizeHref = computed(() => {
  const q = new URLSearchParams({
    kategori: ex.kategori,
    makam: ex.letter.makam,
    konu: ex.konu
  })
  return `/olustur?${q.toString()}`
})

// Other examples in the same category — surface 2–3 at the bottom for
// internal linking (good for SEO topical clustering).
const { data: related } = await useAsyncData(
  `ornekler-related-${ex.kategori}-${ex.slug}`,
  () => queryCollection('ornekler')
    .where('kategori', '=', ex.kategori)
    .where('slug', '<>', ex.slug)
    .limit(3)
    .all()
)

// SEO meta — title, description, OG, canonical, FAQPage JSON-LD.
const pageUrl = `https://yazbirdilekce.com${path.value}`
useSeoMeta({
  title: `${ex.title} — YazbirDilekçe`,
  description: ex.description,
  ogTitle: ex.title,
  ogDescription: ex.description,
  ogUrl: pageUrl,
  ogType: 'article',
  twitterTitle: ex.title,
  twitterDescription: ex.description
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  meta: ex.keywords?.length
    ? [{ name: 'keywords', content: ex.keywords.join(', ') }]
    : [],
  script: ex.faq?.length
    ? [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: ex.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        })
      }]
    : []
})
</script>

<template>
  <div v-if="ex" class="yd-page">
    <div class="yd-wrap ornek-wrap">
      <NuxtLink to="/ornekler" class="yd-back ornek-back">
        <DilekceIcon name="arrowLeft" :size="16" />
        <span>Tüm örnekler</span>
      </NuxtLink>

      <header class="ornek-head">
        <div class="ornek-eyebrow">
          <DilekceIcon :name="CATEGORIES.find(c => c.id === ex.kategori)?.icon ?? 'dots'" :size="14" />
          <span>{{ kategoriName }}</span>
        </div>
        <h1 class="ornek-title">{{ ex.title }}</h1>
        <p class="ornek-lead">{{ ex.description }}</p>
      </header>

      <section class="ornek-doc-block">
        <div class="ornek-doc-label">Örnek dilekçe</div>
        <div class="doc">
          <div class="doc-body">
            <div class="doc-date">{{ today }}</div>
            <div class="doc-makam">{{ ex.letter.makam }}</div>
            <div v-if="ex.letter.birim" class="doc-birim">{{ ex.letter.birim }}</div>
            <p v-if="ex.letter.konu" class="doc-konu">
              <span class="k-label">Konu: </span>{{ ex.letter.konu }}
            </p>
            <p v-for="(p, i) in ex.letter.paragraflar" :key="i" class="doc-p">{{ p }}</p>
            <p class="doc-close">{{ ex.letter.kapanis }}</p>
            <div class="doc-sign">
              <div class="doc-sign-saygi">{{ ex.letter.saygi }}</div>
              <span class="doc-sign-rule" aria-hidden="true" /><br />
              <span class="doc-sign-name">{{ ex.letter.adSoyad }}</span>
              <div
                v-for="(line, i) in (ex.letter.ekBilgiler || [])"
                :key="i"
                class="doc-sign-extra"
              >{{ line }}</div>
            </div>
          </div>
        </div>

        <NuxtLink :to="customizeHref" class="gen-submit ornek-cta">
          <span>Bu örneği kendi durumunuza göre düzenleyin</span>
          <DilekceIcon name="arrowRight" :size="18" :sw="1.6" />
        </NuxtLink>
      </section>

      <details class="ornek-explainer">
        <summary class="ornek-explainer-summary">
          <span>Bu dilekçe ne zaman, kime, nasıl yazılır?</span>
          <DilekceIcon name="arrowRight" :size="14" :sw="1.6" class="ornek-explainer-chev" />
        </summary>
        <article class="ornek-body">
          <ContentRenderer :value="ex" class="ornek-prose" />
        </article>
      </details>

      <section v-if="ex.faq?.length" class="ornek-faq">
        <h2 class="ornek-faq-title">Sıkça sorulan sorular</h2>
        <details
          v-for="(item, i) in ex.faq"
          :key="i"
          class="ornek-faq-item"
        >
          <summary class="ornek-faq-q">{{ item.q }}</summary>
          <p class="ornek-faq-a">{{ item.a }}</p>
        </details>
      </section>

      <section v-if="(related?.length ?? 0) > 0" class="ornek-related">
        <h2 class="ornek-related-title">Benzer örnekler</h2>
        <ul class="ornek-related-list">
          <li v-for="r in related" :key="r.slug">
            <NuxtLink :to="`/ornekler/${r.kategori}/${r.slug}`" class="ornek-related-link">
              <span class="ornek-related-name">{{ r.title }}</span>
              <DilekceIcon name="arrowRight" :size="14" :sw="1.6" />
            </NuxtLink>
          </li>
        </ul>
      </section>

      <footer class="ornek-disclaimer">
        <DilekceIcon name="shield" :size="14" />
        <span>Hukuki tavsiye değildir. Karmaşık hukuki süreçler için bir avukata danışın.</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.ornek-wrap { max-width: 760px; padding-bottom: 80px; }
.ornek-back { margin-bottom: 24px; }

.ornek-head { margin-bottom: 24px; }
.ornek-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 14px;
}
.ornek-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4.5vw, 44px);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin: 0 0 16px;
  color: var(--text);
}
.ornek-lead {
  margin: 0; max-width: 60ch;
  font-size: 16.5px; line-height: 1.6; color: var(--text-2);
}

.ornek-body { margin-bottom: 32px; }
.ornek-prose :deep(p) {
  margin: 0 0 16px;
  font-size: 16px; line-height: 1.7; color: var(--text);
}
.ornek-prose :deep(h2) {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 32px 0 12px;
  color: var(--text);
}
.ornek-prose :deep(strong) { color: var(--text); font-weight: 600; }

.ornek-doc-block { margin: 24px 0 32px; }
.ornek-doc-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 10px;
}
.ornek-cta {
  margin-top: 20px;
  width: 100%;
  justify-content: center;
}

.ornek-explainer {
  margin: 32px 0 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.ornek-explainer-summary {
  cursor: pointer;
  list-style: none;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 14px 4px;
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 500;
  color: var(--text);
}
.ornek-explainer-summary::-webkit-details-marker { display: none; }
.ornek-explainer-chev {
  color: var(--text-3);
  transition: transform 160ms ease, color 160ms ease;
}
.ornek-explainer[open] .ornek-explainer-chev {
  transform: rotate(90deg);
  color: var(--accent);
}
.ornek-explainer .ornek-body { margin: 4px 0 18px; }

.ornek-faq { margin: 48px 0 32px; }
.ornek-faq-title {
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin: 0 0 20px;
}
.ornek-faq-item {
  border-top: 1px solid var(--border);
  padding: 16px 0;
}
.ornek-faq-item:last-child { border-bottom: 1px solid var(--border); }
.ornek-faq-q {
  cursor: pointer;
  font-size: 15.5px; font-weight: 500; color: var(--text);
  list-style: none;
  display: flex; justify-content: space-between; align-items: center; gap: 12px;
}
.ornek-faq-q::-webkit-details-marker { display: none; }
.ornek-faq-q::after {
  content: "+"; font-family: var(--font-mono); font-size: 18px; color: var(--accent);
  transition: transform 120ms ease;
}
.ornek-faq-item[open] .ornek-faq-q::after { content: "−"; }
.ornek-faq-a {
  margin: 12px 0 0;
  font-size: 14.5px; line-height: 1.65; color: var(--text-2);
}

.ornek-related { margin: 48px 0 24px; }
.ornek-related-title {
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  margin: 0 0 16px;
}
.ornek-related-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.ornek-related-link {
  display: flex; justify-content: space-between; align-items: center;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  text-decoration: none;
  color: var(--text);
  transition: border-color 120ms, background 120ms;
}
.ornek-related-link:hover {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.ornek-related-name { font-size: 14.5px; }

.ornek-disclaimer {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 32px;
  font-size: 12.5px; color: var(--text-3);
}
</style>
