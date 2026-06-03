<script setup lang="ts">
import type { CategoryId } from '~/composables/useCategories'

const { CATEGORIES } = useCategories()
const { set } = usePetition()
const { trDate } = useTrDate()
const trDateToday = () => trDate()

const CATEGORY_EXAMPLES: Record<CategoryId, string> = {
  is:        '"İstifa etmek istiyorum, 30 gün ihbar süresi…"',
  kira:      '"Ev sahibim %50 zam istedi, itiraz etmek…"',
  belediye:  '"Sokağımızda yıllardır asfalt dökülmedi…"',
  okul:      '"Cenaze nedeniyle 3 gün devamsızlık…"',
  tuketici:  '"Aldığım ürün arızalı çıktı, iade istiyorum…"',
  izin:      '"5 gün mazeret izni talep ediyorum…"',
  itiraz:    '"Trafik cezasına itiraz etmek istiyorum…"',
  diger:     '"Diğer bir konuda dilekçe yazmak…"',
}

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
            <div class="hero-sub-bullets">
              <p class="hero-sub-lead">
                Durumunuzu birkaç cümleyle anlatın, gerisini bize bırakın.
              </p>
              <ul class="hero-sub-list">
                <li>
                  <DilekceIcon name="check" :size="14" :sw="2" />
                  <span>Doğru hitap ve resmî biçim</span>
                </li>
                <li>
                  <DilekceIcon name="check" :size="14" :sw="2" />
                  <span>Saygılı, kurumsal Türkçe</span>
                </li>
                <li>
                  <DilekceIcon name="check" :size="14" :sw="2" />
                  <span>Düzenleyin, kopyalayın, PDF indirin</span>
                </li>
              </ul>
            </div>
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
            Birkaç cümleden <em>resmî dilekçeye</em>
          </h2>
          <span class="eyebrow">Önce → Sonra</span>
        </div>

        <div class="transform">
          <div class="transform-card transform-before">
            <div class="transform-head">
              <span class="transform-label">Siz yazıyorsunuz</span>
              <span class="transform-pill">Günlük dil</span>
            </div>
            <p class="transform-input">
              evdeki kombi 3 gündür çalışmıyor. küçük çocuğum hasta, sıcak suyumuz
              da yok. müşteri hizmetlerini defalarca aradım, her seferinde bugün
              gelecekler dediler ama kimse gelmedi. abonelik numaramız 1234567,
              adresim Konak / İzmir. acilen bir teknisyen gönderilmesini ve
              kaybedilen günler için faturamdan indirim yapılmasını istiyorum.
            </p>
            <div class="transform-meta">
              <span class="transform-meta-item">
                <DilekceIcon name="cart" :size="14" /> Tüketici Şikayeti
              </span>
              <span class="transform-meta-item">~30 saniye</span>
            </div>
          </div>

          <div class="transform-arrow" aria-hidden="true">
            <DilekceIcon name="arrowRight" :size="22" :sw="1.6" />
          </div>

          <div class="transform-card transform-after">
            <div class="transform-head">
              <span class="transform-label">Dilekçeniz</span>
              <span class="transform-pill transform-pill--accent">Resmî</span>
            </div>
            <div class="transform-doc-date">{{ trDateToday() }}</div>
            <div class="transform-doc-makam">İZMİRGAZ A.Ş.<br />GENEL MÜDÜRLÜĞÜNE</div>
            <div class="transform-doc-konu">
              <span class="transform-doc-konu-label">Konu:</span>
              Kombi arızasının giderilmesi ve fatura indirimi talebi hk.
            </div>
            <p class="transform-doc-p">Sayın Yetkili,</p>
            <p class="transform-doc-p">
              1234567 numaralı abonem üzerinden hizmet aldığım konutta bulunan
              kombim 3 (üç) gündür arızalı olup, sıcak su ve ısınma hizmetinden
              yararlanamamaktayım.
            </p>
            <p class="transform-doc-p">
              Söz konusu arıza nedeniyle müşteri hizmetleriniz ile defalarca
              iletişime geçilmiş, tarafıma teknisyen yönlendirileceği bildirilmiş
              ancak bugüne kadar herhangi bir müdahale gerçekleştirilmemiştir.
            </p>
            <p class="transform-doc-p">
              Bu kapsamda, ivedilikle bir teknik ekibin tarafıma yönlendirilmesini
              ve hizmet alamadığım günlere ilişkin faturamda gerekli indirimin
              yapılmasını arz ederim.
            </p>
            <div class="transform-doc-close">
              Gereğini bilgilerinize arz ederim.
            </div>
            <div class="transform-doc-sign">
              <span class="transform-doc-sign-line" />
              <span class="transform-doc-sign-name">Ad Soyad</span>
            </div>
          </div>
        </div>

        <div class="transform-footnote">
          <DilekceIcon name="shield" :size="14" />
          Hukuki tavsiye değildir · yalnızca dilekçe biçiminde yazılır
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2 class="section-title">
            Ne hakkında <em>yazıyorsunuz?</em>
          </h2>
        </div>

        <div class="cat-ex-grid">
          <button
            v-for="c in CATEGORIES"
            :key="c.id"
            class="cat-ex-card"
            type="button"
            @click="start(c.id)"
          >
            <span class="cat-ex-top">
              <span class="cat-ex-ico">
                <DilekceIcon :name="c.icon" :size="16" :sw="1.5" />
              </span>
              <span class="cat-ex-name">{{ c.name }}</span>
            </span>
            <span class="cat-ex-quote">{{ CATEGORY_EXAMPLES[c.id] }}</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
