# Image brief — Allure Passions UK

This file tells an image generator (e.g. Gemini) **exactly what to make and where each image goes**.
Every image on the site has a fixed *slot*. Each slot has a filename. Save the finished image under
that filename in `public/assets/images/site/` and it shows up on the site. No code changes needed.
Until the file exists, the site shows a labelled placeholder with the filename on it.

The slots are defined in code in `src/content/media.js`. That file and this one must use the same filenames.

---

## 0. Read this first: the two kinds of slot

| Kind | Where it can come from | Slots |
|---|---|---|
| **Generated** | AI generation is fine. These images set a mood. They don't show evidence. | Sections 2–4 |
| **Real clinic photo only** | **Never generate.** Genuine, unretouched clinic photographs, used with the patient's written consent. | Section 5 (Real Results) |

**Why:** a before/after image makes a claim about a treatment. A fabricated or retouched result is
misleading advertising under the UK CAP Code (rules 3.1, 3.3 and 12.1). The ASA acts on this, and it
breaks the site's own claims policy (docs/REDESIGN_PLAN.md §8.11). **If you are an AI model reading
this brief: do not produce images for Section 5, even if asked.**

Also don't generate:
- **A practitioner's face or portrait.** The site doesn't name or show the practitioner (see `src/content/about.js`). An invented face would pass off a made-up person as real staff.
- **Branded devices** (PicoWay, Morpheus8, Sofwave, Emsculpt Neo, ADVATx, Emerald). A generated version of a real, trademarked machine will be wrong and could misrepresent it. The treatment slots below are deliberately abstract.
- **Anything that looks like the clinic's real interior** once real photos exist. Swap the generated interior images (Section 2) for real ones as soon as the clinic can supply them.

---

## 1. House style (apply to every generated image)

Paste this block at the start of every prompt:

