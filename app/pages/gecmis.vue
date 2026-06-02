<script setup lang="ts">
import type { HistoryEntry } from '~/composables/usePetition'

const { history, openHistory, deleteHistory } = usePetition()
const { relTime } = useTrDate()
const { catName, catIcon } = useCategories()

function open(it: HistoryEntry) {
  openHistory(it)
  navigateTo('/sonuc')
}

function remove(e: Event, id: string) {
  e.stopPropagation()
  deleteHistory(id)
}
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap">
      <div class="eyebrow" style="margin-bottom: 12px">Geçmiş</div>
      <h1 class="gen-title">Son <em>dilekçeleriniz</em></h1>
      <p class="gen-sub">
        Oluşturduğunuz dilekçeler bu cihazda saklanır. Açıp düzenleyebilir veya
        yeniden indirebilirsiniz.
      </p>

      <div style="margin-top: 28px">
        <template v-if="history.length === 0">
          <div class="hist-empty">
            <h3 class="hist-empty-t">Henüz dilekçe yok</h3>
            <p class="hist-empty-b">İlk dilekçenizi oluşturun; burada görünsün.</p>
            <NuxtLink to="/olustur" class="gen-submit" style="margin-top: 20px">
              <span>Dilekçe Oluştur</span>
              <DilekceIcon name="arrowRight" :size="18" :sw="1.6" />
            </NuxtLink>
          </div>
        </template>
        <template v-else>
          <div class="hist-list">
            <div
              v-for="it in history"
              :key="it.id"
              class="hist-row"
              role="button"
              tabindex="0"
              @click="open(it)"
              @keydown.enter="open(it)"
            >
              <span class="hist-ico">
                <DilekceIcon :name="catIcon(it.kategori)" :size="18" />
              </span>
              <span class="hist-main">
                <div class="hist-konu">{{ it.konu || it.letter.konu || 'Dilekçe' }}</div>
                <div class="hist-meta">{{ catName(it.kategori) }} · {{ relTime(it.ts) }}</div>
              </span>
              <button
                type="button"
                class="hist-del"
                title="Sil"
                aria-label="Dilekçeyi sil"
                @click="(e) => remove(e, it.id)"
              >
                <DilekceIcon name="x" :size="15" />
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
