<script setup lang="ts">
useHead({ title: 'Hakkında · YazbirDilekçe' })

type Section = { num: string; label: string; anchor: string }
const SECTIONS: Section[] = [
  { num: '01', label: 'Neden',       anchor: 'neden' },
  { num: '02', label: 'Nasıl',       anchor: 'nasil' },
  { num: '03', label: 'İlkeler',     anchor: 'ilkeler' },
  { num: '04', label: 'Sırada ne var', anchor: 'sirada' },
  { num: '05', label: 'Nelerle yapıldı', anchor: 'yapildi' },
  { num: '06', label: 'İletişim',    anchor: 'iletisim' }
]

const PRINCIPLES = [
  { title: 'Sakin, gürültüsüz', body: 'Düzgün bir araç gibi hissettirsin. Maskot yok, sizi sıkıştıran rozetler yok, agresif çağrılar yok.' },
  { title: 'Şimdilik tamamen ücretsiz', body: 'Plan yok, üyelik zorunluluğu yok, ücretli sınır yok. Bir gün kullanım yoğunlaşırsa sürdürülebilir bir ücretsiz plan + opsiyonel destek aboneliği planlıyorum.' },
  { title: 'İstediğiniz an iptal', body: 'Dönem sonuna kadar erişiminiz kalır; ne soru ne geri kazanma e-postası.' },
  { title: 'Veriniz size aittir', body: 'Dilekçelerinizi satmıyoruz, model eğitiminde kullanmıyoruz. Dışa aktarın veya silin.' }
]
</script>

