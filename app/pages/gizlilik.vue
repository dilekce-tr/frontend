<script setup lang="ts">
useHead({ title: 'Gizlilik · YazbirDilekçe' })

const LAST_UPDATED = '3 Haziran 2026'
</script>

<template>
  <main class="legal-main">
    <header class="legal-head">
      <div class="label-mono legal-eyebrow">Yasal</div>
      <h1 class="legal-title">Gizlilik Politikası</h1>
      <p class="legal-stamp">Son güncelleme · {{ LAST_UPDATED }}</p>
    </header>

    <article class="legal-body">
      <p class="legal-lead">
        YazbirDilekçe, tek başına geliştirip işlettiğim bir dilekçe yazma
        aracıdır. Bu sayfa, YazbirDilekçe'nin hangi verileri topladığını,
        bu verileri nasıl kullandığını ve sizin hangi haklara sahip
        olduğunuzu açıklar. Hukuki dil yerine, beş dakikada okunabilecek
        şekilde yazılmıştır.
      </p>

      <section class="legal-section">
        <h2 id="kim">1. YazbirDilekçe'yi kim işletiyor</h2>
        <p>
          YazbirDilekçe, bağımsız bir geliştirici olan Gökhan Arlı
          tarafından işletilmektedir. İletişim:
          <a href="mailto:gokhan@sylow.net">gokhan@sylow.net</a>.
        </p>
        <p>
          Bir şirket, ajans ya da ekip yoktur. Kimseyle paylaşılan ortak
          bir veritabanı yoktur. YazbirDilekçe ile paylaştığınız her şey
          yalnızca bende kalır.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="ne">2. YazbirDilekçe hangi verileri toplar</h2>

        <h3>Kayıt olduğunuzda</h3>
        <ul>
          <li><strong>E-posta adresi</strong> — giriş yapmanız ve işlemsel e-posta göndermek için (doğrulama, şifre sıfırlama).</li>
          <li><strong>İsim</strong> — arayüzde gösterilir; istediğiniz zaman değiştirebilirsiniz.</li>
          <li><strong>Şifre</strong> — tek yönlü bcrypt özetiyle saklanır. Şifrenizi göremem ve kurtaramam.</li>
        </ul>

        <h3>YazbirDilekçe'yi kullandığınızda</h3>
        <ul>
          <li><strong>Yazdığınız dilekçeler</strong> — geçmişinizde saklanır. Sonradan görüntüleyebilmeniz, düzenleyebilmeniz ve indirebilmeniz için.</li>
          <li><strong>Form girdileri</strong> — seçtiğiniz kategori, hitap edilen makam, konu, açıklama ve ad soyad alanları. Yapay zekânın dilekçeyi hazırlaması için gereklidir.</li>
          <li><strong>Tercihler</strong> — tema seçimi, e-posta tercihleri.</li>
          <li><strong>Abonelik durumu</strong> — hangi planı kullandığınız. Stripe ile ödeme alındığında, ödeme verisi (kart son 4 hanesi, ülke) yalnızca Stripe'te tutulur, YazbirDilekçe'de değil.</li>
        </ul>

        <h3>Otomatik olarak</h3>
        <ul>
          <li><strong>Sunucu logları</strong> — IP adresi, tarayıcı bilgisi, istek yolları ve yanıt kodları. Hata ayıklama ve kötüye kullanım önleme için 30 gün saklanır.</li>
          <li><strong>Oturum bilgisi</strong> — giriş yaptığınızda, her ziyarette tekrar giriş yapmamanız için JWT oturum belirteci tarayıcınızın localStorage'ına yazılır.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 id="degil">3. YazbirDilekçe'nin <em>toplamadığı</em> şeyler</h2>
        <ul>
          <li>Takip çerezi yok. Google Analytics yok. Facebook Pixel yok.</li>
          <li>Reklam kimliği yok. YazbirDilekçe reklam göstermez.</li>
          <li>IP'nizden çıkarılabilecek kabaca konumdan başka konum verisi yok.</li>
          <li>Mikrofon, kamera veya rehber erişimi yok.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 id="neden">4. Verileriniz nasıl kullanılır</h2>
        <ul>
          <li>Hizmeti sağlamak için: giriş, dilekçe hazırlama, geçmiş gösterimi, PDF indirimi.</li>
          <li>İşlemsel e-posta göndermek için (doğrulama, şifre sıfırlama, güvenlik bildirimleri). Ürün e-postalarından ayarlardan çıkabilirsiniz; işlemsel e-postalar hesabın çalışması için zorunludur.</li>
          <li>Plan limitlerini uygulamak ve kötüye kullanımı önlemek için (oran sınırlama, sahtekârlık tespiti).</li>
          <li>Hataları gidermek ve ürünü iyileştirmek için. Hatalar, kişisel veri eklenmeden bir izleme servisine (Sentry) iletilir.</li>
        </ul>
        <p>
          Dilekçeleriniz ve hesap verileriniz <strong>asla</strong> satılmaz,
          kiralanmaz veya reklamcılarla paylaşılmaz. YazbirDilekçe sizin
          verinizi başka kimsenin yapay zekâ modelini eğitmek için kullanmaz.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="ucuncu-taraf">5. YazbirDilekçe'nin kullandığı üçüncü taraf hizmetler</h2>
        <p>
          YazbirDilekçe küçük bir güvenilir tedarikçi yığını üzerinde çalışır.
          Her biri yalnızca işini yapması için gereken minimum veriyi alır.
        </p>
        <ul>
          <li>
            <strong><a href="https://anthropic.com/legal" target="_blank" rel="noopener noreferrer">Anthropic</a></strong>
            — dilekçeleri yazan yapay zekâyı sağlar. Yalnızca form alanlarınızı
            (kategori, makam, konu, açıklama, ad soyad) alır. Hesap bilgilerinizi
            almaz. Anthropic'in API koşulları, girdileri model eğitimi için
            kullanmayı yasaklar.
          </li>
          <li>
            <strong><a href="https://www.digitalocean.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">DigitalOcean</a></strong>
            — veritabanını ve uygulama sunucusunu barındırır. Tüm veriler şifreli olarak saklanır.
          </li>
          <li>
            <strong><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel</a></strong>
            — web sitesini barındırır. HTML, CSS ve JavaScript dosyalarını size sunar.
          </li>
          <li>
            <strong><a href="https://aws.amazon.com/privacy" target="_blank" rel="noopener noreferrer">Amazon SES</a></strong>
            — işlemsel e-postaları gönderir. E-posta adresinizi ve e-posta içeriğini alır.
          </li>
          <li>
            <strong><a href="https://sentry.io/privacy" target="_blank" rel="noopener noreferrer">Sentry</a></strong>
            — hata raporlarını toplar. Hassas parametreler (şifre, belirteç) temizlenmiş halde alır. Anonim bir kullanıcı kimliğiyle etiketlenir, isim ve e-posta ile değil.
          </li>
          <li>
            <strong>Stripe</strong> (ödeme aktif olduğunda) — ödemeleri işler.
            Yalnızca Stripe'in formuna doğrudan girdiğiniz ödeme bilgilerini alır.
            YazbirDilekçe kart numaranızı asla görmez.
          </li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 id="haklar">6. Haklarınız</h2>
        <p>
          KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <ul>
          <li><strong>Erişim</strong> — verilerinizin bir kopyasını Ayarlar'daki <em>Dışa Aktar</em> düğmesinden ya da e-postayla isteyebilirsiniz.</li>
          <li><strong>Düzeltme</strong> — isim ve tercihlerinizi doğrudan Ayarlar'dan düzeltebilirsiniz.</li>
          <li><strong>Silme</strong> — hesabınızı ve tüm verilerinizi Ayarlar'daki <em>Hesabı Sil</em> düğmesinden veya e-postayla silebilirsiniz.</li>
          <li><strong>İtiraz</strong> — verilerinizin belirli kullanımlarına itiraz edebilirsiniz. 30 gün içinde yanıtlarım.</li>
          <li><strong>Şikâyet</strong> — makul bir talebe yanıt vermezsem, yerel veri koruma kurumuna (Türkiye'de KVKK Kurumu) şikâyette bulunabilirsiniz.</li>
        </ul>
        <p>
          Hesabınızı sildiğinizde verileriniz hemen yumuşak silinir
          (size veya başkasına erişilebilir değildir) ve 30 gün içinde
          kalıcı olarak imha edilir. Yedeklemeler 30 gün içinde döndüğü
          için silme işlemi bu sürede tam olarak uygulanır.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="saklama">7. Veriler ne kadar süre saklanır</h2>
        <ul>
          <li><strong>Hesap verisi</strong> — hesabınızı silene kadar.</li>
          <li><strong>Dilekçeler</strong> — siz silene veya hesabınızı silene kadar.</li>
          <li><strong>Sunucu logları</strong> — 30 gün.</li>
          <li><strong>Yumuşak silinmiş hesaplar</strong> — 30 gün sonra kalıcı olarak silinir.</li>
          <li><strong>Yedeklemeler</strong> — 30 gün içinde döndürülür.</li>
        </ul>
      </section>

      <section class="legal-section">
        <h2 id="guvenlik">8. Güvenlik</h2>
        <p>
          YazbirDilekçe standart üretim uygulamalarını kullanır: yalnızca
          HTTPS (TLS 1.2+), bcrypt ile şifre özetleme, JWT oturum belirteçleri,
          içerik güvenlik politikası başlıkları ve brute-force saldırılara
          karşı oran sınırlayıcı. Veritabanı yedeklemeleri şifreli saklanır.
        </p>
        <p>
          Yine de hiçbir hizmet tamamen güvenli değildir. Bir veri ihlali
          yaşanırsa, etkilenen kullanıcılara fark ettikten sonraki 72 saat
          içinde e-posta ile bildirim gönderirim.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="cocuklar">9. Çocuklar</h2>
        <p>
          YazbirDilekçe 13 yaş altı çocuklara yönelik değildir. 13 yaş altı
          bir çocuğun hesap oluşturduğunu fark ederseniz lütfen bana e-posta
          gönderin, hesabı silerim.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="degisiklikler">10. Bu politikadaki değişiklikler</h2>
        <p>
          Esaslı bir değişiklik yaparsam, üstteki "Son güncelleme" tarihini
          güncellerim ve aktif hesabı olan herkese e-posta gönderirim.
          Önemsiz düzeltmeler (yazım hataları, kırık bağlantılar) bildirim
          tetiklemez.
        </p>
      </section>

      <section class="legal-section">
        <h2 id="iletisim">11. İletişim</h2>
        <p>
          Soru, silme talebi veya başka her şey için:
          <a href="mailto:gokhan@sylow.net">gokhan@sylow.net</a>.
          Her mesajı bizzat okurum.
        </p>
      </section>
    </article>

    <footer class="legal-foot">
      <NuxtLink to="/kosullar" class="legal-foot-link">Kullanım Koşulları →</NuxtLink>
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