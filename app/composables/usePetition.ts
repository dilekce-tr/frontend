// Owns the petition's form/letter/history state and the call to the backend.
// POSTs to `${apiBase}/petitions/generate` and persists the returned Letter
// to localStorage so /sonuc, /gecmis survive reloads.
import type { CategoryId } from './useCategories'

export interface DilekceForm {
  kategori: CategoryId
  makam: string
  birim: string
  konu: string
  aciklama: string
  adSoyad: string
  ekBilgiler: string
}

export interface Letter {
  tarih: string
  makam: string
  birim: string
  konu: string
  paragraflar: string[]
  kapanis: string
  saygi: string
  adSoyad: string
  ekBilgiler: string[]
}

export interface HistoryEntry {
  id: string
  ts: number
  kategori: CategoryId
  konu: string
  letter: Letter
}

const BLANK_FORM: DilekceForm = {
  kategori: 'belediye',
  makam: '',
  birim: '',
  konu: '',
  aciklama: '',
  adSoyad: '',
  ekBilgiler: ''
}

// Dev-only seed so /olustur is testable without retyping every reload.
// Stripped from production builds because `import.meta.dev` is a compile-time
// constant — the SAMPLE_FORM literal is dead code under `nuxt build`.
const SAMPLE_FORM: DilekceForm = {
  kategori: 'belediye',
  makam: 'İzmir Büyükşehir Belediyesi',
  birim: 'Fen İşleri Müdürlüğü',
  konu: 'Sokak lambasının arızası hakkında',
  aciklama:
    'Evimin önündeki sokak lambası iki haftadır yanmıyor. Akşamları sokak çok karanlık oluyor ve güvenli değil. Lambanın bir an önce tamir edilmesini istiyorum.',
  adSoyad: 'Ayşe Yılmaz',
  ekBilgiler: 'T.C. Kimlik No: 12345678901\nTelefon: 0555 555 55 55'
}

const LS = {
  get<T>(k: string, fb: T): T {
    if (typeof localStorage === 'undefined') return fb
    try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v) }
    catch (_) { return fb }
  },
  set(k: string, v: unknown) {
    if (typeof localStorage === 'undefined') return
    try { localStorage.setItem(k, JSON.stringify(v)) } catch (_) {}
  }
}

// Hydrate state from localStorage on the client. SSR returns blank state and
// the client plugin restores the saved values before paint.
function hydrate<T>(key: string, fallback: T): T {
  return import.meta.client ? LS.get(key, fallback) : fallback
}

// Shape of an error returned from the Rails API.
// `code` matches CLAUDE.md: 'monthly_limit_reached', validation codes, etc.
interface ApiError {
  code?: string
  message?: string
  errors?: Record<string, string[] | string>
  details?: { used?: number; limit?: number }
}

export function usePetition() {
  const { request } = useApi()

  const form    = useState<DilekceForm>('yd-form',    () => (
    import.meta.dev
      ? { ...hydrate('yd_form', {}), ...SAMPLE_FORM }
      : { ...BLANK_FORM, ...hydrate('yd_form', {}) }
  ))
  const letter  = useState<Letter | null>('yd-letter', () => hydrate<Letter | null>('yd_letter', null))
  const history = useState<HistoryEntry[]>('yd-history', () => hydrate<HistoryEntry[]>('yd_history', []))
  const loading = useState<boolean>('yd-loading', () => false)
  const error   = useState<string | null>('yd-error', () => null)
  const generationId = useState<string | null>('yd-gen-id', () => null)

  if (import.meta.client) {
    watch(form,    (v) => LS.set('yd_form', v),    { deep: true })
    watch(letter,  (v) => LS.set('yd_letter', v),  { deep: true })
    watch(history, (v) => LS.set('yd_history', v), { deep: true })
  }

  const set = <K extends keyof DilekceForm>(k: K, v: DilekceForm[K]) => {
    form.value = { ...form.value, [k]: v }
  }

  const reset = () => { form.value = { ...BLANK_FORM }; letter.value = null }

  const isReady = computed(() =>
    form.value.makam.trim().length > 0 &&
    form.value.konu.trim().length > 0 &&
    form.value.aciklama.trim().length > 8 &&
    form.value.adSoyad.trim().length > 0
  )

  async function generate(): Promise<Letter | null> {
    error.value = null
    loading.value = true
    try {
      const res = await request<{ letter: Letter; generation_id: string }>(
        '/petitions/generate',
        { method: 'POST', body: { form: form.value } }
      )
      letter.value = res.letter
      generationId.value = res.generation_id ?? null
      const entry: HistoryEntry = {
        id: Date.now().toString(36),
        ts: Date.now(),
        kategori: form.value.kategori,
        konu: form.value.konu,
        letter: res.letter
      }
      history.value = [entry, ...history.value].slice(0, 30)
      return res.letter
    } catch (e: unknown) {
      error.value = formatApiError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  const openHistory = (entry: HistoryEntry) => {
    letter.value = entry.letter
    form.value = {
      ...form.value,
      kategori: entry.kategori,
      konu: entry.konu,
      adSoyad: entry.letter.adSoyad
    }
  }

  const deleteHistory = (id: string) => {
    history.value = history.value.filter(x => x.id !== id)
  }

  return {
    form, letter, history, loading, error, generationId,
    set, reset, isReady,
    generate, openHistory, deleteHistory
  }
}

// Turn a $fetch error into a single Turkish sentence for the errbar.
// Handles the codes documented in CLAUDE.md (monthly_limit_reached, validation
// failures) plus network and unknown-server cases.
function formatApiError(e: unknown): string {
  const err = e as { status?: number; statusCode?: number; data?: ApiError; message?: string }
  const status = err.status ?? err.statusCode
  const data = err.data ?? {}

  if (status === 422) {
    const firstFieldError = data.errors && Object.values(data.errors).flat()[0]
    if (typeof firstFieldError === 'string' && firstFieldError.length > 0) {
      return firstFieldError
    }
    return 'Form alanlarında hata var. Lütfen kontrol edip tekrar deneyin.'
  }

  if (status === 429) {
    if (data.code === 'monthly_limit_reached') {
      const limit = data.details?.limit
      return limit
        ? `Aylık dilekçe sınırınıza ulaştınız (${limit}). Planınızı yükseltebilir veya bir sonraki ayı bekleyebilirsiniz.`
        : 'Aylık dilekçe sınırınıza ulaştınız. Planınızı yükseltebilirsiniz.'
    }
    return 'Günlük dilekçe sınırına ulaştınız. Lütfen daha sonra tekrar deneyin.'
  }

  if (status && status >= 500) {
    return 'Sunucu şu anda yanıt vermiyor. Lütfen birkaç dakika sonra tekrar deneyin.'
  }

  // No status means the fetch never reached the server (CORS, DNS, offline,
  // Rails not running). Distinguish from "server replied with error" so the
  // user knows to check their connection / backend.
  if (status == null) {
    return 'Sunucuya bağlanılamadı. Bağlantınızı veya servisin çalıştığını kontrol edin.'
  }

  return data.message || 'Dilekçe oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.'
}