<template>
  <main class="about-main">
    <!-- ── Hero ────────────────────────────────────────────────────── -->
    <header class="about-hero">
      <div class="about-hero-bg" aria-hidden="true">
        <span class="about-hero-mark">·Y·</span>
      </div>
      <div class="about-hero-fg">
        <div class="label-mono about-eyebrow">Hakkında · YazbirDilekçe</div>
        <h1 class="about-title">YazbirDilekçe'yi neden yaptım</h1>
        <p class="about-byline">
          Bir not:
          <a href="https://www.sylow.net" target="_blank" rel="noopener noreferrer">Gökhan Arlı</a>
        </p>
      </div>
    </header>

    <!-- ── Mini-TOC chip row ────────────────────────────────────────── -->
    <nav class="about-toc" aria-label="Bu sayfada">
      <a
        v-for="s in SECTIONS"
        :key="s.anchor"
        :href="`#${s.anchor}`"
        class="about-toc-chip"
      >
        <span class="about-toc-num">{{ s.num }}</span>
        <span class="about-toc-label">{{ s.label }}</span>
      </a>
    </nav>

    <article class="about-body">
      <!-- ── 01 · Neden ─────────────────────────────────────────────── -->
      <section id="neden" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">01</span>
          <h2 class="about-sec-title">Neden</h2>
        </header>

        <p>
          Hayatımızda zaman zaman resmî bir dilekçe yazmamız gerekiyor:
          belediyeye bir şikâyet, iş yerine bir istifa, ev sahibine bir
          itiraz, okula bir mazeret. Her seferinde aynı durumla
          karşılaşıyoruz — ne yazacağımızı biliyoruz ama nasıl yazacağımızı
          bilmiyoruz. "Sayın yetkili" ile mi başlamalı? Konu satırı nasıl
          olmalı? "Arz ederim" mi, "rica ederim" mi?
        </p>

        <p>
          YazbirDilekçe, bu boşluğu doldurmak için var. Durumunuzu kendi
          dilinizle, gündelik cümlelerle anlatıyorsunuz; karşılığında
          doğru biçimde, saygılı ve resmî bir dille yazılmış bir dilekçe
          alıyorsunuz. Düzenleyebilir, kopyalayabilir, PDF olarak
          indirebilirsiniz.
        </p>
      </section>

      <!-- ── 02 · Nasıl ─────────────────────────────────────────────── -->
      <section id="nasil" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">02</span>
          <h2 class="about-sec-title">Nasıl</h2>
        </header>

        <p>
          Tek başıma geliştirdiğim için hızlı hareket edebiliyorum.
          Bir şey çalışmıyorsa veya bir kategori eksikse — aynı hafta
          içinde değişebilir. Yeni bir kategori, daha iyi bir prompt,
          biraz yanlış çıkan bir kalıbın düzeltilmesi: ekip küçük,
          ufuk geniş.
        </p>
      </section>

      <!-- ── 03 · İlkeler ───────────────────────────────────────────── -->
      <section id="ilkeler" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">03</span>
          <h2 class="about-sec-title">İlkeler</h2>
        </header>

        <p class="about-sec-intro">
          Tek satır kod yazmadan önce taahhüt ettiğim birkaç şey.
        </p>

        <div class="about-principles">
          <div
            v-for="p in PRINCIPLES"
            :key="p.title"
            class="about-principle"
          >
            <h3 class="about-principle-title">{{ p.title }}</h3>
            <p class="about-principle-body">{{ p.body }}</p>
          </div>
        </div>
      </section>

      <!-- ── 04 · Sırada ne var ─────────────────────────────────────── -->
      <section id="sirada" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">04</span>
          <h2 class="about-sec-title">Sırada ne var</h2>
        </header>

        <p>
          Üç grupta çalışıyorum, hangisinin çıkacağına ne kadar
          güvendiğime göre sıralı. Yakın olan = daha kesin.
        </p>

        <ul class="about-next-list">
          <li class="about-next-row">
            <span class="about-next-badge about-next-badge--soon">Yakında</span>
            <span class="about-next-text">
              <strong>Klasik / Modern</strong> dilekçe biçimi seçimi,
              <strong>kişiselleştirilmiş kapanış kalıpları</strong> ve
              <strong>daha fazla kategori</strong> — önümüzdeki haftalarda.
            </span>
          </li>
          <li class="about-next-row">
            <span class="about-next-badge about-next-badge--next">Sonra</span>
            <span class="about-next-text">
              <strong>Dilekçe şablonları kütüphanesi</strong>,
              <strong>doğrudan e-imza desteği</strong> ve
              <strong>kurum adresleri otomatik tamamlama</strong>.
            </span>
          </li>
          <li class="about-next-row">
            <span class="about-next-badge about-next-badge--future">İleride</span>
            <span class="about-next-text">
              <strong>Resmî kurum API entegrasyonu</strong> — dilekçeyi
              doğrudan ilgili kuruma elektronik olarak gönderebilme.
            </span>
          </li>
        </ul>
      </section>

      <!-- ── 05 · Nelerle yapıldı ───────────────────────────────────── -->
      <section id="yapildi" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">05</span>
          <h2 class="about-sec-title">Nelerle yapıldı</h2>
        </header>

        <p>
          YazbirDilekçe,
          <a href="https://claude.com" target="_blank" rel="noopener noreferrer">Claude</a>
          ile tasarlandı ve geliştirildi. Dilekçeleri yazan yapay zekâ da
          Claude'dur (Anthropic). Geri kalan her şey elden yazılmış
          Rails ve Nuxt; kendim deploy ettiğim iki küçük depoda yaşıyor.
        </p>

        <div class="about-stack">
          <a href="https://claude.com" target="_blank" rel="noopener noreferrer" class="about-stack-chip">
            <span class="about-stack-chip-dot" aria-hidden="true" />
            <span class="about-stack-chip-name">Claude</span>
            <span class="about-stack-chip-role">Anthropic · dilekçe metni</span>
          </a>
          <span class="about-stack-chip about-stack-chip--passive">
            <span class="about-stack-chip-dot" aria-hidden="true" />
            <span class="about-stack-chip-name">Rails 8</span>
            <span class="about-stack-chip-role">API backend</span>
          </span>
          <span class="about-stack-chip about-stack-chip--passive">
            <span class="about-stack-chip-dot" aria-hidden="true" />
            <span class="about-stack-chip-name">Nuxt 4</span>
            <span class="about-stack-chip-role">Frontend</span>
          </span>
        </div>
      </section>

      <!-- ── 06 · İletişim ──────────────────────────────────────────── -->
      <section id="iletisim" class="about-section">
        <header class="about-sec-head">
          <span class="about-sec-num">06</span>
          <h2 class="about-sec-title">İletişim</h2>
        </header>

        <p>
          Bir dilekçe yanlış çıktıysa, eksik bulduğunuz bir özellik varsa,
          YazbirDilekçe çöktüyse — lütfen bana
          <a href="mailto:gokhan@sylow.net">yazın</a>.
          Her mesajı bizzat okuyorum.
        </p>
      </section>
    </article>

    <footer class="about-foot">
      <NuxtLink to="/olustur" class="about-foot-btn about-foot-btn--primary">Dilekçe oluştur</NuxtLink>
      <NuxtLink to="/" class="about-foot-btn about-foot-btn--ghost">Ana sayfa</NuxtLink>
    </footer>
  </main>
</template>

<style scoped>
.about-main {
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 32px 96px;
}

