<script setup lang="ts">
useSeoMeta({
  title: 'İletişim — YazbirDilekçe',
  description: 'YazbirDilekçe geliştiricisine ulaşın. Hata bildirimi, özellik önerisi veya bir kategori talebi için mesaj gönderebilirsiniz.',
  ogTitle: 'İletişim — YazbirDilekçe',
  ogDescription: 'YazbirDilekçe geliştiricisine ulaşın. Hata bildirimi, özellik önerisi veya bir kategori talebi için mesaj gönderebilirsiniz.',
  ogUrl: 'https://yazbirdilekce.com/iletisim'
})

useHead({
  link: [{ rel: 'canonical', href: 'https://yazbirdilekce.com/iletisim' }]
})
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap iletisim-wrap">
      <header class="iletisim-head">
        <div class="eyebrow">İletişim</div>
        <h1 class="iletisim-title">
          Hazırım, <em>siz de hazır olunca.</em>
        </h1>
        <p class="iletisim-lead">
          Bir hata mı buldunuz, bir özellik mi öneriyorsunuz, bir
          kategori mi eklensin istiyorsunuz, yoksa sadece selam mı?
          Mesajları bizzat ben okuyor, genelde bir iş günü içinde yanıt
          veriyorum.
        </p>
      </header>

      <DilekceContactForm />
    </div>
  </div>
</template>

<style scoped>
.iletisim-wrap { max-width: 720px; padding-bottom: 80px; }
.iletisim-head { margin: 24px 0 32px; }
.iletisim-title {
  font-family: var(--font-serif);
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.018em;
  margin: 12px 0 16px;
  color: var(--text);
}
.iletisim-title em { font-style: italic; color: var(--accent); }
.iletisim-lead {
  margin: 0; max-width: 56ch;
  font-size: 16px; line-height: 1.6; color: var(--text-2);
}
</style>
