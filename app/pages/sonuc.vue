<script setup lang="ts">
const { letter, generate, loading } = usePetition()
const { show: toast } = useToast()
const router = useRouter()

const docRef = ref<HTMLElement | null>(null)
const copied = ref(false)
// "Klasik" (serif) by default; could be tied to a user preference later.
const docSans = ref(false)

// If a user lands on /sonuc directly with no letter in state, send them home.
onMounted(() => {
  if (!letter.value) router.replace('/')
})

function readText(): string {
  const el = docRef.value
  if (!el) return ''
  return el.innerText.replace(/\n{3,}/g, '\n\n').trim()
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

function onPrint() {
  toast('Yazdırma penceresi açılıyor')
  setTimeout(() => window.print(), 250)
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
        <NuxtLink to="/olustur" class="yd-back">
          <DilekceIcon name="arrowLeft" :size="16" />
          <span>Düzenle</span>
        </NuxtLink>

        <div class="result-head">
          <div>
            <div class="eyebrow result-eyebrow">Dilekçeniz hazır</div>
            <h1 class="result-h">İşte resmî <em>dilekçeniz</em></h1>
          </div>
          <span class="edit-flag">
            <DilekceIcon name="edit" :size="13" />
            Metne dokunup düzenleyebilirsiniz
          </span>
        </div>

        <div class="doc" ref="docRef">
          <div class="doc-edge" aria-hidden="true" />
          <div class="doc-body" :class="{ 'is-sans': docSans }">
            <div class="doc-date" contenteditable spellcheck="false">{{ letter.tarih }}</div>
            <div class="doc-makam" contenteditable spellcheck="false">{{ letter.makam }}</div>
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
            </div>
          </div>
        </div>

        <div class="actions">
          <button type="button" class="act-btn" :class="{ 'is-ok': copied }" @click="onCopy">
            <DilekceIcon :name="copied ? 'check' : 'copy'" :size="16" />
            {{ copied ? 'Kopyalandı' : 'Kopyala' }}
          </button>
          <button type="button" class="act-btn act-btn--primary" @click="onPrint">
            <DilekceIcon name="download" :size="16" />
            PDF olarak indir
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
