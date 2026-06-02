<script setup lang="ts"></script>

<template>
  <div class="loading">
    <div class="load-mark">
      <div class="load-ring" />
      <div class="load-ico"><DilekceIcon name="fileText" :size="26" :sw="1.6" /></div>
    </div>
    <div class="load-text">Dilekçeniz hazırlanıyor…</div>
    <div class="load-skel" aria-hidden="true">
      <div class="shimmer-bar w1" />
      <div class="shimmer-bar w2" />
      <div class="shimmer-bar w3" />
      <div class="shimmer-bar w4" />
      <div class="shimmer-bar w5" />
    </div>
  </div>
</template>
