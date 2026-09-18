# Landing page rebuild: one continuous 3D story (oryzo.ai-style)

> **Revised 18 September 2026, after M1.** The single-object concept became a *transformation chain*:
> every chapter has its own 3D model, and each model transforms into the next. The skin-layer slab and
> its diagram are dropped. Sections marked (revised) replace the first version of this plan.

## Context

You want the homepage to feel as smooth and clean as oryzo.ai. The 3D experience on `3d` is a walk down a
hallway: ten `<Html>` wall panels, 10 point lights, a reflective floor and triple-smoothed scroll. An
untracked "office tour" goes further in the same direction. Both read as a game level rather than a calm
piece of product storytelling. In 3D mode they also drop the footer and break the header anchors and the
skip link.

I captured oryzo.ai frame by frame (90 frames, 56,700 px of scroll). It works for five reasons:

1. **One object carries the whole page.** The cork coaster sits in a fixed full-screen canvas behind
   ordinary HTML. Every section re-stages it: turned, flipped, held, placed on a desk, filmed in macro, and
   finally turned into the "O" of the logo. Continuity is what makes it feel calm.
2. **Each section is a shot, not a room.** Camera, light and backdrop change around the object, and
   transitions are moves of the object, not cuts.
3. **Type-led layouts.** There are giant words with the object passing in front of them, small copy in
   the corners, lots of empty space and one accent colour.
4. **A light/dark rhythm.** Mostly dark, with one cream section for relief.
5. **Crisp scroll.** Native scroll with light smoothing, a right-edge progress rail, a "Scroll to
   continue" cue, an anchor nav, and preloader lines that turn into the 3D object.

We borrow the method, not the content: no photo galleries, since the client rejected heavy imagery.

**Your decisions so far:**
- The office walkthrough can go. The objects should feel like a skincare clinic.
- The rhythm is **light with dark chapters**.
- *(After M1)* No layer diagram, and no graphic repeated between Concerns and Technologies.
- 3D is present in **every** chapter, the animation never stops, and each chapter's model **transforms
  into** the next. Concerns is carried by six droplets.

**One client requirement changes.** `client_requirements.txt` §1 asks for "an animated walkthrough or
video showing the clinic experience". The 3D walkthrough is dropped. That requirement is now met by the
real clinic video (`/assets/videos/hero-clinic.mp4`), shown as a hero card that opens a full-screen
player. §11.1 already asks the client for a wider, calmer clip.

---

## The concept (revised)

### Every chapter has a model, and every model becomes the next

Oryzo is calm because nothing ever cuts: whatever is on screen always carries into the next scene. We keep
that rule strictly. Each chapter has its own 3D model, all from one material family (clear glass with a
warm tint, champagne gold, pale stone, soft studio light), and each one **transforms** into the next
chapter's model as you scroll. The camera travels one continuous path and never cuts.

| # | Chapter | Model | Transformation into the next chapter |
|---|---|---|---|
| 1 | Hero | **Serum bottle** on a stone plinth (built in M1) | The bottle turns and the dropper lifts |
| 2 | Surface | The dropper lifts clear; a drop swells at the pipette and falls | The camera follows the drop down |
| 3 | Concerns | The drop lands and splits into **six droplets**, one per concern group, in a shallow arc. Each has its own interior (gold flecks for pigmentation, a warm core for wellness). The one for the group you are reading lifts and brightens. | The six rise and flow together into one |
| 4 | Technologies (night) | The merged drop **freezes into a faceted crystal**. Each technology is a different light or energy through it: fine pulses, two coloured beams, a grid of gold points, converging rings, field loops, green sweeps. | The crystal fractures along its facets |
| 5 | Clinic (dawn) | The facets fly out and assemble into a **pale stone archway**, the clinic's door, with sunlight through it and the giant words either side | The arch's stones lower and roll out flat |
| 6 | Consultation | Seen from above: the stones settle as **four stones on a gold circle**, one per plan step, lighting in turn | The stones round into discs and stack |
| 7 | Programmes | A **stack of discs** (stone, glass, gold); each programme shows its own stack | The stack presses into one gold disc |
| 8 | Trust | A **gold medallion** with the monogram, a slow light sweeping it | It turns and settles as a lid |
| 9 | At home | A **cream jar** grows beneath the lid; the bottle returns beside it | The pair moves to the margin |
| 10 | FAQ | The jar and bottle at rest in the margin beside the questions, slowly turning | Both dissolve into light |
| 11 | Visit (night) | The light draws the **archway again, at night**, with a warm lit doorway | End of page |

