// Owns the petition's form/letter/history state and the call to the backend.
// While the Rails backend is not yet wired, generate() returns a fixture
// response so the UI is fully testable end-to-end. Swap fetchLetter() to a
// real $fetch when the backend lands.
import type { CategoryId } from './useCategories'

export interface DilekceForm {
  kategori: CategoryId
  makam: string
  konu: string
  aciklama: string
  adSoyad: string
}

export interface Letter {
  tarih: string
  makam: string
  konu: string
  paragraflar: string[]
  kapanis: string
  saygi: string
  adSoyad: string
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
  konu: '',
  aciklama: '',
  adSoyad: ''
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

export function usePetition() {
  const { trDate } = useTrDate()

  const form    = useState<DilekceForm>('yd-form',    () => ({ ...BLANK_FORM, ...hydrate('yd_form', {}) }))
  const letter  = useState<Letter | null>('yd-letter', () => hydrate<Letter | null>('yd_letter', null))
  const history = useState<HistoryEntry[]>('yd-history', () => hydrate<HistoryEntry[]>('yd_history', []))
  const loading = useState<boolean>('yd-loading', () => false)
  const error   = useState<string | null>('yd-error', () => null)

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
      const L = await fetchLetter(form.value)
      letter.value = L
      const entry: HistoryEntry = {
        id: Date.now().toString(36),
        ts: Date.now(),
        kategori: form.value.kategori,
        konu: form.value.konu,
        letter: L
      }
      history.value = [entry, ...history.value].slice(0, 30)
      return L
    } catch (e: unknown) {
      error.value = 'Dilekçe oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.'
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

  // Replace with a $fetch to /api/v1/petitions/generate once the backend
  // exists. Kept local until then so the UI runs without a Rails server.
  async function fetchLetter(f: DilekceForm): Promise<Letter> {
    await new Promise((r) => setTimeout(r, 900))
    return {
      tarih: trDate(),
      makam: (f.makam || '').toUpperCase(),
      konu: f.konu,
      paragraflar: [
        `Şahsım adıma, ${f.aciklama.trim()} konusunda tarafınıza başvurmaktayım. Yaşadığım durum, gündelik hayatımı doğrudan etkilemekte olup ivedilikle çözüme kavuşturulmasını gerekli kılmaktadır.`,
        'Yukarıda arz ettiğim hususun değerlendirilmesini ve tarafıma yazılı olarak bilgi verilmesini saygıyla talep ederim.'
      ],
      kapanis: 'Gereğini bilgilerinize arz ederim.',
      saygi: 'Saygılarımla,',
      adSoyad: f.adSoyad
    }
  }

  return {
    form, letter, history, loading, error,
    set, reset, isReady,
    generate, openHistory, deleteHistory
  }
}
