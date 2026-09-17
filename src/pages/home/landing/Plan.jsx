import { kojivitBenefits, supplySteps } from '../../../content/home';
import { kojivit, tretinoin } from '../../../content/products';
import { programmes } from '../../../content/programmes';
import PillButton, { ArrowGlyph } from '../../../components/ui/PillButton';
import { Link } from 'react-router';
import Chapter from './Chapter';
import './Plan.css';

const ORBIT_INGREDIENTS = kojivit.ingredients.slice(0, 3);

/** What the prescription route involves, stated plainly. No price is shown for a prescription-only medicine (R1). */
const RX_FACTS = [
  ['Strengths', tretinoin.strengths.map((strength) => strength.split(' ')[0]).join(' or ')],
  ['Supplied', 'Only after a medical consultation'],
  ['Collected', 'In clinic, never online'],
];

/** 05 · Plan. The structured courses, as cards that stack as the page scrolls. */
export function Programmes() {
  return (
    <section id="programmes" data-chapter="plan" aria-labelledby="ap-prog-title">
      <div className="ap-wrap">
        <Chapter id="plan" />
        <div className="ap-prog__grid">
          <div className="ap-prog__intro" data-reveal>
            <p className="ap-dot-eyebrow">Signature programmes</p>
            <h2 className="ap-display ap-display--l" id="ap-prog-title">
              Structured courses, <em>clearly priced.</em>
            </h2>
            <p className="ap-lede">Technologies combined into one course, with everything included set out before you start.</p>
            <Link className="ap-line-link ap-prog__all" to="/pricing" viewTransition>
              View full price list <ArrowGlyph />
            </Link>
          </div>

          <ol className="ap-prog__stack">
            {programmes.map((programme, index) => (
              <li className="ap-pcard" key={programme.id} style={{ '--i': index }} data-tone={index === 2 ? 'night' : undefined}>
                <div>
                  <span className="ap-pcard__tag">{programme.sessions}</span>
                  <h3 className="ap-serif">{programme.name}</h3>
                  <p className="ap-pcard__sub">{programme.subtitle}</p>
                </div>
                <p className="ap-pcard__price">
                  <b className="ap-serif">{programme.price}</b>
                  <small>{programme.singlePrice}</small>
                </p>
                <ul>
                  {programme.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/**
 * Clinical skincare. Consultation-led, never a checkout: each route goes to its
 * own page, where the suitability questions live (D10). Tretinoin is named at
 * the client's request (P5 revised), always beside its prescription-only
 * disclaimer and never with a price.
 */
export function Skincare() {
  return (
    <section className="ap-skin" id="skincare" data-tone="night" data-chapter="plan" aria-labelledby="ap-skin-title">
      <div className="ap-wrap">
        <div className="ap-skin__head">
          <div data-reveal>
            <p className="ap-dot-eyebrow">Clinical skincare</p>
            <h2 className="ap-display ap-display--l" id="ap-skin-title">
              Care that continues at home, <em>prescribed with care.</em>
            </h2>
          </div>
          <p className="ap-lede" data-reveal style={{ '--d': '.1s' }}>
            No basket and no online checkout. Every product is supplied only after a suitability check, and prescription
            skincare only after a medical consultation.
          </p>
        </div>

        <div className="ap-skin__cards">
          <article className="ap-prod ap-prod--kojivit" data-reveal aria-labelledby="ap-kojivit-title">
            <div className="ap-prod__visual">
              <img src={kojivit.image} alt={`${kojivit.name} cream`} width="480" height="480" loading="lazy" decoding="async" />
              {ORBIT_INGREDIENTS.map((ingredient) => (
                <span className="ap-orbit" key={ingredient} aria-hidden="true">
                  {ingredient}
                </span>
              ))}
            </div>
            <div>
              <span className="ap-prod__type">{kojivit.type}</span>
              <h3 className="ap-serif" id="ap-kojivit-title">
                {kojivit.name}
              </h3>
              <p>A brightening cream to help even the look of skin tone, used in the evening alongside daily sun protection.</p>
              <ul className="ap-benefits">
                {kojivitBenefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <div className="ap-prod__foot">
                <span className="ap-prod__price ap-serif">{kojivit.price}</span>
                <PillButton to={`/skincare/${kojivit.slug}`} variant="light">
                  Check suitability
                </PillButton>
              </div>
              <small className="ap-prod__fine">Reserved after a short suitability check · paid for and collected in clinic</small>
            </div>
          </article>

          <article className="ap-prod ap-prod--rx" data-reveal style={{ '--d': '.1s' }} aria-labelledby="ap-rx-title">
            <div>
              <span className="ap-prod__type">{tretinoin.type}</span>
              <h3 className="ap-serif" id="ap-rx-title">
                {tretinoin.name}
              </h3>
              <p>
                A topical retinoid prescribed for acne and sun-related skin changes, supplied only where our prescriber
                confirms it is suitable for you.
              </p>
            </div>
            <dl className="ap-rx-facts">
              {RX_FACTS.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            <p className="ap-rx-disclaimer">{tretinoin.notice}</p>
            <PillButton to={`/skincare/${tretinoin.slug}`} variant="light" className="ap-prod__rx-btn">
              Start medical consultation
            </PillButton>
          </article>
        </div>

        <div className="ap-route" data-reveal>
          <div className="ap-route__head">
            <h3 className="ap-serif">How supply works</h3>
            <span className="ap-route__note">No step can be skipped</span>
          </div>
          <ol className="ap-steps" data-reveal>
            {supplySteps.map((step) => (
              <li key={step.id}>
                <b>{step.title}</b>
                <span>{step.detail}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
