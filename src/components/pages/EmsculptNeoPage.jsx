import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Clock, Mail, MapPin, MessageCircle, Phone, Play } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import TextReveal from '../../motion/TextReveal';
import RevealImage from '../../motion/RevealImage';
import { Reveal, RevealGroup, RevealItem } from '../../motion/Reveal';
import TestimonialsSection from '../TestimonialsSection';
import { CompareSlider } from '../BeforeAfterSection';
import { EASE_INOUT, EASE_OUT, VIEWPORT } from '../../motion/presets';
import { CLINIC_INFO, FULL_PRICELIST } from '../../data/treatmentData';
import { EMAIL_URL, PHONE_URL, whatsappLink } from '../../data/links';
import { routeLinkHandler } from '../../utils/navigation';
import './EmsculptNeoPage.css';

/*
 * /treatments/emsculpt_neo — laid out after the client's reference page (ACL Clinic, Sydney):
 * split hero → what it is → how it works → body areas → applicators → results → (our) pricing
 * → consultation CTA → reviews → contact.
 */

const PHOTO = '/assets/images/site/emsculpt-neo.webp';
const RECEPTION = '/assets/images/site/hero_section/slide_01';

const BOOK_URL = whatsappLink('Hello Allure Passions UK, I would like to book an Emsculpt NEO consultation.');

// Official BTL (manufacturer) films, embedded from YouTube only once the visitor presses play.
// `posterZoom` crops the letterbox out of a thumbnail (the overview film is shot in 2.5:1).
const VIDEOS = {
  overview: { id: 'hV7LNAhdFVI', title: 'Emsculpt NEO: more for less in body shaping', posterZoom: 1.43 },
  mechanism: { id: 'RGiSN-1UGQc', title: 'Emsculpt NEO mechanism of action: how does it work?' },
};

const WHAT_IS = [
  'Emsculpt NEO is a non-invasive body-contouring treatment that works on fat and muscle in the same 30-minute session.',
  'It pairs radiofrequency heating with HIFEM+ muscle stimulation, so one appointment addresses both.',
  'There are no needles, no anaesthetic and no downtime. Most people go straight back to their day.',
  'BTL has studied it in patients up to a BMI of 35. We confirm your suitability at consultation.',
];

// Three groups, numbered straight through (01–09).
let areaCount = 0;
const AREA_GROUPS = [
  { name: 'Core & Glutes', areas: ['Abdomen', 'Buttocks'] },
  { name: 'Legs', areas: ['Inner thighs', 'Outer thighs', 'Front thighs', 'Back thighs', 'Calves'] },
  { name: 'Arms', areas: ['Biceps', 'Triceps'] },
].map((group) => ({
  ...group,
  areas: group.areas.map((name) => ({ name, number: String(++areaCount).padStart(2, '0') })),
}));

const APPLICATORS = [
  {
    id: 'large',
    name: 'Large Applicator',
    text: 'Designed for larger areas, such as the abdomen, buttocks and thighs.',
  },
  {
    id: 'small',
    name: 'Small Applicator',
    text: 'Targets the smaller muscles in your arms and calves.',
  },
];

// Client-supplied comparison (split from one side-by-side image, aligned on the bra and navel).
const RESULT = {
  position: '50% 50%',
  before: {
    src: '/assets/images/results/emsculpt-abdomen-before.webp',
    alt: 'Before: a woman’s torso in black underwear, with a softer, fuller abdomen',
  },
  after: {
    src: '/assets/images/results/emsculpt-abdomen-after.webp',
    alt: 'After: the same torso with a flatter, more toned and defined abdomen',
  },
};

const EXPECT = [
  {
    when: 'During each session',
    text: 'You lie comfortably for about 30 minutes. You will feel strong muscle contractions and a gentle warmth in the treated area.',
  },
  {
    when: 'Straight afterwards',
    text: 'There is no recovery time, so you can return to work or your day. Some people feel mild muscle soreness, much like after a workout.',
  },
  {
    when: 'Over the following weeks',
    text: 'Changes build gradually as your muscles strengthen and the body clears treated fat cells. We review your progress with you after your course.',
  },
];

// Prices come straight from the clinic price list (FULL_PRICELIST → Body Sculpting Packages).
const BODY_PACKAGES = FULL_PRICELIST.find((group) => group.category === 'Body Sculpting Packages').items;
const pkg = (prefix) => BODY_PACKAGES.find((item) => item.name.startsWith(prefix));

