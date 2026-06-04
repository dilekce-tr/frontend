<script setup lang="ts">
import type { CategoryId } from '~/composables/useCategories'

const { form, loading, error, set, isReady, generate } = usePetition()
const route = useRoute()

const submitAttempted = ref(false)

// Pre-fill the form from query params so deep-links from /ornekler pages
// (and any future "start with this example" CTAs) land the user in a
// populated generator. Only fields the user can also type are accepted;
// adSoyad and aciklama are intentionally not pre-fillable so we don't
// put words in the user's mouth.
const ALLOWED_CATEGORIES: readonly CategoryId[] = [
  'is', 'kira', 'belediye', 'okul', 'tuketici', 'izin', 'itiraz', 'diger'
] as const
onMounted(() => {
  const q = route.query
  const kategori = typeof q.kategori === 'string' ? q.kategori : ''
  if (kategori && (ALLOWED_CATEGORIES as readonly string[]).includes(kategori)) {
    set('kategori', kategori as CategoryId)
  }
  if (typeof q.makam === 'string' && q.makam.trim()) set('makam', q.makam.trim())
  if (typeof q.konu === 'string' && q.konu.trim())   set('konu', q.konu.trim())
})

const invalid = computed(() => ({
  makam:    form.value.makam.trim().length === 0,
  konu:     form.value.konu.trim().length === 0,
  aciklama: form.value.aciklama.trim().length <= 8,
  adSoyad:  form.value.adSoyad.trim().length === 0
}))

const missingFields = computed(() => {
  const i = invalid.value
  const out: string[] = []
  if (i.makam)    out.push('Makam')
  if (i.konu)     out.push('Konu')
  if (i.aciklama) out.push('Açıklama')
  if (i.adSoyad)  out.push('Ad Soyad')
  return out
})

type RequiredField = 'makam' | 'konu' | 'aciklama' | 'adSoyad'
const showError = (field: RequiredField) => submitAttempted.value && invalid.value[field]

async function onSubmit() {
  if (!isReady.value) {
    submitAttempted.value = true
    await nextTick()
    focusFirstInvalid()
    return
  }
  const letter = await generate()
  if (letter) await navigateTo('/sonuc')
}

function focusFirstInvalid() {
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
    '.gen-card .is-invalid'
  )
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  // Focus once the scroll settles — focusing earlier yanks the page,
  // overriding the smooth-scroll animation.
  setTimeout(() => el.focus({ preventScroll: true }), 450)
}
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap">
      <template v-if="loading">
        <DilekceLoading />
      </template>
      <template v-else>
        <NuxtLink to="/" class="yd-back">
          <DilekceIcon name="arrowLeft" :size="16" />
          <span>Geri</span>
        </NuxtLink>

        <div class="eyebrow" style="margin-bottom: 12px">Dilekçe oluştur</div>
        <h1 class="gen-title">
          Durumunuzu <em>anlatın</em>, gerisini bize bırakın
        </h1>
        <p class="gen-sub">
          Soruları gündelik dilinizle yanıtlayın. Resmî biçim ve ifadeleri yapay zeka
          sizin için düzenleyecek.
        </p>
        <p class="gen-legend">
          <span class="gen-req-mark" aria-hidden="true">*</span>
          işaretli alanlar zorunludur.
        </p>

        <div v-if="error" class="errbar" role="alert">
          <DilekceIcon name="x" :size="16" :style="{ flex: '0 0 auto', marginTop: '1px' }" />
          <div>
            <div class="errbar-t">Bir sorun oluştu</div>
            <div class="errbar-b">{{ error }}</div>
          </div>
        </div>

        <div class="gen-card">
          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">1</span>
              <span class="gen-q-label">Kime hitaben yazılıyor?<span class="gen-req-mark" aria-hidden="true">*</span></span>
            </div>
            <p class="gen-q-hint">Dilekçenin gönderileceği kurum veya makam.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :class="{ 'is-invalid': showError('makam') }"
                :value="form.makam"
                placeholder="örn. İzmir Büyükşehir Belediyesi"
                @input="(e) => set('makam', (e.target as HTMLInputElement).value)"
              />
              <input
                class="wordy-input gen-q-sub"
                :value="form.birim"
                placeholder="Birim / dikkatine — opsiyonel (örn. Fen İşleri Müdürlüğü)"
                @input="(e) => set('birim', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">2</span>
              <span class="gen-q-label">Konu nedir?<span class="gen-req-mark" aria-hidden="true">*</span></span>
            </div>
            <p class="gen-q-hint">Tek cümlelik kısa bir özet.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :class="{ 'is-invalid': showError('konu') }"
                :value="form.konu"
                placeholder="örn. Sokak lambasının arızası hakkında"
                @input="(e) => set('konu', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">3</span>
              <span class="gen-q-label">Durumunuzu anlatın<span class="gen-req-mark" aria-hidden="true">*</span></span>
            </div>
            <p class="gen-q-hint">Sade, gündelik bir dille; ne olduğunu ve ne istediğinizi yazın.</p>
            <div class="gen-q-body">
              <textarea
                class="wordy-textarea"
                :class="{ 'is-invalid': showError('aciklama') }"
                :value="form.aciklama"
                placeholder="örn. Evimin önündeki sokak lambası iki haftadır yanmıyor. Akşamları sokak çok karanlık oluyor ve güvenli değil. Lambanın tamir edilmesini istiyorum."
                @input="(e) => set('aciklama', (e.target as HTMLTextAreaElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">4</span>
              <span class="gen-q-label">Ad Soyad<span class="gen-req-mark" aria-hidden="true">*</span></span>
            </div>
            <p class="gen-q-hint">Dilekçenin altındaki imza satırı için.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :class="{ 'is-invalid': showError('adSoyad') }"
                :value="form.adSoyad"
                placeholder="örn. Ayşe Yılmaz"
                @input="(e) => set('adSoyad', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">5</span>
              <span class="gen-q-label">Ek bilgiler <span class="gen-q-opt">(opsiyonel)</span></span>
            </div>
            <p class="gen-q-hint">İmzanızın altına eklenecek satırlar — her bilgi ayrı satıra.</p>
            <div class="gen-q-body">
              <textarea
                class="wordy-textarea"
                rows="3"
                :value="form.ekBilgiler"
                placeholder="örn. Öğrenci No: 20231234&#10;T.C. Kimlik No: 12345678901&#10;Telefon: 0555 555 55 55"
                @input="(e) => set('ekBilgiler', (e.target as HTMLTextAreaElement).value)"
              />
            </div>
          </div>

          <div class="gen-foot">
            <span v-if="missingFields.length" class="gen-foot-note gen-foot-note--missing">
              <DilekceIcon name="x" :size="14" />
              Devam etmek için doldurulması gereken alanlar:
              <strong>{{ missingFields.join(', ') }}</strong>
            </span>
            <span v-else class="gen-foot-note">
              <DilekceIcon name="sparkle" :size="14" />
              Yapay zeka resmî biçimi otomatik düzenler.
            </span>
            <button
              class="gen-submit"
              :class="{ 'is-blocked': !isReady }"
              type="button"
              @click="onSubmit"
            >
              <span>Dilekçemi Oluştur</span>
              <DilekceIcon name="arrowRight" :size="19" :sw="1.6" />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
