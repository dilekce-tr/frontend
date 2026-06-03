<script setup lang="ts">
useHead({ title: 'Koşullar · YazbirDilekçe' })

const LAST_UPDATED = '3 Haziran 2026'
</script>

<template>
  <main class="legal-main">
    <header class="legal-head">
      <div class="label-mono legal-eyebrow">Yasal</div>
      <h1 class="legal-title">Kullanım Koşulları</h1>
      <p class="legal-stamp">Son güncelleme · {{ LAST_UPDATED }}</p>
    </header>

    <article class="legal-body">
      <p class="legal-lead">
        Bu koşullar, YazbirDilekçe'den ne bekleyebileceğinizi ve
        YazbirDilekçe'nin sizden ne beklediğini açıklar. Hizmeti kullanarak
        bu koşulları kabul etmiş olursunuz. Hukuki zırh değil, karşılıklı
        anlayış hedefiyle açık bir dille yazıldı.
      </p>

      <section class="legal-section">
        <h2 id="kim">1. YazbirDilekçe nedir</h2>
        <p>
          YazbirDilekçe, bağımsız bir geliştirici olan Gökhan Arlı
          tarafından işletilen bir resmî dilekçe hazırlama hizmetidir.
          Bağlı bir şirket yoktur.
        </p>
        <p>
          <strong>Önemli:</strong> YazbirDilekçe hukuki tavsiye vermez.
          Üretilen dilekçeler yalnızca resmî biçimde yazılmış birer
          taslaktır; hukuki sonuçları olabilecek konularda mutlaka bir
          avukata danışın.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="hesap">2. Hesabınız</h2>
        <p>
          YazbirDilekçe'nin çoğu özelliği için hesap gereklidir. Hesap
          oluşturmak için:
        </p>
        <ul>
          <li>En az 13 yaşında olmalısınız.</li>
          <li>Size ait, geçerli bir e-posta adresi vermelisiniz.</li>
          <li>Güvenli bir şifre seçmeli ve gizli tutmalısınız.</li>
        </ul>
        <p>
          Hesabınız üzerinden gerçekleşen etkinliklerden siz sorumlusunuz.
          Yetkisiz bir erişim olduğundan şüpheleniyorsanız şifrenizi
          değiştirin ve bana e-posta gönderin.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="planlar">3. Ücretsiz ve ücretli planlar</h2>
        <p>
          YazbirDilekçe'nin üç katmanı vardır: Ücretsiz, Meraklı ve Adanmış.
          Limitler ve fiyatlar
          <NuxtLink to="/fiyatlandirma">fiyatlandırma sayfasında</NuxtLink>
          açıklanmıştır.
        </p>

        <h3>Ücretsiz plan</h3>
        <p>
          Ücretsiz plan gerçekten ücretsizdir. Kredi kartı, deneme süresi
          yok. Aylık sınırlı sayıda dilekçe içerir.
        </p>

        <h3>Ücretli planlar</h3>
        <ul>
          <li>Ücretli planlar aylık veya yıllık olarak peşin tahsil edilir.</li>
          <li>Fiyatlar TL cinsindendir. Ülkenize göre yerel vergiler uygulanabilir.</li>
          <li>İstediğiniz zaman plan değişikliği yapabilir veya iptal edebilirsiniz.</li>
          <li>İptal ettiğinizde, bulunduğunuz dönemin sonuna kadar plan erişiminiz devam eder. Kısmi dönemler için geri ödeme yapılmaz.</li>
          <li>Yıllık planlar satın alımdan sonraki 14 gün içinde iade edilebilir. 14 gün sonrası iade edilmez.</li>
        </ul>
        <p>
          Fiyat ve limitler değişebilir. Değiştiğinde, yeni fiyatlar
          yalnızca yeni aboneliklere ve yenilemelere uygulanır; mevcut
          aboneliğiniz, bir sonraki yenilemeye kadar başlangıçtaki
          fiyatla devam eder.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="kullanim">4. YazbirDilekçe'yi nasıl kullanabilirsiniz</h2>
        <p>Yapabilecekleriniz:</p>
        <ul>
          <li>Kişisel dilekçe ihtiyaçlarınız için kullanmak.</li>
          <li>Hazırlanan dilekçeleri düzenlemek, kopyalamak ve PDF olarak indirmek.</li>
          <li>Verilerinizi istediğiniz zaman dışa aktarmak.</li>
        </ul>
        <p>Yapamayacaklarınız:</p>
        <ul>
          <li>YazbirDilekçe'yi yasalara veya başkalarının haklarına aykırı amaçlarla kullanmak.</li>
          <li>Hizmeti kötüye kullanmak, aşırı yüklemek veya tersine mühendislik uygulamak.</li>
          <li>Erişimi yeniden satmak veya alt lisanslamak (tek hesap, tek kişi içindir).</li>
          <li>Üretilen dilekçeleri rakip bir ürün oluşturmak için toplu olarak çekmek.</li>
          <li>Yasa dışı, taciz edici veya küçükleri tehlikeye atan içerik üretmek veya saklamak.</li>
          <li>Hizmeti, başkalarına ait kişisel veya gizli bilgileri rızası olmadan dilekçeye dökmek için kullanmak.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 id="icerik">5. İçeriğiniz</h2>
        <p>
          Form alanlarına girdiğiniz bilgiler ve hazırladığınız dilekçeler
          size aittir. YazbirDilekçe bu içerikler üzerinde mülkiyet
          iddiasında bulunmaz; yalnızca hizmetin çalışabilmesi için saklar.
        </p>
        <p>
          YazbirDilekçe'nin oluşturduğu dilekçeler üçüncü taraf bir yapay
          zekâ (Anthropic) tarafından üretilir. "Olduğu gibi" sunulur —
          genellikle iyi çalışırlar ama hatalı olabilirler. Kötü bir
          dilekçeyle karşılaşırsanız lütfen bana iletin.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="sonlandirma">6. Sonlandırma</h2>
        <p>
          Hesabınızı Ayarlar'dan istediğiniz zaman silebilirsiniz.
          Sildiğinizde verileriniz hemen yumuşak silinir ve 30 gün
          içinde kalıcı olarak imha edilir.
        </p>
        <p>
          Koşulları ihlal eden, hizmeti kötüye kullanan veya makul
          yeniden denemelere rağmen ödeme yapmayan hesapları askıya
          alabilir veya kapatabilirim. Mümkün olduğunda önce e-posta
          gönderirim; net kötüye kullanım durumlarında (spam, dolandırıcılık,
          hizmete saldırı) doğrudan müdahale ederim.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="sorumluluk-reddi">7. Sorumluluk reddi</h2>
        <p>
          YazbirDilekçe "olduğu gibi" ve "uygun olduğu kadarıyla" sunulur.
          İyi çalışması için elimden geleni yapsam da hatasız, güvenli
          ve %100 erişilebilir olacağını garanti edemem. Yapay zekâ
          tarafından üretilen dilekçeler hatalı olabilir; tıbbi, hukuki
          veya başka kritik kararlarda YazbirDilekçe'ye dayanmayın.
        </p>
        <p>
          Yasanın izin verdiği azami ölçüde, YazbirDilekçe satılabilirlik,
          belirli bir amaca uygunluk ve ihlal etmeme dahil tüm zımni
          garantileri reddeder.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="sorumluluk-sinirlamasi">8. Sorumluluk sınırlaması</h2>
        <p>
          Yasanın izin verdiği azami ölçüde, YazbirDilekçe'nin hizmetle
          ilgili herhangi bir talepteki toplam sorumluluğu, talebin doğduğu
          tarihten önceki 12 ay içinde ödediğiniz tutar ya da 1.000 TL'den
          hangisi yüksekse onunla sınırlıdır.
        </p>
        <p>
          YazbirDilekçe; veri kaybı, gelir kaybı veya yapay zekâ
          tarafından üretilen bir dilekçenin dolaylı sonuçları dahil
          olmak üzere dolaylı, arızi, sonuçsal veya cezai tazminatlardan
          sorumlu tutulamaz.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="degisiklikler">9. Bu koşullardaki değişiklikler</h2>
        <p>
          Bu koşulları esaslı olarak değiştirirsem, üstteki "Son güncelleme"
          tarihini günceller ve tüm aktif hesaplara e-posta gönderirim.
          Değişiklikten sonra hizmeti kullanmaya devam etmeniz, yeni
          koşulları kabul ettiğiniz anlamına gelir; kabul etmiyorsanız
          hesabınızı silebilirsiniz.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="hukuk">10. Geçerli hukuk</h2>
        <p>
          Bu koşullar Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklar,
          ülkenizdeki tüketici koruma yasası aksini gerektirmedikçe
          İstanbul mahkemelerinde çözümlenir.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="iletisim">11. İletişim</h2>
        <p>
          Koşullarla ilgili sorularınız için:
          <a href="mailto:gokhan@sylow.net">gokhan@sylow.net</a>.
        </p>
      </section>
    </article>

    <footer class="legal-foot">
      <NuxtLink to="/gizlilik" class="legal-foot-link">← Gizlilik Politikası</NuxtLink>
      <NuxtLink to="/" class="legal-foot-link">Ana Sayfa</NuxtLink>
    </footer>
  </main>
