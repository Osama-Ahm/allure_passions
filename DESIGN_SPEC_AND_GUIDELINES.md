# ALLURE PASSIONS UK — DEFINITIVE DESIGN SPECIFICATION & GUIDELINES
**Project**: Allure Passions UK Aesthetic Clinic (`c:\WireFrameStudios\Clients\Allure_Passions_UK`)  
**Document Type**: Architectural Specification, Design Guidelines & Project History  
**Status**: Active Master Reference — **STRICT CODE FREEZE IN EFFECT (NO CODE EDITS UNTIL EXPLICITLY AUTHORIZED)**  
**Target Location**: 189 Brompton Road, Knightsbridge, London, SW3 1NE (Moments from Harrods)  

---

## 1. Executive Summary & Purpose of this Document

This document serves as the single source of truth for the digital presence of **Allure Passions UK Aesthetic Clinic**. It captures:
1. **The Foundational Baseline**: A comprehensive analysis of the client's original Figma prototype (`Abigail-mock-1`), which constitutes the non-negotiable aesthetic and structural foundation.
2. **Complete Client Brief & Timeline of Instructions**: Every directive, constraint, and clarification provided by the client and lead designer across the entire engagement.
3. **The "Hall of Shame" / What NOT To Do**: An exhaustive autopsy of rejected design iterations, generic AI tropes, and UX missteps that must **never** be repeated.
4. **The Subtle Elevation Blueprint**: Precise technical, visual, and architectural guidelines to elevate the Figma design subtly and prestigiously without gaudiness or artificial complexity.

---

## 2. Foundational Baseline: In-Depth Analysis of the Figma Design

