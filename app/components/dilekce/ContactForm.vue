<script setup lang="ts">
// Direct contact details are split and only assembled on user interaction
// so they aren't scrapable strings in the static bundle or initial DOM.
const revealed = ref(false)
const parts = computed(() => {
  const u = ['Z29raGFu', 'c3lsb3c=', 'bmV0'].map((s) => atob(s))
  const digits = [54, 54, 57, 50, 55, 55, 53, 53, 57, 52, 56]
    .map((c) => String.fromCharCode(c)).join('')
  return {
    email: `${u[0]}@${u[1]}.${u[2]}`,
    phone: `+${digits}`,
    wa: `https://wa.me/${digits}`
  }
})

const runtimeConfig = useRuntimeConfig()
const FORM_ENDPOINT = runtimeConfig.public.formsEndpoint as string
const MIN_NAME = 2
const MIN_MESSAGE = 20
const MIN_SECONDS_ON_PAGE = 3
const COOLDOWN_MS = 60_000           // 60s between sends
const HOURLY_CAP = 3                 // max 3 sends per hour from same browser
const STORAGE_KEY = 'yd-contact-state'
// Same shape as HTML5 input[type=email] validation.
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const form = reactive({ name: '', email: '', message: '', website: '' /* honeypot */ })
const touched = reactive({ name: false, email: false, message: false })
const submitAttempted = ref(false)
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMsg = ref('')
const mountedAt = Date.now()

type StoredState = { sentAt: number[]; lastHashes: string[] }
function readState(): StoredState {
  if (typeof localStorage === 'undefined') return { sentAt: [], lastHashes: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { sentAt: [], lastHashes: [] }
    const parsed = JSON.parse(raw) as StoredState
    return { sentAt: parsed.sentAt ?? [], lastHashes: parsed.lastHashes ?? [] }
  } catch {
    return { sentAt: [], lastHashes: [] }
  }
}
function writeState(s: StoredState) {
  if (typeof localStorage === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)) } catch { /* ignore */ }
}
// djb2 — enough to detect near-identical resends, not a security hash.
function hashMessage(s: string): string {
  let h = 5381
  const norm = s.toLowerCase().replace(/\s+/g, ' ').trim()
  for (let i = 0; i < norm.length; i++) h = ((h << 5) + h + norm.charCodeAt(i)) | 0
  return String(h)
}

const errors = computed(() => {
  const e: { name?: string; email?: string; message?: string } = {}
  if (form.name.trim().length < MIN_NAME) e.name = `Lütfen adınızı yazın (en az ${MIN_NAME} karakter).`
  if (!EMAIL_RE.test(form.email.trim())) e.email = 'Geçerli bir e-posta adresi girin.'
  if (form.message.trim().length < MIN_MESSAGE) e.message = `Biraz daha uzun yazın — yararlı bir yanıt için en az ${MIN_MESSAGE} karakter.`
  return e
})
const isValid = computed(() => Object.keys(errors.value).length === 0)
const showError = (field: 'name' | 'email' | 'message') =>
  (touched[field] || submitAttempted.value) && Boolean(errors.value[field])

function rateLimitReason(): string | null {
  const now = Date.now()
  const { sentAt } = readState()
  const recent = sentAt.filter((t) => now - t < 60 * 60 * 1000)
  if (recent.length >= HOURLY_CAP) return 'Birkaç mesajınız bana ulaştı — hepsini gördüm. En kısa sürede yanıt vereceğim.'
  const last = recent[recent.length - 1]
  if (last && now - last < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (now - last)) / 1000)
    return `Az önce mesaj gönderdiniz. Lütfen ${wait} saniye bekleyin.`
  }
  return null
}

async function submit() {
  submitAttempted.value = true
  if (status.value === 'submitting') return

  if (!isValid.value) return // inline errors will render

  // Honeypot: if a bot filled the hidden field, pretend success and bail.
  if (form.website.trim() !== '') {
    status.value = 'success'
    return
  }
  // Bots usually post within milliseconds.
  if (Date.now() - mountedAt < MIN_SECONDS_ON_PAGE * 1000) {
    errorMsg.value = 'Lütfen mesajınızı bir kez daha gözden geçirin.'
    status.value = 'error'
    return
  }

  const limited = rateLimitReason()
  if (limited) {
    errorMsg.value = limited
    status.value = 'error'
    return
  }

  // Near-duplicate guard: refuse to re-send the same message.
  const hash = hashMessage(`${form.email}|${form.message}`)
  const state = readState()
  if (state.lastHashes.includes(hash)) {
    errorMsg.value = 'Bu mesajı zaten göndermişsiniz. Aldım — tekrar göndermenize gerek yok.'
    status.value = 'error'
    return
  }

  status.value = 'submitting'
  errorMsg.value = ''
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      })
    })
    if (res.ok) {
      const now = Date.now()
      const next: StoredState = {
        sentAt: [...state.sentAt.filter((t) => now - t < 60 * 60 * 1000), now],
        lastHashes: [...state.lastHashes, hash].slice(-5)
      }
      writeState(next)
      status.value = 'success'
      form.name = ''
      form.email = ''
      form.message = ''
      touched.name = touched.email = touched.message = false
      submitAttempted.value = false
      return
    }
    const data = await res.json().catch(() => null)
    errorMsg.value = data?.error?.message || 'Bir şeyler ters gitti. Lütfen doğrudan e-posta gönderin.'
    status.value = 'error'
  } catch {
    errorMsg.value = 'Bağlantı hatası. Lütfen doğrudan e-posta gönderin.'
    status.value = 'error'
  }
}
</script>

