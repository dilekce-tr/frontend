import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Each example dilekçe lives under content/ornekler/<kategori>/<slug>.md
// with typed frontmatter so pages can render without runtime checks.
//
// The body of the markdown is the SEO copy — intro, narrative, related
// notes. The Letter itself (the rendered petition) is structured data
// in frontmatter so we can render it through the same .doc styling
// the result page uses, and so we can pre-fill /olustur with the
// matching form values.

export default defineContentConfig({
  collections: {
    ornekler: defineCollection({
      source: 'ornekler/**/*.md',
      type: 'page',
      schema: z.object({
        // Routing + display
        kategori: z.enum(['is', 'kira', 'belediye', 'okul', 'tuketici', 'izin', 'itiraz', 'diger']),
        slug: z.string(),
        title: z.string(),         // H1 (e.g. "Kombi Arızası Dilekçe Örneği")
        konu: z.string(),          // Pre-filled into /olustur?konu=...
        // SEO
        description: z.string(),   // Meta description
        keywords: z.array(z.string()).optional(),
        // The petition shown on the page. Mirrors composables/usePetition.ts#Letter
        // but without a date — page renders today's date at request time.
        letter: z.object({
          makam: z.string(),
          birim: z.string().optional(),
          konu: z.string(),
          paragraflar: z.array(z.string()),
          kapanis: z.string(),
          saygi: z.string(),
          adSoyad: z.string(),
          ekBilgiler: z.array(z.string()).optional()
        }),
        // FAQ items — emit FAQPage JSON-LD + render below the document.
        faq: z.array(z.object({
          q: z.string(),
          a: z.string()
        })).optional()
      })
    })
  }
})
