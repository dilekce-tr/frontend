<script setup lang="ts"></script>

<template>
  <header class="yd-nav">
    <div class="yd-nav-inner">
      <NuxtLink to="/" class="yd-wm" aria-label="YazbirDilekçe ana sayfa">
        <span class="yd-wm-text">YazbirDilekçe</span>
        <span class="yd-wm-dot" aria-hidden="true" />
      </NuxtLink>
      <nav class="yd-nav-right">
        <NuxtLink to="/ornekler" class="yd-nav-link">
          <span>Örnekler</span>
        </NuxtLink>
        <span class="yd-nav-sep" aria-hidden="true">|</span>
        <NuxtLink to="/olustur" class="yd-nav-link yd-nav-cta">
          <DilekceIcon name="sparkle" :size="15" />
          <span>Yeni dilekçe</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
