<script setup lang="ts">
// Internal-only preview page. Compare candidate accent colours
// against the live button styles (`.gen-submit`, `.act-btn--primary`)
// before committing to a token change. Noindex + nofollow so it
// stays off Google and isn't linked from the site.
useHead({
  title: 'Button color playground · YazbirDilekçe',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'referrer', content: 'no-referrer' }
  ]
})

type Swatch = {
  name: string
  hex: string
  hover: string
  press: string
  note: string
}

// Each candidate is a self-contained palette: base + hover + press.
// Hover/press are tuned per swatch (roughly -5/-10% lightness) rather
// than a single formula, so each card feels real and not generated.
const SWATCHES: Swatch[] = [
  {
    name: 'Forest Green (current)',
    hex: '#1B6E50',
    hover: '#155A41',
    press: '#0F4633',
    note: 'Your current accent — kept here as a control so the indigos have something to fight.'
  },
  {
    name: 'Soft Indigo',
    hex: '#5C5AB5',
    hover: '#4B49A0',
    press: '#3D3B86',
    note: 'Lighter, more inviting. Feels modern but might read too "tech startup" for a petition tool.'
  },
  {
    name: 'Wordy Indigo',
    hex: '#4F4DA8',
    hover: '#403F8E',
    press: '#333375',
    note: 'The exact accent your other product uses. Useful as a reference even if you don\'t pick it.'
  },
  {
    name: 'Standard Indigo',
    hex: '#3D3A78',
    hover: '#312E62',
    press: '#26244C',
    note: 'Cool, measured. Modern SaaS without going neon. Mid-tone — works on both light and dark.'
  },
  {
    name: 'Deep Indigo',
    hex: '#2F2D6B',
    hover: '#252359',
    press: '#1B1A47',
    note: 'Darker, more authoritative. Reads "official" without the navy-blue cliché.'
  },
  {
    name: 'Slate Indigo',
    hex: '#37396B',
    hover: '#2D2F58',
    press: '#232545',
    note: 'Desaturated. Leans gray, calmer. Probably the most "resmî dilekçe" of the indigos.'
  },
  {
    name: 'Cool Violet',
    hex: '#4A3E80',
    hover: '#3B326A',
    press: '#2D2654',
    note: 'Warmer, red-purple shift. Less blue, more "stamp ink". Distinctive.'
  },
  {
    name: 'Midnight',
    hex: '#1F2050',
    hover: '#181940',
    press: '#101130',
    note: 'Almost black with an indigo cast. Most serious of the set. Risk: hard to differentiate from text.'
  }
]
</script>

<template>
  <div class="yd-page">
    <div class="yd-wrap pg-wrap">
      <header class="pg-head">
        <div class="eyebrow">Playground</div>
        <h1 class="pg-title">Button accent colours</h1>
        <p class="pg-lead">
          Each card uses the real <code>.gen-submit</code> styling with a candidate
          accent. Hover to see the hover state. The first card is your current
          forest-green for comparison.
        </p>
      </header>

      <ul class="pg-grid">
        <li
          v-for="s in SWATCHES"
          :key="s.hex"
          class="pg-card"
          :style="{
            '--pg-accent': s.hex,
            '--pg-hover': s.hover,
            '--pg-press': s.press
          }"
        >
          <div class="pg-card-head">
            <span class="pg-swatch" aria-hidden="true" />
            <div class="pg-card-meta">
              <h2 class="pg-card-name">{{ s.name }}</h2>
              <code class="pg-card-hex">{{ s.hex }}</code>
            </div>
          </div>

          <p class="pg-card-note">{{ s.note }}</p>

          <div class="pg-buttons">
            <!-- Primary — clones .gen-submit -->
            <button type="button" class="pg-primary">
              <span>Dilekçe Oluştur</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>

            <!-- Secondary — outlined, accent text -->
            <button type="button" class="pg-secondary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15V5a2 2 0 0 1 2-2h10"/>
              </svg>
              Kopyala
            </button>

            <!-- Pill — clones .ornek-strip-cta -->
            <button type="button" class="pg-pill">
              <span>Örneklere göz at</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </button>
          </div>

          <!-- Tinted accent-soft strip to preview how the soft variant feels -->
          <div class="pg-soft">
            <span class="pg-soft-eyebrow">Hazır örnekler</span>
            Belediyeye dilekçe, istifa, kira itirazı…
          </div>
        </li>
      </ul>

      <footer class="pg-foot">
        <p>
          Internal page. Tell me which one (by name) and I'll swap
          <code>--accent</code>, <code>--accent-hover</code>, <code>--accent-press</code>,
          <code>--accent-soft</code>, and <code>--focus-ring</code> across both light
          and dark themes.
        </p>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.pg-wrap { max-width: 1080px; padding: 32px 24px 96px; }

