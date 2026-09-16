# Allure Passions UK — Website Redesign Plan

**Flow · Structure · Design Language · Implementation Modules**

| | |
|---|---|
| **Status** | Plan approved. Implementation in progress, one module at a time (see Progress) |
| **Branch** | `allure`, pushed to `origin`; not merged into `main` |
| **Date** | 17 September 2026 (last updated 17 September 2026) |
| **Supersedes** | `DESIGN_SPEC_AND_GUIDELINES.md` (rules that still apply are carried over in §13) |
| **Reference sites** | [yukiclinic.co.uk](https://www.yukiclinic.co.uk), [skinstation.co.uk](https://www.skinstation.co.uk) |

---

## Progress

| # | Module | Status |
|---|---|---|
| 0 | Plan (this document) | **Approved** 17 Sep 2026 |
| 1 | Foundation | **Built**; committed and pushed to `origin/allure` 17 Sep 2026 |
| 2 | Header & footer | **Built** and pushed to `origin/allure`. One decision to confirm at review: the mobile quick-contact bar |
| 3 | Hero & credentials ribbon | **Built** and pushed to `origin/allure` |
| 4 | Concern finder | **Built** and pushed to `origin/allure` |
| 5 | Signature treatments | Not started |
| 6 | Why Allure | Not started |
| 7 | Reviews & Instagram | Not started |
| 8 | Programmes & skincare teaser | Not started |
| 9 | FAQ & Begin | Not started |
| 10 | Treatments & treatment detail | Not started |
| 11 | Pricing | Not started |
| 12 | About | Not started |
| 13 | Clinical skincare | Not started |
| 14 | Contact, 404 & legal | Not started |
| 15 | QA & launch prep | Not started |

**How to review:** run `npm run dev`, then open `http://localhost:5173/styleguide` for the design system and `http://localhost:5173/` for the homepage as it takes shape. Blocks that aren't built yet show as dashed placeholders in development only.

### Module 1 build log: Foundation

**Built**

- **Design tokens** (`src/styles/tokens.css`): the palette, semantic tokens that switch per tone (canvas, stone, surface, night), fluid type scale, spacing, layout, shape, motion and layers, all as specified in §8. Reduced motion zeroes every motion token.
- **Base styles** (`src/styles/base.css`): reset, document defaults, focus ring, selection colour, skip link and the 200 ms page cross-fade.
- **Fonts:** Newsreader (with optical sizes) and Instrument Sans, self-hosted via `@fontsource-variable`. There are no Google Fonts requests. Italic files download only when italic is used.
- **Primitives** (`src/components/ui`): Container, Section, SectionHeader, Divider, Eyebrow, Heading, Text, Button, IconButton, ArrowLink, Chip, Tag and Icon. Also BrandLockup (`src/components/brand`) and Reveal (`src/components/motion`).
- **Routing:** React Router 8 (data router) with a shared layout, focus moved to the new page's content on navigation, scroll restoration, view-transition page fades, a 404 page and an error screen. `/prescription-skincare` and old underscore treatment URLs redirect.
- **Intro (D3):** CSS-only, first visit per session, about 0.9 s (cream screen, monogram fades in and out). Skipped on repeat visits and for reduced motion, and it never waits on the app.
- **Brand assets:** optimised AP monogram (6 KB, was 138 KB) and a proper favicon set replacing the Vite placeholder.
- **Style guide** at `/styleguide` (development only, excluded from production builds): brand, colour, typography, layout, shape, buttons and links, chips and tags, section header, tones, icons and motion.
- **Homepage skeleton:** `/` now renders the new 11-block flow from §6 (the footer is Block 12), with dashed development placeholders that are replaced block by block.

**Removed**

- The old `App.jsx` router and the global `index.css`.
- The motion system: 2.4 s loader, page curtain, parallax, split-word reveals, count-ups.
- The 23 old homepage section components.
- Vite template leftovers.

All of these remain in `main`'s history.

**Kept temporarily**

The old header, footer and inner pages (About, Treatments, Treatment detail, Pricing, Prescription skincare) now live in `src/legacy/` with scoped styles and the new fonts, so they keep working until Modules 2 and 10–14 replace them. They still contain old copy (including "doctor-led"), which is rewritten when each page is rebuilt.

**Verified**

- Lint clean; production build clean.
- No horizontal overflow at 1440 px or 375 px.
- All 13 test routes and redirects resolve.
- Menu navigation resets scroll and moves focus; Back restores scroll.
- The skip link appears on focus.
- Reduced motion hides the intro and removes transitions.
- No console errors.

**Changes to the plan made during this module**

1. The wordmark reads "Allure Passions UK", matching how the brand name appeared on the previous site (§8.3 updated).
2. The old homepage sections were retired in Module 1 rather than Module 9, because the homepage now renders the new structure (§9 and §10 updated).
3. Until Module 13 builds the skincare hub, `/skincare` temporarily redirects to the legacy prescription page.

### Module 2 build log: Header & footer

**Built**

- **Header** (`src/components/layout/Header.jsx`): monogram and wordmark, Treatments menu, Skincare, Pricing, About and the consultation button. Transparent with light text over the homepage hero, solid cream with a hairline after 40 px, tucked away while scrolling down and back on the way up. It never hides while it holds keyboard focus or while a menu is open. Below 1200 px the links collapse into the menu button, and below 480 px the monogram carries the brand on its own.
- **Treatments mega menu**: a full-width panel with the 18 concerns in their 6 groups, the six signature technologies with their technology type, and links to all treatments and pricing. A disclosure, not a menubar: it opens on hover (after 80 ms) or on click, Tab moves straight into the panel, Escape closes it and returns focus to the button, and an outside click, a scroll or a new page closes it. Closed, it is out of the tab order and the accessibility tree.
- **Mobile menu**: a full-screen cream dialog with its own brand row and close button. Treatments opens to *By concern* and *Signature treatments*, which expand separately so neither list has to be scrolled past. Then Skincare, Pricing, About and Contact, and a contact block with WhatsApp, the phone, the address, the hours and directions. Focus is trapped inside, the page behind it is inert and cannot scroll, Escape closes it, and focus returns to the menu button.
- **Footer**: night background with the champagne lockup and the credentials line, four columns (Treatments · Clinic · Skincare · Visit), then the copyright, social links and legal links.
- **Mobile quick-contact bar** (the option flagged in §5.2): *Request a consultation* plus WhatsApp, appearing once the hero has scrolled away and stepping aside as the footer arrives. **Your call at this review** — it is one component and one line in the layout, so it comes out cleanly if you would rather not have it.
- **Content layer started** (§9): `src/content/` now holds `clinic`, `concerns` (the 18-concern taxonomy Module 4 will fill out), `treatments` (the six slugs) and `navigation`, and `src/utils/contact.js` builds every WhatsApp, phone and email link from one phone number.
- **Interim pages** so no link in the new chrome leads nowhere: `/contact` (the real contact channels, address, hours and directions; Module 14 adds the enquiry form) and `/privacy` and `/terms` (a short notice that the documents are being prepared, replaced by the client's copy in Module 14).

**Removed**

- The pre-redesign header and footer, and the header, drawer and animation styles that only they used. `src/legacy/` now holds nothing but the inner pages awaiting Modules 10–14.

**Verified**

- Lint clean; production build clean; initial JavaScript 133 kB gzipped, within the 180 kB budget.
- No horizontal overflow on any route at 1440, 768, 375 or 320 px.
- All 33 links in the header and footer resolve; the six treatment routes, both redirects and the 404 all behave.
- Keyboard: skip link → brand → Treatments → links → consultation button; Tab from the trigger enters the panel; Escape restores focus in both menus; focus cannot leave the open mobile menu.
- Reduced motion: no intro, no transitions.
- No console errors on any route.

**Changes to the plan made during this module**

1. The mobile quick-contact bar is built and switched on, for you to confirm or drop at this review (§5.2 updated).
2. `/contact`, `/privacy` and `/terms` exist from now on in the interim form described above, because the header and footer both need them; Module 14 replaces all three.
3. Kojivit Ultra joins the footer's Skincare column when Module 13 builds its page.
4. The large brand lockup now scales with the viewport: the wordmark does not wrap, and at fixed size it pushed a 320 px screen sideways.

---

### Module 3 build log: Hero & credentials ribbon

**Built**

- **Hero** (Block 1): the walkthrough under a left-weighted ink scrim, with the eyebrow, H1, lede and consultation button on the left and the two-part pathway strip along the bottom edge. Height `min(100svh, 60rem)` with a 620 px floor. The pathway links scroll to the concern finder and the signature treatments, moving focus with them.
- **Video**: re-encoded from 9.1 MB to **1.0 MB** (VP9/WebM, served first) and **2.5 MB** (H.264/MP4 fallback), muted, looping, no audio track. A 15 KB WebP poster is preloaded from `index.html`.
- **Pause control** (WCAG 2.2.2): a discreet button at the bottom right whose label follows what the video is actually doing, so a blocked or failed autoplay never leaves it lying. Reduced-motion visitors get the poster, no download of the video at all (`preload="none"`) and a play button if they want it.
- **Credentials ribbon** (Block 2): the award, JCCP registration, the Level 6 qualification and the reviews, on one hairline row with bronze line icons. The award cell links to Why Allure and the reviews cell to the reviews block.
- **Reviews adapter** (`src/services/reviews.js`): reports `configured: false` until Module 7 connects a provider, so the ribbon shows **no rating and no review count** — nothing that isn't live (§8.11).

**Removed**

- The original 9.1 MB `clinic_hero_walkthrough.mp4`, which nothing uses now.

**Verified**

- Lint clean; production build clean.
- **LCP 0.24 s, CLS 0.005** on a production build at 1440 px, against budgets of 2.5 s and 0.1. The homepage fetches 1.16 MB in total, video included.
- Autoplay, pause, resume and the reduced-motion path all behave, and the WebM is the file the browser picks.
- No horizontal overflow at 1440, 768, 375 or 320 px; no console errors.

**Changes to the plan made during this module**

1. **The footage is not a clinic walkthrough.** The only video in the repository is a tight close-up of a facial treatment. It reads acceptably under the scrim, but a wider, calmer clip of the clinic would suit this hero far better — added to §11 as a content request.
2. The LCP element measures as the H1 rather than the poster: the poster is preloaded and the hero paints at 0.24 s, so the goal behind that line is met. §10's wording is left as written.
3. The ribbon stacks in one column below 480 px instead of 2×2, because the award title needs the width to stay readable.
4. The pathway links and the ribbon's two linked cells point at Blocks 3–6, which arrive in Modules 4–7. Until then they do nothing in a production build; the scroll helper simply no-ops when the target isn't on the page.

---

### Module 4 build log: Concern finder

**Built**

- **Concerns content** (`src/content/concerns.js`): all 18 concerns in their 6 groups, each with a plain-English description and 1–3 matched treatments carrying a line on why that treatment suits the concern. Written to §8.11 — British English, "may help" rather than promises, melasma and rosacea described as managed rather than cured, and prescription skincare named only as *Prescription skincare consultation* (P5). **These are drafts for the clinic's clinical sign-off** (§11.11).
- **Treatment options** (`src/content/treatments.js`): the six signature technologies alongside the rest of the menu a concern can be matched to — Cosmelan, BioRePeel, microneedling with exosomes, HydraFacial, LED and clinical skin analysis.
- **Block 3**: group tabs, concern chips and a result panel with the concern, its description, the matched treatments as linked rows (name · reason · arrow), a WhatsApp button pre-filled with the concern, and a link through to that concern on the treatments page. Chips on the left over five columns, panel on the right over seven, stacked below 1024 px; the tabs scroll sideways on a phone.
- **Keyboard and semantics**: the groups are a tablist with arrow, Home and End keys and automatic activation; the chips are a radio group with roving focus; the result panel is a polite live region, so a change is announced rather than silently swapped.
- **Shareable selection**: `#concern-melasma` in the URL opens that concern with its group, and choosing a concern rewrites the hash with `replaceState`, so the page never jumps.

**Verified**

- All 18 concerns render with a description, at least one matched treatment and working links; every link target resolves.
- Tabs, chips, Home/End, deep links and hash rewriting all behave; no console errors.
- Lint clean; production build clean; no horizontal overflow at 1440, 768, 375 or 320 px.

**Changes to the plan made during this module**

1. Treatments that do not have a detail page (Cosmelan, BioRePeel, exosomes, HydraFacial, LED, skin analysis) link to the price list for now. Module 11 gives each price category its own anchor, and these links will point at it.
2. Matched-treatment names are set slightly smaller than the Title style, because names like "Cosmelan depigmentation protocol" wrapped over three lines in a list row.

---

---

## 0. Summary

The client's two complaints are about the **flow and structure** and **too many images**. Both come from the same problem: the current homepage repeats itself and uses photography to fill space. The redesign keeps the brand colours. Everything else is rebuilt on a minimal, type-led design language in which the information itself forms the interface.

**The new homepage, top to bottom:** a calm video hero asks *concern or treatment?* → a slim credentials ribbon → an interactive concern finder → a numbered index of the six signature technologies → who we are and why to trust us → live Google reviews and Instagram → signature programmes and clinical skincare → FAQ → a close that leads with the consultation.

| | Current site | Redesign |
|---|---|---|
| Homepage structure | 14 sections; treatments shown 3–4 times, trust split across 4 sections | 12 blocks in 4 acts; each topic appears once |
| Imagery | ~30 distinct photos on the homepage (36 files, 19 MB) + 9 MB video | One hero video, credential logos, one contained Instagram strip |
| Typography | Cormorant Garamond + Inter | Newsreader (display serif) + Instrument Sans (UI/body) |
| Surfaces | Alternating dark and cream blocks, bronze gradients, glows | Light cream and stone canvas; dark only for the hero and footer; hairlines instead of boxes |
| Motion | 2.4 s loader, full-screen curtain on every page change, split-word reveals, parallax | Under 1 s first-visit logo intro, 200 ms page fades, gentle one-time reveals |
| Code | Inline styles, JS hover handlers, `!important` overrides | Design tokens, reusable components, co-located CSS |

---

## 1. Diagnosis: why the current site isn't working

### 1.1 Flow and structure

The current homepage (`src/App.jsx`) runs 14 sections. Mapping them against the questions visitors actually ask shows the repetition:

| Visitor question | Where it's answered today | Problem |
|---|---|---|
| *Do you treat my concern?* | Treatment Areas carousel (5 areas + 7 concerns with a different taxonomy) | Two overlapping concern taxonomies in one section; the brief adds a second "What we treat" |
| *Which treatments do you offer?* | Signature Treatments · Pricing Menu · Body Contouring spotlight | Treatments showcased three times (the brief itself asks for four: hero, Popular, Featured, plus pricing) |
| *Why should I trust you?* | Founder · Pillars · Accreditations · Press bar | Trust spread over four separated sections |
| *Does it work?* | Before/After slider | Image-heavy and sensitive under advertising rules |
| *What happens next?* | Pre-footer CTA only | No explanation of the consultation process; the only close comes at the very end |

The client's brief order (*Clinic experience → Treatment areas → Most sought-after → Welcome → Credentials → Popular → Concerns → Awards → Reviews → Social → Featured → CTA*) has the same repetition built in: treatments ×3, concerns ×2, trust ×2. The redesign keeps **all the content the brief asks for** and gives each topic one home (§6.2).

### 1.2 Imagery

- 36 image files (19 MB) plus a 9.1 MB video. The homepage alone uses around 30 distinct photos: 13 in Treatment Areas, 3 in Pillars, 4 in Instagram, plus founder, before/after, device, product and pre-footer images.
- Because images carry every section, the sections all look alike: image, heading, paragraph. The client warned against exactly this: "a generic aesthetics website with random treatment boxes".

### 1.3 Visual language and motion

- Alternating dark and cream grounds, bronze gradients, glow shadows and hover lifts all compete for attention.
- The 2.4 s intro loader, the full-screen curtain on every navigation, split-word headline reveals and parallax add waiting time and movement without adding meaning.
- Inline styles and JavaScript-driven hover states make the look inconsistent and slow to change.

### 1.4 Compliance issues in the current content

| Issue | Where | Action |
|---|---|---|
| Invented reviews ("Victoria S. – Mayfair", "Dr. Eleanor M." …) | `REVIEWS` in `treatmentData.js`, testimonial sections | **Remove.** Fake or unverifiable reviews have been banned under the DMCC Act 2024 since 6 April 2025. Show only genuine Google reviews. |
| "Doctor-led" claim | Hero, Founder, Pricing page, Treatment detail page | **Remove.** The clinic is practitioner-led (D6). The ASA has upheld complaints about unsubstantiated medical-qualification claims (CAP 3.1, 3.7, 3.9). |
| Tretinoin named and promoted publicly | Skincare showcase, prescription page | Kept as briefed; recorded as a client-accepted risk (D5, R1). |
| Superlative or unsubstantiated claims ("world's most advanced", "permanently eliminating 30% fat", "zero downtime", "pain-free", "Tier-One", "FDA-cleared" aimed at a UK audience) | Treatment data and sections | Rewrite as factual, qualified copy (§8.11) |
| Invented detail ("Inside Our Mayfair Treatment Suite") | Instagram placeholder data | Remove (the clinic is in Fitzrovia) |
| Inconsistent price (Kojivit £85.00 vs "£45.00 / 30g") | Data file vs prescription page | Client to confirm (§11) |

---

## 2. Research findings

### 2.1 Yuki Clinic: the closest fit for our brand

**Homepage structure:** Hero (background video, left-aligned headline, one CTA) → Treatments (12 category tiles; hovering reveals the treatment list) → About the clinic → Our team → Awards → Book a free consultation → General FAQ → Book a consultation → Testimonials (Google, 124 reviews) → Follow our journey (Instagram) → Footer. About 7,900 px tall at 1440 px wide.

**Tokens measured from the live site:**

- **Palette:** canvas `#F4F1EC`, panels `#EDE9E2`, hairlines `#DDD9D3`, ink `#1B1B19`, footer `#111110`. The same warm family as our cream and ink.
- **Type:** one serif family throughout (Source Han Serif); display sizes 46–72 px, bold.
- **Labels and buttons:** 11–13 px uppercase, about 0.18 em tracking.
- **Buttons:** square corners, 0.8 px outline, transparent fill. The header CTA is an outlined pill.
- **Treatment grid:** 3 columns, 12 px gaps, square corners, no shadows.
- **FAQ:** centred 760 px column with hairline separators and 24 px row padding.
- **Mega menu:** category headings with link lists beneath.

**Treatment page:** centred uppercase title, then two columns. The main column holds long-form content (technology, benefits, indications, comparison, contraindications, side effects, aftercare, interactions). Beside it sits a **sticky "Treatment details" card** (time, discomfort out of 10, recovery, sessions, price list, CTA) with thin line icons. Below: consultation CTA → testimonials → Instagram.

- **Take:** warm restraint, square geometry, hairlines, a video hero with left-aligned text, the sticky spec card, the FAQ, reviews and Instagram placed late.
- **Leave:** an image tile for every category (conflicts with "too many images"), the heavy bold serif, two consultation CTAs back to back.

### 2.2 Skinstation

**Homepage structure:** Announcement bar → header (centred wordmark, "Prescription service – available after clinical assessment" chip, icon utilities) → centred uppercase nav → split hero carousel → best sellers → top categories → brand strip → virtual consultation banner → skin concerns → editorial best sellers → gift cards → community video → trust bar (4 line icons) → footer. About 7,000 px tall.

**Tokens measured:** white canvas, slate footer `rgb(39 52 64)`, pale tinted panels, Proxima Nova uppercase headings (600 weight, 1 px tracking), DM Sans body, thin outline buttons, line icons.

**Consultation page:** split intro → three-column "how it works" (text only) → a clean form with labels above and generous spacing → team.

**Prescription handling:** prescription products sit in a signed-in "prescription area" that opens only after clinical assessment. They are never merchandised publicly.

- **Take:** tinted panels instead of dark blocks to separate sections, the text-only "how it works" steps, the utility-chip pattern, a trust bar with line icons, plain and clear labels.
- **Leave:** dense product grids, carousels of product photography, uppercase for every heading.

### 2.3 Patterns shared by both references

1. **Offer first, brand second.** Treatments or products come before "about".
2. **The consultation invitation is explained as a process,** not just placed as a button.
3. **Social proof sits in the lower half** (reviews, Instagram or community).
4. **Restrained palettes:** hairlines and flat surfaces, no glows or gradients.
5. **Compact homepages** (about 7–8k px) that leave the detail to inner pages.

### 2.4 Regulatory and platform research

| Topic | Finding | Impact on plan |
|---|---|---|
| Prescription-only medicines | CAP Code 12.12 and the Human Medicines Regulations 2012 prohibit advertising POMs to the public. Any reference is likely to count as promotion, and "subject to consultation" wording doesn't exempt it. ASA website guidance: the home page should be condition-led, with no POM names or prices. Inner pages may mention a POM only as a possible outcome of the consultation, in factual wording. | Tretinoin handled per D5 with risk mitigations (R1, P5) |
| Fake reviews | The DMCC Act 2024 has banned fake reviews since 6 April 2025, and businesses must take proportionate steps to prevent them | Genuine, live-sourced reviews only |
| Qualification claims | ASA rulings (e.g. *Dr Bunny Aesthetics*) found implied medical qualifications misleading | Use "practitioner-led" and state real credentials |
| Google reviews | The official Places API returns at most 5 reviews per place | Choose a provider before launch (§11) |
| Instagram feed | The Basic Display API was retired on 4 Dec 2024. Feeds now need a Business or Creator account, via Meta's API or a provider such as Behold | Confirm account type; choose a provider |
| Background video | WCAG 2.2.2 requires a way to pause auto-playing motion that lasts more than 5 s | A discreet pause icon, not a media dock |

Sources in §14.

---

## 3. Decisions log

| # | Decision | Choice |
|---|---|---|
| D1 | Colour scheme | Keep: cream, ink, bronze, champagne, night |
| D2 | Typography | Modern serif + clean sans: Newsreader + Instrument Sans (§8.3) |
| D3 | Intro and transitions | Keep a brief logo intro (first visit only, under 1 s); remove the page curtain |
| D4 | Workflow | Local `redesign` branch; after each module, verify, send screenshots and wait for approval; commit locally only after approval; no pushing |
| D5 | Tretinoin | Named product page with a "consultation required" disclaimer, as briefed. **Client-accepted risk** (R1) |
| D6 | Clinical lead | Practitioner-led; remove all "doctor-led" wording |
| D7 | Press features | Genuine, so keep "As featured in" (article links needed) |
| D8 | Form submissions | WhatsApp or email hand-off only; no backend |
| D9 | Booking | No booking engine (carried from the client's original answer) |
| D10 | Page depth | The homepage introduces; detail lives on real inner pages, not modals (carried) |

**Proposed defaults** (change any of these during review):

| # | Default | Rationale |
|---|---|---|
| P1 | The clinic walkthrough video is the only hero media | The brief asks for it, and Yuki shows a video hero can still feel minimal |
| P2 | Reviews and Instagram are built against a data adapter; the provider is chosen before launch | Doesn't block design, and placeholder content can't ship |
| P3 | Adopt React Router for real routes | Proper links, 404 page, scroll restoration, `?concern=` filters |
| P4 | Self-host the fonts | Faster, and no third-party font requests |
| P5 | The homepage skincare teaser and concern finder say "prescription skincare" rather than naming the medicine; the product page names it (D5) | No loss of function, less exposure |

---

## 4. Experience principles

1. **Start from what the patient knows.** Every visitor can begin with a concern or with a treatment name.
2. **One topic, one place.** Each section answers one question, once, and hands on to the next.
3. **Information is the interface.** Facts, steps, tags, numbers and comparisons are designed as UI, not hidden behind photographs.
4. **Trust before the ask.** Credentials, reviews and a clear process come before the closing call to action.
5. **Calm and quiet.** Space, hairlines and type create the hierarchy. Colour and motion are used sparingly and with purpose.
6. **Honest by design.** Copy is factual, qualified and compliant. Nothing implies what can't be substantiated.

---

## 5. Information architecture

### 5.1 Sitemap and routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | 12 blocks (§6) |
| `/treatments` | Treatments | Finder with *By concern* and *By treatment* views; `?concern=melasma` preselects a concern |
| `/treatments/:slug` | Treatment detail ×6 | `picoway`, `advatx`, `morpheus8`, `sofwave`, `emsculpt-neo`, `emerald-laser` (old underscore slugs redirect) |
| `/pricing` | Pricing | All 8 price categories plus programmes; an anchor per category |
| `/about` | About the clinic | Story, practitioner, credentials, awards, press, standards |
| `/skincare` | Clinical skincare | Hub for both products |
| `/skincare/kojivit-ultra` | Kojivit Ultra | Reserve for in-clinic collection and payment |
| `/skincare/tretinoin` | Tretinoin (prescription) | Product page + medical questionnaire (D5, D8) |
| `/contact` | Request a consultation | Enquiry hand-off, contact channels, address, hours, directions |
| `/privacy`, `/terms` | Legal | Content supplied by the client |
| `*` | 404 | Helpful links back into the site |
| `/styleguide` | Design system | Development only; excluded from production builds |

**Redirects:** `/prescription-skincare` → `/skincare/tretinoin`.

### 5.2 Navigation

**Desktop header (≥ 1200 px):** AP monogram + wordmark · Treatments ▾ · Skincare · Pricing · About · **[Request a consultation]**

- Transparent over the hero, with light text; after 40 px of scrolling it turns solid cream with a hairline. It hides when scrolling down and returns when scrolling up.
- **Never wraps** (carried rule). Below 1200 px the links collapse into the menu.

**Treatments mega menu** (full-width panel):

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ BY CONCERN                                              │ SIGNATURE          │
│                                                         │ TREATMENTS         │
│ Skin              Pigmentation        Laser             │ PicoWay            │
│ Acne              Hyperpigmentation   Tattoo removal    │ ADVATx             │
│ Acne scarring     Melasma             Vascular lesions  │ Morpheus8          │
│ Rosacea & redness Lentigines          Lip enhancement   │ Sofwave            │
│ Skin clarity                                            │ Emsculpt Neo       │
│                                                         │ Emerald Laser      │
│ Skin tightening   Body                Wellness          │                    │
│ Skin laxity       Stubborn fat        Cellular health   │ All treatments  →  │
│ Signs of ageing   Body contouring                       │ Pricing         →  │
│ Fine lines        Muscle tone · Striae                  │                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Mobile (< 1200 px):** logo · [Enquire] · menu button. A full-screen cream menu holds Treatments (accordion: *By concern* / *Signature treatments*), Skincare, Pricing, About and Contact, then a contact block (WhatsApp, call) with the address and hours.

*Built in Module 2, for you to confirm or drop at review:* a slim mobile quick-contact bar (Request a consultation + WhatsApp) that appears once the hero has scrolled away and hides near the footer.

### 5.3 Calls to action (no booking engine)

| Intent | Label | Behaviour |
|---|---|---|
| General | Request a consultation | Goes to `/contact` |
| Fastest route | Message us on WhatsApp | `wa.me` link with a pre-filled message that fits the context |
| Voice | Call the clinic | `tel:` link |
| Contextual | Discuss this concern · Enquire about PicoWay | WhatsApp, pre-filled with the concern or treatment |
| Go deeper | Learn more · View pricing | Inner page |

---

## 6. Homepage flow

### 6.1 Four acts, twelve blocks

```
ACT 1 · DISCOVER         ACT 2 · TRUST             ACT 3 · CONSIDER           ACT 4 · BEGIN
"Can you help me?"       "Why you?"                "What would it involve?"   "How do I start?"
──────────────────       ──────────────────        ──────────────────         ──────────────────
1  Hero (video)          5  Why Allure             8  Signature programmes    11 Begin with a
2  Credentials ribbon       welcome · credentials  9  Clinical skincare          consultation
3  Concern finder           awards · press         10 FAQ                     12 Footer
4  Signature treatments  6  Patient reviews
                         7  Instagram
```

- **Estimated height:** about 7,800 px at 1440 px wide.
- **Surface rhythm:** hero (video over night) → cream and stone panels alternating → footer (night). No dark blocks mid-page.
- **Contextual CTAs everywhere:** the header CTA is always present, the finder offers *Discuss this concern*, rows offer *Learn more*, and programmes offer *Enquire*. The page never relies on its final block to convert.

### 6.2 Brief coverage

| Client brief section | Where it now lives |
|---|---|
| 1 · Hero: clinic experience + two pathways | Block 1 (video + pathway strip) |
| 2 · Welcome | Block 5, part A |
| 3 · Expert care you can trust | Block 2 (summary) + Block 5, part B (detail) |
| 4 · Popular treatments: "Advanced treatments. Personalised to you." | Block 4 |
| 5 · What we treat: select a concern | Block 3 |
| 6 · Awards, accreditations, press | Block 5, parts B and C |
| 7 · Google reviews | Block 6 |
| 8 · Live social feed | Block 7 |
| 9 · Featured treatments and programmes | Block 8 |
| E-commerce: Kojivit, Tretinoin | Block 9 → `/skincare` pages |
| Consultation CTA | Block 11, plus contextual CTAs throughout |

### 6.3 Block specifications

> Copy below is **draft**. It follows the rules in §8.11 and needs client sign-off.

#### Block 1: Hero

- **Purpose:** show who, what and where within five seconds, and offer two clear starting points.
- **Copy:**
  - Eyebrow: *Advanced aesthetic clinic · Fitzrovia, London*
  - H1: *Advanced care for skin, body & wellbeing.*
  - Sub: *An award-winning, practitioner-led clinic offering non-invasive treatments planned around your concerns.*
  - Button: *Request a consultation*
  - Pathway strip:
    - *Start with a concern:* Pigmentation, laxity, acne, stubborn fat and more →
    - *Start with a treatment:* PicoWay, Morpheus8, Sofwave, Emsculpt Neo and more →
- **Pattern:** a full-bleed, muted walkthrough video under a soft ink scrim, with left-aligned text on the 12-column grid. A two-part pathway strip sits on the bottom edge, split by a hairline.
- **Behaviour:**
  - The video autoplays muted on a loop, with a poster frame.
  - A discreet pause/play icon sits bottom-right (WCAG 2.2.2). Reduced-motion users see the poster.
  - No badges, pills or media dock (carried rule).
  - Height `min(100svh, 960px)`, never under 620 px.
- **Leads to:** the pathway links scroll to Blocks 3 and 4.
- **Assets:** the existing video re-encoded to ≤ 3 MB (H.264 + WebM), with an AVIF/WebP poster.

```
┌────────────────────────────────────────────────────────────────────────────┐
│ AP  ALLURE PASSIONS         Treatments▾  Skincare  Pricing  About  [REQUEST] │
│                                                                            │
│ ADVANCED AESTHETIC CLINIC · FITZROVIA, LONDON                              │
│ Advanced care for skin,                                                    │
│ body & wellbeing.                                                          │
│ An award-winning, practitioner-led clinic offering…                        │
│ [ REQUEST A CONSULTATION ]                                                 │
│                                                                            │
│─────────────────────────────────────┬──────────────────────────────────────│
│ START WITH A CONCERN                │ START WITH A TREATMENT          (II) │
│ Pigmentation, laxity, acne… →       │ PicoWay, Morpheus8, Sofwave… →       │
└────────────────────────────────────────────────────────────────────────────┘
```

#### Block 2: Credentials ribbon

- **Purpose:** establish credibility straight after the promise, without cluttering the hero.
- **Content:**
  - *Best Advanced Skin & Body Aesthetics Clinic 2026 – London* (GHP Global Excellence Awards)
  - *JCCP registered*
  - *Level 6 qualified practitioner*
  - *5.0 on Google · 68 reviews.* The rating and count come from live data. If no provider is configured, this cell reads *Read our Google reviews* with no numbers.
- **Pattern:** one row of four cells separated by hairlines, each a thin bronze line icon plus two lines of text. On mobile, a 2×2 grid.
- **Leads to:** the Google cell links to Block 6; the award cell links to Block 5.

```
│ (award) Best Advanced Skin & Body │ (shield) JCCP     │ (cap) Level 6    │ (star) 5.0 Google │
│         Aesthetics Clinic 2026    │ registered        │ qualified        │ 68 reviews        │
```

#### Block 3: Concern finder

- **Purpose:** help patients who know their concern, but not the technology, find their options (brief §5).
- **Copy:**
  - Eyebrow: *What we treat*
  - H2: *What would you like to improve?*
  - Lede: *Choose a concern to see treatments that may help. Your plan is always confirmed at consultation.*
- **Content:** 18 concerns in 6 groups (the brief's categories):

  | Group | Concerns |
  |---|---|
  | Skin | Acne · Acne scarring · Rosacea & redness · Skin clarity |
  | Pigmentation | Hyperpigmentation · Melasma · Lentigines |
  | Laser | Tattoo removal · Vascular lesions · Lip enhancement & plumping |
  | Skin tightening | Skin laxity · Signs of ageing · Fine lines & wrinkles |
  | Body | Stubborn fat · Body contouring · Muscle tone & definition · Striae |
  | Wellness | Wellness & cellular health |

  Each concern has a plain-English description of 1–2 sentences and 1–3 matched treatments, each with a one-line reason it suits that concern. Prescription skincare appears as *Prescription skincare consultation*, not by medicine name (P5).
- **Pattern:** group tabs (horizontal scroll on mobile) → concern chips → result panel.
  - Desktop: chips on the left (5 columns), result panel on the right (7 columns).
  - The result panel shows the concern name (serif), its description, *Treatments that may help* as linked rows (name · reason · arrow), then *Discuss this concern* (WhatsApp) and *View treatment* links.
- **Behaviour:**
  - The first concern is preselected, so there's never an empty state.
  - Tabs use arrow-key navigation; chips behave like radio buttons.
  - The panel cross-fades in 200 ms.
  - The selection is written to the URL (`#concern-melasma`) so it can be shared.
- **Leads to:** treatment pages, or Block 4 for anyone who prefers to browse by technology.

```
│ WHAT WE TREAT                                                              │
│ What would you like to improve?                                            │
│ Skin   Pigmentation   Laser   Skin tightening   Body   Wellness            │
│        ════════════                                                        │
│ ( Hyperpigmentation )  ( Melasma )   │ Melasma                              │
│ ( Lentigines )                       │ Patchy brown pigmentation, often…    │
│                                      │ TREATMENTS THAT MAY HELP             │
│                                      │ PicoWay — targets pigment with…    → │
│                                      │ Cosmelan protocol — in-clinic peel… → │
│                                      │ Prescription skincare consultation → │
│                                      │ [ DISCUSS THIS CONCERN ]             │
```

#### Block 4: Signature treatments

- **Purpose:** showcase the six flagship technologies and route visitors to their pages (brief §4).
- **Copy:**
  - Eyebrow: *Signature treatments*
  - H2: *Advanced treatments. Personalised to you.*
  - Lede: *Six technologies at the heart of the clinic, each chosen for the concerns it can address.*
- **Pattern:** a numbered index list, not boxes.
  - Each desktop row spans the 12 columns: number (1) · name + technology type (4) · one-line summary + concern tags (4) · facts: sessions / downtime / from-price (2) · arrow (1).
  - The whole row is the link. On hover the row tints stone and the arrow slides.
  - On mobile, rows stack and the facts wrap beneath the summary.
- **Content per treatment:** name, technology type (e.g. *Picosecond laser*), summary (brief wording), 3–4 concern tags, typical sessions, downtime, from-price. Facts need client confirmation.
- **Leads to:** `/treatments/:slug`. A closing link reads *View all treatments & pricing*.

```
│ 01   PicoWay               Advanced picosecond laser for      Course of 6   │
│      Picosecond laser      pigmentation, revitalisation and   Minimal       │
│                            tattoo removal.                    From £329   → │
│                            (Pigmentation) (Acne scarring) (Tattoos)         │
│─────────────────────────────────────────────────────────────────────────────│
│ 02   ADVATx                Advanced laser for acne, redness,  …           → │
```

#### Block 5: Why Allure (welcome · expert care · recognition)

- **Purpose:** explain who we are and why patients can trust us, answered once and in depth (brief §2, §3, §6).
- **Part A · Welcome:**
  - Eyebrow: *Welcome to Allure Passions UK*
  - Statement (display serif): *An award-winning clinic for advanced, non-invasive skin and body care.*
  - Body: the award line plus the focus areas (skin health, body contouring, cellular health, wellbeing)
  - Link: *Discover our approach* → `/about`
- **Part B · Expert care you can trust:** a 3×2 hairline grid (one column on mobile):

  | Cell | Content |
  |---|---|
  | JCCP registered | JCCP logo · what registration means for patients |
  | Level 6 qualified | Qualification level and awarding body (client to confirm) |
  | Advanced technology training | Manufacturer training on each device used |
  | Continuing professional education | Ongoing CPD focus areas |
  | Professional standards & memberships | Consultation, hygiene and aftercare standards; memberships (client to confirm) |
  | Global Excellence Awards 2026 | GHP seal · Best Advanced Skin & Body Aesthetics Clinic – London |

- **Part C · As featured in:** monochrome press wordmarks (Vogue, Tatler, Harper's Bazaar, GQ, ELLE), each linking to its feature (D7).
- **Leads to:** reviews ("don't just take our word for it").

```
│ WELCOME TO ALLURE PASSIONS UK                                              │
│ An award-winning clinic for advanced,        Recognised as Best Advanced…  │
│ non-invasive skin and body care.             Discover our approach →       │
│                                                                            │
│ EXPERT CARE YOU CAN TRUST                                                  │
│ ┌────────────────────┬────────────────────┬────────────────────┐           │
│ │ [JCCP] Registered  │ Level 6 qualified  │ Technology training│           │
│ ├────────────────────┼────────────────────┼────────────────────┤           │
│ │ Continuing CPD     │ Standards          │ [GHP] Award 2026   │           │
│ └────────────────────┴────────────────────┴────────────────────┘           │
│ AS FEATURED IN    VOGUE    TATLER    HARPER'S BAZAAR    GQ    ELLE          │
```

#### Block 6: Patient reviews

- **Purpose:** provide genuine social proof (brief §7).
- **Copy:** Eyebrow *Patient reviews* · H2 *In our patients' words*
- **Pattern:**
  - Left: rating summary (large 5.0, stars, review count, *Read all reviews on Google ↗*).
  - Right: a carousel of review cards (quote in serif, first name and initial, date, treatment if mentioned).
  - Previous/next buttons and swipe on touch; no auto-advance.
- **Data:** the `reviews` adapter returns `{ rating, count, url, reviews[] }`. If no provider is configured, the section shows only the rating link. Sample reviews never appear in production.

#### Block 7: Instagram

- **Purpose:** show the clinic is real and active (brief §8).
- **Pattern:** a compact strip of 6 square tiles (reels marked with a small icon), plus the handle and *Follow on Instagram ↗*. On mobile, a horizontal scroll-snap strip.
- **Data:** the `instagram` adapter. The section is hidden in production if no provider is configured.
- **Note:** the only image-led block on the page, deliberately kept contained.

#### Block 8: Signature programmes

- **Purpose:** show what a structured course involves, for patients ready to commit (brief §9, "Featured treatments").
- **Content:** Allure Contour Synergy · Allure Contour Luxe · Allure Contour Advanced · Cosmelan depigmentation protocol. Each lists what's included, the number of sessions and the course price (pricing to confirm, §11).
- **Pattern:** four image-free, tier-style columns divided by hairlines. Each has a name, a subtitle, an *Includes* list, the price, *Enquire about this programme* (pre-filled WhatsApp) and a *See pricing* link. On mobile, a scroll-snap row with the next card peeking in.

#### Block 9: Clinical skincare

- **Purpose:** show the at-home products that support in-clinic care.
- **Pattern:** two side-by-side panels on stone:
  - **Kojivit Ultra:** small packshot, one-line description, price, *View product* → `/skincare/kojivit-ultra`.
  - **Prescription skincare:** *Available only after a medical consultation*, a four-step mini flow (Questionnaire → Clinical review → Email confirmation → Collect in clinic) and *Start your consultation* → `/skincare/tretinoin`. The medicine is named on that page, not on the homepage (D5, P5).

#### Block 10: FAQ

- **Purpose:** clear up remaining doubts before contact. Also helps search visibility (FAQPage structured data).
- **Pattern:** two columns on desktop. The left holds a sticky heading plus *Still have a question? Message us*; the right holds an accordion with hairline separators. One item is open at a time.
- **Draft questions** (answers need client confirmation):
  - Is there a consultation fee?
  - What happens at my consultation?
  - Who will carry out my treatment?
  - How many sessions will I need?
  - Is there any downtime?
  - How do I pay?
  - How does prescription skincare work?
  - Where is the clinic, and how do I get there?

#### Block 11: Begin with a consultation

- **Purpose:** a confident, low-pressure close that explains exactly what happens next.
- **Copy:** Eyebrow *Begin with a consultation* · H2 *Your treatment starts with a conversation.*
- **Pattern:**
  - A four-step horizontal timeline: Get in touch → Consultation & skin assessment → Your personalised plan → Treatment & aftercare. Numbered nodes sit on a hairline.
  - Contact actions: WhatsApp (primary), call, email, contact page.
  - Address, hours and *Get directions ↗*.
  - Stone background.

#### Block 12: Footer

- **Pattern:** night background with the champagne monogram and wordmark.
- **Columns:** Treatments · Clinic (About, Pricing, Contact) · Skincare · Visit (address, hours, phone, email, WhatsApp).
- **Also:** a credentials line (JCCP registered · GHP Award 2026), social icons, legal links and the copyright line.

---

## 7. Inner page templates

### 7.1 Treatment detail: `/treatments/:slug`

Based on Yuki's sticky spec card. No hero image.

```
Home / Treatments / PicoWay
┌───────────────────────────────────────────────┬────────────────────────────┐
│ PICOSECOND LASER                              │                            │
│ PicoWay                                       │                            │
│ Advanced picosecond laser for pigmentation,   │                            │
│ skin revitalisation and tattoo removal.       │                            │
│ (Pigmentation) (Acne scarring) (Tattoos)      │                            │
│ [ REQUEST A CONSULTATION ]   WhatsApp us →    │                            │
├───────────────────────────────────────────────┼────────────────────────────┤
│ Overview                                      │ TREATMENT DETAILS (sticky) │
│ What it can help with  → concern links        │ Duration      45–60 min    │
│ How it works (3 steps)                        │ Comfort       …            │
│ What to expect: before · during · after       │ Downtime      Minimal      │
│ Sessions & results                            │ Sessions      Course of 6  │
│ Suitability & side effects                    │ From          £329         │
│ Aftercare                                     │ [ REQUEST A CONSULTATION ] │
│ FAQs                                          │                            │
├───────────────────────────────────────────────┴────────────────────────────┤
│ Pricing: treatment area | single session | course                          │
│ Related treatments: index rows                                             │
│ Begin with a consultation (Block 11 pattern)                               │
└────────────────────────────────────────────────────────────────────────────┘
```

On mobile, the spec card moves under the header as a compact two-column fact list, and a sticky bottom bar offers *Request a consultation*.

### 7.2 Treatments: `/treatments`

1. Page header.
2. Segmented control: *By concern* | *By treatment*.
3. **By concern:** the full-page concern finder (all concerns visible).
4. **By treatment:** the signature index, followed by other treatments (HydraFacial, OxyGeneo, BioRePeel, Cosmelan, microneedling with exosomes, LED, skin analysis), each linking to its pricing anchor.
5. Programmes.
6. Block 11.

### 7.3 Pricing: `/pricing`

1. Header with notes (consultation first; payment in clinic).
2. Sticky category index (a left rail on desktop, horizontal chips on mobile).
3. Eight category tables: area | single | course columns, tabular numerals, hairline rows.
4. Programmes.
5. Block 11.

No gradients, no cards.

### 7.4 About: `/about`

1. Statement header.
2. The clinic: story, Fitzrovia location, approach.
3. The practitioner: name, role, qualifications, JCCP profile link. An optional single portrait (the one place a portrait earns its place).
4. Credentials and accreditations (the Block 5 grid, expanded).
5. Awards (GHP detail).
6. Press, with links.
7. Our standards: consultation, hygiene, aftercare, complaints.
8. Block 11.

### 7.5 Clinical skincare hub: `/skincare`

1. Header.
2. Two product rows: Kojivit Ultra, and Tretinoin with its consultation-required notice.
3. How collection works: reserve → clinic confirms → collect and pay in clinic.
4. FAQ.

### 7.6 Kojivit Ultra: `/skincare/kojivit-ultra`

Two columns: a packshot on a stone panel, beside the name, type, price, description, key ingredients and how to use. Actions: *Reserve via WhatsApp* and *Reserve by email* (both pre-filled), plus a note on collection and payment. Copy uses cosmetic claims only (§8.11).

### 7.7 Tretinoin: `/skincare/tretinoin` (D5, D8)

- **Notice** (top of page, prominent): *Prescription-only medicine. It cannot be bought online. It can only be supplied after you complete a medical questionnaire and our prescriber confirms it is suitable for you. Payment and collection take place in clinic.*
- **Product information:** strengths (0.025% and 0.1%), what it is, factual information, who it isn't suitable for, common side effects. No price-led promotion, and no *Buy* or *Add to basket*.
- **How it works:** 1 Questionnaire → 2 Clinical review → 3 Email confirmation if suitable → 4 Collect and pay in clinic.
- **Questionnaire** (a stepper with four steps plus a review screen):
  1. **Your skin:** concern, skin type, retinoid history.
  2. **Medical screening:** pregnancy, breastfeeding or planning a pregnancy; skin conditions; medications; allergies. Answers that rule out suitability stop the flow and explain why.
  3. **Preferences:** preferred strength, notes.
  4. **Your details and consent:** name, date of birth, phone, email, and consent to share health information through the chosen channel.
  - **Review:** *Send via WhatsApp* or *Send via email*, with a clear statement that sending is not a purchase.
- **Privacy:** a consent checkbox and a link to the privacy notice. The pre-filled message includes only what the clinic needs.

### 7.8 Contact: `/contact`

1. Header.
2. Channels: WhatsApp (primary), call, email.
3. Enquiry form: name, phone, email, interest (concern or treatment), preferred contact method, message, consent. Submitting composes a WhatsApp message or an email.
4. Visit panel: address, hours, nearest stations (client to confirm), *Get directions ↗*.

*Built in Module 2 without point 3*, so the header's call to action has somewhere to go; Module 14 adds the enquiry form.

### 7.9 404 and legal pages

- **404:** a short message with links to Treatments, Pricing and Contact.
- **Legal pages:** a simple prose template.

*Both legal routes exist from Module 2* with a short notice that the documents are being prepared, so the footer's legal links work. Module 14 replaces the notice with the client's copy.

---

## 8. Design language

### 8.1 Visual principles

- **Type-led:** hierarchy comes from the serif display scale and comfortable line lengths, not from containers.
- **Lines, not boxes:** 1 px hairlines divide rows, grids and panels. Almost no shadows.
- **Warm and light:** a cream canvas with stone panels. Night is used only behind the hero and in the footer.
- **One accent:** bronze marks detail and interaction (rules, icons, focus and active states), never large fills or gradients.
- **Square geometry:** sharp corners for layout, buttons, inputs and panels. Only chips and tags are fully rounded.

### 8.2 Colour tokens

Contrast ratios below were calculated for these exact values.

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--color-canvas` | `#FAF7F2` | Page background | — |
| `--color-surface` | `#FFFFFF` | Inputs, popovers | — |
| `--color-stone` | `#F4EFE6` | Tinted sections and panels | — |
| `--color-stone-strong` | `#EAE3D6` | Hover and pressed fills | Ink 13.5:1 (don't put ink-3 text on it) |
| `--color-ink` | `#1C1B18` | Headings, primary text, primary buttons | 16.1:1 on canvas |
| `--color-ink-2` | `#4A4740` | Body copy | 8.7:1 canvas · 8.1:1 stone |
| `--color-ink-3` | `#6F6A62` | Meta, captions, placeholders | 5.0:1 canvas · 4.7:1 stone |
| `--color-line` | `rgb(28 27 24 / 0.12)` | Hairlines and dividers | Decorative |
| `--color-line-strong` | `rgb(28 27 24 / 0.24)` | Stronger dividers, chip borders | Decorative |
| `--color-field` | `#8C877E` | Input borders | 3.6:1 white · 3.3:1 canvas (meets 3:1) |
| `--color-bronze` | `#A87F3D` | Icons, rules, large accents (≥ 24 px), focus ring | 3.4:1 canvas; **not for small text** |
| `--color-bronze-text` | `#7F6029` | Small bronze text and links on light backgrounds | 5.5:1 canvas · 5.1:1 stone |
| `--color-night` | `#141312` | Footer, hero scrim base | — |
| `--color-on-night` | `#F7F3EC` | Text on night | 16.8:1 |
| `--color-on-night-2` | `rgb(247 243 236 / 0.72)` | Secondary text on night | 9.0:1 |
| `--color-champagne` | `#D6BD8A` | Accents on night (monogram, rules, labels) | 10.2:1 on night |
| `--color-error` | `#9B3426` | Form errors, questionnaire stops | 6.8:1 canvas |

**Retired:** bronze gradients, bright gold `#D4AF37`, glow shadows, glassmorphism, bright red `#EF4444`.

### 8.3 Typography

- **Display and headings: Newsreader.** A variable font (weights 200–800, optical sizes 6–72, italics). Use light to regular weights (300–450) at display sizes; keep italic for occasional emphasis.
- **UI and body: Instrument Sans.** A variable font (weights 400–700, widths 75–100).
- **Loading:** self-hosted via `@fontsource-variable` (latin subset) with `font-display: swap`. Preload both woff2 files and use metric-adjusted fallbacks (Georgia, system-ui) to limit layout shift.
- **Validation:** checked visually against the AP monogram in the Module 1 style guide. Alternates if they don't sit right: Source Serif 4 and Hanken Grotesk.

| Style | Font | Size (fluid) | Line height | Tracking | Weight |
|---|---|---|---|---|---|
| Display XL (hero) | Newsreader | 44 → 88 px | 1.02 | −0.02 em | 350 |
| Display L (section titles) | Newsreader | 36 → 60 px | 1.05 | −0.015 em | 350 |
| Display M (statements) | Newsreader | 28 → 40 px | 1.15 | −0.01 em | 350 |
| Title (rows, panels) | Newsreader | 22 → 26 px | 1.2 | −0.005 em | 400 |
| Lede | Instrument Sans | 18 → 20 px | 1.6 | 0 | 400 |
| Body | Instrument Sans | 16 → 17 px | 1.65 | 0 | 400 |
| Small | Instrument Sans | 14 px | 1.5 | 0 | 400 |
| Label / eyebrow | Instrument Sans | 12 px uppercase | 1.4 | 0.14 em | 500 |
| Button | Instrument Sans | 13 px uppercase | 1 | 0.12 em | 500 |
| Numerals (prices, steps) | Instrument Sans | Contextual | — | Tabular figures | 500 |

- **Line length:** body copy at 60–75 characters; ledes no wider than 36 rem.
- **Wordmark:** live text, "ALLURE PASSIONS UK", in uppercase Newsreader tracked +0.18 em beside the AP monogram, with an optional "Fitzrovia · London" line beneath (component: `BrandLockup`). If the client has an official wordmark file, use that instead.

### 8.4 Layout and spacing

- **Grid:** 12 columns, 1320 px maximum content width, 24 px gutters (16 px on mobile), side padding `clamp(20px, 5vw, 64px)`.
- **Spacing scale (px):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160.
- **Section rhythm:** vertical padding `clamp(72px, 10vw, 144px)`; 48–64 px between a section header and its content.
- **Section header pattern:** on desktop, eyebrow and display title on the left (7 columns), with an optional lede or link on the right (4 columns) aligned to the title's baseline. Stacked on mobile.
- **Breakpoints:** 480 · 768 · 1024 · 1200 (nav collapses) · 1440.

### 8.5 Shape, lines and elevation

- **Radius:** 0 for layout, buttons, inputs and panels; 999 px for chips and tags; 50% only for icon buttons.
- **Hairlines:** 1 px `--color-line`. Hovered rows fill with `--color-stone`.
- **Shadows:** none, except on floating layers (menus, popovers): `0 16px 48px rgb(28 27 24 / 0.08)`.

### 8.6 Components

**Primitives:** Container · Section (tone: canvas, stone or night) · SectionHeader · Eyebrow · Heading · Prose · Divider · Button (primary, secondary, on-night) · ArrowLink · IconButton · Chip · Tag · Icon.

**Patterns:** Header and MegaMenu · MobileMenu · Footer · Breadcrumbs · CredentialsRibbon · SegmentedTabs · ChipGroup · IndexList · FactList / SpecCard · CredentialGrid · LogoRow · Rating · ReviewCarousel · MediaStrip · ProgrammeColumns · StepTimeline · Accordion · PriceTable · Notice · Stepper · form fields (TextField, TextArea, Select, RadioCards, Checkbox) · HeroVideo (with pause).

| Component | Spec |
|---|---|
| Button, primary | Ink fill with cream text; hover `#34312B`; min height 48 px; 0 radius; button label style; focus shows a 2 px bronze outline at 3 px offset |
| Button, secondary | Transparent with a 1 px ink border; hover inverts to an ink fill |
| ArrowLink | Label plus arrow; 1 px underline at 4 px offset; the arrow shifts 3 px on hover |
| Chip | 36 px tall pill with a `--color-line-strong` border; selected state is an ink fill with cream text |
| SegmentedTabs | Text tabs; the active tab has a 2 px bronze underline; arrow-key navigation |
| IndexList row | Min height 96–120 px with hairlines above and below; the whole row is clickable; hover adds a stone fill and shifts the arrow |
| SpecCard | Stone panel with a 1 px line border. Each row is a bronze icon (1.25 stroke), a label and a value; the CTA sits at the bottom; sticks 96 px from the top |
| Accordion | Question in the Title style with a +/− icon; 24 px vertical padding; hairline separators; animated height |
| Form field | White fill, 1 px `--color-field` border, 48 px tall. Label above; helper text or error (colour + icon + text) below |
| Notice | Stone panel with a 2 px left rule (bronze for info, ink for important); icon, title and body |

### 8.7 Imagery policy

- **Use:**
  - the hero video (the single media moment)
  - official accreditation logos (JCCP, GHP)
  - monochrome press wordmarks
  - product packshots, on skincare pages only
  - the Instagram strip
  - optionally, one practitioner portrait on the About page
- **Don't use:** decorative stock photography, image-backed cards, a photo per concern, device renders as decoration, before/after images on the homepage.
- **Where a section needs visual interest,** use type, numbers, tags, steps, hairline grids and subtle tint changes instead.

### 8.8 Iconography

`lucide-react` at 1.25 px stroke and 18–20 px: bronze on light backgrounds, champagne on night. Icons label information (spec rows, contact channels, credentials). Never use them as decorative clusters.

### 8.9 Motion

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 150 ms | Hover and colour changes |
| `--dur-base` | 250 ms | Tabs, chips, accordion, menus |
| `--dur-reveal` | 500 ms | Content revealed on first scroll into view |
| `--ease-out` | `cubic-bezier(0.2, 0, 0, 1)` | Entrances |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exits |

- **Intro (D3):** first visit in a session only. On a cream screen the AP monogram fades in, then the screen fades away, taking 900 ms or less in total. Skipped on repeat visits and for reduced-motion users.
- **Page transitions:** a 200 ms opacity cross-fade. Scroll goes to the top on new pages and is restored on Back.
- **Reveals:** opacity 0 → 1 with a 12 px rise, once, staggered 60 ms within a group. No content ever waits on an animation to become readable.
- **Removed:** the page curtain, parallax, split-word headline animation, count-ups, hover lifts.
- **Reduced motion:** no reveals and no video autoplay (the poster is shown); state changes are instant.

### 8.10 Accessibility (WCAG 2.2 AA)

- **Contrast:** text at least 4.5:1 (see the tokens above); non-text UI at least 3:1.
- **Keyboard:**
  - a skip link and a visible focus state on everything
  - roving focus for tabs and chips
  - the mobile menu traps focus and closes on Esc
  - labelled carousel buttons
- **Touch targets:** 44 px on touch UI (well above the 24 px minimum in 2.5.8).
- **Video:** a pause control, no audio, a poster fallback.
- **Semantics:**
  - landmarks, one H1 per page, headings in order
  - `aria-expanded`, `aria-controls` and `aria-selected` where they apply
  - labelled form fields, with errors linked through `aria-describedby`
- **Reflow:** no horizontal scrolling at 320 px wide; text works at 200% zoom.

### 8.11 Voice, copy and compliance

- **Voice:** warm, clear and clinical, in British English; short sentences, second person.
- **Claims:** no superlatives or guarantees ("world's most advanced", "permanent", "zero downtime", "pain-free"). Prefer "may help", "typically", "results vary". Quote figures only with a citable source. Don't lead with "FDA-cleared" for a UK audience.
- **Qualifications:** say "practitioner-led" and state real registrations and levels exactly. No "doctor-led" and no implied medical titles (D6).
- **Reviews:** genuine and sourced live only, linked to where they came from (DMCC Act).
- **Press:** real features only, each linked (D7).
- **Prescription medicine:** follow the wording in §7.7. Homepage references stay condition-led (P5). See R1.
- **Cosmetics (Kojivit):** cosmetic claims ("helps even the look of skin tone"), not medicinal ones ("treats melasma").
- **Booking language:** "Request a consultation", never "Book now" or "Buy now" (D9).
- **Never ship:** "Section X" labels, developer scaffolding text, or placeholder data.

---

## 9. Technical approach

- **Stack:** Vite 8 + React 19, unchanged; oxlint for linting.
- **Routing (P3):** `react-router` 8 in data-router mode, giving:
  - real links and a shared layout (header and footer)
  - a 404 page and scroll restoration
  - `?concern=` query parameters
  - redirects from legacy paths
- **Styling:**
  - `src/styles/tokens.css` holds every token as a CSS custom property.
  - `base.css` covers the reset, typography and focus styles.
  - Each component gets a co-located CSS file with `ap-` BEM-style class names.
  - No inline styles, no `!important`, no JS-driven hover styles. Legacy global CSS is deleted once its last consumer is replaced.
- **Content layer:** split `treatmentData.js` into `src/content/` modules (`clinic`, `concerns`, `treatments`, `programmes`, `pricing`, `products`, `credentials`, `press`, `faqs`), so copy can be reviewed and edited in one place.
- **Services:** `src/services/reviews.js` and `src/services/instagram.js` each expose one async interface. When unconfigured they report `configured: false`, and the UI hides whatever would be empty. Development fixtures are clearly marked and excluded from production.
- **Contact helpers:** `src/utils/contact.js` builds WhatsApp, email and phone links with encoded context messages. The phone number is defined in one place.
- **Metadata:** each route sets its own title and description (React 19 document metadata). Structured data describes the business (JSON-LD) and the FAQ (FAQPage). Static prerendering is an option for Module 15.
- **Performance budget:**
  - LCP ≤ 2.5 s (hero poster preloaded), CLS ≤ 0.1, INP ≤ 200 ms
  - initial JavaScript ≤ 180 kB gzipped
  - hero video ≤ 3 MB
  - images lazy-loaded with explicit dimensions
  - unused legacy assets removed from `public/`
- **Legacy strategy:** the old homepage sections were retired in Module 1, when the homepage switched to the new structure, and the old header and footer in Module 2. Only the old inner pages are left in `src/legacy/`, with scoped styles, until Modules 10–14 replace them; each is deleted once nothing uses it, and all of it remains in `main`'s history.

---

## 10. Implementation modules

**Every module follows the same loop:**

1. Build.
2. Verify in the browser:
   - desktop at 1440 px, tablet at 768 px, mobile at 375 px
   - keyboard use
   - reduced motion
   - a clean console
   - lint
3. Send you screenshots.
4. **Pause for your approval.**
5. Commit locally on `redesign`.

| # | Module | Scope | Done when |
|---|---|---|---|
| 1 | **Foundation** | Tokens, fonts, base CSS, primitives (Button, ArrowLink, Eyebrow, Heading, Section, Chip, Divider, Icon), router and layout shell, brief intro (D3), page fade, dev-only `/styleguide` | The style guide shows every token and primitive; routes work; curtain and old loader are gone |
| 2 | **Header & footer** | Desktop nav, Treatments mega menu, mobile menu, scroll behaviour, footer | No wrapping from 320 to 1920 px; works with keyboard and screen readers |
| 3 | **Hero & credentials ribbon** | Blocks 1–2, video pause control, re-encoded video and poster | Poster is the LCP element; pause works; reduced motion respected |
| 4 | **Concern finder** | Block 3 + concerns content | All 18 concerns mapped; URL hash works; keyboard tabs work |
| 5 | **Signature treatments** | Block 4 + treatments content | All six rows link to their detail routes |
| 6 | **Why Allure** | Block 5: welcome, credential grid, press row | Logos crisp; press links wired or flagged |
| 7 | **Reviews & Instagram** | Blocks 6–7 + data adapters | Sections degrade gracefully when unconfigured; no sample content in production builds |
| 8 | **Programmes & skincare teaser** | Blocks 8–9 | Pre-filled WhatsApp enquiries work |
| 9 | **FAQ & Begin** | Blocks 10–11; homepage complete; development placeholders removed | Homepage matches §6; FAQ structured data present |
| 10 | **Treatments & treatment detail** | `/treatments`, `/treatments/:slug` ×6 | Spec card stays sticky; pricing tables and related rows render |
| 11 | **Pricing** | `/pricing` | All 8 categories; category index; tables readable on mobile |
| 12 | **About** | `/about` | Credentials, awards, press and standards in place |
| 13 | **Clinical skincare** | `/skincare`, Kojivit page, Tretinoin page + questionnaire hand-off | Notice and flow match §7.7; validation works; WhatsApp and email hand-offs work |
| 14 | **Contact, 404 & legal** | `/contact`, 404, `/privacy`, `/terms` | Enquiry hand-off works; legal templates ready for copy |
| 15 | **QA & launch prep** | Accessibility audit, responsive sweep, performance, SEO and metadata, removal of legacy code and assets, retirement of the old spec | Lighthouse ≥ 95 for accessibility, SEO and best practices; no legacy imports remain |

---

## 11. Content and assets needed from the client

None of these block the build: modules use clearly marked placeholders until the real content arrives.

1. **Hero video:** a wider, calmer clip of the clinic (rooms, a practitioner at work, hands and equipment) to replace the current tight facial close-up. 20–30 seconds, no audio needed; we re-encode it.
2. **Press:** a link or issue details for each feature (Vogue, Tatler, Harper's Bazaar, GQ, ELLE), plus preferred logo files.
3. **Practitioner:** name, role, qualifications (with the Level 6 awarding body), JCCP registration or profile link, memberships, CPD highlights; optionally a portrait.
4. **Official artwork:** JCCP registrant logo, GHP winner logo pack, the AP monogram as an SVG (and the wordmark, if one exists).
5. **Google reviews:** a Google Business Profile link and a choice of provider (widget service or API).
6. **Instagram:** confirmation that the account is Business or Creator, and a choice of provider.
7. **Treatment facts** for each device: sessions, discomfort, downtime, time to results, contraindications and side effects, all clinically checked.
8. **Prices:** confirm every price-list figure, the Kojivit price (£85 vs £45/30 g), Contour Luxe (£4,489) vs Contour Advanced (£4,499), and the consultation fee.
9. **Clinic details:** opening hours, nearest stations, accessibility information, email address.
10. **Legal:** a privacy notice (including health information sent via WhatsApp or email), terms, and a complaints procedure.
11. **Copy sign-off:** concern descriptions, FAQ answers, programme inclusions.

---

## 12. Risk register

| ID | Risk | Decision | Mitigation built into the design |
|---|---|---|---|
| R1 | The named tretinoin product page may breach CAP 12.12 and the Human Medicines Regulations 2012, even with a disclaimer | Client-accepted (D5) | Not named on the homepage (P5); no price-led promotion and no basket; factual information including side effects; consultation-first flow. **Recommended:** free CAP Copy Advice review before launch. |
| R2 | Health information is sent over WhatsApp or email | Accepted (D8) | Explicit consent, a link to the privacy notice, only the fields that are needed; the submit step is pluggable so a secure backend can be added later |
| R3 | Placeholder reviews or Instagram posts reaching production | — | Adapters are disabled when unconfigured; development fixtures are excluded from builds |
| R4 | Unsubstantiated treatment claims | — | Copy rules in §8.11; facts list sent for client verification |
| R5 | Accessibility and weight of the autoplay video | — | Pause control, poster for reduced motion, encode ≤ 3 MB |
| R6 | SEO limits of a client-rendered single-page app | — | Per-route metadata, structured data, optional prerendering in Module 15 |

---

## 13. Rules carried over from the previous spec

**Still valid:**

- No booking engine.
- Detail lives on real inner pages, not modals.
- The header never wraps.
- No "Section X" labels.
- No glows or glassmorphism.
- High-contrast form fields.
- A consultation-led prescription journey, with payment and collection in clinic.
- A clean hero, with no floating badges or media docks.

**Updated:**

- The address is 76 Cleveland Street, Fitzrovia, W1T 6NB (not Knightsbridge).
- "Doctor-led" is removed.
- Cormorant Garamond and Inter are replaced.
- The loader is shortened to a brief logo intro.
- Press appears only with verified links.

**Retired:**

- The "Figma exact" alternating dark and cream rhythm.
- Bronze gradient buttons.
- Image-led sections.

---

## 14. Sources

- ASA/CAP: [Prescription for compliance – POMs and the Code](https://www.asa.org.uk/news/prescription-for-compliance-poms-and-the-code.html)
- ASA/CAP: [Stick to the script: prescription-only medicines and the Code](https://www.asa.org.uk/news/stick-to-the-script-prescription-only-medicines-and-the-code.html)
- ASA/CAP: [Healthcare: prescription-only medicines (websites)](https://www.asa.org.uk/advice-online/health-prescription-only-medicines-websites.html)
- ASA/CAP: [Enforcement notice: Botox and other botulinum toxin products](https://www.asa.org.uk/resource/enforcement-notice-botox.html)
- ASA/CAP: [CAP Code section 12: medicines, medical devices, health-related products](https://www.asa.org.uk/type/non_broadcast/code_section/12.html)
- MHRA: [Blue Guide, Appendix 6: advertising of medicines by online service providers](https://assets.publishing.service.gov.uk/media/6012d8c9d3bf7f05c2040b4e/Appendix_6.pdf)
- ASA: [Ruling on Dr Bunny Aesthetics](https://www.asa.org.uk/rulings/dr-bunny-aesthetics-a23-1218983-dr-bunny-aesthetics.html)
- CMA: [Fake reviews guidance (CMA208)](https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf)
- Lewis Silkin: [DMCC Act 2024 and fake and misleading consumer reviews](https://www.lewissilkin.com/insights/2025/03/10/dmcc-act-2024-and-fake-and-misleading-consumer-reviews)
- Google Maps Community: [Places API only returns 5 reviews](https://support.google.com/maps/thread/228420973/google-places-api-only-returns-5-reviews-when-google-my-business-account-has-62-reviews-in-tot?hl=en)
- Behold: [Meta shut down the Basic Display API](https://behold.so/updates/basic-display-api-deprecated/)
- W3C: [Understanding WCAG 2.2 SC 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