const PRICING = [
  {
    name: 'Allure Contour Synergy',
    what: 'Emsculpt NEO',
    detail: 'A course of six 30-minute Emsculpt NEO sessions to build muscle and reduce fat in your chosen area.',
    ...pick(pkg('Allure Contour Synergy')),
  },
  {
    name: 'Allure Contour Luxe',
    what: 'Emsculpt NEO + Emerald Laser',
    detail: 'Six sessions pairing Emsculpt NEO with the Emerald low-level laser for body slimming.',
    ...pick(pkg('Allure Contour Luxe')),
    featured: true,
  },
  {
    name: 'Allure Contour Advanced',
    what: 'NEO + Emerald + Mesotherapy',
    detail: 'Our most complete body package: six sessions of Emsculpt NEO and Emerald, with mesotherapy.',
    ...pick(pkg('Allure Contour Advanced')),
  },
];

function pick(item) {
  return { course: item.course6, single: item.single };
}

function VideoFacade({ video }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="ap-neo__film">
      <div className="ap-neo__video" style={video.posterZoom ? { '--poster-zoom': video.posterZoom } : undefined}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className="ap-neo__video-btn" onClick={() => setPlaying(true)}>
            <img src={`https://i.ytimg.com/vi/${video.id}/sddefault.jpg`} alt="" loading="lazy" decoding="async" />
            <span className="ap-neo__video-icon" aria-hidden="true">
              <Play size={26} fill="currentColor" />
            </span>
            <span className="ap-visually-hidden">Play video: {video.title} (loads from YouTube)</span>
          </button>
        )}
      </div>
      <figcaption className="ap-neo__film-caption">
        <span className="ap-neo__film-kicker">Video · BTL Aesthetics</span>
        <span>{video.title}</span>
      </figcaption>
    </figure>
  );
}

// Line drawings of each applicator's footprint, sized relative to one another.
function ApplicatorGlyph({ id }) {
  return (
    <svg className="ap-neo__glyph" viewBox="0 0 220 120" aria-hidden="true" focusable="false">
      <rect className="ap-neo__glyph-strap" x="6" y="54" width="208" height="14" rx="3" />
      {id === 'large' && (
        <>
          <rect x="44" y="20" width="132" height="82" rx="30" />
          <rect className="ap-neo__glyph-coil" x="64" y="36" width="92" height="50" rx="20" />
        </>
      )}
      {id === 'small' && (
        <>
          <rect x="30" y="34" width="68" height="54" rx="20" />
          <rect x="122" y="34" width="68" height="54" rx="20" />
          <rect className="ap-neo__glyph-coil" x="44" y="46" width="40" height="30" rx="12" />
          <rect className="ap-neo__glyph-coil" x="136" y="46" width="40" height="30" rx="12" />
        </>
      )}
    </svg>
  );
}

