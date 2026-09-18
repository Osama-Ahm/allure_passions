# Allure Passions UK

The website for Allure Passions UK, a practitioner-led aesthetic clinic in Fitzrovia, London.

This is the `3d` branch: the homepage rebuilt as one continuous 3D scroll story, in the manner of
oryzo.ai. Built with Next.js 15 (App Router), React 19, Tailwind CSS 3, three.js through React
Three Fiber and drei, GSAP (ScrollTrigger, SplitText) and Lenis. The Vite build of the full site
lives on `main` and `redesign`; its other routes are still to be ported here.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run dev:clean  # when .next gets into a bad state: clear it, then start dev
```

`http://localhost:3000/?stage=off` shows the page without the 3D stage, as a browser without WebGL
sees it.

## How the homepage works

Every word is ordinary server-rendered HTML, in eleven chapters. One transparent canvas is fixed
behind them, and each chapter's 3D model transforms into the next as you scroll: a serum bottle,
its drop, six concern droplets, a crystal for the technologies, the clinic's archway, the four
stones of the consultation plan, programme stacks, a gold medallion, a cream jar, and the archway
again at night. The plan, with every decision behind it, is `docs/LANDING_3D_PLAN.md`.

| Path | What lives there |
|---|---|
| `content/` | All copy and data: clinic details, concerns, treatments, pricing, programmes, products, credentials, FAQs. `content/story.ts` holds the homepage's own story copy. Edit the site's words here, not in components. |
| `components/chapters/` | The eleven chapters, each a `ChapterFrame` with a back layer (behind the canvas) and a front layer (in front of it). |
| `components/story/` | The frame, the page chrome (backdrop, progress rail), the scroll runtime and the heading reveals. |
| `components/stage/` | The 3D stage: `Director.tsx` (camera and timing), one scene per model in `scenes/`, the bottle, lighting, labels and quality settings. |
| `lib/story/` | The chapter list and the runtime that turns scroll into story position, page colour and focus. |
| `lib/scene/` | Pure scene helpers: when each transformation happens (`timeline.ts`), where each model lives (`layout.ts`), the dissolve, the crystal, the arch, the morphing lathe. |
| `lib/useSmoothScroll.ts` | The page's single loop: GSAP's ticker steps Lenis, then the story, then the canvas. |

## Things worth knowing before you change anything

- **The canvas sits between two layers.** Nothing on a chapter, or above it, may create a stacking
  context (transform, opacity, filter, will-change): see "Chapters" in `app/globals.css`.
- **Every shader compiles before the canvas is shown.** Hiding a model is done with `visible`,
  never by unmounting, and lights change intensity, never number, so nothing recompiles
  mid-scroll.
- **No booking engine.** Every call to action leads to a consultation request by WhatsApp, phone
  or email. The enquiry form composes a message; nothing is posted to a server.
- **Nothing claims what it cannot support.** No ratings appear until a live reviews provider is
  connected; no award artwork appears that the clinic has not supplied.
- **Prescription medicine is handled carefully.** Tretinoin is named only with its notice, never
  with a price, and no 3D model is ever presented as it (see the plan's compliance section).
- **Clinical facts are drafts.** Captions, durations, downtime and session counts await the
  clinic's confirmation.