The bottle is never labelled as a product it is not, and the jar is never presented as Tretinoin.

### How the transformations are made

- **Everything that can be is a lathe.** Bottle, drop, droplets, stones, discs, medallion and jar are all
  turned from profiles. Two profiles with the same number of points morph into each other with no seam,
  so stone to disc, disc stack to medallion and medallion to lid are each a single morph.
- **Liquid moments are metaballs.** The drop splitting into six, and the six flowing back into one, use
  marching-cubes metaballs, which merge and part like real liquid.
- **The crystal is a lathe with few sides** (a faceted gem), and it fractures by flying its own faces
  apart, which then settle into the arch's stones.
- **A signature dissolve for everything else.** Where two shapes cannot morph, the outgoing one dissolves
  through noise with a thin champagne-gold edge while the incoming one resolves. That edge is part of the
  brand, not a cross-fade.
- **Never more than two models on screen**, all compiled before the page is shown, so no chapter boundary
  ever stutters.

### Annotations

Wherever a model has something to explain (the six droplets' groups, the four plan steps, a programme's
layers), it is labelled with gold hairline leaders projected from the 3D, set in the page's serif and
small caps. The labels are real HTML, so they are read by screen readers and search engines.

---

## Chapter-by-chapter choreography (revised)

Desktop lengths total about 17 screens; mobile runs about 20% shorter. Every chapter has 3D on screen.

| # | Chapter (nav) | Length | Page | Camera | 3D |
|---|---|---|---|---|---|
| 1 | Hero | 100vh | alabaster | Three-quarter product shot, ~24° lens | Bottle in the right third, idle float, pointer tilt |
| 2 | Surface | 140vh sticky | alabaster → pearl | Pulls back to centre, then tilts down with the drop | Turn, dropper lifts, drop forms and falls |
| 3 | Concerns | ~200vh | pearl | Low, then glides along the arc of droplets | Split into six; the active group's droplet lifts |
| 4 | Technologies | 60 + 6×50vh | **night** | Slow orbit round the crystal | Merge and freeze; one energy per technology |
| 5 | Clinic | 160vh | dawn → alabaster | Eye level, facing the arch | Fracture, then the arch assembles; sunlight through it |
| 6 | Consultation | 130vh | alabaster | Rises to look straight down | Arch lies flat into four stones on a circle |
| 7 | Programmes | ~110vh | pearl | Three-quarter, close | Stones to discs to per-programme stacks |
| 8 | Trust | 140vh | stone | Eye level, slow orbit | Stack to gold medallion; light sweep |
| 9 | At home | 120vh | alabaster | Three-quarter, warm | Medallion to jar lid, jar grows; bottle returns |
| 10 | FAQ | flow | alabaster | Still, from the side | The pair at rest in the left margin |
| 11 | Visit + footer | ~150vh | **night** | Low, slow push-in | Dissolve into light, then the archway at night |

The hero and surface chapters are built (M1). The other chapters' copy and layout from M0 stand; their
line-drawing fallbacks are replaced by each chapter's model, and the layer diagram is removed.

---

## Architecture

### Layering (how the object passes in front of giant DOM words)

These layers are listed from the back of the page to the front:

1. **Backdrop** (z −1): a fixed `div`. The page colour is set on this div, and only when the 8-bit
   colour actually changes. It is not a CSS variable on `<body>`, which would re-check styles for the
   whole page every frame.
2. **The back layer of each chapter** (z 0): giant words.
3. **Canvas** (z 1): fixed, transparent (`alpha: true`), `pointer-events: none`, `height: 100lvh`, and
   rendered as a sibling of `<main>`.