</template>

<style scoped>
.legal-main {
  max-width: 720px;
  margin: 0 auto;
  padding: 56px 32px 96px;
}

.legal-head {
  margin-bottom: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}
.legal-eyebrow { margin-bottom: 14px; }
.legal-title {
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 44px);
  line-height: 1.1;
  font-weight: 400;
  letter-spacing: -0.015em;
  color: var(--text);
}
.legal-stamp {
  margin: 14px 0 0;
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-3);
}

.legal-body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text);
}
.legal-lead {
  font-size: 17px;
  color: var(--text-2);
  margin: 0 0 36px;
}
.legal-section {
  margin-bottom: 36px;
  scroll-margin-top: 80px;
}
.legal-section h2 {
  margin: 0 0 14px;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 400;
  letter-spacing: -0.01em;
  color: var(--text);
  padding-bottom: 8px;
  border-bottom: 1px dashed var(--border);
}
.legal-section h3 {
  margin: 22px 0 8px;
  font-family: var(--font-sans);
  font-size: 14.5px;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: var(--text);
}
.legal-section p {
  margin: 0 0 14px;
}
.legal-section p:last-child { margin-bottom: 0; }
.legal-section ul {
  margin: 0 0 14px;
  padding-left: 20px;
}
.legal-section li {
  margin-bottom: 6px;
  color: var(--text-2);
}
.legal-section li strong { color: var(--text); font-weight: 600; }
.legal-section a {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
  transition: border-color 120ms;
}
.legal-section a:hover { border-bottom-color: var(--accent); }
.legal-section em { font-style: normal; color: var(--text); font-weight: 500; }

.legal-foot {
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.legal-foot-link {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-2);
  text-decoration: none;
  transition: color 120ms;
}
.legal-foot-link:hover { color: var(--text); }

@media (max-width: 600px) {
  .legal-main { padding: 36px 20px 64px; }
  .legal-body { font-size: 15px; }
  .legal-section h2 { font-size: 19px; }
}
</style>