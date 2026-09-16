/**
 * Treatment detail content (plan §7.1), keyed by slug.
 *
 * **Everything clinical here is a draft awaiting the clinic's confirmation**
 * (§11.7): durations, comfort, downtime, session counts, contraindications and
 * side effects. Copy follows §8.11 — "typically" and "may" rather than
 * promises, results described as varying, no "pain-free" and no "zero
 * downtime", and no claim carrying a figure we cannot source.
 */
export const treatmentDetails = {
  picoway: {
    overview:
      'PicoWay delivers laser energy in picoseconds — trillionths of a second. A pulse that short breaks pigment apart mechanically rather than by heating it, which is why it suits pigmentation and tattoo ink across a range of skin types, and why the surrounding skin is left largely undisturbed.',
    howItWorks: [
      { title: 'Assessment', detail: 'We identify the pigment, how deep it sits and your skin type, then set the wavelength and energy to match.' },
      { title: 'Photo-acoustic pulses', detail: 'Each pulse lasts a trillionth of a second, shattering pigment into particles small enough for the body to carry away.' },
      { title: 'Clearance between sessions', detail: 'Your lymphatic system clears the fragments over the following weeks, so the change appears between visits rather than on the day.' },
    ],
    expect: {
      before: 'Avoid sun exposure and self-tan for two weeks beforehand, and tell us about any medication you are taking, including antibiotics and retinoids.',
      during: 'Most people describe a series of quick snaps, like an elastic band against the skin. A facial session takes 45 to 60 minutes including preparation.',
      after: 'The area is usually pink and warm for an hour or two. Treated pigment often darkens before it lifts, which is expected.',
    },
    results:
      'Pigmentation is typically treated as a course of six sessions, three to four weeks apart. Tattoo removal depends on the ink, its depth and its colours, and usually takes longer. Results vary between people, and we review progress as the course goes on.',
    suitability:
      'Suitable for most skin types, including deeper tones, because the pulse works mechanically rather than by heat. Not suitable during pregnancy, over recently tanned skin, or alongside medicines that increase light sensitivity. Suitability is confirmed at consultation.',
    sideEffects: [
      'Redness and mild swelling for a few hours',
      'Temporary darkening of the treated pigment',
      'Pinpoint crusting on tattoo work, settling within about a week',
      'Uncommonly, temporary lightening or darkening of nearby skin',
    ],
    aftercare: [
      'High-factor sunscreen on the treated area every day',
      'No saunas, steam or vigorous exercise for 24 hours',
      'Leave any crusting alone',
      'Keep the area moisturised',
    ],
    faqs: [
      { question: 'Does it hurt?', answer: 'Most people find it manageable without anaesthetic and describe it as a quick snapping sensation. Tell us if you would like a topical numbing cream.' },
      { question: 'How soon will I see a change?', answer: 'Pigment usually lifts over the weeks after each session rather than immediately. Tattoo work fades gradually across a course.' },
      { question: 'Can it be used on melasma?', answer: 'It can form part of a melasma plan at low energy settings, usually alongside daily protection and a home regimen. Melasma is managed rather than cured.' },
    ],
    spec: { duration: '45–60 minutes', comfort: 'Brief snapping sensation', downtime: 'Minimal' },
    related: ['advatx', 'morpheus8'],
  },

  advatx: {
    overview:
      'ADVATx uses two wavelengths from one solid-state laser: 589 nm yellow light, absorbed by the blood in small vessels, and 1319 nm infrared, absorbed by water in the skin. That pairing lets one device address redness and vascular marks alongside general skin quality.',
    howItWorks: [
      { title: 'Yellow light on vessels', detail: 'The 589 nm wavelength is taken up by haemoglobin, so the energy lands in the vessel rather than the skin around it.' },
      { title: 'Infrared on the dermis', detail: 'The 1319 nm wavelength warms the deeper layer gently, encouraging the skin to remodel over the following weeks.' },
      { title: 'A course, not a single hit', detail: 'Energy is kept moderate and repeated, which is easier on the skin than fewer, stronger sessions.' },
    ],
    expect: {
      before: 'Come without make-up if you can, avoid sun exposure for two weeks, and tell us about any medication that affects light sensitivity.',
      during: 'A warm sensation with each pulse, and a cooling stream on the skin. A facial session takes about 45 minutes.',
      after: 'Mild flushing that usually settles within a few hours. Make-up can normally go back on the same day.',
    },
    results:
      'Redness and vascular marks are typically treated over a course of six sessions, two to four weeks apart. How much changes depends on the type of vessel and how long it has been there, and results vary between people.',
    suitability:
      'Suits inflammatory redness, rosacea, facial veins and sun damage, and is used for laser lip plumping. Not suitable over recently tanned skin, during pregnancy, or with photosensitising medication. Suitability is confirmed at consultation.',
    sideEffects: [
      'Flushing and warmth for a few hours',
      'Occasional mild swelling around treated vessels',
      'Temporary darkening of treated sun spots',
      'Uncommonly, small blisters where a vessel is close to the surface',
    ],
    aftercare: [
      'Sunscreen daily, and avoid direct sun for a week',
      'No heat treatments, saunas or hot yoga for 48 hours',
      'Keep skincare simple for two days — no acids or retinoids',
      'Cool compresses if the area feels warm',
    ],
    faqs: [
      { question: 'Is it suitable for rosacea?', answer: 'It is often used for the redness and visible vessels that come with rosacea. Rosacea itself is managed rather than cured, so plans usually combine treatment with daily skincare.' },
      { question: 'Can I have it before an event?', answer: 'Most people are presentable the same day, but leave at least a week where an event matters, so any flushing has fully settled.' },
      { question: 'How is lip plumping done without injections?', answer: 'The laser warms the tissue and stimulates hydration and collagen over a course. The effect is gradual and subtler than filler.' },
    ],
    spec: { duration: 'About 45 minutes', comfort: 'Warm pulses with cooling', downtime: 'Minimal' },
    related: ['picoway', 'sofwave'],
  },

  morpheus8: {
    overview:
      'Morpheus8 combines microneedling with radiofrequency: fine needles deliver energy below the surface, where collagen and the fat layer sit. Because the energy is placed at depth rather than across the surface, it suits laxity and textural change together — including acne scarring and stretch marks.',
    howItWorks: [
      { title: 'Numbing first', detail: 'A topical anaesthetic is applied and left to work before anything begins.' },
      { title: 'Energy at a set depth', detail: 'Needles pass through to a depth chosen for the area, and radiofrequency is delivered from their tips into the deeper layer.' },
      { title: 'Remodelling over months', detail: 'The controlled injury prompts new collagen. Change builds over three to six months rather than appearing at once.' },
    ],
    expect: {
      before: 'Stop retinoids and acids for a few days beforehand, and arrive with clean skin. Allow extra time for numbing.',
      during: 'Pressure and warmth rather than sharpness once the area is numb. A full face takes 60 to 90 minutes including preparation.',
      after: 'The skin is red and feels like mild sunburn, usually for 24 to 48 hours, with a fine grid pattern that fades over a day or two.',
    },
    results:
      'Usually a course of three sessions, four to six weeks apart. Collagen remodelling continues for months after the last session, so the full picture takes time. Results vary with age, skin condition and the area treated.',
    suitability:
      'Suits skin laxity, acne scarring, fine lines and stretch marks on the face and body. Not suitable during pregnancy, over active infection or inflamed acne, or with certain implanted devices. Suitability is confirmed at consultation.',
    sideEffects: [
      'Redness and a sunburn-like feeling for 24 to 48 hours',
      'A fine grid pattern that fades within a day or two',
      'Mild swelling, more noticeable around the eyes',
      'Occasional bruising or pinpoint scabbing',
    ],
    aftercare: [
      'No make-up for 24 hours',
      'Gentle cleansing and a bland moisturiser for three days',
      'Sunscreen daily, and no direct sun for two weeks',
      'No exercise, saunas or swimming for 48 hours',
    ],
    faqs: [
      { question: 'How much downtime should I plan for?', answer: 'Most people book it when they have a quiet day or two. Redness is usually the main thing, and it settles within 48 hours.' },
      { question: 'Will one session be enough?', answer: 'A course of three is typical. Collagen responds gradually, and spacing the sessions is part of how the treatment works.' },
      { question: 'Does it help acne scarring specifically?', answer: 'It is one of the treatments most often used for depressed scarring, because it works in the tissue underneath rather than on the surface.' },
    ],
    spec: { duration: '60–90 minutes with numbing', comfort: 'Pressure and warmth once numbed', downtime: '24–48 hours of redness' },
    related: ['sofwave', 'picoway'],
  },

  sofwave: {
    overview:
      'Sofwave uses synchronised ultrasound beams to warm a precise band of the mid-dermis without touching the surface or the tissue below it. That single fixed depth is what makes it a one-session treatment: the energy goes where collagen forms, and nowhere else.',
    howItWorks: [
      { title: 'Mapped in advance', detail: 'We map the area so passes overlap evenly and nothing is missed.' },
      { title: 'Ultrasound at one depth', detail: 'Parallel beams heat a band about 1.5 mm below the surface, while the applicator cools the skin above it.' },
      { title: 'Collagen over months', detail: 'New collagen forms in the treated band over the following three to six months, which is when lifting becomes visible.' },
    ],
    expect: {
      before: 'No special preparation beyond clean skin. Let us know about recent injectable treatment in the area.',
      during: 'Brief heat with each pulse, cooled by the applicator. A face and neck session takes 45 to 60 minutes.',
      after: 'Mild pinkness and sometimes slight swelling, usually gone within a few hours. Most people return to their day straight away.',
    },
    results:
      'Usually one session, with change appearing gradually over three to six months as collagen forms. Some people choose a second session after a year. How much lift occurs depends on skin quality and the degree of laxity to begin with, and results vary.',
    suitability:
      'Suits mild to moderate laxity on the brow, lower face, submental area and neck, and on the body. Less suited to significant sagging, where a surgical opinion is the honest answer. Not suitable during pregnancy or over active skin infection. Suitability is confirmed at consultation.',
    sideEffects: [
      'Pinkness for a few hours',
      'Mild swelling or tenderness for a day or two',
      'Occasional temporary numbness in the treated area',
      'Uncommonly, small firm areas under the skin that settle on their own',
    ],
    aftercare: [
      'Nothing is required — normal routine and skincare the same day',
      'Sunscreen daily, as always',
      'Avoid saunas and very hot showers for 24 hours',
      'Give it three months before judging the result',
    ],
    faqs: [
      { question: 'Is this the same as a facelift?', answer: 'No. It tightens and lifts gradually without surgery. Where laxity is significant, surgery gives a different order of change, and we will say so.' },
      { question: 'When will I see something?', answer: 'Usually from about three months, building to six. It is the slowest of our treatments to show, because it relies entirely on new collagen.' },
      { question: 'Can I have it alongside Morpheus8?', answer: 'They work at different depths and are sometimes planned together, spaced apart. We would set out the order at consultation.' },
    ],
    spec: { duration: '45–60 minutes', comfort: 'Brief heat with cooling', downtime: 'Minimal' },
    related: ['morpheus8', 'advatx'],
  },

  'emsculpt-neo': {
    overview:
      'Emsculpt Neo applies two things at once: radiofrequency, which warms fat tissue, and high-intensity electromagnetic energy, which contracts muscle far beyond what voluntary effort achieves. One 30-minute session addresses both in the same area, which is why it is used for contouring rather than weight loss.',
    howItWorks: [
      { title: 'Warming first', detail: 'Radiofrequency raises the temperature of the fat layer over the first few minutes, much as a warm-up would.' },
      { title: 'Supramaximal contractions', detail: 'Electromagnetic pulses contract the muscle thousands of times in a way voluntary effort cannot reproduce.' },
      { title: 'Change over weeks', detail: 'Muscle and fat respond over the weeks after the course, so the result builds after the last session.' },
    ],
    expect: {
      before: 'Eat normally and drink water beforehand. Wear clothing that gives access to the area.',
      during: 'Intense but not painful contractions and a feeling of warmth. Each session lasts 30 minutes, and you lie still throughout.',
      after: 'Similar to having trained hard: the muscle may ache for a day. Nothing prevents you going about your day.',
    },
    results:
      'Typically six sessions over three weeks. Published figures for fat and muscle change exist but vary by study and by person, so we will not quote one here — we measure your own body composition through the course instead. Results depend on where you start and on keeping the habits that got you there.',
    suitability:
      'Suits abdomen, buttocks, arms, thighs and calves where there is a moderate amount of fat over the muscle. Not suitable during pregnancy, or with metal implants, a pacemaker or another electronic implant in the area. Suitability is confirmed at consultation.',
    sideEffects: [
      'Muscle soreness for a day or two, as after exercise',
      'Warmth and redness in the treated area',
      'Occasional temporary muscle spasm',
    ],
    aftercare: [
      'Drink water and eat normally',
      'Move as usual — there is no rest period',
      'Keep training and eating as you were, so the work holds',
      'Tell us if soreness lasts beyond a couple of days',
    ],
    faqs: [
      { question: 'Is this a weight-loss treatment?', answer: 'No. It reshapes an area rather than changing the number on the scales, and it works best alongside the diet and training you already do.' },
      { question: 'How long do results last?', answer: 'Muscle and fat respond to how you live. Results hold with regular activity and a stable weight, and many people return for maintenance sessions.' },
      { question: 'Can I combine it with Emerald Laser?', answer: 'Yes — the two are paired in the clinic’s contour programmes, and the plan sets out the order.' },
    ],
    spec: { duration: '30 minutes', comfort: 'Intense contractions, not painful', downtime: 'Minimal, some muscle soreness' },
    related: ['emerald-laser', 'morpheus8'],
  },

  'emerald-laser': {
    overview:
      'Emerald Laser uses low-level green light at 532 nm across a treatment area. Nothing is heated, cut or suctioned: the session is entirely non-invasive, which is why it is used across larger areas and alongside muscle work rather than on its own.',
    howItWorks: [
      { title: 'Green light across the area', detail: 'Ten laser heads are positioned above the area, covering it evenly without touching the skin.' },
      { title: 'Low-level, no heat', detail: 'The light is low-level, so there is no heating sensation and nothing to recover from.' },
      { title: 'A course over weeks', detail: 'Sessions are repeated over several weeks, and the effect is assessed by measurement rather than by eye.' },
    ],
    expect: {
      before: 'Drink water and avoid a heavy meal immediately beforehand. Wear something easy to change out of.',
      during: 'You lie under the laser heads for about 45 minutes and feel very little. Many people find it restful.',
      after: 'Nothing to recover from. Movement afterwards — a walk is enough — is encouraged.',
    },
    results:
      'Usually a course of ten sessions. Circumference is measured through the course, so progress is recorded rather than estimated. Results vary between people and depend on diet, activity and hydration alongside the sessions.',
    suitability:
      'Suits the waist, hips, thighs and arms where the aim is contouring rather than weight loss. Not suitable during pregnancy or where there is an active medical condition affecting the area. Suitability is confirmed at consultation.',
    sideEffects: [
      'Very few reported; the treatment is non-invasive and does not heat tissue',
      'Occasional mild light-headedness on standing after a session',
    ],
    aftercare: [
      'Drink water through the course',
      'Move afterwards — a short walk supports the process',
      'Keep diet and activity steady so the measurements mean something',
      'Attend the full course; results are assessed across it, not after one session',
    ],
    faqs: [
      { question: 'Does it feel like anything?', answer: 'Very little. You lie under the laser heads and most people find the session restful.' },
      { question: 'How is progress measured?', answer: 'By circumference measurements taken through the course, so what changes is recorded rather than guessed at.' },
      { question: 'Is it a substitute for diet and exercise?', answer: 'No. It contours an area alongside how you eat and move, and works best when those stay steady.' },
    ],
    spec: { duration: 'About 45 minutes', comfort: 'Little sensation', downtime: 'Minimal' },
    related: ['emsculpt-neo', 'morpheus8'],
  },
};
