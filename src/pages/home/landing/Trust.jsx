import { useEffect, useRef, useState } from 'react';
import { credentials } from '../../../content/credentials';
import { trustDossier } from '../../../content/home';
import { prefersReducedMotion } from '../../../lib/motion';
import cx from '../../../lib/cx';
import Chapter from './Chapter';
import { pad2 } from './useLandingMotion';
import './Trust.css';

const JCCP_LOGO = credentials.find((item) => item.id === 'jccp').logo.src;

function Badge({ badge, className }) {
  if (badge === 'logo') return <img className={className} src={JCCP_LOGO} alt="" />;
  return badge;
}

/**
 * 04 · Trust. A credential dossier: six things worth checking, listed on the
 * left, each with its evidence on a photograph stage. It moves on by itself
 * every few seconds while in view, and holds still under the pointer, while
 * focused, or for reduced-motion visitors.
 */
export default function Trust() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [isHeld, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const dossierRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    const element = dossierRef.current;
    if (!element || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const choose = (index) => {
    if (index === active) return;
    setPrevious(active);
    setActive(index);
  };

  const onKeyDown = (event) => {
    const keys = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };
    let next;
    if (event.key in keys) next = active + keys[event.key];
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = trustDossier.length - 1;
    else return;
    event.preventDefault();
    const wrapped = (next + trustDossier.length) % trustDossier.length;
    choose(wrapped);
    tabsRef.current?.querySelectorAll('[role="tab"]')[wrapped]?.focus();
  };

  const isPaused = reduceMotion || isHeld || !inView;
  const current = trustDossier[active];

  return (
    <section id="trust" data-chapter="trust" aria-labelledby="ap-trust-title">
      <div className="ap-wrap">
        <Chapter id="trust" />
        <div className="ap-trust__head">
          <div data-reveal>
            <p className="ap-dot-eyebrow">Why trust this clinic?</p>
            <h2 className="ap-display ap-display--l" id="ap-trust-title">
              Qualified, registered and <em>accountable.</em>
            </h2>
          </div>
          <p className="ap-lede" data-reveal style={{ '--d': '.1s' }}>
            Six things worth checking before you book anywhere, including here.
          </p>
        </div>

        <div
          className="ap-dossier"
          data-reveal
          ref={dossierRef}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
          }}
        >
          <div className={cx('ap-creds', isPaused && 'is-paused')} role="tablist" aria-label="Credentials" aria-orientation="vertical" ref={tabsRef}>
            {trustDossier.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ap-cred-${item.id}`}
                className="ap-cred"
                aria-selected={index === active}
                aria-controls="ap-stage"
                tabIndex={index === active ? 0 : -1}
                onClick={() => choose(index)}
                onKeyDown={onKeyDown}
              >
                <span
                  className="ap-cred__bar"
                  aria-hidden="true"
                  key={index === active ? `on-${active}` : 'off'}
                  onAnimationEnd={() => !reduceMotion && choose((index + 1) % trustDossier.length)}
                />
                <span className="ap-cred__badge ap-serif" aria-hidden="true">
                  <Badge badge={item.badge} />
                </span>
                <span>
                  <span className="ap-cred__title ap-serif">{item.title}</span>
                  <span className="ap-cred__more">
                    <span>{item.body}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="ap-stage" id="ap-stage" role="tabpanel" aria-labelledby={`ap-cred-${current.id}`}>
            {trustDossier.map((item, index) => (
              <img
                key={item.id}
                className={cx('ap-stage__img', index === active && 'is-active', index === previous && 'is-prev')}
                src={item.image}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ))}
            <div className="ap-stage__card">
              <div className="ap-stage__card-inner" key={current.id}>
                <div className="ap-stage__top">
                  {current.badge === 'logo' ? (
                    <span className="ap-stage__logo">
                      <img src={JCCP_LOGO} alt="Joint Council for Cosmetic Practitioners" />
                    </span>
                  ) : (
                    <span className="ap-stage__seal ap-serif" aria-hidden="true">
                      {current.badge}
                    </span>
                  )}
                  <span className="ap-stage__step ap-nums">
                    {pad2(active + 1)} / {pad2(trustDossier.length)}
                  </span>
                </div>
                <h3 className="ap-serif">{current.title}</h3>
                <p>{current.body}</p>
                <ul className="ap-stage__proof">
                  {current.proof.map((item) => (
                    <li key={item.label} className={cx(item.pending && 'is-pending')}>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.label} ↗<span className="ap-visually-hidden"> (opens in a new tab)</span>
                        </a>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
