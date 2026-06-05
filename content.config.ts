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
        // Optional everyday-Turkish source story for the example. When
        // present, the "Bu örneği özelleştir" CTA also pre-fills the form's
        // `aciklama` field so the user lands on a complete draft they can
        // edit, rather than typing from scratch.
        aciklama: z.string().optional(),
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
    }),
    // Informational guides — answer the "how/what/when" queries that pull
    // users in earlier than the template searches (e.g. "kira artış oranı
    // 2026 ne kadar"). The markdown body is the article; frontmatter carries
    // SEO meta, an optional FAQ (FAQPage JSON-LD), and an optional pointer to
    // a related örnek so each guide funnels toward the generator.
    rehber: defineCollection({
      source: 'rehber/**/*.md',
      type: 'page',
      schema: z.object({
        slug: z.string(),
        title: z.string(),           // H1
        description: z.string(),     // Meta description
        // Short eyebrow label (e.g. "Kira", "İş Hukuku") shown above the H1
        // and used to group guides on the index.
        topic: z.string(),
        // ISO date (YYYY-MM-DD) — rendered as "son güncelleme" and emitted
        // as dateModified in Article JSON-LD. Keeps time-sensitive guides
        // (rates, limits) visibly fresh.
        updated: z.string(),
        keywords: z.array(z.string()).optional(),
        // Optional related örnek — renders a CTA card linking into the
        // matching example (and from there, the generator).
        relatedOrnek: z.object({
          kategori: z.string(),
          slug: z.string(),
          label: z.string()
        }).optional(),
        faq: z.array(z.object({
          q: z.string(),
          a: z.string()
        })).optional()
      })
    })
  }
})
