import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { addressText, clinic } from '../../../content/clinic';
import { faqs } from '../../../content/faqs';
import { consultationQuote, homeFaqIds } from '../../../content/home';
import { consultationCta } from '../../../content/navigation';
import { prefersReducedMotion } from '../../../lib/motion';
import { emailHref, whatsappHref } from '../../../utils/contact';
import Chapter from './Chapter';
import './Closing.css';

const homeFaqs = homeFaqIds.map((id) => faqs.find((faq) => faq.id === id));

/** Before you book: six questions, one open at a time. */
export function Faq() {
  const [openId, setOpenId] = useState(homeFaqs[0].id);

  return (
    <section className="ap-faq" data-chapter="plan" aria-labelledby="ap-faq-title">
      <div className="ap-wrap ap-faq__grid">
        <div data-reveal>
          <p className="ap-dot-eyebrow">Questions</p>
          <h2 className="ap-display ap-display--l" id="ap-faq-title">
            Before you <em>book.</em>
          </h2>
          <p className="ap-lede ap-faq__lede">
            Anything else?{' '}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp
              <span className="ap-visually-hidden"> (opens in a new tab)</span>
            </a>{' '}
            and a practitioner will reply.
          </p>
        </div>

        <div data-reveal style={{ '--d': '.1s' }}>
          {homeFaqs.map((faq) => {
            const isOpen = faq.id === openId;
            return (
              <div className="ap-qa" key={faq.id}>
                <h3>
                  <button
                    type="button"
                    className="ap-serif"
                    aria-expanded={isOpen}
                    aria-controls={`ap-qa-${faq.id}`}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="ap-qa__plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="ap-qa__panel" id={`ap-qa-${faq.id}`} role="region" inert={!isOpen || undefined}>
                  <div>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** 06 · Begin. The closing invitation, with a round call to action that leans towards the pointer. */
export function Begin() {
  const magnetRef = useRef(null);
  const [canFollow] = useState(
    () => typeof window !== 'undefined' && !prefersReducedMotion() && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  const onPointerMove = (event) => {
    const magnet = magnetRef.current;
    if (!canFollow || !magnet) return;
    const rect = magnet.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    magnet.style.transition = '';
    magnet.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
    magnet.firstElementChild.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px)`;
  };

  const onPointerLeave = () => {
    const magnet = magnetRef.current;
    if (!canFollow || !magnet) return;
    magnet.style.transition = 'transform .8s var(--ease-expo), background-color .4s';
    magnet.style.transform = '';
    magnet.firstElementChild.style.transform = '';
  };

  return (
    <section className="ap-closing" id="begin" data-chapter="begin" aria-labelledby="ap-begin-title">
      <div className="ap-wrap">
        <Chapter id="begin" style={{ paddingTop: 0 }} />
        <blockquote className="ap-closing__quote ap-serif" data-reveal>
          &ldquo;{consultationQuote}&rdquo;
        </blockquote>
        <h2 className="ap-closing__big ap-serif" id="ap-begin-title">
          <span className="ap-mask">
            <span>Your plan</span>
          </span>{' '}
          <span className="ap-mask">
            <span style={{ '--d': '.12s' }}>
              starts <em>here.</em>
            </span>
          </span>
        </h2>
        <div className="ap-closing__row">
          <Link
            ref={magnetRef}
            className="ap-magnet"
            to={consultationCta.to}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            viewTransition
          >
            <span>
              Request a
              <br />
              consultation
            </span>
          </Link>
        </div>
        <ul className="ap-closing__contacts" data-reveal>
          <li>
            <a className="ap-closing__contact" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              WhatsApp · {clinic.phone.display}
              <span className="ap-visually-hidden"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="ap-closing__contact" href={emailHref()}>
              {clinic.email}
            </a>
          </li>
          <li>
            <a className="ap-closing__contact" href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer">
              {clinic.address.street}, {clinic.address.postcode}
              <span className="ap-visually-hidden"> — directions to {addressText} (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
