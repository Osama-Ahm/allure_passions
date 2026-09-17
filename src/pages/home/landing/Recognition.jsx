import { useId } from 'react';
import { clinic } from '../../../content/clinic';
import { credentials } from '../../../content/credentials';
import { memberships } from '../../../content/home';
import { pressFeatures } from '../../../content/press';
import cx from '../../../lib/cx';
import { ArrowGlyph } from '../../../components/ui/PillButton';
import './Recognition.css';

const SHOW_PENDING = import.meta.env.DEV;
const jccp = credentials.find((item) => item.id === 'jccp');
const PENDING_PRESS = SHOW_PENDING ? [1, 2, 3, 4, 5].map((n) => ({ id: `pending-${n}`, name: 'Publication' })) : [];
const LEAVES_LEFT = [
  [44, 92, -20],
  [44, 112, -40],
  [50, 130, -55],
  [60, 146, -70],
];

/**
 * Awards, accreditations and press. There is no official GHP winner artwork
 * yet, so the award is set in type; membership slots and the press row only
 * appear once the clinic supplies them, apart from dashed stand-ins in
 * development (content/credentials.js, content/press.js).
 */
export default function Recognition() {
  const ringId = useId();
  const showPress = pressFeatures.length > 0 || SHOW_PENDING;

  return (
    <section className="ap-recog" id="recognition" data-chapter="trust" aria-labelledby="ap-recog-title">
      <div className="ap-wrap">
        <div data-reveal>
          <p className="ap-dot-eyebrow">Awards, accreditations &amp; recognition</p>
          <h2 className="ap-display ap-display--l" id="ap-recog-title">
            Recognised by <em>the people who check.</em>
          </h2>
        </div>

        <div className="ap-recog__grid">
          <article className="ap-award" data-tone="night" data-reveal>
            <div className="ap-laurel" aria-hidden="true">
              <svg className="ap-laurel__ring" viewBox="0 0 200 200">
                <defs>
                  <path id={ringId} d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" />
                </defs>
                <text fontSize="11" letterSpacing="4" fill="currentColor" fontWeight="600" style={{ fontFamily: 'var(--font-sans)' }}>
                  <textPath href={`#${ringId}`}>GLOBAL EXCELLENCE AWARDS · 2026 · LONDON · </textPath>
                </text>
              </svg>
              <svg className="ap-laurel__leaves" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M62 150c-20-18-28-44-22-70M138 150c20-18 28-44 22-70" />
                <g fill="currentColor" stroke="none" opacity=".85">
                  {LEAVES_LEFT.map(([x, y, angle]) => (
                    <g key={y}>
                      <ellipse cx={x} cy={y} rx="4" ry="9" transform={`rotate(${angle} ${x} ${y})`} />
                      <ellipse cx={200 - x} cy={y} rx="4" ry="9" transform={`rotate(${-angle} ${200 - x} ${y})`} />
                    </g>
                  ))}
                </g>
              </svg>
              <b>
                Winner<small>2026</small>
              </b>
            </div>
            <div>
              <p className="ap-dot-eyebrow">Global Excellence Awards 2026</p>
              <h3 className="ap-serif">{clinic.award.title}</h3>
              <p className="ap-award__body">{clinic.award.body}.</p>
              {SHOW_PENDING && <p className="ap-pending-note ap-award__pending">Official winner artwork to be supplied</p>}
            </div>
          </article>

          <article className="ap-rtile" data-reveal style={{ '--d': '.1s' }}>
            <img src={jccp.logo.src} alt={jccp.logo.alt} width={jccp.logo.width} height={jccp.logo.height} loading="lazy" />
            <div>
              <h3 className="ap-serif">JCCP registered</h3>
              <p>On the public register of the Joint Council for Cosmetic Practitioners, which checks training, insurance and patient-safety standards.</p>
              <a className="ap-line-link ap-rtile__link" href="https://www.jccp.org.uk" target="_blank" rel="noopener noreferrer">
                Check the register <ArrowGlyph />
                <span className="ap-visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </article>

          <div className="ap-members" data-reveal style={{ '--d': '.15s' }}>
            <div className="ap-members__intro">
              <p className="ap-dot-eyebrow">Accreditations &amp; memberships</p>
              <h3 className="ap-serif">Professional bodies and standards we work to.</h3>
            </div>
            {memberships.map((item) =>
              SHOW_PENDING && item.pending ? (
                <div className="ap-logo-slot is-empty" key={item.id}>
                  Membership logo
                  <br />
                  client to supply
                </div>
              ) : (
                <div className="ap-logo-slot" key={item.id}>
                  <div>
                    <span className="ap-logo-slot__word ap-serif">{item.word}</span>
                    <small>{item.detail}</small>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {showPress && (
          <div className="ap-press" data-reveal>
            <div>
              <p className="ap-dot-eyebrow">As featured in</p>
              {pressFeatures.length === 0 && <p className="ap-pending-note ap-press__pending">Shown only with a verified article link</p>}
            </div>
            <ul className={cx('ap-press__row', pressFeatures.length === 0 && 'is-pending')}>
              {(pressFeatures.length ? pressFeatures : PENDING_PRESS).map((feature) => (
                <li key={feature.id}>
                  <a className="ap-press__item" href={feature.href ?? '#recognition'} {...(feature.href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <span className="ap-serif">{feature.name}</span>
                    <em aria-hidden="true">Read the feature ↗</em>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
