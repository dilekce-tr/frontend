<script setup lang="ts">
import type { CategoryId } from '~/composables/useCategories'

const { CATEGORIES } = useCategories()

const { data: items } = await useAsyncData('ornekler-all', () =>
  queryCollection('ornekler')
    .select('kategori', 'slug', 'title', 'description', 'konu', 'keywords')
    .all()
)

// Each example's `description` is a full SEO-tuned meta sentence (~150
// chars). Trim to a single short clause for the compact tile.
function shortDesc(s: string): string {
  if (!s) return ''
  const first = s.split(/[.—–]/)[0].trim()
  return first.length > 90 ? first.slice(0, 87).trimEnd() + '…' : first
}

// Fold Turkish-specific letters to their ASCII base and lowercase, so the
// search treats "ş/s", "ı/i", "ö/o", "ü/u", "ç/c", "ğ/g" as equivalent —
// a user typing "istifa" or "tuketici" still matches "İstifa" / "Tüketici".
// Uses a per-char map (not locale lowercasing) precisely because we WANT
// dotless/dotted i and umlauts collapsed, which locale rules preserve.
const TR_FOLD: Record<string, string> = {
  ç: 'c', Ç: 'c', ğ: 'g', Ğ: 'g', ı: 'i', I: 'i', İ: 'i',
  ö: 'o', Ö: 'o', ş: 's', Ş: 's', ü: 'u', Ü: 'u'
}
function foldTr(s: string): string {
  return Array.from(s ?? '')
    .map(ch => TR_FOLD[ch] ?? ch)
    .join('')
    .toLowerCase()
}

const allExamples = computed(() => items.value ?? [])

// Categories that actually have examples (drives the chip row).
const activeCategories = computed(() =>
  CATEGORIES.map(c => ({
    ...c,
    count: allExamples.value.filter(e => e.kategori === c.id).length
  })).filter(c => c.count > 0)
)

const activeFilter = ref<CategoryId | 'all'>('all')
const search = ref('')

// Apply category chip AND search together. Search matches across title,
// konu, description, keywords and category name — all Turkish-folded.
const visibleExamples = computed(() => {
  const q = foldTr(search.value.trim())
  return allExamples.value.filter((e) => {
    if (activeFilter.value !== 'all' && e.kategori !== activeFilter.value) return false
    if (!q) return true
    const hay = foldTr([
      e.title, e.konu, e.description, catName(e.kategori),
      ...(e.keywords ?? [])
    ].join(' '))
    return hay.includes(q)
  })
})

function href(ex: { kategori: string; slug: string }) {
  return `/ornekler/${ex.kategori}/${ex.slug}`
}
function catName(id: string) {
  return CATEGORIES.find(c => c.id === id)?.name ?? ''
}
function catIcon(id: string) {
  return CATEGORIES.find(c => c.id === id)?.icon ?? 'dots'
}

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

      <div class="ornek-search">
        <DilekceIcon name="search" :size="17" :sw="1.6" class="ornek-search-ico" />
        <input
          v-model="search"
          type="search"
          class="ornek-search-input"
          placeholder="Dilekçe ara — örn. kira, istifa, fatura…"
          aria-label="Dilekçe ara"
        >
        <button
          v-if="search"
          type="button"
          class="ornek-search-clear"
          aria-label="Aramayı temizle"
          @click="search = ''"
        >
          <DilekceIcon name="x" :size="15" :sw="1.7" />
        </button>
      </div>

      <div class="ornek-chips" role="tablist">
        <button
          class="ornek-chip"
          :class="{ 'is-active': activeFilter === 'all' }"
          @click="activeFilter = 'all'"
        >Tümü <span class="ornek-chip-n">{{ allExamples.length }}</span></button>
        <button
          v-for="c in activeCategories"
          :key="c.id"
          class="ornek-chip"
          :class="{ 'is-active': activeFilter === c.id }"
          @click="activeFilter = c.id"
        >
          <DilekceIcon :name="c.icon" :size="13" :sw="1.5" />
          {{ c.name }} <span class="ornek-chip-n">{{ c.count }}</span>
        </button>
      </div>

      <div v-if="visibleExamples.length" class="ornek-grid">
        <NuxtLink
          v-for="ex in visibleExamples"
          :key="ex.slug"
          :to="href(ex)"
          class="ornek-tile"
        >
          <span class="ornek-tile-ico" aria-hidden="true">
            <DilekceIcon :name="catIcon(ex.kategori)" :size="18" :sw="1.5" />
          </span>
          <span class="ornek-tile-cat">{{ catName(ex.kategori) }}</span>
          <span class="ornek-tile-title">{{ ex.title }}</span>
          <span class="ornek-tile-desc">{{ shortDesc(ex.description) }}</span>
          <span class="ornek-tile-go">
            Örneği gör <DilekceIcon name="arrowRight" :size="14" :sw="1.6" />
          </span>
        </NuxtLink>
      </div>

      <p v-else-if="!allExamples.length" class="ornek-index-empty">
        Henüz örnek eklenmedi.
      </p>
      <p v-else class="ornek-index-empty">
        “{{ search.trim() }}” için örnek bulunamadı.
      </p>
    </div>
  </div>
