<script setup lang="ts">
useHead({
  title: 'What this would cost · YazbirDilekçe',
  // Friends-only page — keep search engines out and don't leave a
  // breadcrumb if it ever gets shared more widely than expected.
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'referrer', content: 'no-referrer' }
  ]
})

type Section = { num: string; label: string; anchor: string }
const SECTIONS: Section[] = [
  { num: '01', label: 'What\'s in it',   anchor: 'whats-in' },
  { num: '02', label: 'Where time goes', anchor: 'where-time' },
  { num: '03', label: 'My situation',    anchor: 'my-situation' },
  { num: '04', label: 'Honest answer',   anchor: 'honest-answer' }
]

// Indie solo senior dev — how the 135–200 hours actually break down.
type TimeRow = {
  label: string
  hours: string
  body: string
}
const TIME_ROWS: TimeRow[] = [
  {
    label: 'Backend (Rails 8 API)',
    hours: '40–60 hrs',
    body: 'Auth (signup, login, JWT, password reset), PetitionService with prompt builder + parser + fixture backend, daily budget circuit-breaker, rolling-30-day quota + Rack::Attack throttle, tests, audit log.'
  },
  {
    label: 'Frontend (Nuxt 4)',
    hours: '50–70 hrs',
    body: '7 pages: hero with transform demo, 5-step generator, editable result page, history, about, privacy, terms. Dark mode, design tokens, OG/Twitter cards, accessibility.'
  },
  {
    label: 'LLM prompt + edge cases',
    hours: '15–25 hrs',
    body: 'Iterating the Turkish system prompt, normalising makam/birim typos, surfacing eksik-bilgi hints, kapanış de-duplication, fallback letter when Anthropic is down.'
  },
  {
    label: 'Client-side PDF',
    hours: '8–12 hrs',
    body: 'pdfMake wiring with embedded Instrument Serif + Space Grotesk so Turkish characters render correctly in the downloaded petition.'
  },
  {
    label: 'Design & Turkish copy',
    hours: '20–30 hrs',
    body: 'Brand, design system, 8 category sample petitions, every error message and email in Turkish, Turkic-aware uppercase + dative-suffix format rules.'
  },
  {
    label: 'Infra & ops',
    hours: '10–15 hrs',
    body: 'DigitalOcean droplet, Kamal 2 deploy, managed Postgres, Anthropic key wiring, SES + SPF/DKIM/DMARC, Sentry-ready logs.'
  }
]

// Scope summary cards. Helps a non-technical friend grasp what's
// actually in the codebase without me listing every endpoint.
type Pile = { title: string; items: string[] }
const SCOPE: Pile[] = [
  {
    title: 'Backend — Rails 8 API',
    items: [
      'Auth (signup, login, JWT sessions, password reset, email verification)',
      'PetitionService: prompt builder, LLM client (Claude Haiku), JSON parser, fixture backend for dev',
      'Daily LLM spend circuit-breaker — caps cost in USD against published Haiku pricing',
      'Rolling 30-day per-user quota + Rack::Attack throttle for anonymous IPs',
      'Solid Queue background jobs, Solid Cache, audit event log, ULID primary keys',
      'SES SMTP for transactional mail, signed bounce/complaint webhook',
      '58 tests, strong_migrations, Lograge JSON logs, Sentry-ready'
    ]
  },
  {
    title: 'Frontend — Nuxt 4',
    items: [
      'Marketing home with hero, transform demo (before → after), category grid',
      'Generator flow: 5-step guided form with required-field UX and per-category hints',
      'Result page: editable contentEditable petition with copy, regenerate, PDF download',
      'Client-side PDF rendering with embedded Turkish fonts (Instrument Serif + Space Grotesk)',
      'Pages: home, generator, result, history, about, privacy, terms',
      'Dark mode, design tokens, full Turkish locale, accessible nav + footer',
      'Vercel Analytics, OG/Twitter cards, sitemap, JSON-LD for Google'
    ]
  },
  {
    title: 'Infrastructure & ops',
    items: [
      'DigitalOcean droplet deployed via Kamal 2',
      'Managed Postgres on DigitalOcean',
      'SES with custom MAIL FROM + SPF/DKIM/DMARC + bounce/complaint webhook',
      'Anthropic Claude Haiku for the LLM (rate-limited and budget-capped server-side)',
      'Audit log, per-IP rate limiting, signed webhooks'
    ]
  },
  {
    title: 'Design & product',
    items: [
      'Brand, design tokens, dark mode, 7 designed pages',
      'Sample petitions written for 8 categories (belediye, iş, kira, okul, tüketici, izin, itiraz, diğer)',
      'Turkish copywriting throughout — every error message, email, and button',
      'Format rules for resmî dilekçe (Turkic uppercase, dative suffix, kapanış selection)'
    ]
  }
]
</script>

