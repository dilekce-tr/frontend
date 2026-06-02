// Lazy-loaded PDF generator for the petition document.
// Loads the same TTFs that render the screen (Space Grotesk + Instrument Serif)
// from /public/fonts at first use and injects them into pdfmake's VFS so
// Turkish characters (ş/ğ/ı/İ/ç/ö/ü) embed correctly.
import type { Content, Margins, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces'
import type { Letter } from './usePetition'

// pdfmake 0.3.x exposes the runtime VFS as a class instance on `virtualfs`
// (use writeFileSync to register fonts) and the font dictionary as `fonts`.
// The published @types don't cover either — widen the module type.
type PdfMakeRuntime = typeof import('pdfmake/build/pdfmake') & {
  virtualfs: { writeFileSync: (name: string, content: string, encoding: 'base64') => void }
  fonts: TFontDictionary
}

let pdfMake: PdfMakeRuntime | null = null
let fontsReady = false

const FONT_FILES: Array<[string, string]> = [
  ['SpaceGrotesk-Regular.ttf',    '/fonts/SpaceGrotesk-Regular.ttf'],
  ['SpaceGrotesk-Bold.ttf',       '/fonts/SpaceGrotesk-Bold.ttf'],
  ['InstrumentSerif-Regular.ttf', '/fonts/InstrumentSerif-Regular.ttf'],
  ['InstrumentSerif-Italic.ttf',  '/fonts/InstrumentSerif-Italic.ttf']
]

async function loadFontAsBase64(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Font fetch failed: ${url} (${res.status})`)
  const buf = await res.arrayBuffer()
  let bin = ''
  const bytes = new Uint8Array(buf)
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!)
  return btoa(bin)
}

async function ensurePdfmake() {
  if (pdfMake && fontsReady) return pdfMake
  const mod = await import('pdfmake/build/pdfmake')
  pdfMake = ((mod as { default?: unknown }).default ?? mod) as PdfMakeRuntime

  if (!fontsReady) {
    const entries = await Promise.all(
      FONT_FILES.map(async ([name, url]) => [name, await loadFontAsBase64(url)] as const)
    )

    for (const [name, b64] of entries) {
      pdfMake.virtualfs.writeFileSync(name, b64, 'base64')
    }
    pdfMake.fonts = {
      SpaceGrotesk: {
        normal: 'SpaceGrotesk-Regular.ttf',
        bold: 'SpaceGrotesk-Bold.ttf',
        italics: 'SpaceGrotesk-Regular.ttf',
        bolditalics: 'SpaceGrotesk-Bold.ttf'
      },
      InstrumentSerif: {
        normal: 'InstrumentSerif-Regular.ttf',
        bold: 'InstrumentSerif-Regular.ttf',
        italics: 'InstrumentSerif-Italic.ttf',
        bolditalics: 'InstrumentSerif-Italic.ttf'
      }
    }
    fontsReady = true
  }

  return pdfMake
}

export function usePdf() {
  function buildDoc(letter: Letter, opts: { sans?: boolean } = {}): TDocumentDefinitions {
    const bodyFont = opts.sans ? 'SpaceGrotesk' : 'InstrumentSerif'
    const m = (a: number, b: number, c: number, d: number): Margins => [a, b, c, d]

    const blocks: Content[] = [
      { text: letter.tarih, alignment: 'right', margin: m(0, 0, 0, 28), fontSize: 10, color: '#555' },
      { text: letter.makam, font: 'SpaceGrotesk', bold: true, characterSpacing: 0.5,
        margin: m(0, 0, 0, letter.birim ? 4 : 28) }
    ]
    if (letter.birim) {
      blocks.push({ text: letter.birim, font: 'SpaceGrotesk', characterSpacing: 0.5,
        color: '#555', fontSize: 10, margin: m(0, 0, 0, 28) })
    }
    if (letter.konu) {
      blocks.push({
        text: [{ text: 'Konu: ', bold: true, font: 'SpaceGrotesk' }, letter.konu],
        margin: m(0, 0, 0, 24)
      })
    }
    for (const p of letter.paragraflar) {
      blocks.push({ text: p, alignment: 'justify', margin: m(0, 0, 0, 14) })
    }
    blocks.push({ text: letter.kapanis, margin: m(0, 10, 0, 32) })
    blocks.push({ text: letter.saygi, alignment: 'right', margin: m(0, 0, 0, 28) })
    blocks.push({ canvas: [{ type: 'line', x1: 290, y1: 0, x2: 430, y2: 0, lineWidth: 0.5, lineColor: '#888' }] })
    blocks.push({ text: letter.adSoyad, alignment: 'right', font: 'SpaceGrotesk',
      fontSize: 11, margin: m(0, 4, 0, 0) })
    for (const line of (letter.ekBilgiler || [])) {
      blocks.push({ text: line, alignment: 'right', font: 'SpaceGrotesk',
        fontSize: 10, color: '#555', margin: m(0, 2, 0, 0) })
    }

    return {
      pageSize: 'A4',
      pageMargins: m(72, 80, 72, 80),
      defaultStyle: { font: bodyFont, fontSize: 11, lineHeight: 1.6, color: '#1a1a1a' },
      content: blocks
    }
  }

  async function download(letter: Letter, opts: { sans?: boolean; filename?: string } = {}) {
    const pm = await ensurePdfmake()
    const filename = (opts.filename
      ?? `dilekce-${(letter.konu || 'belge').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)}.pdf`)
    pm.createPdf(buildDoc(letter, opts)).download(filename)
  }

  return { download }
}