/* ── Hero ──────────────────────────────────────────────────────── */
.about-hero {
  position: relative;
  padding: 56px 0 48px;
  margin-bottom: 36px;
  border-bottom: 1px solid var(--border);
  overflow: hidden;
}
.about-hero-bg {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 90% 60% at 50% 35%,
      color-mix(in srgb, var(--accent) 8%, transparent),
      transparent 70%
    );
}
.about-hero-mark {
  font-family: var(--font-serif);
  font-size: clamp(140px, 22vw, 220px);
  line-height: 1;
  color: color-mix(in srgb, var(--accent) 8%, transparent);
  user-select: none;
  font-weight: 400;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.about-hero-fg {
  position: relative;
  text-align: center;
}
.about-eyebrow { margin-bottom: 18px; }
.about-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(36px, 5.5vw, 52px);
  line-height: 1.05;
  font-weight: 400;
  letter-spacing: -0.018em;
  color: var(--text);
}
.about-byline {
  margin: 16px 0 0;
  font-family: var(--font-mono);
  font-size: 12.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-3);
}
.about-byline a {
  color: var(--text-2);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 120ms;
}
.about-byline a:hover { border-bottom-color: var(--text-2); }

/* ── TOC chip row ──────────────────────────────────────────────── */
.about-toc {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 48px;
}
.about-toc-chip {
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
.about-toc-chip:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--bg-elev);
}
.about-toc-num {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  color: var(--accent);
  background: var(--accent-soft);
  padding: 2px 6px;
  border-radius: 999px;
}
.about-toc-label { white-space: nowrap; }

/* ── Sections ──────────────────────────────────────────────────── */
.about-section {
  margin-bottom: 56px;
  scroll-margin-top: 80px;
}
.about-section:last-child { margin-bottom: 0; }

.about-sec-head {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--border);
}
.about-sec-num {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--accent);
}
.about-sec-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: 26px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text);
}

.about-sec-intro {
  margin: 0 0 18px;
  color: var(--text-2);
  font-size: 15.5px;
}

/* ── Body prose ────────────────────────────────────────────────── */
.about-body {
  font-size: 16.5px;
  line-height: 1.7;
  color: var(--text);
}
.about-body p {
  margin: 0 0 18px;
}
.about-body p:last-child { margin-bottom: 0; }
.about-body a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  transition: border-color 120ms;
}
.about-body a:hover { border-bottom-color: var(--accent); }

/* ── Principles cards ──────────────────────────────────────────── */
.about-principles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.about-principle {
  padding: 18px 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: border-color 120ms, transform 120ms;
}
.about-principle:hover {
  border-color: var(--border-strong);
  transform: translateY(-1px);
}
.about-principle-title {
  margin: 0 0 6px;
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--text);
}
.about-principle-body {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--text-2);
}

/* ── Next stages ───────────────────────────────────────────────── */
.about-next-list {
  list-style: none;
  margin: 18px 0 22px;
  padding: 0;
  display: grid;
  gap: 10px;
}
.about-next-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}
.about-next-badge {
  flex: 0 0 72px;
  box-sizing: border-box;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 500;
  padding: 4px 0;
  border-radius: 999px;
  margin-top: 1px;
}
.about-next-badge--soon   { background: var(--text-2);   color: var(--bg); }
.about-next-badge--next   { background: var(--bg-elev);  color: var(--text-2); }
.about-next-badge--future {
  background: transparent;
  color: var(--text-3);
  border: 1px dashed var(--border-strong);
}
.about-next-text {
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--text-2);
}
.about-next-text strong {
  color: var(--text);
  font-weight: 400;
}

/* ── Stack chips ───────────────────────────────────────────────── */
.about-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
}
.about-stack-chip {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 10px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  transition: border-color 120ms, transform 120ms;
}
.about-stack-chip:not(.about-stack-chip--passive):hover {
  border-color: var(--border-strong);
  transform: translateY(-1px);
}
.about-stack-chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.about-stack-chip--passive .about-stack-chip-dot {
  background: var(--text-3);
}
.about-stack-chip-name {
  font-family: var(--font-sans);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--text);
}
.about-stack-chip-role {
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-3);
}

/* ── Foot ──────────────────────────────────────────────────────── */
.about-foot {
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}
.about-foot-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 18px; border-radius: var(--r-md);
  font: 600 14px/1 var(--font-sans);
  text-decoration: none;
  border: 1px solid transparent;
  transition: background 120ms, color 120ms, border-color 120ms;
}
.about-foot-btn--primary {
  background: var(--accent); color: var(--text-on-accent);
}
.about-foot-btn--primary:hover { background: var(--accent-hover); }
.about-foot-btn--ghost {
  background: transparent; color: var(--text-2); border-color: var(--border);
}
.about-foot-btn--ghost:hover { color: var(--text); border-color: var(--border-strong); }

/* ── Responsive ────────────────────────────────────────────────── */
@media (max-width: 600px) {
  .about-main { padding: 32px 20px 64px; }
  .about-hero { padding: 36px 0 32px; }
  .about-section { margin-bottom: 44px; }
  .about-sec-title { font-size: 22px; }
  .about-principles { grid-template-columns: 1fr; }
}
</style>