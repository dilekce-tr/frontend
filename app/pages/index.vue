<script setup lang="ts">
import type { CategoryId } from '~/composables/useCategories'

const { CATEGORIES } = useCategories()
const { set } = usePetition()

function start(cat?: CategoryId) {
  if (cat) set('kategori', cat)
  navigateTo('/olustur')
}
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap yd-wrap--wide">
      <section class="hero hero--split">
        <div class="hero-inner">
          <div class="hero-text">
            <div class="eyebrow hero-eyebrow">Resmî dilekçe asistanı</div>
            <h1 class="hero-title">
              Resmî dilekçenizi <em>dakikalar</em> içinde yazın
            </h1>
            <p class="hero-sub">
              Durumunuzu birkaç adımda anlatın, yapay zeka sizin için doğru ve resmî
              bir dilekçe hazırlasın.
            </p>
            <div class="hero-actions">
              <button class="gen-submit" type="button" @click="start()">
                <span>Dilekçe Oluştur</span>
                <DilekceIcon name="arrowRight" :size="19" :sw="1.6" />
              </button>
              <span class="hero-note">
                <DilekceIcon name="shield" :size="14" />
                Hukuki tavsiye değildir · yalnızca dilekçe
              </span>
            </div>
          </div>
          <DilekceSampleLetter />
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">
            Ne hakkında <em>yazıyorsunuz?</em>
          </h2>
          <span class="eyebrow">Bir kategori seçin</span>
        </div>
        <div class="cat-grid">
          <button
            v-for="c in CATEGORIES"
            :key="c.id"
            class="cat-card"
            type="button"
            @click="start(c.id)"
          >
            <span class="cat-ico"><DilekceIcon :name="c.icon" :size="20" /></span>
            <span class="cat-name">{{ c.name }}</span>
            <span class="cat-go"><DilekceIcon name="arrowRight" :size="16" :sw="1.6" /></span>
          </button>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">
            Nasıl <em>çalışır?</em>
          </h2>
        </div>
        <div class="steps">
          <div class="step">
            <div class="step-num">1</div>
            <h3 class="step-title">Durumunuzu anlatın</h3>
            <p class="step-body">
              Günlük dilinizle, birkaç cümleyle ne istediğinizi yazın. Resmî kelimeleri
              bilmenize gerek yok.
            </p>
            <span class="step-arrow"><DilekceIcon name="chevronRight" :size="16" /></span>
          </div>
          <div class="step">
            <div class="step-num">2</div>
            <h3 class="step-title">Yapay zeka dilekçenizi yazsın</h3>
            <p class="step-body">
              Doğru biçimde, saygılı ve resmî bir dille dilekçeniz saniyeler içinde
              hazırlanır.
            </p>
            <span class="step-arrow"><DilekceIcon name="chevronRight" :size="16" /></span>
          </div>
          <div class="step">
            <div class="step-num">3</div>
            <h3 class="step-title">Düzenleyin, indirin veya kopyalayın</h3>
            <p class="step-body">
              Metni dilediğiniz gibi değiştirin; PDF olarak indirin ya da tek dokunuşla
              kopyalayın.
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