// The homepage comparison slider in a portrait frame that opens from the centre when it scrolls in.
function ResultCompare() {
  const reduce = useReducedMotion();
  // Watch an unclipped wrapper: IntersectionObserver ignores a frame that starts fully clipped.
  const anchorRef = useRef(null);
  const inView = useInView(anchorRef, VIEWPORT);
  return (
    <figure className="ap-neo__compare">
      <div ref={anchorRef}>
        <motion.div
          className="ap-neo__compare-frame"
          role="group"
          aria-label="Emsculpt NEO before and after"
          initial={reduce ? false : { clipPath: 'inset(0% 50% 0% 50% round 20px)' }}
          animate={inView ? { clipPath: 'inset(0% 0% 0% 0% round 20px)' } : undefined}
          transition={{ duration: 1.3, ease: EASE_INOUT }}
        >
          <motion.div
            className="ap-neo__compare-zoom"
            initial={reduce ? false : { scale: 1.12 }}
            animate={inView ? { scale: 1 } : undefined}
            transition={{ duration: 1.8, ease: EASE_OUT }}
          >
            <CompareSlider item={RESULT} hint />
          </motion.div>
        </motion.div>
      </div>
      <figcaption className="ap-neo__compare-note">
        Drag to compare. Illustrative image; individual results vary.
      </figcaption>
    </figure>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ first: '', last: '', email: '', subject: '', message: '' });
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  // Nothing is stored or sent by the site: the message opens in WhatsApp or the visitor's email app.
  const handleSubmit = (event) => {
    event.preventDefault();
    const via = event.nativeEvent.submitter?.value === 'email' ? 'email' : 'whatsapp';
    const name = `${values.first} ${values.last}`.trim();
    const subject = values.subject.trim() || 'Emsculpt NEO enquiry';
    const body = `${values.message.trim()}\n\n${name}\n${values.email.trim()}`;
    if (via === 'email') {
      window.location.href = `mailto:${CLINIC_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    } else {
      window.open(whatsappLink(`Hello Allure Passions UK, ${subject}.\n\n${body}`), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <form className="ap-neo__form" onSubmit={handleSubmit}>
      <fieldset className="ap-neo__form-row">
        <legend className="ap-neo__label">Name</legend>
        <label className="ap-neo__field">
          <span className="ap-neo__field-label">
            First name <span className="ap-neo__req">(required)</span>
          </span>
          <input type="text" name="first" autoComplete="given-name" required value={values.first} onChange={update('first')} />
        </label>
        <label className="ap-neo__field">
          <span className="ap-neo__field-label">
            Last name <span className="ap-neo__req">(required)</span>
          </span>
          <input type="text" name="last" autoComplete="family-name" required value={values.last} onChange={update('last')} />
        </label>
      </fieldset>
      <label className="ap-neo__field">
        <span className="ap-neo__label">
          Email <span className="ap-neo__req">(required)</span>
        </span>
        <input type="email" name="email" autoComplete="email" required value={values.email} onChange={update('email')} />
      </label>
      <label className="ap-neo__field">
        <span className="ap-neo__label">Subject</span>
        <input type="text" name="subject" placeholder="Emsculpt NEO enquiry" value={values.subject} onChange={update('subject')} />
      </label>
      <label className="ap-neo__field">
        <span className="ap-neo__label">
          Message <span className="ap-neo__req">(required)</span>
        </span>
        <textarea name="message" rows={5} required placeholder="Tell us which area you would like to treat" value={values.message} onChange={update('message')} />
      </label>
      <div className="ap-neo__form-actions">
        <button type="submit" value="whatsapp" className="ap-btn ap-btn--dark">
          <MessageCircle size={18} aria-hidden="true" />
          <span>Send via WhatsApp</span>
        </button>
        <button type="submit" value="email" className="ap-btn ap-btn--outline">
          <Mail size={18} aria-hidden="true" />
          <span>Send by Email</span>
        </button>
      </div>
      <p className="ap-neo__form-note">
        Your message opens in WhatsApp or your email app for you to send. Please do not include medical details; we
        discuss those at your consultation.
      </p>
    </form>
  );
}

export default function EmsculptNeoPage({ onNavigate }) {
  return (
    <div className="ap-neo">
      {/* 1. Split hero: photo left, invitation right */}
      <section className="ap-neo__hero" aria-labelledby="ap-neo-title">
        <RevealImage
          className="ap-neo__hero-media"
          src={PHOTO}
          alt="An Emsculpt NEO applicator strapped across a client’s abdomen as she lies on a treatment bed"
          position="62% 45%"
          radius={0}
          direction="left"
          loading="eager"
        />
        <div className="ap-neo__hero-copy">
          <a href="/treatments" className="ap-neo__back" onClick={routeLinkHandler(onNavigate, 'treatments')}>
            <ArrowLeft size={14} aria-hidden="true" />
            <span>All treatments</span>
          </a>
          <Reveal as="p" className="ap-neo__wordmark" aria-hidden="true">
            <span>EMSCULPT</span> <strong>NEO</strong>
          </Reveal>
          <TextReveal as="h1" id="ap-neo-title" className="ap-neo__hero-title">
            Interested in an <em className="ap-accent ap-neo__nowrap">Emsculpt NEO</em> Treatment?
          </TextReveal>
          <Reveal as="p" delay={0.15} className="ap-lead ap-neo__hero-lead">
            <strong>Book a consultation</strong> at our Fitzrovia clinic and our practitioners will create a{' '}
            <strong>personalised body-contouring plan</strong> around your goals.
          </Reveal>
          <Reveal delay={0.22} className="ap-neo__actions">
            <Button href={BOOK_URL} target="_blank" rel="noopener noreferrer">
              Book Your Consultation
            </Button>
            <Button href={PHONE_URL} variant="outline" icon={<Phone size={17} />}>
              Call Us: {CLINIC_INFO.phone}
            </Button>
          </Reveal>
          <Reveal as="dl" delay={0.3} className="ap-neo__facts">
            <div>
              <dt>Session</dt>
              <dd>30 minutes</dd>
            </div>
            <div>
              <dt>Downtime</dt>
              <dd>None</dd>
            </div>
            <div>
              <dt>Single session</dt>
              <dd>{PRICING[0].single}</dd>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. What is Emsculpt NEO? — checklist left, film right */}
      <section className="ap-neo__band ap-neo__band--paper" aria-labelledby="ap-neo-what">
        <div className="ap-container ap-neo__split">
          <div className="ap-neo__split-copy">
            <SectionHeading id="ap-neo-what" title="What Is" accent="Emsculpt NEO?" />
            <RevealGroup as="ul" className="ap-neo__checks" gap={0.08}>
              {WHAT_IS.map((line) => (
                <RevealItem as="li" key={line}>
                  <Check size={18} className="ap-neo__check" aria-hidden="true" />
                  <span>{line}</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="ap-neo__split-media">
            <VideoFacade video={VIDEOS.overview} />
          </Reveal>
        </div>
      </section>

      {/* 3. How does it work? — film left, explanation right */}
      <section className="ap-neo__band" aria-labelledby="ap-neo-how">
        <div className="ap-container ap-neo__split ap-neo__split--flip">
          <Reveal delay={0.1} className="ap-neo__split-media">
            <VideoFacade video={VIDEOS.mechanism} />
          </Reveal>
          <div className="ap-neo__split-copy">
            <SectionHeading
              id="ap-neo-how"
              title="How Does"
              accent="Emsculpt NEO Work?"
              intro={[
                'Emsculpt NEO delivers radiofrequency heating and HIFEM+ electromagnetic energy through the same applicator, at the same time.',
                'The radiofrequency warms the fat layer, while HIFEM+ causes intense muscle contractions far beyond what a workout can achieve. Warming the muscle first helps it take those contractions comfortably.',
              ]}
            />
            <RevealGroup className="ap-neo__stats" gap={0.1}>
              <RevealItem className="ap-neo__stat">
                <span className="ap-neo__stat-num">30%</span>
                <span className="ap-neo__stat-label">average reduction in subcutaneous fat*</span>
              </RevealItem>
              <RevealItem className="ap-neo__stat">
                <span className="ap-neo__stat-num">25%</span>
                <span className="ap-neo__stat-label">average increase in muscle thickness*</span>
              </RevealItem>
            </RevealGroup>
            <p className="ap-neo__footnote">
              *Figures from the manufacturer’s (BTL) clinical studies. Individual results vary and are discussed at your
              consultation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Body areas */}
      <section className="ap-neo__band ap-neo__band--cream" aria-labelledby="ap-neo-areas">
        <div className="ap-container">
          <SectionHeading
            id="ap-neo-areas"
            align="center"
            title="Body Areas"
            accent="Emsculpt NEO Can Treat"
            intro="Treatment plans can focus on one area or combine several over your course."
          />
          <RevealGroup className="ap-neo__areas" gap={0.08}>
            {AREA_GROUPS.map((group) => (
              <RevealItem key={group.name} variant="card" className="ap-neo__area-card">
                <h3 className="ap-neo__area-group">{group.name}</h3>
                <ul className="ap-neo__area-list">
                  {group.areas.map((area) => (
                    <li key={area.name}>
                      <span className="ap-neo__area-num" aria-hidden="true">
                        {area.number}
                      </span>
                      <span>{area.name}</span>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 5. Applicators */}
      <section className="ap-neo__band" aria-labelledby="ap-neo-applicators">
        <div className="ap-container">
          <SectionHeading
            id="ap-neo-applicators"
            align="center"
            title="Different Applicators to Suit"
            accent="Your Treatment Needs"
          />
          <RevealGroup className="ap-neo__applicators" gap={0.1}>
            {APPLICATORS.map((applicator) => (
              <RevealItem key={applicator.id} variant="card" className="ap-neo__applicator">
                <div className="ap-neo__applicator-art">
                  <ApplicatorGlyph id={applicator.id} />
                </div>
                <h3 className="ap-neo__applicator-name">{applicator.name}</h3>
                <p className="ap-neo__applicator-text">{applicator.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 6. Before & after / what to expect */}
      <section className="ap-neo__band ap-neo__band--paper" aria-labelledby="ap-neo-results">
        <div className="ap-container">
          <SectionHeading
            id="ap-neo-results"
            align="center"
            title="Before &"
            accent="After"
            intro="See how the abdomen can change over a course of Emsculpt NEO. Photos from our own patients are shared, with their consent, at your consultation."
          />
          <div className="ap-neo__results">
            <ResultCompare />
            <div className="ap-neo__expect-col">
              <Reveal as="h3" className="ap-neo__expect-title">
                What to <em className="ap-accent">expect</em>
              </Reveal>
              <RevealGroup as="ol" className="ap-neo__expect" gap={0.1}>
                {EXPECT.map((step, index) => (
                  <RevealItem as="li" key={step.when} variant="card" className="ap-neo__expect-card">
                    <span className="ap-neo__expect-num" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="ap-neo__expect-when">{step.when}</h4>
                      <p>{step.text}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Pricing (from the clinic price list) */}
      <section className="ap-neo__band" aria-labelledby="ap-neo-pricing">
        <div className="ap-container">
          <SectionHeading
            id="ap-neo-pricing"
            align="center"
            title="Emsculpt NEO"
            accent="Pricing"
            intro="Every course is six sessions. Single sessions are also available."
          />
          <RevealGroup className="ap-neo__prices" gap={0.1}>
            {PRICING.map((plan) => (
              <RevealItem
                key={plan.name}
                variant="card"
                className={`ap-neo__price${plan.featured ? ' ap-neo__price--featured' : ''}`}
              >
                <p className="ap-neo__price-what">{plan.what}</p>
                <h3 className="ap-neo__price-name">{plan.name}</h3>
                <p className="ap-neo__price-detail">{plan.detail}</p>
                <dl className="ap-neo__price-tiers">
                  <div>
                    <dt>Course of 6</dt>
                    <dd>{plan.course}</dd>
                  </div>
                  <div>
                    <dt>Single session</dt>
                    <dd>{plan.single}</dd>
                  </div>
                </dl>
                <Button
                  href={whatsappLink(`Hello Allure Passions UK, I would like to book the ${plan.name} package (${plan.what}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={plan.featured ? 'gold' : 'outline'}
                  block
                >
                  Book {plan.name.replace('Allure Contour ', '')}
                </Button>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="ap-neo__price-links">
            <a href="/pricing" onClick={routeLinkHandler(onNavigate, 'pricing')}>
              <span>See our full price list</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <a href="/treatments/emerald_laser" onClick={routeLinkHandler(onNavigate, 'treatment-detail', 'emerald_laser')}>
              <span>About Emerald Laser</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* 8. Consultation call to action */}
      <section className="ap-neo__cta" aria-labelledby="ap-neo-cta">
        <div className="ap-container ap-neo__cta-inner">
          <TextReveal as="h2" id="ap-neo-cta" className="ap-h2 ap-neo__cta-title">
            Interested in Your <em className="ap-accent ap-neo__nowrap">Emsculpt NEO</em> Treatment?
          </TextReveal>
          <Reveal as="p" delay={0.12} className="ap-lead ap-neo__cta-lead">
            Book a consultation at our Fitzrovia clinic and talk through your goals with our team, who will create a
            personalised plan just for you.
          </Reveal>
          <Reveal delay={0.2} className="ap-neo__actions ap-neo__actions--center">
            <Button href={BOOK_URL} target="_blank" rel="noopener noreferrer">
              Book Your Consultation
            </Button>
            <Button href={PHONE_URL} variant="glass" icon={<Phone size={17} />}>
              Call Us: {CLINIC_INFO.phone}
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 9. Customer reviews (shared with the homepage) */}
      <TestimonialsSection />

      {/* 10. Contact */}
      <section className="ap-neo__band ap-neo__band--paper" aria-labelledby="ap-neo-contact">
        <div className="ap-container ap-neo__contact">
          <div className="ap-neo__contact-panel">
            <SectionHeading
              id="ap-neo-contact"
              title="Contact"
              accent="Us"
              intro="Message us with any questions and we will get back to you as soon as possible."
            />
            <ContactForm />
          </div>
          <div className="ap-neo__contact-side">
            <RevealImage
              className="ap-neo__contact-media"
              src={`${RECEPTION}-1280.webp`}
              srcSet={`${RECEPTION}-1280.webp 1280w, ${RECEPTION}-1920.webp 1920w`}
              sizes="(max-width: 900px) 100vw, 45vw"
              alt="Reception desk in warm stone tones beneath the Allure Passions monogram, with an armchair by the window"
              position="50% 50%"
            />
            <address className="ap-neo__visit">
              <a href={CLINIC_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={17} aria-hidden="true" />
                <span>{CLINIC_INFO.address}</span>
              </a>
              <span>
                <Clock size={17} aria-hidden="true" />
                <span>{CLINIC_INFO.hours}</span>
              </span>
              <a href={PHONE_URL}>
                <Phone size={17} aria-hidden="true" />
                <span>{CLINIC_INFO.phone}</span>
              </a>
              <a href={EMAIL_URL}>
                <Mail size={17} aria-hidden="true" />
                <span>{CLINIC_INFO.email}</span>
              </a>
            </address>
          </div>
        </div>
      </section>
    </div>
  );
}
