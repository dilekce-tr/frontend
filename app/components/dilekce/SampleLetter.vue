<script setup lang="ts">
const { trDate } = useTrDate()
</script>

<template>
  <div class="hero-sample" aria-hidden="true">
    <div class="sample-paper">
      <div class="sample-date">{{ trDate() }}</div>
      <div class="sample-makam">İZMİR BÜYÜKŞEHİR<br />BELEDİYESİ BAŞKANLIĞINA</div>
      <div class="sample-line s1" />
      <div class="sample-line s2" />
      <div class="sample-line s3" />
      <div class="sample-line s4" />
      <div class="sample-close">Gereğini bilgilerinize arz ederim.</div>
      <div class="sample-sign">
        <span class="sample-sign-line" /><br />
        <span class="sample-sign-name">Ad Soyad</span>
      </div>
    </div>
  </div>
</template>
