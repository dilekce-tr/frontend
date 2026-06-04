// Lazy-loaded Word (.docx) generator for the petition document.
//
// Why ship .docx alongside the PDF:
// - Turkish institutions still ask for editable files at the counter.
// - Internet cafes often want a .docx to open in LibreOffice or Word
//   before printing, especially when the user needs to add a stamp or
//   tweak a line in front of the clerk.
//
// We don't embed font binaries here the way usePdf does. .docx
// references fonts by name; the reader application substitutes from
// installed system fonts. Specifying "Cambria" (serif) and "Calibri"
// (sans) — both ubiquitous on Windows/macOS/Linux — gives a clean
// fallback chain that always renders Turkish characters correctly.
import type { Letter } from './usePetition'

export function useDocx() {
  async function download(letter: Letter, opts: { sans?: boolean; filename?: string } = {}) {
    // Tree-shake the library out of the initial bundle — it's ~400KB
    // gzipped and only matters when the user clicks "Word olarak indir".
    const docx = await import('docx')
    const {
      Document, Packer, Paragraph, TextRun, AlignmentType, HeightRule,
      BorderStyle, TabStopType
    } = docx

    const bodyFont = opts.sans ? 'Calibri' : 'Cambria'
    const headingFont = 'Calibri'

    const para = (
      text: string | (typeof TextRun)['prototype'][],
      o: {
        align?: 'left' | 'right' | 'center' | 'justify'
        spacingAfter?: number
        bold?: boolean
        font?: string
        size?: number
        color?: string
      } = {}
    ) => new Paragraph({
      alignment: ({
        left: AlignmentType.LEFT,
        right: AlignmentType.RIGHT,
        center: AlignmentType.CENTER,
        justify: AlignmentType.JUSTIFIED
      } as const)[o.align ?? 'left'],
      spacing: { after: o.spacingAfter ?? 200, line: 320 },
      children: typeof text === 'string'
        ? [new TextRun({
            text,
            bold: o.bold,
            font: o.font ?? bodyFont,
            size: o.size ?? 22, // half-points; 22 = 11pt
            color: o.color
          })]
        : text
    })

    const paragraphs: (typeof Paragraph)['prototype'][] = []

    // Date — right-aligned, muted, mono-ish (Calibri at 10pt is fine).
    paragraphs.push(para(letter.tarih, { align: 'right', size: 20, color: '555555', spacingAfter: 360 }))

    // Makam — uppercase address, bold, sans.
    paragraphs.push(para(letter.makam, {
      bold: true, font: headingFont, size: 22,
      spacingAfter: letter.birim ? 80 : 360
    }))

    if (letter.birim) {
      paragraphs.push(para(letter.birim, {
        font: headingFont, size: 20, color: '555555', spacingAfter: 360
      }))
    }

    if (letter.konu) {
      paragraphs.push(new Paragraph({
        spacing: { after: 280, line: 320 },
        children: [
          new TextRun({ text: 'Konu: ', bold: true, font: headingFont, size: 22 }),
          new TextRun({ text: letter.konu, font: bodyFont, size: 22 })
        ]
      }))
    }

    for (const p of letter.paragraflar) {
      paragraphs.push(para(p, { align: 'justify', spacingAfter: 220 }))
    }

    paragraphs.push(para(letter.kapanis, { spacingAfter: 480 }))
    paragraphs.push(para(letter.saygi, { align: 'right', spacingAfter: 360 }))

    // Signature underline — Word doesn't draw lines as canvas; the
    // cleanest cross-renderer trick is a right-aligned line of underscores
    // styled as bottom-border on an empty paragraph. We just use a short
    // run of figure spaces with a bottom border so it renders consistently.
    paragraphs.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { after: 60 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: '888888', space: 1 }
      },
      children: [new TextRun({ text: '                              ' })]
    }))
    paragraphs.push(para(letter.adSoyad, {
      align: 'right', font: headingFont, size: 22, spacingAfter: 80
    }))
    for (const line of (letter.ekBilgiler || [])) {
      paragraphs.push(para(line, {
        align: 'right', font: headingFont, size: 20, color: '555555', spacingAfter: 60
      }))
    }

    const doc = new Document({
      creator: 'YazbirDilekçe',
      title: letter.konu || 'Dilekçe',
      description: 'YazbirDilekçe ile oluşturulmuş resmî dilekçe',
      sections: [{
        properties: {
          page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } // 1 inch = 1440 twips
          }
        },
        children: paragraphs
      }]
    })

    const blob = await Packer.toBlob(doc)
    const filename = opts.filename
      ?? `dilekce-${(letter.konu || 'belge').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 40)}.docx`

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  return { download }
}
