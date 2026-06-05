<script setup lang="ts">
const { data: items } = await useAsyncData('rehber-all', () =>
  queryCollection('rehber')
    .select('slug', 'title', 'description', 'topic', 'updated')
    .all()
)

// Group guides by topic so the index reads as a small table of contents.
const grouped = computed(() => {
  const map = new Map<string, typeof items.value>()
  for (const it of items.value ?? []) {
    const list = map.get(it.topic) ?? []
    list.push(it)
    map.set(it.topic, list)
  }
  return Array.from(map.entries())
    .map(([topic, guides]) => ({ topic, guides }))
    .sort((a, b) => a.topic.localeCompare(b.topic, 'tr'))
})

useSeoMeta({
  title: 'Dilekçe ve Hak Rehberi — YazbirDilekçe',
  description: 'Kira artış oranı, ihbar süresi, tüketici hakları ve daha fazlası. Resmî dilekçe yazmadan önce bilmeniz gereken temel bilgiler, sade bir dille.',
  ogTitle: 'Dilekçe ve Hak Rehberi',
  ogDescription: 'Kira, iş, tüketici ve daha fazlası — resmî dilekçe yazmadan önce bilmeniz gerekenler.',
  ogUrl: 'https://yazbirdilekce.com/rehber'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://yazbirdilekce.com/rehber' }]
})
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap rehber-index-wrap">
      <header class="rehber-index-head">
        <div class="eyebrow">Rehber</div>
        <h1 class="rehber-index-title">
          Dilekçe ve hak <em>rehberi</em>
        </h1>
        <p class="rehber-index-lead">
          Resmî dilekçe yazmadan önce bilmeniz gereken temel bilgiler. Kira
          artış oranından ihbar süresine, haklarınızı sade bir dille
          açıklıyoruz.
        </p>
      </header>

      <section
        v-for="g in grouped"
        :key="g.topic"
        class="rehber-group"
      >
        <h2 class="rehber-group-title">{{ g.topic }}</h2>
        <ul class="rehber-group-list">
          <li v-for="guide in g.guides" :key="guide.slug">
            <NuxtLink
              :to="`/rehber/${guide.slug}`"
              class="rehber-card"
              :title="guide.description"
            >
              <span class="rehber-card-body">
                <span class="rehber-card-title">{{ guide.title }}</span>
                <span class="rehber-card-desc">{{ guide.description }}</span>
              </span>
              <DilekceIcon name="arrowRight" :size="15" :sw="1.6" class="rehber-card-arrow" />
            </NuxtLink>
          </li>
        </ul>
      </section>

      <p v-if="!grouped.length" class="rehber-index-empty">
        Henüz rehber eklenmedi.
      </p>
    </div>
  </div>
</template>

<style scoped>
.rehber-index-wrap { max-width: 760px; padding-bottom: 80px; }

.rehber-index-head { margin: 24px 0 36px; }
.rehber-index-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.018em;
  margin: 12px 0 16px;
  color: var(--text);
}
.rehber-index-title em { font-style: italic; color: var(--accent); }
.rehber-index-lead {
  margin: 0; max-width: 58ch;
  font-size: 16.5px; line-height: 1.6; color: var(--text-2);
}

.rehber-group { margin-bottom: 32px; }
.rehber-group-title {
  margin: 0 0 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-2);
}

.rehber-group-list {
  list-style: none; margin: 0; padding: 0;
  display: grid; gap: 10px;
}

.rehber-card {
  display: flex; align-items: center; gap: 12px;
  padding: 16px 16px 16px 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--r-md);
  text-decoration: none;
  color: var(--text);
  cursor: pointer;
  transition: background 120ms, border-color 120ms, transform 120ms;
}
.rehber-card:hover {
  background: var(--accent-soft);
  border-color: var(--accent);
  transform: translateY(-1px);
}
.rehber-card-body { flex: 1; min-width: 0; display: grid; gap: 4px; }
.rehber-card-title {
  font-size: 15.5px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text);
}
.rehber-card:hover .rehber-card-title {
  color: var(--accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
.rehber-card-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-2);
}
.rehber-card-arrow { color: var(--accent); flex: 0 0 auto; transition: transform 120ms; }
.rehber-card:hover .rehber-card-arrow { transform: translateX(3px); }

.rehber-index-empty {
  margin: 40px 0;
  font-size: 14px; color: var(--text-3); text-align: center;
}
</style>