<template>
  <main class="cost-main">
    <!-- ── Hero ────────────────────────────────────────────────────── -->
    <header class="cost-hero">
      <div class="cost-eyebrow-row">
        <span class="label-mono cost-eyebrow">What this would cost</span>
        <span class="cost-private-badge" aria-label="Private page">PRIVATE</span>
      </div>
      <h1 class="cost-title">A fair price for a project like this.</h1>
      <p class="cost-byline">
        A note to my friends — share where you like. There's no link to
        this from anywhere on the site. Numbers are sized for a solo
        senior developer building the whole thing from scratch — no
        agency, no team, no markup.
      </p>
    </header>

    <!-- ── Headline card ───────────────────────────────────────────── -->
    <section class="cost-headline" aria-labelledby="headline-label">
      <div class="cost-headline-meta">
        <span id="headline-label" class="cost-headline-label">Total · solo senior dev</span>
        <span class="cost-headline-time">~135–200 hours · 3–5 weeks</span>
      </div>
      <div class="cost-headline-amount">$16K–28K</div>
      <p class="cost-headline-body">
        One developer, scratch start, modern AI tooling, billed at
        <strong>$120–150/hr</strong>. Wide end assumes some prompt
        iteration, Turkish copy polish, and a real production deploy.
        Narrow end assumes the dev has done Rails 8 + Nuxt 4 + LLM
        before and isn't relearning the stack.
      </p>
    </section>

    <nav class="cost-toc" aria-label="On this page">
      <a
        v-for="s in SECTIONS"
        :key="s.anchor"
        :href="`#${s.anchor}`"
        class="cost-toc-chip"
      >
        <span class="cost-toc-num">{{ s.num }}</span>
        <span class="cost-toc-label">{{ s.label }}</span>
      </a>
    </nav>

    <article class="cost-body">
      <!-- ── 01 · What's in it ──────────────────────────────────────── -->
      <section id="whats-in" class="cost-section">
        <header class="cost-sec-head">
          <span class="cost-sec-num">01</span>
          <h2 class="cost-sec-title">What's in the project</h2>
        </header>

        <p>
          Before I quote anything, let me describe the scope the way a
          shop would size it. This isn't "a form that calls ChatGPT" —
          it's a small SaaS with auth, an LLM service with spend caps,
          editable result rendering, client-side PDF, a Turkish design
          system, and the kind of polish that doesn't show up on the
          surface.
        </p>

        <div class="cost-scope-grid">
          <div
            v-for="pile in SCOPE"
            :key="pile.title"
            class="cost-scope-card"
          >
            <h3 class="cost-scope-title">{{ pile.title }}</h3>
            <ul class="cost-scope-list">
              <li v-for="item in pile.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ── 02 · Where the time goes ───────────────────────────────── -->
      <section id="where-time" class="cost-section">
        <header class="cost-sec-head">
          <span class="cost-sec-num">02</span>
          <h2 class="cost-sec-title">Where the time actually goes</h2>
        </header>

        <p>
          Total honest estimate for a solo senior dev, working with
          modern AI tooling: <strong>~135–200 hours</strong>, or
          roughly 3–5 weeks of focused work. Here's how that splits
          across the codebase.
        </p>

        <ul class="cost-bands">
          <li
            v-for="row in TIME_ROWS"
            :key="row.label"
            class="cost-band"
          >
            <div class="cost-band-head">
              <h3 class="cost-band-label">{{ row.label }}</h3>
              <span class="cost-band-total">{{ row.hours }}</span>
            </div>
            <p class="cost-band-body">{{ row.body }}</p>
          </li>
        </ul>

        <aside class="cost-note">
          <p>
            <strong>What the hours include that's easy to miss.</strong>
            Reading the Anthropic SDK end-to-end so the prompt-cache
            rules apply. Embedding Turkish fonts in pdfMake so İ and ş
            don't render as boxes. Writing the system prompt in clear
            Turkish so Haiku doesn't drift into formal English. Setting
            up the daily budget cap so a runaway bot can't bleed the
            account. None of this shows up on the home page.
          </p>
        </aside>
      </section>

      <!-- ── 03 · My situation ──────────────────────────────────────── -->
      <section id="my-situation" class="cost-section">
        <header class="cost-sec-head">
          <span class="cost-sec-num">03</span>
          <h2 class="cost-sec-title">What's different about this one</h2>
        </header>

        <ul class="cost-points">
          <li>
            <strong>It's a focused product, not a wide one.</strong> One
            core flow (form → LLM → editable petition → PDF) done well,
            instead of ten flows done shallow. That keeps the build
            number honest — no Stripe billing yet, no dashboard,
            no admin panel. Adding monetisation would be a separate
            ~40–60 hours of work.
          </li>
          <li>
            <strong>The LLM piece is hardened.</strong> A daily USD
            budget circuit-breaker, per-IP and per-user quotas, fallback
            to a mechanical letter when the API is down, normalized
            makam/birim with typo correction, and an "eksik bilgi"
            hint when the user forgets the address. None of this is
            visible from the home page; all of it is what keeps the
            app from bleeding money or hallucinating.
          </li>
          <li>
            <strong>The stack is deliberately modern.</strong> Solid
            Queue + Solid Cache + Kamal + DigitalOcean — no Redis,
            no $500/mo managed service. Monthly infra cost stays
            under $30 until there's real traffic.
          </li>
          <li>
            <strong>The Turkish detail is the moat.</strong> Turkic
            uppercase (i → İ, not I), dative-suffix rewriting for the
            address line, category-aware kapanış selection (üst makam
            vs. muhatap), real Turkish fonts embedded in the PDF.
            A generic dev would ship <code>text.upcase</code> and
            call it done.
          </li>
        </ul>
      </section>

      <!-- ── 04 · Honest answer ─────────────────────────────────────── -->
      <section id="honest-answer" class="cost-section cost-section--final">
        <header class="cost-sec-head">
          <span class="cost-sec-num">04</span>
          <h2 class="cost-sec-title">If I had to pick one number</h2>
        </header>

        <p>
          A solo senior developer, working from scratch with modern AI
          tooling, ships this in 3–5 weeks. At
          <strong>$120–150/hr</strong> — the going rate for a sharp
          indie with a real portfolio — that's
          <strong>$16K–28K</strong> all in.
        </p>

        <p>
          The wide end of that range assumes some prompt iteration,
          some Turkish copy polish, and a real production deploy with
          monitoring. The narrow end assumes the dev has done a Rails 8
          + Nuxt 4 + LLM project before and isn't relearning the stack.
          Either way, it's one person, one head, one bank account —
          no agency markup, no PM tax, no design–dev handoff cost.
        </p>

        <div class="cost-callouts">
          <div class="cost-callout">
            <span class="cost-callout-label">As a hire-me sample</span>
            <p>Justifies a <strong>$110K–140K base</strong> at a remote-friendly company or <strong>$120–150/hr</strong> consulting rate for the next gig.</p>
          </div>
          <div class="cost-callout">
            <span class="cost-callout-label">As a freelance bid</span>
            <p>I'd open at <strong>$24K fixed</strong> and negotiate down to <strong>~$16K floor</strong> with scope boundaries.</p>
          </div>
          <div class="cost-callout">
            <span class="cost-callout-label">As a side project</span>
            <p>3–5 evenings-and-weekends weeks, calendar-time more like 8–12 weeks. The same code, the same scope — just paid in opportunity cost instead of invoices.</p>
          </div>
        </div>

        <p class="cost-coda">
          Most of this is invisible to a non-technical buyer. They see a
          form that turns a few sentences into a petition and think
          weekend ChatGPT wrapper. The circuit-breaker, the format
          rules, the eksik-bilgi hint, the fonts that actually render
          Turkish — those are the parts the price is really paying for.
          The visible UI is the easier half.
        </p>
      </section>
    </article>

    <footer class="cost-foot">
      <p class="cost-foot-note">
        Private page — no link from the site. Share by URL if it's useful.
      </p>
    </footer>
  </main>