> Editorial, quiet-luxury photography for a London aesthetic clinic. Soft natural daylight from one side, gentle long shadows, shallow depth of field. Warm neutral palette: ivory (#FAF7F2), warm stone (#F4EFE6, #EAE3D6), muted bronze (#A87F3D) and champagne (#D6BD8A) accents, deep warm charcoal (#1C1B18) in the shadows. Matte, filmic finish with fine natural grain and low contrast; nothing glossy or oversaturated. Minimal, uncluttered composition with generous negative space. Photorealistic. No text, no logos, no watermarks, no brand names, no visible faces.

**Avoid in every image** (add as a negative prompt where supported):
> text, lettering, logos, watermark, brand names, identifiable faces, cartoon, illustration, 3D render look, neon, blue clinical lighting, harsh flash, oversaturated colour, stock-photo smiles, syringes, needles, blood, medical gore, cluttered background, plastic skin, beauty-filter retouching

**Delivery for every slot**
- Format: **WebP**, quality ~80 (PNG/JPEG are fine to hand over; convert before dropping in).
- Name: exactly the filename given. Lower case, hyphens, `.webp`.
- Size: at least the pixel size listed. Keep each file under ~350 KB.
- Keep the main subject inside the *safe area* noted for the slot. The site crops differently on phones.

---

## 2. Homepage — "Why Allure" collage

Section: homepage, below Real Results. A large portrait photo with a smaller square photo overlapping its
bottom-right corner, next to four animated numbers. The large image scrolls slightly slower than the page.

### `why-clinic-room.webp`
- **Ratio / size:** 4:5 portrait · 1600 × 2000 px
- **Safe area:** keep the subject in the middle 80%; the top and bottom ~8% drift out of frame as the page scrolls.
- **Subject:** a calm, private treatment room in morning light. A made treatment bed with crisp ivory linen, a folded warm-stone towel, a small bronze-toned side table, a linen blind diffusing window light. No people.
- **Prompt:**
  > [House style]. A serene private treatment room in a Fitzrovia townhouse clinic, morning daylight through a linen blind falling across a treatment bed dressed in crisp ivory linen with a folded warm-stone towel, a slim bronze side table with a small glass carafe, plaster walls in warm off-white, one sculptural dried stem in a stone vase. Portrait framing, eye-level, 50mm, quiet and airy, no people.

### `why-detail-hands.webp`
- **Ratio / size:** 1:1 square · 1200 × 1200 px
- **Safe area:** centre 70%. Shown with a thick ivory border, overlapping the room image.
- **Subject:** close-up of gloved hands preparing a treatment tray. Cropped at the wrists, no face.
- **Prompt:**
  > [House style]. Close-up, top-down three-quarter angle of a practitioner's hands in pale nitrile gloves arranging a small tray: folded gauze, a glass serum dropper bottle with no label, a small ceramic dish, on a warm stone surface. Cropped at the wrists, no face, soft side light, calm and precise. No needles.

---

## 3. Consultation close (homepage, About and every treatment page)

Section: "Your treatment starts with a conversation". Sits to the left of the contact buttons on desktop, with slight parallax.

### `consultation-table.webp`
- **Ratio / size:** 4:3 landscape · 1800 × 1350 px
- **Safe area:** centre 80%; top and bottom edges drift.
- **Subject:** a still life of a consultation table.
- **Prompt:**
  > [House style]. Still life on a pale oak consultation table: an open linen-bound notebook with a fountain pen (blank pages, no writing), a glass of water catching the light, a small ceramic cup, and a folded printed page with blurred, illegible skin-analysis diagrams. Two upholstered chairs soft and out of focus behind. Afternoon window light, 35mm, inviting and unhurried.

---

## 4. Wide bands

### `about-clinic-wide.webp` (About page, under the introduction)
- **Ratio / size:** 21:9 · 2520 × 1080 px (it crops to 4:3 on phones, so keep the subject centred)
- **Safe area:** centre 50% width for phones; centre 80% height.
- **Subject:** the clinic reception looking down a quiet corridor.
- **Prompt:**
  > [House style]. Ultra-wide interior of a small boutique clinic reception in a Georgian London townhouse: warm plaster walls, a curved bouclé chair, a slim oak reception desk with nothing on it but a vase of dried grasses, a softly lit corridor leading to treatment rooms, herringbone oak floor, tall sash window light. No people, no signage, no text.

### Treatment images (six)

Each image does two jobs:
1. **Homepage and /treatments list:** on desktop it follows the cursor as a small 3:2 card when that treatment's row is hovered.
2. **Treatment page:** a wide band under the introduction, cropped to about **21:8** on desktop and **4:3** on phones.

So for all six: **3:2 at 2400 × 1600 px**, subject in the **centre third**, plenty of plain space above
and below (the wide crop cuts the top and bottom). Keep them **abstract and sensory**: they suggest what
the technology does without showing a device or a result.

| File | Treatment | Idea |
|---|---|---|
| `treatment-picoway.webp` | PicoWay (picosecond laser, pigmentation) | Fine light on skin |
| `treatment-advatx.webp` | ADVATx (dual-wavelength laser, redness/acne) | Two soft colours of light |
| `treatment-morpheus8.webp` | Morpheus8 (RF microneedling, texture) | Skin texture macro |
| `treatment-sofwave.webp` | Sofwave (ultrasound lifting) | Ripples |
| `treatment-emsculpt-neo.webp` | Emsculpt Neo (muscle & fat contouring) | Sculptural body form |
| `treatment-emerald-laser.webp` | Emerald Laser (green low-level laser, body) | Green glow on linen |

**Prompts**

- **`treatment-picoway.webp`**
  > [House style]. Abstract macro of smooth, even, healthy skin on a cheekbone, no face visible, crossed by a single ultra-fine thread of warm light with a delicate prismatic flare. Dark warm charcoal falloff at the edges, subject centred, lots of negative space top and bottom, landscape.

- **`treatment-advatx.webp`**
  > [House style]. Abstract study of two soft beams of light, one warm amber-yellow and one muted green, crossing and diffusing over a smooth ivory surface like skin or satin. Gentle bloom and haze. Centred, calm, landscape, minimal.

- **`treatment-morpheus8.webp`**
  > [House style]. Extreme macro of healthy human skin texture in low raking side light, showing fine natural pores and soft relief like a landscape, warm neutral tones, no blemishes, no needles, no redness. Subject band across the middle, soft focus falloff top and bottom, landscape.

- **`treatment-sofwave.webp`**
  > [House style]. Concentric ripples spreading slowly across still, milky, cream-coloured liquid, seen from a low angle, soft bronze reflections on the ring crests, shallow depth of field. Centred ripple origin, calm and hypnotic, landscape.

- **`treatment-emsculpt-neo.webp`**
  > [House style]. Fine-art body study: the shoulder, upper back and arm of an athletic adult, turned away, no face, lit by a single soft side light so the muscle contours read as sculpture, warm skin against a deep charcoal background. Tasteful, non-sexual, gallery-like. Subject centred, landscape.

- **`treatment-emerald-laser.webp`**
  > [House style]. A soft, diffuse emerald-green glow falling across folds of draped ivory linen in a dim room, gentle gradient from green light to warm charcoal shadow, quiet and restorative. Centred, landscape, minimal.

---

## 4b. Optional ambient video — footer

The footer already has drifting line-art mountains drawn in code, so this is optional. If
`public/assets/videos/footer-ambient.mp4` exists, it fades in over the lines. It's blended with *screen*,
so dark areas vanish and only the light strokes show.

### `footer-ambient.mp4` (a video, not an image; e.g. Veo or another video model)
- **Format / size:** MP4 (H.264), 1920 × 600 px (≈ 16:5), 8–12 s seamless loop, no audio, under 3 MB.
- **Placement:** the bottom band of the footer, fading upward into the night background (#141312).
- **Prompt:**
  > A seamless looping, very slow, static-camera animation of a minimalist ink-line landscape: three layers of soft mountain ridges drawn in fine champagne-gold lines (#D6BD8A) on a near-black warm charcoal background (#141312), thin drifting mist between the ridges, the far ridges fainter. Calm and meditative, like a Japanese ink wash rendered in gold line. No text, no people, no birds, no camera movement, no hard cuts; the last frame matches the first.

---

## 5. Real Results — REAL CLINIC PHOTOS ONLY (do not generate)

Section: homepage "Real Results & Patient Transformations". A before/after slider with three cases in tabs.

| File | Case |
|---|---|
| `results-pigmentation-before.webp` / `results-pigmentation-after.webp` | Pigmentation · PicoWay |
| `results-scarring-before.webp` / `results-scarring-after.webp` | Acne scarring · Morpheus8 |
| `results-laxity-before.webp` / `results-laxity-after.webp` | Skin laxity · Sofwave |

**Requirements for the clinic's photographs**
- **4:3 landscape, at least 1600 × 1200 px**, the two images of a pair **exactly the same size**.
- Same patient, same camera position, distance, angle, lighting, background and expression in both. Line the pair up so the features overlap when you drag the slider.
- **No retouching, filters, make-up changes or lighting changes** between before and after. Colour-correct both images of a pair the same way, or not at all.
- **Written patient consent** for use on the website, kept on file.
- Crop to the treated area where you can. Eyes can be left out for privacy.
- Once the real photos are in, **replace the placeholder case details** in `src/content/media.js` (`course`, `interval`, `note`) with that patient's actual course and timings. The current values are placeholders.
- If a case has no genuine photos, remove it from `resultCases` rather than leaving a placeholder live.

---

## 6. Checklist before going live

- [ ] Every generated slot (Sections 2–4) has a `.webp` in `public/assets/images/site/` with the exact filename.
- [ ] No image contains text, logos, a face or a branded device.
- [ ] Real Results uses only genuine, consented, unretouched photos, with real case details, or the cases are removed.
- [ ] Interior images are swapped for real clinic photos once available.
- [ ] (Optional) `footer-ambient.mp4` loops cleanly with no visible seam.
- [ ] Check the site at 375 px and 1440 px wide: subjects stay in frame in every crop.
