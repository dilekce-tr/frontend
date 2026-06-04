<script setup lang="ts">
import type { CategoryId } from '~/composables/useCategories'

const { CATEGORIES } = useCategories()

const { data: items } = await useAsyncData('ornekler-all', () =>
  queryCollection('ornekler')
    .select('kategori', 'slug', 'title', 'description', 'konu')
    .all()
)

// Each example's `description` is a full SEO-tuned meta sentence (~150
// chars). Too long for a card. Trim to a single short clause for the
// list view so two columns stay readable. Splits on the first period
// or "—" and caps at ~80 chars with an ellipsis.
function shortDesc(s: string): string {
  if (!s) return ''
  const first = s.split(/[.—–]/)[0].trim()
  return first.length > 90 ? first.slice(0, 87).trimEnd() + '…' : first
}

// Group by kategori so we can render one section per category.
const grouped = computed(() => {
  const map = new Map<CategoryId, typeof items.value>()
  for (const it of items.value ?? []) {
    const list = map.get(it.kategori as CategoryId) ?? []
    list.push(it)
    map.set(it.kategori as CategoryId, list)
  }
  return CATEGORIES
    .map(c => ({ kategori: c, examples: map.get(c.id) ?? [] }))
    .filter(g => g.examples.length > 0)
})

useSeoMeta({
  title: 'Dilekçe Örnekleri — YazbirDilekçe',
  description: 'Kategori kategori resmî dilekçe örnekleri. Belediye, iş, kira, okul, tüketici, izin, itiraz ve daha fazlası. Örneği seçin, kendi durumunuza göre düzenleyin.',
  ogTitle: 'Dilekçe Örnekleri',
  ogDescription: 'Kategori kategori resmî dilekçe örnekleri. Örneği seçin, kendi durumunuza göre düzenleyin.',
  ogUrl: 'https://yazbirdilekce.com/ornekler'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://yazbirdilekce.com/ornekler' }]
})
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap ornek-index-wrap">
      <header class="ornek-index-head">
        <div class="eyebrow">Örnekler</div>
        <h1 class="ornek-index-title">
          Dilekçe <em>örnekleri</em>
        </h1>
        <p class="ornek-index-lead">
          Hazır örneklerden başlayın, kendi durumunuza göre birkaç saniyede
          düzenleyin. Her örnek, kategorisine uygun resmî biçimde yazılmıştır.
        </p>
      </header>

      <section
        v-for="g in grouped"
        :key="g.kategori.id"
        class="ornek-group"
      >
        <header class="ornek-group-head">
          <span class="ornek-group-ico" aria-hidden="true">
            <DilekceIcon :name="g.kategori.icon" :size="14" :sw="1.5" />
          </span>
          <h2 class="ornek-group-title">{{ g.kategori.name }}</h2>
          <span class="ornek-group-count">{{ g.examples.length }}</span>
        </header>

        <ul class="ornek-group-list">
          <li v-for="ex in g.examples" :key="ex.slug">
            <NuxtLink
              :to="`/ornekler/${ex.kategori}/${ex.slug}`"
              class="ornek-card"
              :title="ex.description"
            >
              <span class="ornek-card-body">
                <span class="ornek-card-title">{{ ex.title }}</span>
                <span class="ornek-card-desc">{{ shortDesc(ex.description) }}</span>
              </span>
              <DilekceIcon name="arrowRight" :size="15" :sw="1.6" class="ornek-card-arrow" />
            </NuxtLink>
          </li>
        </ul>
      </section>

      <p v-if="!grouped.length" class="ornek-index-empty">
        Henüz örnek eklenmedi.
      </p>
    </div>
  </div>
</template>

<style scoped>
.ornek-index-wrap { max-width: 880px; padding-bottom: 80px; }

.ornek-index-head { margin: 24px 0 36px; }
.ornek-index-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.018em;
  margin: 12px 0 16px;
  color: var(--text);
}
.ornek-index-title em { font-style: italic; color: var(--accent); }
.ornek-index-lead {
  margin: 0; max-width: 56ch;
  font-size: 16.5px; line-height: 1.6; color: var(--text-2);
}

/* Compact one-line grouped list. Category header is a quiet mono-cap
   eyebrow; each row is title + chevron, description shown on hover via
   the title attribute so screen readers and keyboard users still get it. */
.ornek-group { margin-bottom: 28px; }
.ornek-group-head {
  display: flex; align-items: center; gap: 8px;
  padding: 0 0 4px;
  margin-bottom: 2px;
}
.ornek-group-ico {
  display: inline-flex; align-items: center; justify-content: center;
  width: 16px; height: 16px;
  color: var(--accent);
}
.ornek-group-title {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
}
.ornek-group-count {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  color: var(--text-3);
  margin-left: 2px;
}

.ornek-group-list {
  list-style: none; margin: 0; padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
@media (max-width: 640px) {
  .ornek-group-list { grid-template-columns: 1fr; }
}

/* Card-style links — affordance signals at rest:
   - 1px border with a chunky left accent strip (always visible)
   - accent-coloured chevron pointing right
   - cursor pointer
   On hover the whole card tints, the title underlines, the arrow nudges. */
.ornek-card {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 14px 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--r-md);
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: background 120ms, border-color 120ms, transform 120ms;
}
.ornek-card:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateY(-1px);
}
.ornek-card-body {
  flex: 1; min-width: 0;
  display: grid; gap: 3px;
}
.ornek-card-title {
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text);
}
.ornek-card:hover .ornek-card-title {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.ornek-card-desc {
  font-size: 12.5px;
  line-height: 1.45;
  color: var(--text-2);
  /* Cap at one line so the two-column grid stays tidy. */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ornek-card-arrow {
  color: var(--accent);
  flex: 0 0 auto;
  transition: transform 120ms;
}
.ornek-card:hover .ornek-card-arrow { transform: translateX(3px); }

.ornek-index-empty {
  margin: 40px 0;
  font-size: 14px; color: var(--text-3); text-align: center;
}
</style>
