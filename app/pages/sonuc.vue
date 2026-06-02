<script setup lang="ts">
import type { Letter } from '~/composables/usePetition'

const { letter, generate, loading } = usePetition()
const { show: toast } = useToast()
const { download: downloadPdf } = usePdf()
const router = useRouter()

const docRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const downloading = ref(false)
// "Klasik" (serif) by default; could be tied to a user preference later.
const docSans = ref(false)

// If a user lands on /sonuc directly with no letter in state, send them home.
onMounted(() => {
  if (!letter.value) router.replace('/')
})

function readText(): string {
  const el = docRef.value?.querySelector<HTMLElement>('.doc-body')
  if (!el) return ''
  return el.innerText.replace(/\n{3,}/g, '\n\n').trim()
}

// Re-read the document from the live DOM so user edits flow into the PDF.
function readEdited(): Letter | null {
  const el = docRef.value
  if (!el || !letter.value) return null
  const t = (sel: string) => (el.querySelector(sel) as HTMLElement | null)?.innerText.trim() ?? ''
  const konuRaw = t('.doc-konu')
  return {
    tarih: t('.doc-date') || letter.value.tarih,
    makam: t('.doc-makam') || letter.value.makam,
    birim: t('.doc-birim') || letter.value.birim || '',
    konu: konuRaw.replace(/^Konu:\s*/i, '') || letter.value.konu,
    paragraflar: Array.from(el.querySelectorAll('.doc-p')).map((p) => (p as HTMLElement).innerText.trim()).filter(Boolean),
    kapanis: t('.doc-close') || letter.value.kapanis,
    saygi: t('.doc-sign-saygi') || letter.value.saygi,
    adSoyad: t('.doc-sign-name') || letter.value.adSoyad,
    ekBilgiler: Array.from(el.querySelectorAll('.doc-sign-extra'))
      .map((d) => (d as HTMLElement).innerText.trim()).filter(Boolean)
  }
}

async function onCopy() {
  const text = readText()
  try {
    await navigator.clipboard.writeText(text)
  } catch (_) {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
  }
  copied.value = true
  setTimeout(() => { copied.value = false }, 1800)
  toast('Kopyalandı')
}

async function onDownloadPdf() {
  const L = readEdited()
  if (!L || downloading.value) return
  downloading.value = true
  toast('PDF hazırlanıyor')
  try {
    await downloadPdf(L, { sans: docSans.value })
  } catch (_) {
    toast('PDF oluşturulamadı')
  } finally {
    downloading.value = false
  }
}

async function onRegenerate() {
  const L = await generate()
  if (L) toast('Dilekçeniz yeniden oluşturuldu')
}
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap">
      <template v-if="loading">
        <DilekceLoading />
      </template>
      <template v-else-if="letter">
        <div class="result-bar">
          <NuxtLink to="/olustur" class="yd-back">
            <DilekceIcon name="arrowLeft" :size="16" />
            <span>Düzenle</span>
          </NuxtLink>
        </div>

        <div class="doc" ref="docRef">
          <div class="doc-banner">
            <DilekceIcon name="edit" :size="14" />
            <span>Metne dokunup istediğiniz yeri düzenleyebilirsiniz</span>
          </div>
          <div class="doc-body" :class="{ 'is-sans': docSans }">
            <div class="doc-date" contenteditable spellcheck="false">{{ letter.tarih }}</div>
            <div class="doc-makam" contenteditable spellcheck="false">{{ letter.makam }}</div>
            <div
              v-if="letter.birim"
              class="doc-birim"
              contenteditable
              spellcheck="false"
            >{{ letter.birim }}</div>
            <p v-if="letter.konu" class="doc-konu" contenteditable spellcheck="false">
              <span class="k-label">Konu: </span>{{ letter.konu }}
            </p>
            <p
              v-for="(p, i) in letter.paragraflar"
              :key="i"
              class="doc-p"
              contenteditable
              spellcheck="false"
            >{{ p }}</p>
            <p class="doc-close" contenteditable spellcheck="false">{{ letter.kapanis }}</p>
            <div class="doc-sign">
              <div class="doc-sign-saygi" contenteditable spellcheck="false">{{ letter.saygi }}</div>
              <span class="doc-sign-rule" aria-hidden="true" /><br />
              <span class="doc-sign-name" contenteditable spellcheck="false">{{ letter.adSoyad }}</span>
              <div
                v-for="(line, i) in (letter.ekBilgiler || [])"
                :key="i"
                class="doc-sign-extra"
                contenteditable
                spellcheck="false"
              >{{ line }}</div>
            </div>
          </div>
        </div>

        <div class="actions">
          <button type="button" class="act-btn" :class="{ 'is-ok': copied }" @click="onCopy">
            <DilekceIcon :name="copied ? 'check' : 'copy'" :size="16" />
            {{ copied ? 'Kopyalandı' : 'Kopyala' }}
          </button>
          <button
            type="button"
            class="act-btn act-btn--primary"
            :disabled="downloading"
            @click="onDownloadPdf"
          >
            <DilekceIcon name="download" :size="16" />
            {{ downloading ? 'Hazırlanıyor…' : 'PDF olarak indir' }}
          </button>
          <button type="button" class="act-btn act-btn--flush" @click="onRegenerate">
            <DilekceIcon name="refresh" :size="16" />
            Yeniden Oluştur
          </button>
        </div>
      </template>
    </div>
  </div>
</template>
