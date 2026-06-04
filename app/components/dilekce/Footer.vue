<script setup lang="ts">
const year = new Date().getFullYear()
const { theme, toggle } = useTheme()

const links = [
  { to: '/ornekler', label: 'Örnekler' },
  { to: '/hakkinda', label: 'Hakkında' },
  { to: '/gizlilik', label: 'Gizlilik' },
  { to: '/kosullar', label: 'Koşullar' },
]
</script>

<template>
  <footer class="yd-footer">
    <div class="yd-footer-inner">
      <div class="yd-footer-row">
        <span class="yd-footer-row-spacer" aria-hidden="true" />
        <nav class="yd-footer-nav" aria-label="Footer">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            class="yd-footer-nav-link"
          >
            {{ l.label }}
          </NuxtLink>
        </nav>

        <button
          type="button"
          class="yd-footer-theme"
          :aria-label="theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'"
          :title="theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
          <span class="yd-footer-theme-label">{{ theme === 'dark' ? 'Aydınlık' : 'Karanlık' }}</span>
        </button>
      </div>

      <p class="yd-footer-line">
        <a
          href="https://www.sylow.net"
          target="_blank"
          rel="noopener noreferrer"
          class="yd-footer-link"
        >Gökhan Arlı</a>
        tarafından Claude ile tasarlandı ve geliştirildi
        <span class="yd-footer-sep" aria-hidden="true">·</span>
        Hukuki tavsiye değildir
        <span class="yd-footer-sep" aria-hidden="true">·</span>
        &copy; {{ year }} YazbirDilekçe
      </p>
    </div>
  </footer>
</template>

<style scoped>
.yd-footer {
  border-top: 1px solid var(--border);
  background: var(--bg);
  margin-top: auto;
}
.yd-footer-inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;
}
.yd-footer-row {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}
.yd-footer-row-spacer,
.yd-footer-theme {
  flex: 0 0 auto;
  min-width: 96px;
}
.yd-footer-nav {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px 22px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.yd-footer-nav-link {
  color: var(--text-2);
  text-decoration: none;
  padding: 4px 0;
  transition: color 120ms ease;
}
.yd-footer-nav-link:hover,
.yd-footer-nav-link.router-link-active {
  color: var(--text);
}
.yd-footer-line {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: var(--text-2);
  text-align: center;
}
.yd-footer-sep {
  margin: 0 8px;
  color: var(--text-3);
}
.yd-footer-link {
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 120ms ease;
}
.yd-footer-link:hover {
  border-bottom-color: var(--text);
}
.yd-footer-theme {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 12px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-2);
  cursor: pointer;
  transition: color 120ms, border-color 120ms, background 120ms;
}
.yd-footer-theme:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--surface);
}
.yd-footer-theme:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus-ring);
}
.yd-footer-theme-label {
  font-size: inherit;
}
@media (max-width: 600px) {
  .yd-footer-inner {
    padding: 22px 20px;
    gap: 12px;
  }
  .yd-footer-row {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .yd-footer-row-spacer {
    display: none;
  }
  .yd-footer-nav {
    justify-content: center;
    gap: 4px 18px;
  }
}
</style>