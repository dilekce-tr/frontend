<script setup lang="ts">
const route = useRoute()
const { theme, toggle } = useTheme()

const isHistory = computed(() => route.path === '/gecmis')
</script>

<template>
  <header class="yd-nav">
    <div class="yd-nav-inner">
      <NuxtLink to="/" class="yd-wm" aria-label="YazbirDilekçe ana sayfa">
        <span class="yd-wm-text">Yazbir<em>Dilekçe</em></span>
        <span class="yd-wm-dot" aria-hidden="true" />
      </NuxtLink>
      <nav class="yd-nav-right">
        <button
          class="yd-nav-link"
          type="button"
          :aria-label="theme === 'dark' ? 'Açık tema' : 'Koyu tema'"
          @click="toggle"
        >
          <DilekceIcon :name="theme === 'dark' ? 'sun' : 'moon'" :size="15" />
        </button>
        <NuxtLink to="/gecmis" class="yd-nav-link" :class="{ 'is-on': isHistory }">
          <DilekceIcon name="clock" :size="15" />
          <span>Geçmiş</span>
        </NuxtLink>
        <NuxtLink to="/olustur" class="yd-nav-link yd-nav-cta">
          <DilekceIcon name="sparkle" :size="15" />
          <span>Yeni dilekçe</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