</template>

<style scoped>
.cost-main {
  max-width: 880px;
  margin: 0 auto;
  padding: 56px 32px 96px;
}

/* ── Hero ──────────────────────────────────────────────────────── */
.cost-hero {
  padding-bottom: 32px;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border);
}
.cost-eyebrow-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.cost-eyebrow { color: var(--text-3); }
.cost-private-badge {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.14em;
  color: var(--danger);
  background: var(--danger-soft);
  padding: 3px 8px;
  border-radius: 999px;
  font-weight: 600;
}
.cost-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(34px, 5vw, 48px);
  line-height: 1.08;
  font-weight: 400;
  letter-spacing: -0.018em;
  color: var(--text);
}
.cost-byline {
  margin: 18px 0 0;
  max-width: 56ch;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--text-2);
}

/* ── Headline card ─────────────────────────────────────────────── */
.cost-headline {
  margin: -8px 0 40px;
  padding: 24px 26px;
  background: var(--accent-soft);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  border-radius: 14px;
  display: grid;
  gap: 10px;
}
.cost-headline-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  flex-wrap: wrap;
}
.cost-headline-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 600;
}
.cost-headline-time {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
  color: var(--text-2);
}
.cost-headline-amount {
  font-family: var(--font-serif);
  font-size: clamp(40px, 6vw, 56px);
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text);
}
.cost-headline-body {
  margin: 4px 0 0;
  max-width: 60ch;
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-2);
}
.cost-headline-body strong { color: var(--text); font-weight: 600; }
@media (max-width: 600px) {
  .cost-headline { padding: 20px 18px; }
}