4. **The front layer of each chapter** (z 2): readable copy and controls.

- **The two layers are sibling sticky elements.** `ChapterFrame` is a CSS grid, and the back and front
  layers share one cell (`grid-area: 1/1`), each with `sticky; top: 0; height: 100svh`.
- **Why not one sticky stage.** `position: sticky` creates a stacking context, so a single sticky stage
  would trap both layers on one side of the canvas.
- **Nothing on section roots, or their ancestors, may create a stacking context.** That rules out
  transform, opacity below 1, filter, will-change, contain and isolation. Use `overflow-x: clip`, not
  `hidden`.
- **Remove** the `bg-sanctuary-alabaster` and `z-20` wrappers from `app/page.tsx`.
- **The DOM is complete on its own.** Every word is server-rendered, so search engines, the no-WebGL
  path and screen readers get the full page. The canvas only adds to it.

### Scroll and timing

- **One animation loop owns everything.** It runs in the GSAP ticker: `lenis.raf` →
  `ScrollTrigger.update` → R3F `advance(time)`, with the Canvas set to `frameloop="never"`. This removes
  the frame lag between the DOM and the canvas. Pausing the canvas means skipping `advance`, clearing it
  once, and setting `visibility: hidden`.
- **Lenis on desktop only.** It smooths the mouse wheel on desktop. Touch keeps native momentum, and
  reduced motion turns Lenis off. The Lenis instance is shared through a singleton with `anchors: true`.
- **Chapters use native sticky, not ScrollTrigger pins.** ScrollTrigger only measures. A single story
  position, **`u`**, maps scroll to story. It is rebuilt on every ScrollTrigger refresh from each
  `[data-chapter]` section's offset and height, so normal-scroll chapters become hold segments.
- **Only `u` is smoothed.** It is damped at about 0.12 s on desktop and 0.25 s on touch, and every
  channel samples the damped value. This replaces today's three layers of smoothing. `u` starts at the
  current scroll position, so a restored scroll doesn't fly in from the top.
- **Text reveals trigger from the section or from `u`**, never from elements inside sticky layers. Those
  elements report their unstuck position, so reveals would fire at the wrong time.

### The choreography engine (`lib/story/`, pure TypeScript)

- **Named poses** (`poses.ts`): hero, turned, dropFormed, surface, cutFace, techBase, dawn, welcome,
  flatLay, trust, atHome, finale. Each chapter starts from the pose the previous chapter ends on, so
  continuity is built in. A development-time check asserts this.
- **Each chapter is defined in `chapters.ts`**, as data:
  - id, nav label, light or dark theme, and page colour
  - sparse keys, each a pose reference plus overrides at a local progress
  - mobile overrides
- **Keys are compiled once into per-channel tracks** (`tracks.ts`):
  - camera position plus a quaternion built from an explicit up-vector, so the top-down shot has no
    `lookAt` flip
  - bottle position, rotation and scale; pipette lift; drop
  - per-chapter model morph and dissolve amounts, and which droplet or stone is lit
  - effect id, intensity and phase
  - light levels, plinth and surface
  - Channels are sampled with slerp and easing.
