# Allure Passions UK

The website for Allure Passions UK, a practitioner-led aesthetic clinic in Fitzrovia, London.

Built with Vite, React 19 and React Router 8. No CSS framework: the design system lives in
`src/styles/tokens.css` and a set of primitives in `src/components/ui`.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
npm run lint       # oxlint
```

`http://localhost:5173/styleguide` shows every token and primitive. It is a development route and
is not part of a production build.

## How it is laid out

| Path | What lives there |
|---|---|
| `src/content/` | All copy and data: clinic details, concerns, treatments, pricing, programmes, products, credentials, FAQs, navigation. Edit the site's words here, not in components. |
| `src/components/ui/` | Primitives: Button, Chip, Icon, Section, form fields, Notice and the typography set. |
| `src/components/patterns/` | Reusable blocks shared across pages: the treatment index, concern panel, price table, breadcrumbs and the consultation close. |
| `src/components/layout/` | Header, mega menu, mobile menu, footer and the mobile quick-contact bar. |
| `src/pages/` | One folder per route, with the homepage's sections in `pages/home/landing/` (built from `design/landing.html`). |
| `src/services/` | Adapters for Google reviews and Instagram. Both report `configured: false` until a provider is connected, and the sections they feed render nothing until then. |
| `src/utils/contact.js` | Every WhatsApp, phone and email link, built from one phone number. |
| `docs/REDESIGN_PLAN.md` | The plan this site was built to, with a build log for each module. |
| `docs/IMAGE_BRIEF.md` | What every photograph slot needs, with generation prompts. Images go in `public/assets/images/site/` under the filenames listed there; `src/content/media.js` defines the slots. |

## Things worth knowing before you change anything

- **No booking engine.** Every call to action leads to a consultation request by WhatsApp, phone,
  email or the contact form. The forms compose a message; nothing is posted to a server.
- **Nothing claims what it cannot support.** No ratings appear until a live reviews provider is
  connected; no press appears without a link to the feature; no award artwork appears that the
  clinic has not supplied.
- **Prescription medicine is handled carefully.** `/skincare/tretinoin` has no price, no basket and
  no offer to sell, and supply depends on the questionnaire and a prescriber's decision.
- **Before/after images are real or absent.** The Real Results slots take genuine, consented,
  unretouched clinic photographs only. Never generate them (see `docs/IMAGE_BRIEF.md` §5).
- **Clinical facts are drafts.** Durations, downtime, session counts, contraindications and side
  effects are awaiting the clinic's confirmation. See §11 of the plan.
