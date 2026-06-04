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
  // Short Turkish notes the LLM emits when the user's aciklama is missing
  // a concrete fact the petition would need (address, order number, date,
  // …). Always an array; empty when nothing is missing. Rendered as an
  // amber notice above the document.
  eksikler: string[]
  // Short Turkish belge names the user should attach when sending the
  // petition (fatura, sözleşme, fotokopi…). Always an array; rendered as
  // an "Eklemeniz gerekenler" checklist below the document.
  ekler: string[]
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
  const { trDate } = useTrDate()

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
  // True when the LLM pass was skipped because the API was unreachable —
  // /sonuc reads this to surface a quiet banner explaining the body is raw.
  const aiSkipped = useState<boolean>('yd-ai-skipped', () => false)

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
    aiSkipped.value = false
    loading.value = true
    try {
      const res = await request<{ letter: Letter; generation_id: string }>(
        '/petitions/generate',
        { method: 'POST', body: { form: form.value } }
      )
      letter.value = res.letter
      generationId.value = res.generation_id ?? null
      recordHistory(res.letter)
      return res.letter
    } catch (e: unknown) {
      // If the request never reached a server (Rails down, offline, CORS),
      // fall back to a mechanically-formatted petition so the user can still
      // ship their words on paper. Real API errors (validation, quota, 5xx)
      // still surface in the errbar — only network-class failures degrade.
      if (isUnreachable(e)) {
        const fallback = buildFallbackLetter(form.value, trDate())
        letter.value = fallback
        generationId.value = null
        aiSkipped.value = true
        recordHistory(fallback)
        return fallback
      }
      error.value = formatApiError(e)
      return null
    } finally {
      loading.value = false
    }
  }

  function recordHistory(L: Letter) {
    const entry: HistoryEntry = {
      id: Date.now().toString(36),
      ts: Date.now(),
      kategori: form.value.kategori,
      konu: form.value.konu,
      letter: L
    }
    history.value = [entry, ...history.value].slice(0, 30)
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
    form, letter, history, loading, error, generationId, aiSkipped,
    set, reset, isReady,
    generate, openHistory, deleteHistory
  }
}

// Detect "the request never reached the backend" cases: Rails not running,
// CORS preflight failure, DNS, offline. $fetch surfaces these without an
// HTTP status since no response was ever received.
function isUnreachable(e: unknown): boolean {
  const err = e as { status?: number; statusCode?: number }
  return err.status == null && err.statusCode == null
}

// Format the user's form into a Letter shape without any LLM rewriting.
// Body becomes the user's own açıklama split on blank lines into paragraphs;
// closing defaults to the neutral form. Honest and usable, not polished.
function buildFallbackLetter(f: DilekceForm, tarih: string): Letter {
  const paragraflar = f.aciklama
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
  return {
    tarih,
    makam: (f.makam || '').toUpperCase(),
    birim: (f.birim || '').trim().toUpperCase(),
    konu: f.konu.trim(),
    paragraflar: paragraflar.length ? paragraflar : [f.aciklama.trim()],
    kapanis: 'Gereğini bilgilerinize arz ederim.',
    saygi: 'Saygılarımla,',
    adSoyad: f.adSoyad.trim(),
    ekBilgiler: (f.ekBilgiler || '')
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
    eksikler: [],
    ekler: []
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

  return data.message || 'Dilekçe oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.'
}