</template>

<style scoped>
.ornek-index-wrap { max-width: 880px; padding-bottom: 80px; }

.ornek-index-head { margin: 24px 0 28px; }
.ornek-index-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.08; font-weight: 400; letter-spacing: -0.018em;
  margin: 12px 0 16px; color: var(--text);
}
.ornek-index-title em { font-style: italic; color: var(--accent); }
.ornek-index-lead {
  margin: 0; max-width: 56ch;
  font-size: 16.5px; line-height: 1.6; color: var(--text-2);
}

/* --- search --- */
.ornek-search { position: relative; margin-bottom: 14px; }
.ornek-search-ico {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--text-3); pointer-events: none;
}
.ornek-search-input {
  width: 100%; padding: 13px 44px 13px 42px;
  font-family: var(--font-sans); font-size: 15px;
  background: var(--surface); color: var(--text);
  border: 1px solid var(--border); border-radius: var(--r-md);
  outline: none; transition: border-color 120ms, box-shadow 120ms;
}
.ornek-search-input:focus {
  border-color: var(--accent); box-shadow: 0 0 0 3px var(--focus-ring);
}
/* Hide the native search clear (we render our own). */
.ornek-search-input::-webkit-search-decoration,
.ornek-search-input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.ornek-search-clear {
  position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
  display: inline-flex; align-items: center; justify-content: center;
  width: 28px; height: 28px; padding: 0;
  background: transparent; border: none; border-radius: 7px;
  color: var(--text-3); cursor: pointer; transition: background 120ms, color 120ms;
}
.ornek-search-clear:hover { background: var(--accent-soft); color: var(--accent); }

/* --- filter chips --- */
.ornek-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
.ornek-chip {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 13px; border-radius: 999px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--text-2); font-size: 13px; font-weight: 500; cursor: pointer;
  transition: all 120ms;
}
.ornek-chip:hover { border-color: var(--accent); color: var(--accent); }
.ornek-chip.is-active { background: var(--accent); color: #fff; border-color: var(--accent); }
.ornek-chip-n { font-family: var(--font-mono); font-size: 10.5px; opacity: 0.7; }
.ornek-chip.is-active .ornek-chip-n { opacity: 0.85; }

/* --- grid --- */
.ornek-grid {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;
}
@media (max-width: 760px) { .ornek-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .ornek-grid { grid-template-columns: 1fr; } }
.ornek-tile {
  display: flex; flex-direction: column; gap: 6px;
  padding: 18px; min-height: 160px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: var(--r-lg); text-decoration: none; color: var(--text);
  transition: border-color 120ms, transform 120ms, box-shadow 120ms;
}
.ornek-tile:hover {
  border-color: var(--accent); transform: translateY(-2px);
  box-shadow: 0 8px 24px -16px var(--accent);
}
.ornek-tile-ico {
  display: inline-flex; align-items: center; justify-content: center;
  width: 34px; height: 34px; border-radius: 9px;
  background: var(--accent-soft); color: var(--accent); margin-bottom: 4px;
}
.ornek-tile-cat {
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3);
}
.ornek-tile-title { font-size: 15px; font-weight: 600; line-height: 1.3; color: var(--text); }
.ornek-tile:hover .ornek-tile-title {
  color: var(--accent); text-decoration: underline;
  text-underline-offset: 3px; text-decoration-thickness: 1px;
}
.ornek-tile-desc { font-size: 12.5px; line-height: 1.45; color: var(--text-2); flex: 1; }
.ornek-tile-go {
  display: inline-flex; align-items: center; gap: 5px; margin-top: 4px;
  font-size: 12.5px; font-weight: 600; color: var(--accent);
}

.ornek-index-empty {
  margin: 40px 0; font-size: 14px; color: var(--text-3); text-align: center;
}
</style>