.pg-head { margin-bottom: 32px; }
.pg-title {
  font-family: var(--font-serif);
  font-size: clamp(32px, 4.5vw, 44px);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.015em;
  margin: 12px 0 14px;
  color: var(--text);
}
.pg-lead {
  margin: 0; max-width: 64ch;
  font-size: 15.5px; line-height: 1.6; color: var(--text-2);
}
.pg-lead code {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--surface);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--border);
}

.pg-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin: 0 0 40px;
  padding: 0;
  list-style: none;
}
@media (max-width: 760px) { .pg-grid { grid-template-columns: 1fr; } }

.pg-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 20px 22px;
  display: grid;
  gap: 14px;
}

.pg-card-head {
  display: flex; align-items: center; gap: 12px;
}
.pg-swatch {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: var(--pg-accent);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.08);
  flex: 0 0 auto;
}
.pg-card-meta { display: grid; gap: 2px; min-width: 0; }
.pg-card-name {
  margin: 0;
  font-size: 14.5px;
  font-weight: 600;
  color: var(--text);
}
.pg-card-hex {
  font-family: var(--font-mono);
  font-size: 11.5px;
  color: var(--text-3);
}

.pg-card-note {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--text-2);
}

.pg-buttons {
  display: flex; flex-wrap: wrap; gap: 10px;
  padding-top: 4px;
}

/* ── Primary: mirrors .gen-submit ────────────────────────────── */
.pg-primary {
  display: inline-flex; align-items: center; gap: 10px;
  height: 44px; padding: 0 20px;
  border-radius: var(--r-md);
  background: var(--pg-accent);
  color: #fff;
  border: 0; cursor: pointer;
  font: 500 14.5px/1 var(--font-sans);
  transition: background 120ms ease;
}
.pg-primary:hover  { background: var(--pg-hover); }
.pg-primary:active { background: var(--pg-press); }

/* ── Secondary: outlined, accent text ────────────────────────── */
.pg-secondary {
  display: inline-flex; align-items: center; gap: 8px;
  height: 44px; padding: 0 16px;
  background: transparent;
  color: var(--pg-accent);
  border: 1px solid var(--pg-accent);
  border-radius: var(--r-md);
  cursor: pointer;
  font: 500 14px/1 var(--font-sans);
  transition: background 120ms ease, color 120ms ease;
}
.pg-secondary:hover {
  background: var(--pg-accent);
  color: #fff;
}

/* ── Pill: mirrors .ornek-strip-cta ──────────────────────────── */
.pg-pill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 9px 16px;
  background: var(--pg-accent);
  color: #fff;
  border: 0;
  border-radius: 999px;
  cursor: pointer;
  font: 500 13.5px/1 var(--font-sans);
  transition: background 120ms ease;
}
.pg-pill:hover { background: var(--pg-hover); }

/* ── Soft / tinted strip preview ─────────────────────────────── */
.pg-soft {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-2);
  padding: 12px 14px;
  border-radius: var(--r-md);
  background: color-mix(in srgb, var(--pg-accent) 9%, transparent);
  border: 1px solid color-mix(in srgb, var(--pg-accent) 22%, transparent);
}
.pg-soft-eyebrow {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--pg-accent);
  font-weight: 600;
  margin-bottom: 4px;
}

.pg-foot {
  padding-top: 24px;
  border-top: 1px solid var(--border);
}
.pg-foot p {
  margin: 0; max-width: 60ch;
  font-size: 13.5px; line-height: 1.6; color: var(--text-2);
}
.pg-foot code {
  font-family: var(--font-mono);
  font-size: 12.5px;
  background: var(--surface);
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--border);
}
</style>
