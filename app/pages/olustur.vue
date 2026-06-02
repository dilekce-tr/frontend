<script setup lang="ts">
const { CATEGORIES } = useCategories()
const { form, loading, error, set, isReady, generate } = usePetition()

async function onSubmit() {
  if (!isReady.value) return
  const letter = await generate()
  if (letter) await navigateTo('/sonuc')
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
              <span class="gen-q-label">Kategori</span>
            </div>
            <div class="gen-q-body">
              <div class="gen-chips">
                <button
                  v-for="c in CATEGORIES"
                  :key="c.id"
                  type="button"
                  class="gen-chip"
                  :class="{ 'is-on': form.kategori === c.id }"
                  @click="set('kategori', c.id)"
                >
                  <DilekceIcon :name="c.icon" :size="15" />
                  {{ c.name }}
                </button>
              </div>
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">2</span>
              <span class="gen-q-label">Kime hitaben yazılıyor?</span>
            </div>
            <p class="gen-q-hint">Dilekçenin gönderileceği kurum veya makam.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :value="form.makam"
                placeholder="örn. İzmir Büyükşehir Belediyesi"
                @input="(e) => set('makam', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">3</span>
              <span class="gen-q-label">Konu nedir?</span>
            </div>
            <p class="gen-q-hint">Tek cümlelik kısa bir özet.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :value="form.konu"
                placeholder="örn. Sokak lambasının arızası hakkında"
                @input="(e) => set('konu', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">4</span>
              <span class="gen-q-label">Durumunuzu anlatın</span>
            </div>
            <p class="gen-q-hint">Sade, gündelik bir dille; ne olduğunu ve ne istediğinizi yazın.</p>
            <div class="gen-q-body">
              <textarea
                class="wordy-textarea"
                :value="form.aciklama"
                placeholder="örn. Evimin önündeki sokak lambası iki haftadır yanmıyor. Akşamları sokak çok karanlık oluyor ve güvenli değil. Lambanın tamir edilmesini istiyorum."
                @input="(e) => set('aciklama', (e.target as HTMLTextAreaElement).value)"
              />
            </div>
          </div>

          <div class="gen-q">
            <div class="gen-q-head">
              <span class="gen-q-num">5</span>
              <span class="gen-q-label">Ad Soyad</span>
            </div>
            <p class="gen-q-hint">Dilekçenin altındaki imza satırı için.</p>
            <div class="gen-q-body">
              <input
                class="wordy-input"
                :value="form.adSoyad"
                placeholder="örn. Ayşe Yılmaz"
                @input="(e) => set('adSoyad', (e.target as HTMLInputElement).value)"
              />
            </div>
          </div>

          <div class="gen-foot">
            <span class="gen-foot-note">
              <DilekceIcon name="sparkle" :size="14" />
              Yapay zeka resmî biçimi otomatik düzenler.
            </span>
            <button
              class="gen-submit"
              type="button"
              :disabled="!isReady"
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
