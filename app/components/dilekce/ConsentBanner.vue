<script setup lang="ts">
// KVKK çerez/analitik onayı. Yalnızca seçim henüz yapılmamışsa görünür.
const { consent, ready, accept, reject } = useConsent()
</script>

<template>
  <Transition name="yd-consent-fade">
    <div
      v-if="ready && consent === 'unset'"
      class="yd-consent"
      role="dialog"
      aria-live="polite"
      aria-label="Çerez tercihleri"
    >
      <div class="yd-consent-inner">
        <p class="yd-consent-text">
          Siteyi geliştirmek için anonim kullanım istatistikleri topluyoruz.
          Analitik çerezleri yalnızca onayınızla etkinleşir.
          <NuxtLink to="/gizlilik" class="yd-consent-link">Gizlilik politikası</NuxtLink>
        </p>
        <div class="yd-consent-actions">
          <button type="button" class="yd-consent-btn" @click="reject">
            Reddet
          </button>
          <button type="button" class="yd-consent-btn yd-consent-btn--primary" @click="accept">
            Kabul et
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.yd-consent {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 60;
  display: flex;
  justify-content: center;
  pointer-events: none;
}
.yd-consent-inner {
  pointer-events: auto;
  max-width: 720px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 14px 18px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.14);
}
.yd-consent-text {
  margin: 0;
  flex: 1;
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-2);
}
.yd-consent-link {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.yd-consent-actions {
  flex: 0 0 auto;
  display: flex;
  gap: 8px;
}
.yd-consent-btn {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-2);
  cursor: pointer;
  transition: color 120ms, border-color 120ms, background 120ms;
}
.yd-consent-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--bg);
}
.yd-consent-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus-ring);
}
.yd-consent-btn--primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.yd-consent-btn--primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
  color: #fff;
}

.yd-consent-fade-enter-active,
.yd-consent-fade-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}
.yd-consent-fade-enter-from,
.yd-consent-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 600px) {
  .yd-consent-inner {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
  .yd-consent-actions {
    justify-content: flex-end;
  }
}
</style>