/* ── TOC chip row ──────────────────────────────────────────────── */
.cost-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 48px;
}
.cost-toc-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  text-decoration: none;
  font-size: 13px;
  color: var(--text-2);
  transition: border-color 120ms, color 120ms, background 120ms;
}
.cost-toc-chip:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--surface-sunk);
}
.cost-toc-num {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 6px;
  border-radius: 999px;
}
.cost-toc-label { white-space: nowrap; }

/* ── Sections ──────────────────────────────────────────────────── */
.cost-section {
  margin-bottom: 64px;
  scroll-margin-top: 80px;
}
.cost-section--final { margin-bottom: 32px; }
.cost-section:last-child { margin-bottom: 0; }
.cost-sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 22px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--border);
}
.cost-sec-num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--accent);
}
.cost-sec-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text);
}

/* ── Body prose ────────────────────────────────────────────────── */
.cost-body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
}
.cost-body p { margin: 0 0 18px; }
.cost-body em { color: var(--text); font-style: italic; }
.cost-body strong { color: var(--text); font-weight: 500; }

/* ── 01 · Scope rows (single column) ──────────────────────────── */
.cost-scope-grid {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 20px;
  border-top: 1px solid var(--border);
}
.cost-scope-card {
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: minmax(180px, 1fr) 3fr;
  gap: 24px;
  align-items: start;
}
.cost-scope-title {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
  padding-top: 2px;
}
.cost-scope-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.cost-scope-list li {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text-2);
}
@media (max-width: 600px) {
  /* Stack the row vertically on narrow screens. */
  .cost-scope-card { grid-template-columns: 1fr; gap: 10px; }
}

/* ── 02 · Pricing bands (simple list rows) ────────────────────── */
.cost-bands {
  list-style: none;
  margin: 20px 0 0;
  padding: 0;
  border-top: 1px solid var(--border);
}
.cost-band {
  padding: 20px 0;
  border-bottom: 1px solid var(--border);
}
.cost-band-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 6px;
}
.cost-band-label {
  margin: 0;
  font-size: 15.5px;
  color: var(--text);
  font-weight: 500;
}
.cost-band-total {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: 0.02em;
  color: var(--text);
}
.cost-band-body {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text-2);
}
.cost-band-rate {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--text-3);
  margin-left: 4px;
}

.cost-note {
  margin-top: 28px;
  padding: 0 0 0 16px;
  border-left: 2px solid var(--border-strong);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-2);
}
.cost-note p { margin: 0; }

/* ── 03 · Points (plain ul, no card chrome) ───────────────────── */
.cost-points {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 14px;
}
.cost-points li {
  font-size: 15px;
  line-height: 1.65;
  color: var(--text-2);
}

/* ── 04 · Final callouts (single column, hairline rows) ───────── */
.cost-callouts {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
  border-top: 1px solid var(--border);
}
.cost-callout {
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  display: grid;
  grid-template-columns: minmax(140px, 1fr) 3fr;
  gap: 18px;
  align-items: baseline;
}
.cost-callout-label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-3);
}
.cost-callout p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text-2);
}
@media (max-width: 600px) {
  .cost-callout { grid-template-columns: 1fr; gap: 4px; }
}

.cost-coda {
  margin-top: 8px;
  font-style: italic;
  color: var(--text-3);
}

/* ── Footer ────────────────────────────────────────────────────── */
.cost-foot {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  text-align: center;
}
.cost-foot-note {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-3);
}

@media (max-width: 600px) {
  .cost-main { padding: 36px 20px 64px; }
  .cost-section { margin-bottom: 48px; }
}
</style>
