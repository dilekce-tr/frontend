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

    // Line height in twips (1/20 pt). 360 ≈ 1.5x of 11pt — relaxed body
    // reading. Section gaps below are done with empty paragraphs instead
    // of spacing.after, because Apple Pages doesn't honour `after`
    // reliably while Word and LibreOffice are flexible either way.
    const LINE_HEIGHT = 360

    const para = (
      text: string | (typeof TextRun)['prototype'][],
      o: {
        align?: 'left' | 'right' | 'center' | 'justify'
        spacingAfter?: number
        spacingBefore?: number
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
      spacing: {
        before: o.spacingBefore ?? 0,
        after: o.spacingAfter ?? PARA_GAP,
        line: LINE_HEIGHT
      },
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

    // Apple Pages collapses paragraph spacing.after in many cases — it
    // honours empty paragraphs but not always the `after` attribute on a
    // content paragraph. Word and LibreOffice respect `after` fine, but
    // we want one rendering that looks right everywhere. So we insert
    // real empty paragraphs between sections instead of relying on
    // spacing.after for the breaks.
    const blank = (n = 1) => {
      for (let i = 0; i < n; i++) {
        paragraphs.push(new Paragraph({
          spacing: { before: 0, after: 0, line: LINE_HEIGHT },
          children: [new TextRun({ text: '' })]
        }))
      }
    }

    // Date — right-aligned, muted.
    paragraphs.push(para(letter.tarih, {
      align: 'right', size: 20, color: '555555', spacingAfter: 0
    }))
    blank(2)

    // Makam — uppercase address, bold, sans. Birim immediately under it
    // when present so they read as one header block.
    paragraphs.push(para(letter.makam, {
      bold: true, font: headingFont, size: 22, spacingAfter: 0
    }))
    if (letter.birim) {
      paragraphs.push(para(letter.birim, {
        font: headingFont, size: 20, color: '555555', spacingAfter: 0
      }))
    }
    blank(2)

    // Konu — own section.
    if (letter.konu) {
      paragraphs.push(new Paragraph({
        spacing: { before: 0, after: 0, line: LINE_HEIGHT },
        children: [
          new TextRun({ text: 'Konu: ', bold: true, font: headingFont, size: 22 }),
          new TextRun({ text: letter.konu, font: bodyFont, size: 22 })
        ]
      }))
      blank(2)
    }

    // Body paragraphs — one blank between them, two blanks after the
    // last one to set kapanış apart.
    letter.paragraflar.forEach((p, idx) => {
      paragraphs.push(para(p, { align: 'justify', spacingAfter: 0 }))
      const isLast = idx === letter.paragraflar.length - 1
      blank(isLast ? 2 : 1)
    })

    paragraphs.push(para(letter.kapanis, { spacingAfter: 0 }))
    blank(2)

    paragraphs.push(para(letter.saygi, {
      align: 'right', spacingAfter: 0
    }))
    blank(2)

    // Signature underline — bottom-border paragraph. A blank line
    // immediately after gives the printed name room to sit cleanly.
    paragraphs.push(new Paragraph({
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 0, line: LINE_HEIGHT },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: '888888', space: 1 }
      },
      children: [new TextRun({ text: ' '.repeat(40) })]
    }))
    paragraphs.push(para(letter.adSoyad, {
      align: 'right', font: headingFont, size: 22, spacingAfter: 0
    }))
    for (const line of (letter.ekBilgiler || [])) {
      paragraphs.push(para(line, {
        align: 'right', font: headingFont, size: 20, color: '555555',
        spacingAfter: 0
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