- **Screen-space anchors** (`anchor.ts`) place the bottle by viewport position (for example "right
  third"). They are resolved against each key's own camera at compile time and on resize, never against
  the live damped camera, which would glue the object to the screen and kill the parallax. This is how
  one table serves every aspect ratio.
- **`Director.tsx`** is the only per-frame writer. It samples the tracks at `u`, adds pointer parallax,
  writes the object refs, and positions the DOM labels projected from 3D anchors through
  `style.transform`. React state changes only at chapter boundaries (active chapter, theme).

### Rendering

- **Glass.**
  - A single drei `MeshTransmissionMaterial` on the outer glass only: high tier at resolution 512 with 6
    samples, medium at 256 with 4 samples and no backside.
  - Its `background` is set to one `THREE.Color` that is copied from the page colour each frame. Without
    it, the transparent canvas turns the glass dark.
  - It is hidden with `material.visible = false`, never unmounted, because remounting forces a shader
    recompile.
  - The low tier uses a fake Fresnel glass shader. We skip three's built-in physical transmission: on a
    transparent canvas it clears to grey.
- **Tone mapping.** Neutral or none, decided in look-dev with a pixel diff of the background seen
  through the glass. Neutral greys the alabaster a little.
- **Lights.** A fixed rig: an `<Environment>` of Lightformers baked once (the pattern in
  `components/canvas/Hallway.tsx`), plus a key light, a rim light and a spotlight. Only intensities
  animate (`scene.environmentIntensity` and the direct lights), so no shader recompiles. That is 2–3
  direct lights, against 10–12 point lights today.
- **Shadows.** drei `ContactShadows` on the high and medium tiers; a blob texture on low.
- **The dissolve.** Materials that take part in a swap get a noise-threshold dissolve with a thin gold
  edge, injected once at compile time, so a dissolve never recompiles a shader.
- **Effects.** All six stay mounted. They use `CustomBlending` (colour One/One, alpha Zero/One) and
  appear only in the dark chapter, because additive light vanishes on cream.
- **Warm-up.** Render two frames with every object visible at near-zero opacity, including the glass,
  before the canvas fades in. This avoids stutter at chapter boundaries.
- **Quality tiers.** `matchMedia` is read synchronously inside the client-only stage. drei
  `PerformanceMonitor` picks the tier during the first ~2 s, and then the tier is locked. After that,
  only the pixel ratio adapts.
- **No postprocessing dependency.** Film grain is a CSS noise overlay at 3–4% opacity.

### Intro (decision D3: under 1 s, no page curtain)

- **The intro is pure CSS/SVG and never waits for the canvas.** The bottle's outline, generated from the
  same `profile.ts` points as the 3D model, plus the monogram, draw themselves in champagne hairlines in
  under 0.9 s.
- **It runs once per session**, using a flag set by an inline `<head>` script, so it never flashes.
- **The canvas fades in over the outline whenever it is ready.** The same outline is the static hero when
  there is no WebGL.

---

## Motion, type and UI language

- **Type.**
  - Cormorant Garamond 300 for display: the H1 at `clamp(3.25rem, 7.5vw, 8rem)`, giant words at
    `clamp(4.5rem, 15vw, 16rem)`, with −0.02em tracking.
  - Plus Jakarta Sans for body text (16–17px) and for UI labels (11px, uppercase, 0.2em tracking, the
    existing `.eyebrow`).
- **One accent colour.** Champagne gold, for hairlines, indices and active states. Lines, not boxes;
  square corners except pill buttons.
- **Motion.**
  - Line masks rise with expo.out over 1.1 s, staggered 0.08 s, once per chapter. SplitText comes with
    gsap 3.15 (`mask: 'lines'`, `autoSplit`, cleaned up for Strict Mode).
  - No bounce and no scale pops.
  - While the 3D makes a big move, only one DOM element animates.
- **Page furniture.**
  - The header is transparent and switches between light and dark by chapter theme, with the active
    item underlined.
  - A right-edge progress rail with chapter ticks, and counters such as `03 / 06`.
- **Interactions.** Pointer parallax; concern hover highlights its layers; the technology index replays
  effects; the video lightbox. No custom cursor.

## Mobile, reduced motion, no WebGL

- **Mobile.**
  - The bottle is anchored in the top ~45% of the screen, with copy below over a soft scrim.
  - Giant words stack. In the technology chapter, the crystal takes the top half and the text the bottom.
  - Chapters are ~20% shorter, with `svh`/`lvh` units and native touch scrolling.
- **Reduced motion.** The canvas still renders, but `u` snaps from chapter to chapter with a 400 ms
  crossfade. The idle float, parallax and line-mask reveals are off; text fades in instead.
- **No WebGL.** The SVG outline is the hero, and every chapter's layout stands without the 3D.

## Performance budget

- **Desktop** (integrated-GPU laptop, 1440×900, pixel ratio ≤ 1.5): at least 55 fps on average, and no
  frame over 50 ms while scrolling.
- **Mobile:** at least 45 fps, dropping to the low tier if needed.
- **Scene:** under 60 draw calls, one transmission material, no reflective floor, and all effects
  mounted with no shader recompiles.
- **Loading:** the stage code is loaded lazily after first paint, and the H1 (DOM text) is the Largest
  Contentful Paint. The video loads only when someone clicks it. CLS stays under 0.05.

## Content and compliance (carried over from project decisions)

- **Where copy comes from.** All facts come from `content/*`. New copy goes in **`content/story.ts`**:
  bridge lines, chapter headings, the droplet annotations and the technology captions. All of it is
  marked as a draft awaiting clinical sign-off.
- **Voice.** British English. "May help"; no superlatives or guarantees. *Request a consultation*, never
  "Book now". Practitioner-led, never "doctor" (D6).
- **Tretinoin** appears only in chapter 9, always with the notice and never with a price, and no 3D
  model is ever presented as it. The cream jar sits in the column beside Kojivit, not the Tretinoin
  block; the camera reaches the jar before it grows; and on a phone, where copy scrolls over the
  models, the jar and bottle step out of view while the prescription-only block is on screen.
- **Images.** No before/after images, stock photos or AI-generated clinic photos on the homepage.
  `home.ts`'s `statement` loses its inline images. The only media are the clinic video (click to play)
  and the JCCP logo.
- **Reviews** link to Google only; the press row stays hidden (`pressFeatures` is empty).
- **Inner routes don't exist on `3d` yet.** Links open the booking modal or a pre-filled WhatsApp message
  until the planned route port.
- **Nothing is reused verbatim from the office-tour files.** They contain "Chelsea", "Dr. Dossier" and
  invented clinical claims.

---

## Files

**Create**
- `lib/story/{store,timeline,poses,chapters,tracks,anchor}.ts`: the engine, pure and free of React.
- `lib/bottle/profile.ts`: numbers only, shared by the 3D model and the SVG intro.
- `lib/scene/palette.ts`: 3D colours taken from the `sanctuary` tokens, one source instead of hex values
  hard-coded in each 3D file.
- `components/stage/`:
  - `StageMount.tsx`: `next/dynamic` with `ssr: false`, plus WebGL and motion gating.
  - `Stage.tsx`, `Director.tsx`, `WarmUp.tsx`, `Lighting.tsx`, `Quality.tsx`, `LabelLayer.tsx`,
    `Backdrop.tsx`, `Plinth.tsx`.
  - `bottle/Bottle.tsx` (built), then one folder per model: `droplets/`, `crystal/` (with its six
    energies), `arch/`, `stones/`, `medallion/`, `jar/`, plus `materials/dissolve.ts`.
- `components/chapters/`: `ChapterFrame.tsx`, plus 11 chapter components (server components where
  possible).
- `components/ui/{IntroMark,Reveal,ScrollRail,VideoCard}.tsx`.
- `content/story.ts`.
- `app/lab/bottle/page.tsx`: a look-dev page, `noindex`, returning `notFound()` in production.
- `docs/LANDING_3D_PLAN.md`: this plan, saved to the repo as the first step.

**Modify**
- `app/page.tsx`: Backdrop + StageMount + SiteHeader + `<main>` with the chapters + footer.
- `app/layout.tsx`: skip link to `#main`, the intro flag script, and moving the body background to the
  Backdrop.
- `app/globals.css`: layer utilities, `overflow-x: clip`, grain, and the reduced-motion rules.
- `tailwind.config.js`: the display type scale and keyframes. This also fixes the undefined `animate-*`
  classes.
- `lib/useSmoothScroll.ts`: becomes the single ticker owner and the Lenis singleton.
- `lib/useEnvironment.ts`: adds synchronous initial values for use inside the client-only stage.
- `lib/proceduralTextures.ts`: adds frost, fibre, cell and striation maps.
- `components/sections/SiteHeader.tsx`: theme-aware, anchor nav.
- `components/sections/SiteFooter.tsx`: night version, keeping the compliance line.
- `components/modals/BookingModal.tsx`: calls `lenis.stop()`/`start()`, adds `data-lenis-prevent`, and
  pauses the stage.
- `content/home.ts`: removes the statement's images.
- `package.json`: adds `maath` directly (it's already installed through drei).

**Reuse as they are:** `ConsultationProvider`, `content/*`, the `sanctuary` palette and the fonts.

**Remove**
- The hallway: `components/sections/{LandingExperience,HallwayExperience,Walkthrough,TreatmentCollection,ExpertCare}.tsx`,
  all current files in `components/canvas/`, `components/walls/*`, `lib/hallway.ts` and
  `content/walkthrough.ts`. All of it stays recoverable at `a3895b8`.
- The untracked office tour and `3D_OFFICE_TOUR_IMPLEMENTATION_PLAN.md`: first **saved as one commit on
  a new local branch `3d-office-tour-wip`** (not pushed), so nothing is lost.

---

## Milestones and approval gates (revised)

This follows the established workflow: verify, send screenshots, **wait for your OK, then commit**.
Nothing is pushed unless you ask.

| # | Milestone | State |
|---|---|---|
| M0 | Every chapter as server-rendered HTML: copy, type, layout, page colours, header, rail, single loop, modal fix | Built |
| M1 | The serum bottle on the page: hero shot, bridge turn and lift, glass, label, light rig | Built |
| M2 | The drop falls and splits into six droplets for Concerns, with lift-and-light per group and their annotations. The layer diagram is removed | Built |
| M3 | The droplets merge and freeze into the crystal; the six technology energies; night | Built |
| M4 | The crystal fractures into the archway (Clinic); the arch lies flat into the four plan stones (Consultation); stones to discs to programme stacks | Built |
| M5 | Stack to medallion (Trust); medallion to jar with the bottle (At home); the pair at rest (FAQ); dissolve into the archway at night (Visit) | Built |
| M6 | Polish and hardening: dissolve edge, reveals, mobile shots, reduced motion, no-WebGL drawings, quality tiers, accessibility, performance, lint and build | |

## Verification (every milestone)

- **Lint and build.** `npm run lint` and `npm run build`.
- **Console check.** The dev server through preview `allure-3d` (in `.claude/launch.json`), for console
  and network errors only; the pane can't capture scrolled frames.
- **Frame capture.** A headless-Chrome CDP script kept in the scratchpad (the same method used to analyse
  oryzo.ai), at 1440×900 and at 390×844 with mobile emulation. The page's `?capture` mode turns Lenis
  off, makes damping instant, and exposes `__stage.goto(u)` and `__stage.settled()`, so frames are
  deterministic. Frames become contact sheets, which are sent to you at each gate.
- **Automated checks.**
  - The server HTML contains every chapter heading and the Tretinoin notice (curl + grep).
  - `renderer.info.programs` doesn't grow during a full scripted scroll, meaning no shader recompiles.
  - Frame times per chapter meet the budget.
  - `elementsFromPoint` confirms the layer order (front → canvas → back).
  - Projected labels land within 1 px of their anchors.
- **Mode checks.**
  - Reduced motion, emulated through `Emulation.setEmulatedMedia`.
  - A no-WebGL run (`--disable-3d-apis`) shows the SVG hero and every piece of content.
  - Keyboard: skip link, nav, technology index, FAQ, and the modal focus trap.
  - Wheel scrolling over the open modal doesn't move the page.
- **Compliance grep.** No "Dr", "Chelsea" or "Book now", and no £ near Tretinoin.
- **Lighthouse** on the production build: CLS under 0.05, and the H1 as LCP.

## Risks and open items

- **Transformations can look cheap if rushed.** Each one gets its own frame-sheet review at its gate, and
  the dissolve is the fallback for any morph that does not hold up.
- **Metaballs cost CPU.** The marching-cubes grid stays small (about 48 cubed) and runs only in the
  Concerns and Technologies hand-offs.
- **Glass on a transparent canvas.** Solved in M1 by telling the glass the page colour; only one
  transmission material is on screen at a time.
- **From the client, not blocking:** a monogram SVG (for the medallion), confirmed prices, confirmation
  of the technology captions, and a wider hero video clip.