<template>
  <div class="contact-wrap">
    <div class="contact-card">
      <form v-if="status !== 'success'" class="contact-form" novalidate @submit.prevent="submit">
        <div class="contact-field-row">
          <label class="contact-field">
            <span class="contact-label">Adınız</span>
            <input
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              maxlength="100"
              required
              class="wordy-input"
              :disabled="status === 'submitting'"
              :aria-invalid="showError('name') || undefined"
              placeholder="Ad Soyad"
              @blur="touched.name = true"
            >
            <span v-if="showError('name')" class="contact-field-error">{{ errors.name }}</span>
          </label>
          <label class="contact-field">
            <span class="contact-label">E-posta</span>
            <input
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              maxlength="200"
              required
              class="wordy-input"
              :disabled="status === 'submitting'"
              :aria-invalid="showError('email') || undefined"
              placeholder="siz@example.com"
              @blur="touched.email = true"
            >
            <span v-if="showError('email')" class="contact-field-error">{{ errors.email }}</span>
          </label>
        </div>

        <label class="contact-field">
          <span class="contact-label">Mesajınız</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="6"
            maxlength="4000"
            required
            class="wordy-textarea"
            :disabled="status === 'submitting'"
            :aria-invalid="showError('message') || undefined"
            placeholder="Bir hata mı buldunuz, bir özellik mi öneriyorsunuz, yoksa sadece selam mı? Hepsi okunur."
            @blur="touched.message = true"
          />
          <span v-if="showError('message')" class="contact-field-error">{{ errors.message }}</span>
        </label>

        <!-- Honeypot — invisible to humans, irresistible to naive bots. -->
        <div class="contact-honeypot" aria-hidden="true">
          <label>
            Website
            <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off">
          </label>
        </div>

        <div class="contact-actions">
          <button
            type="submit"
            class="gen-submit"
            :disabled="status === 'submitting' || (submitAttempted && !isValid)"
          >
            <DilekceIcon name="check" :size="16" :sw="2" />
            <span>{{ status === 'submitting' ? 'Gönderiliyor…' : 'Mesajı gönder' }}</span>
          </button>
          <span class="contact-hint">Genelde bir iş günü içinde yanıtlanır.</span>
        </div>

        <p v-if="status === 'error'" class="contact-form-error" role="alert">{{ errorMsg }}</p>
      </form>

      <div v-else class="contact-success" role="status">
        <DilekceIcon name="check" :size="18" :sw="2" />
        <span><em>Aldım.</em> Bir iş günü içinde size döneceğim.</span>
      </div>

      <div class="contact-divider"><span>veya bana doğrudan ulaşın</span></div>

      <div v-if="!revealed" class="contact-actions">
        <button
          type="button"
          class="act-btn"
          @click="revealed = true"
        >
          İletişim bilgilerini göster
        </button>
      </div>
      <div v-else class="contact-direct">
        <p class="contact-mono">
          <a :href="`mailto:${parts.email}`">{{ parts.email }}</a>
          <span class="contact-mono-sep" aria-hidden="true">·</span>
          <a :href="parts.wa" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <span class="contact-mono-sep" aria-hidden="true">·</span>
          <a :href="`tel:${parts.phone}`">{{ parts.phone }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-wrap { width: 100%; }
.contact-card {
  display: grid;
  gap: 20px;
}

.contact-form { display: grid; gap: 18px; }

.contact-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media (max-width: 600px) {
  .contact-field-row { grid-template-columns: 1fr; }
}

.contact-field { display: grid; gap: 6px; }
.contact-label {
  font-family: var(--font-sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-2);
}
.contact-field-error {
  font-size: 12.5px;
  color: var(--danger);
  line-height: 1.45;
  margin-top: 2px;
}

.contact-honeypot {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.contact-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.contact-hint {
  font-family: var(--font-mono);
  font-size: 11.5px;
  letter-spacing: 0.02em;
  color: var(--text-3);
}

.contact-form-error {
  margin: 0;
  padding: 10px 14px;
  background: var(--danger-soft);
  color: var(--danger);
  border: 1px solid color-mix(in srgb, var(--danger) 28%, transparent);
  border-radius: var(--r-md);
  font-size: 13.5px;
  line-height: 1.5;
}

.contact-success {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  background: var(--accent-soft);
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
  border-radius: var(--r-lg);
  font-size: 15px;
}
.contact-success em { color: var(--accent); font-style: italic; font-weight: 600; }

.contact-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-3);
}
.contact-divider::before,
.contact-divider::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--border);
}

.contact-direct { display: grid; gap: 6px; }
.contact-mono {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-2);
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.contact-mono a {
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 120ms;
}
.contact-mono a:hover { border-bottom-color: var(--text); }
.contact-mono-sep { color: var(--text-3); }
</style>