### 2.1 Prototype Details & Links
* **Figma Prototype URL**:  
  [`https://www.figma.com/proto/9rIeoLSIvflZ3DQvLKOFKE/Abigail-mock-1?node-id=2-12&viewport=12763%2C440%2C1.16&t=C9sBt85OjYY6JK78-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1`](https://www.figma.com/proto/9rIeoLSIvflZ3DQvLKOFKE/Abigail-mock-1?node-id=2-12&viewport=12763%2C440%2C1.16&t=C9sBt85OjYY6JK78-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1)
* **File Key**: `9rIeoLSIvflZ3DQvLKOFKE`
* **File / Canvas Title**: `ALLURE PASSION mock 1` (Node ID: `2-12`, Page ID: `0:1`)
* **Canvas Coordinates**: `x: -10400.0, y: 0.0`, Canvas Width: `1440px`, Total Height: `14,180px`

### 2.2 Core Design Language & Visual Anatomy
The client's clear instruction is: **"Make this, but better. Keep that as a base and work on top of it."**  
The Figma prototype demonstrates an unmistakable editorial restraint and British high-aesthetic dignity:

1. **Restrained Editorial Typography**:
   - High-contrast serif headlines (e.g., Cormorant Garamond / Didot styling) paired with clean, ultra-legible geometric grotesque sans-serif body copy (Inter / Whyte / Apercu).
   - Generous letter spacing on uppercase labels, tracked-out category tags, and delicate italic accents for clinical taglines.
2. **Negative Space & Breathing Room**:
   - The layout relies on spacious vertical padding (`96px` to `140px` section gaps).
   - Content is never crammed; cards have comfortable interior padding (`32px` to `48px`), allowing imagery and typography to command the eye naturally.
3. **Understated Warm Color Harmony**:
   - Background: Soft, warm organic cream and French ivory tones (`#FAF7F2` to `#F5F0EA`), avoiding cold clinical hospital white (`#FFFFFF` only used as crisp elevated card surface) and avoiding pitch-black nightclub dark mode.
   - Text: Deep warm charcoal / obsidian (`#1C1B18`) for headline hierarchy and soft warm slate (`#4A4740`) for secondary prose.
   - Accents: Hairline bronze gold borders (`rgba(168, 127, 61, 0.20)`) and matte bronze buttons (`#A87F3D`), never reflective neon yellows or synthetic metallic foils.
4. **Navigation & Header Elegance**:
   - The Figma design uses a clean, uncluttered navigation bar.
   - A polished brand logo is paired with minimal primary links and an elegant menu trigger (drawer/hamburger) rather than trying to stuff the entire site's directory into the top horizontal bar.
   - Absolutely **zero text wrapping** in the navbar.
5. **The "Make This But Better" Directive**:
   - Elevating does **not** mean replacing the layout with complex multi-layered 3D components, glowing borders, or futuristic dashboards.
   - It means:
     - Improving responsiveness across viewports.
     - Incorporating real, high-resolution clinic assets (walkthrough video and authentic treatment photography).
     - Implementing silky smooth page transitions and micro-interactions (e.g., subtle button hover lifts, clean drawer reveals).
     - Ensuring bulletproof frontend engineering standards (W3C compliance, zero layout shift, impeccable contrast).

---

## 3. Complete Timeline of Client Requirements & User Instructions

### 3.1 Initial Client Brief & Core Business Rules
* **Brand Name**: Allure Passions UK (Allure Passions UK Aesthetic Clinic)
* **Clinic Heritage & Official Address**:  
  `189 Brompton Road, Knightsbridge, London, SW3 1NE` (Directly opposite Harrods / South Kensington).
* **Clinical Accreditations & Honours**:
  - **GHP 2026 Winner**: *Best Advanced Skin & Body Aesthetics Clinic 2026 – London* (Global Health & Pharma Global Excellence Awards).
  - **JCCP Registered**: Joint Council for Cosmetic Practitioners (Strict UK government-recognized patient safety and ethical guidelines).
  - **Level 6 Medical Aesthetic Practice**: Advanced dermal therapy, laser physics, and histology certification.
* **Three Critical Ground Truth Clarifications (Direct Client Q&A)**:
  1. **E-Commerce & Prescription Medicine**:  
     *Question*: "Since the e-commerce functionality will only send a request rather than process the order directly, would payment be made physically at the clinic when the customer collects the order?"  
     *Client Answer*: **"Yes."**  
     *Rule*: UK law strictly prohibits unrestricted direct online checkout for Prescription-Only Medicines (POM) like Tretinoin. The digital portal must function as a Medical Suitability Request $\to$ Clinical Review $\to$ Physical in-clinic consultation, payment, and collection.
  2. **Landing Page vs. Interior Pages**:  
     *Question*: "For the main landing page, would you prefer to have all the information and pricing displayed there, or serve as an introduction with full details on inner pages?"  
     *Client Answer*: **"Further info will be in interior pages."**  
     *Rule*: The homepage must **never** be a monolithic data dump. It acts strictly as an alluring hook/introduction. Comprehensive clinical data, downtime specifics, technology mechanics, and full multi-session pricing tables belong on **legitimate, dedicated inner pages**.
  3. **Appointment Booking Integration**:  
     *Question*: "Would you also like us to integrate an appointment booking system into the website?"  
     *Client Answer*: **"No."**  
     *Rule*: **DO NOT INCLUDE AN APPOINTMENT BOOKING ENGINE, CALENDAR SCHEDULER, OR BOOKING FORM.** Inquiries are handled via consultation contact requests, direct phone (`+44 7342 052249`), or WhatsApp/email.

---

### 3.2 The 10 Sections of the Homepage Hierarchy
The client established a strict 10-section narrative arc for the landing page:

* **Section 1 — Hero Banner / First Impression**:
  - Engaging visual introduction: cinematic video walkthrough showing the clinic experience, treatment suites, and advanced technology.
  - Messaging establishes Allure Passions UK as London's premier destination for skin, body, and cellular wellness concerns.
  - **Clean & Uncluttered**: Video loops in the background, **permanently muted**, with no play/pause widgets and no floating badge clutter.
  - Simple, elegant dual pathway leading into:
    1. *Explore Your Concern / Treatment Area*
    2. *Most Sought-After Treatments*
* **Section 2 — Welcome to Allure Passions UK Aesthetic Clinic**:
  - Concise editorial welcome to the Knightsbridge practice.
  - Highlights non-invasive skin health, body contouring, cellular vitality, and the GHP 2026 London award.
  - Soft invitation to explore the clinic's philosophy on dedicated interior pages.
* **Section 3 — Clinical Authority & Credentials**:
  - Patient trust foundations: JCCP accreditation, Level 6 practitioner qualifications, manufacturer masterclass certifications (Cynosure PicoWay, InMode Morpheus8, Sofwave, BTL Emsculpt Neo, Erchonia Emerald).
  - Clear, grounded editorial presentation — no generic floating AI cards or neon shields.
* **Section 4 — Most Sought-After Treatments**:
  - Highlights the 6 flagship technologies:
    1. **PicoWay® Laser** (Picosecond pigment shattering, acne scars, tattoo removal)
    2. **ADVATx® Laser** (Dual-wavelength 589nm/1319nm vascular clarity, rosacea, acne, lip plumping)
    3. **Morpheus8™** (Subdermal fractional RF microneedling, deep tightening & remodeling)
    4. **Sofwave™ SUPERB™** (Ultrasound parallel beam collagen lifting for face, neck & brow)
    5. **Emsculpt Neo®** (HIFEM+ magnetic contractions + RF fat elimination)
    6. **Emerald™ Green Laser Lipo** (532nm cold laser circumference reduction & cellular detox)
  - Teaser format with starting rates, linking out to **dedicated individual treatment pages**.
* **Section 5 — What We Treat (Personalised Treatment Pathways)**:
  - Interactive concern assessment matching 18 clinical indications across Skin, Body Contouring, Laser, Skin Tightening, and Wellness.
  - Leads prospective patients to discover their recommended clinical protocol.
* **Section 6 — Industry Honours & Accreditations**:
  - Formal presentation of the GHP Global Excellence Award 2026, JCCP registration seal, and CPD certification badges.
* **Section 7 — Live Verified Patient Experiences**:
  - Genuine 5.0-star patient reviews from Kensington, Mayfair, Chelsea, and Marylebone clients.
  - Specific focus on visible treatment outcomes (e.g., Morpheus8 jawline tightening, PicoWay melasma clearance).
* **Section 8 — Social Media & Behind the Scenes (@allurepassionsuk)**:
  - Curated Instagram grid showcasing clinic interiors, technology demonstrations, and practitioner insights.
* **Section 9 — Featured Signature Packages & Multi-Technology Programs**:
  - Highlights signature multi-modality courses:
    - *Allure Contour Synergy* (6 Sessions Emsculpt Neo®)
    - *Allure Contour Luxe* (6 Sessions Emsculpt Neo® + 6 Emerald™ Green Laser Lipo)
    - *Allure Contour Advanced* (Neo® + Emerald™ + Dermal Mesotherapy)
    - *Cosmelan® Depigmentation Protocol* (In-clinic 2-phase depigmentation mask + 6-month homecare)
* **Section 10 — Medical Skincare & Prescription Hub**:
  - **Kojivit Ultra Cream** (Over-the-counter clinical hyperpigmentation cream).
  - **Tretinoin Cream 0.025% & 0.1%** (Prescription retinoid protocol with online medical suitability questionnaire, physical in-clinic clinician review, payment, and collection).

---

## 4. The "Hall of Shame" — Comprehensive Autopsy of Rejected Patterns (WHAT NOT TO DO)

To ensure future iterations never repeat past mistakes, the following designs, components, and concepts were **explicitly reviewed and rejected by the user**:

### ❌ 1. The Booking Engine Trap
* **What was done**: Added "Book Assessment" buttons, booking modals with calendar pickers, date/time select dropdowns, and dedicated `/booking` page forms.
* **Why it was rejected**: The client explicitly said **"No"** to integrating an appointment booking system in the initial brief. Aesthetic medical consultations at this level are bespoke and managed via direct practitioner contact or clinic inquiries, not generic automated calendar slots.
* **The Rule**: **NEVER display an appointment booking system, date picker, or booking form.** CTAs must read *"Enquire Regarding Treatment"*, *"Request Medical Assessment"*, or direct patients to phone / WhatsApp.

### ❌ 2. Overcrowded & Cluttered Hero Section
* **What was done**: Stuffed the hero banner with:
  - Floating pill: `"GHP Global Excellence Awards 2026 Winner"`
  - Floating pill: `"189 Brompton Road, Knightsbridge, SW3 1NE"`
  - Floating pill: `"Knightsbridge Clinic Walkthrough"` (which didn't link anywhere)
  - Direct pathways button block with multiple concern tags
  - Floating media control dock with Play, Pause, Mute, and Volume sliders
* **Why it was rejected**: The hero looked like an overstuffed promotional flyer rather than a world-class luxury medical clinic. The floating pills looked cheap and amateurish.
* **The Rule**: Keep the Hero Section clean, cinematic, and calm.
  - The background video must loop seamlessly with a soft vignette scrim.
  - **Permanently mute the video**. Remove all media controls (play/pause/volume toggles).
  - Remove all floating address pills, award badges, and dummy walkthrough links from the hero viewport.
  - Use simple, dignified headline typography and a maximum of two elegant CTAs.

### ❌ 3. Navbar Text Wrapping & Congestion
* **What was done**: Attempted to cram the clinic's full street address, award text, phone number, multi-page links, and action buttons into the top header container.
* **Why it was rejected**: At typical screen widths, text broke onto multiple lines inside small containers, creating an ugly, disjointed layout that broke professional design standards.
* **The Rule**: The navbar must be minimal, spacious, and disciplined. Logo on the left, streamlined primary links in the center (or tucked into a luxury drawer), and a single subtle contact trigger on the right. **Zero text wrapping is permitted under any viewport width.** Incorporate the menu drawer pattern seen in the Figma design.

### ❌ 4. Artificial "Section X" Badges (Generic AI Scaffolding)
* **What was done**: Left literal development labels across the page:
  - `Section 2 — Welcome to Allure Passions UK`
  - `Section 3 — Clinical Authority & Credentials`
  - `Section 4 — Signature Technologies`
  - `... through Section 10`
* **Why it was rejected**: Dead giveaway of an AI prompt template. Real high-end editorial websites use authentic, elegant section headlines, never robotic numbered scaffolding.
* **The Rule**: Remove all "Section X" numbering from UI components completely.

### ❌ 5. Generic AI Glows, Glassmorphism & Neon Cards
* **What was done**: Applied heavy CSS backdrop filters, glowing gold box-shadows (`box-shadow: 0 0 25px rgba(212, 175, 55, 0.4)`), bright yellow gold borders, and floating plastic cards (specifically in Section 3 and Section 4).
* **Why it was rejected**: Looked like a generic crypto/SaaS AI template rather than an authentic Knightsbridge medical clinic.
* **The Rule**: Use flat, warm ivory surfaces with ultra-delicate hairlines (`1px solid rgba(168, 127, 61, 0.15)`), generous padding, and crisp typography.

### ❌ 6. Popup Modals in Place of Legitimate Inner Pages
* **What was done**: Used modal popups for "About", "Price List", and "Treatment Detail" instead of actual dedicated interior page views.
* **Why it was rejected**: The user repeatedly demanded: *"I explicitly asked you to create inner pages and not just popups for further information... need just enough info on main landing page to keep people interested and for further info they need to travel TO LEGITIMATE INNER PAGES OF THE WEBSITE."*
* **The Rule**: Modals are strictly reserved for short interactive forms (e.g. Tretinoin medical intake). All treatments, complete pricing directories, and clinic heritage must render as **full, dedicated interior pages** with comprehensive information and smooth navigation back to Home.

### ❌ 7. Form Field Contrast Bugs (Dark Unreadable Dropdowns)
* **What was done**: In the medical intake wizard, select boxes had dark black backgrounds with dark grey text, making selected options completely unreadable.
* **Why it was rejected**: Serious frontend quality bug that made the form look broken.
* **The Rule**: All inputs and select dropdowns must have crisp ivory backgrounds (`#FFFFFF`), dark charcoal text (`#1C1B18`), clear placeholder contrast, and clear focus rings.

### ❌ 8. Illegal Direct Checkout for Prescription Retinoids
* **What was done**: Placed standard "Buy Now" and "Add to Cart" e-commerce triggers on Tretinoin.
* **Why it was rejected**: Violates UK General Medical Council and MHRA regulations for Prescription-Only Medicines (POM).
* **The Rule**: Tretinoin can only be requested via a 4-step medical assessment questionnaire, followed by clinician evaluation and physical in-clinic collection and payment.

---

## 5. The Subtle Elevation Blueprint: Execution Specifications

To properly implement the user's vision of starting from the Figma design and making **subtle changes that bring massive improvements**, the following architecture is defined:

```
                               ┌─────────────────────────────┐
                               │   TOP NAVBAR & MENU DRAWER  │
                               │  (Minimal, Elegant, No Wrap)│
                               └──────────────┬──────────────┘
                                              │
                     ┌────────────────────────┴────────────────────────┐
                     ▼                                                 ▼
        ┌─────────────────────────┐                       ┌─────────────────────────┐
        │    MAIN LANDING PAGE    │                       │  LEGITIMATE INNER PAGES │
        │ (Enticing Teasers Only) │                       │ (Comprehensive Details) │
        └────────────┬────────────┘                       └────────────┬────────────┘
                     │                                                 │
        ┌────────────┴────────────┐                       ┌────────────┴────────────┐
        │ 1. Clean Muted Hero     │                       │ • /about                │
        │ 2. Editorial Welcome    │                       │   (Full Clinic Story)   │
        │ 3. Clinical Trust Cards │                       │                         │
        │ 4. Popular Treatments   │──────────────────────►│ • /treatments           │
        │ 5. Concern Finder       │                       │   (Modalities Directory)│
        │ 6. Awards & Seals       │                       │                         │
        │ 7. Verified Reviews     │                       │ • /treatments/:id       │
        │ 8. Social Feed          │                       │   (Deep Protocol Specs) │
        │ 9. Signature Packages   │                       │                         │
        │ 10. Skincare Teaser     │──────────────────────►│ • /pricing              │
        └─────────────────────────┘                       │   (8-Category Matrix)   │
                                                          │                         │
                                                          │ • /prescription-intake  │
                                                          │   (Tretinoin POM Form)  │
                                                          └─────────────────────────┘
```

### 5.1 Color Palette & Design Tokens
* **Page Canvas Background**: `#FAF7F2` (Warm French Linen / Soft Cream).
* **Card & Container Surfaces**: `#FFFFFF` (Pure Soft Ivory).
* **Primary Typography**: `#1C1B18` (Obsidian Charcoal — minimum 14:1 contrast ratio against ivory).
* **Secondary / Body Typography**: `#4A4740` (Warm Deep Taupe).
* **Brand Accent / Metals**:
  - Primary Bronze: `#A87F3D`
  - Dark Bronze Hover: `#8C6527`
  - Subtle Hairline Borders: `rgba(168, 127, 61, 0.18)`
  - Delicate Divider Lines: `rgba(28, 27, 24, 0.08)`
* **Typography Hierarchy**:
  - Headlines: `Cormorant Garamond`, serif, weights 400 & 600, letter-spacing `-0.01em` to `0.02em`.
  - Body & UI: `Inter`, sans-serif, weights 300, 400, 500, clean line-height `1.6`.
  - Overlines / Metadata: `Inter`, uppercase, letter-spacing `0.15em`, font size `11px` / `12px`.

---

### 5.2 Component Specifications

#### A. Top Navigation Bar
- **Height**: Fixed `72px` with a subtle backdrop blur (`rgba(250, 247, 242, 0.92)`).
- **Left**: Clinic wordmark — *"ALLURE PASSIONS"* in tracked Cormorant Garamond, with subtle subtitle *"KNIGHTSBRIDGE"*. Clicking navigates to Home.
- **Center / Right Navigation Links**:
  - Maximum 4 concise items: *Treatments*, *About*, *Pricing*, *Prescription Skincare*.
  - No text wrapping allowed.
- **Far Right**: Elegant Menu Drawer trigger (clean hamburger icon with label *"Menu"*), mirroring the Figma prototype drawer.
- **Drawer Contents**: Full directory of clinical services, clinic address, opening hours, direct phone link, and regulatory accreditations.

#### B. Hero Banner (Clean, Minimal, Video Background)
- **Container**: `85vh` to `90vh` height.
- **Media**: Looping `clinic_hero_walkthrough.mp4`, full-bleed background.
- **State**: **Always permanently muted (`muted playsInline autoPlay loop`)**. Zero audio toggles, zero play/pause buttons.
- **Overlay Scrim**: Clean gradient vignette (`linear-gradient(180deg, rgba(20,18,16,0.65) 0%, rgba(20,18,16,0.35) 50%, rgba(20,18,16,0.80) 100%)`).
- **Content Overlay**:
  - Overline: *"Aesthetic & Cellular Medicine • Knightsbridge, London"*
  - Headline: *"Advanced Skin, Body & Cellular Aesthetics"*
  - Subtitle: *"A doctor-led practice providing non-invasive clinical treatments in the heart of Knightsbridge."*
  - Dual CTAs:
    - Primary: *"Explore Treatments"* (smooth scroll or navigate to `/treatments`).
    - Secondary: *"Clinical Enquiry"* (navigates to consultation enquiry).
- **Omissions**: **NO** award badges, **NO** address pills, **NO** walkthrough tags, **NO** booking forms.

#### C. Landing Page Sections 2 to 10 (The Enticing Hook)
- **Section 2 (Welcome)**: Warm editorial introduction to the clinic's philosophy. Clean link: *"Learn More About Our Clinic →"* (leads to `/about`).
- **Section 3 (Clinical Authority)**: Uncluttered 3-column trust cards: JCCP Registration, Level 6 Practice, Manufacturer Certified Systems. Flat ivory cards, bronze hairlines, zero neon glow.
- **Section 4 (Popular Treatments)**: 6 clean cards showcasing PicoWay, ADVATx, Morpheus8, Sofwave, Emsculpt Neo, Emerald Laser. Each card displays key indication, starting fee, and a clear button: *"View Treatment Details & Protocols →"* (navigates to `/treatments/:id`).
- **Section 5 (What We Treat)**: Clean tabbed filter categorizing concerns (Skin Clarity, Lifting & Laxity, Vascular, Body & Muscle, Cellular Health).
- **Section 6 (Awards & Accreditations)**: Dignified showcase of the GHP Global Excellence Award 2026 and JCCP regulatory standing.
- **Section 7 (Patient Reviews)**: Authentic testimonials from Knightsbridge, Mayfair, and Kensington patients.
- **Section 8 (Instagram Live Feed)**: Authentic 4-column feed from `@allurepassionsuk`.
- **Section 9 (Featured Packages)**: 4 curated signature treatment programs with course pricing and clinical rationale.
- **Section 10 (Medical Skincare Hub)**: Split feature for Kojivit Ultra Cream and Tretinoin Prescription Protocol with link to `/prescription-skincare`.

#### D. Dedicated Legitimate Inner Pages
Every inner page is a complete, first-class view rendered in the Warm Cream editorial design system, equipped with a persistent top navigation bar, breadcrumb navigation (*"← Back to Home"*), and footer:

1. **`/about` (The Knightsbridge Practice)**:
   - Full story of Allure Passions UK, clinic heritage, Level 6 practitioner standards, sterile clinic protocols, and GHP 2026 London award documentation.
2. **`/treatments` (Clinical Directory)**:
   - Filterable index of all medical technologies and clinical indications.
3. **`/treatments/:id` (Dedicated Clinical Spec Sheet)**:
   - Available for all 6 core technologies:
     - `picoway`: Photoacoustic picosecond laser mechanics, treated conditions, downtime, procedure duration, clinical FAQ, and tiered pricing table.
     - `advatx`: Dual 589nm/1319nm vascular clarity, acne and rosacea protocols, lip plumping.
     - `morpheus8`: Subdermal fractional RF microneedling depths (up to 8mm), collagen stimulation, face/neck/body pricing.
     - `sofwave`: SUPERB™ ultrasound parallel beam technology, brow/face/neck lifting specs.
     - `emsculpt_neo`: HIFEM+ and radiofrequency synergy, 30% fat elimination, 25% muscle growth.
     - `emerald_laser`: 532nm cold laser lipo, lymphatic drainage, cellular rejuvenation.
4. **`/pricing` (Official Comprehensive Clinic Price List)**:
   - Complete 8-category pricing matrix matching the official clinic schedule:
     1. Ultra Tightening (Morpheus8 & Sofwave)
     2. Skin Renewal & Resurfacing (PicoWay Laser)
     3. Tattoo Removal (Pico Laser)
     4. Vascular & Complexion Clarity (ADVATx Laser)
     5. Skin Peel Rejuvenation (Cosmelan & BioRePeel)
     6. Dermal Renaissance (Microneedling + Exosomes)
     7. Immersive Hydration Skin Renewal (HydraFacial & OxyGeneo)
     8. Body Sculpting Packages (Emsculpt Neo & Emerald Laser)
5. **`/prescription-skincare` (Medical Retinoid Consultation Portal)**:
   - Regulatory notice regarding UK POM (Prescription-Only Medicine) legislation.
   - Interactive 4-step medical suitability questionnaire:
     - Step 1: Skin Concern & Retinoid History (Acne, Melasma, Photo-Ageing; previous exposure).
     - Step 2: Medical Health Screening (Pregnancy, breastfeeding, rosacea, active dermatitis, light sensitizing drugs).
     - Step 3: Preferred Strength (0.025% vs 0.1%) & Formulation.
     - Step 4: Patient Details & Physical Collection Confirmation (Acknowledging consultation review and in-clinic physical collection & payment).
   - High-contrast inputs (crisp white fields, dark text, zero black-on-black text bugs).

---

## 6. Development Checklist & Quality Assurance Gates

Before any code modification is deployed in future phases, each item on this checklist must pass verification:

- [ ] **Code Freeze Respected**: No `.jsx`, `.css`, or `.js` source files were modified during this planning step.
- [ ] **Figma Design Alignment**: Layout proportions, typography scales, and negative space faithfully mirror `Abigail-mock-1`.
- [ ] **No Booking Forms in the Codebase**: Zero appointment calendars, zero time-slot pickers, zero automated booking widgets.
- [ ] **Hero Purity**: Background walkthrough video is permanently muted with zero media controls and zero badge clutter.
- [ ] **Navbar Integrity**: No text wrapping occurs across desktop, tablet, and mobile viewports. Menu drawer opens smoothly.
- [ ] **Dedicated Inner Pages Verified**:
  - `/about` renders full clinic story.
  - `/treatments` renders complete directory.
  - `/treatments/:id` renders detailed specs for all 6 devices.
  - `/pricing` renders full 8-category matrix.
  - `/prescription-skincare` renders compliant medical intake form.
- [ ] **Contrast & Accessibility**: All form fields, dropdowns, buttons, and text elements satisfy WCAG AA contrast standards.
- [ ] **Zero AI Tropes**: No "Section X" numbering, no gaudy glowing neon borders, no generic AI styling.

---

## 7. Current Project Status & Next Steps

> [!IMPORTANT]
> **Strict Code Freeze in Effect**: As mandated by the lead designer, **NO FURTHER SOURCE CODE CHANGES WILL BE MADE** until this specification document is reviewed and explicit authorization is granted.

Once you have reviewed this document and are satisfied with the comprehensive analysis, historical autopsy, and elevation plan, please provide your approval to proceed to the implementation phase.
