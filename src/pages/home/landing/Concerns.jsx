import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { allConcerns, concernGroups } from '../../../content/concerns';
import { concernFamilies, concernGroupImages } from '../../../content/home';
import { consultationCta } from '../../../content/navigation';
import { signatureTreatments, treatmentOptions } from '../../../content/treatments';
import { prefersReducedMotion } from '../../../lib/motion';
import cx from '../../../lib/cx';
import useMediaQuery from '../../../lib/useMediaQuery';
import PillButton, { ArrowGlyph } from '../../../components/ui/PillButton';
import Chapter from './Chapter';
import { pad2 } from './useLandingMotion';
import './Concerns.css';

const NARROW_QUERY = '(max-width: 960px)';
const FAMILIES = ['All', ...Object.keys(concernFamilies)];
const SIGNATURE = new Set(signatureTreatments.map((treatment) => treatment.slug));
const numberOf = Object.fromEntries(allConcerns.map((concern, index) => [concern.id, index]));
const groupOf = Object.fromEntries(allConcerns.map((concern) => [concern.id, concern.group]));
const groupName = Object.fromEntries(concernGroups.map((group) => [group.id, group.name]));

const inFamily = (family, groupId) => family === 'All' || concernFamilies[family].includes(groupId);
const familyCount = (family) => allConcerns.filter((concern) => inFamily(family, concern.group)).length;

/**
 * 02 · Explore. Eighteen concerns in collapsible groups. Choosing one shows
 * what it is and the treatments that may help: in a sticky panel beside the
 * list on wide screens, directly under the chosen row on a phone.
 */
export default function Concerns() {
  const isNarrow = useMediaQuery(NARROW_QUERY);
  const [family, setFamily] = useState('All');
  // Wide screens open with the first concern chosen, so its group starts open.
  const [openGroups, setOpenGroups] = useState(() => new Set(isNarrow ? [] : [allConcerns[0].group]));
  const [activeId, setActiveId] = useState(allConcerns[0].id);
  // On a phone nothing is expanded until a concern is tapped, so the groups stay scannable.
  const [showInline, setShowInline] = useState(false);
  const rowRefs = useRef({});

  const setGroupOpen = (groupId, open) =>
    setOpenGroups((current) => {
      if (current.has(groupId) === open) return current;
      const next = new Set(current);
      if (open) next.add(groupId);
      else next.delete(groupId);
      return next;
    });

  const select = (id, { scroll = false } = {}) => {
    if (isNarrow && id === activeId && showInline) {
      setShowInline(false);
      return;
    }
    setActiveId(id);
    setShowInline(true);
    setGroupOpen(groupOf[id], true);
    if (isNarrow && scroll) {
      window.setTimeout(() => {
        rowRefs.current[id]?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }, 60);
    }
  };

  const chooseFamily = (next) => {
    setFamily(next);
    const shown = concernGroups.filter((group) => inFamily(next, group.id));
    // A single-group filter opens that group straight away.
    if (shown.length === 1) setGroupOpen(shown[0].id, true);
    if (!inFamily(next, groupOf[activeId])) setActiveId(shown[0].concerns[0].id);
  };

  const visibleIds = allConcerns.filter((concern) => inFamily(family, concern.group)).map((concern) => concern.id);
  const nextConcern = () => select(visibleIds[(visibleIds.indexOf(activeId) + 1) % visibleIds.length], { scroll: true });

  const panel = <ConcernPanel id={activeId} onNext={nextConcern} />;

  return (
    <section id="concerns" data-chapter="explore" aria-labelledby="ap-treats-title">
      <div className="ap-wrap">
        <Chapter id="explore" />

        <div className="ap-treats__head">
          <div data-reveal>
            <p className="ap-dot-eyebrow">What we treat</p>
            <h2 className="ap-display ap-display--l" id="ap-treats-title">
              Eighteen concerns across <em>skin, body &amp; wellness.</em>
            </h2>
          </div>
          <div data-reveal style={{ '--d': '.1s' }}>
            <p className="ap-lede">
              Select a concern to see what it is, the treatments that may help and why. Every plan is confirmed in person at
              consultation.
            </p>
            <FamilyFilter family={family} onChange={chooseFamily} />
          </div>
        </div>

        <div className="ap-treats__body">
          <div className="ap-clist">
            {concernGroups.map((group) => {
              if (!inFamily(family, group.id)) return null;
              const isOpen = openGroups.has(group.id);
              const bodyId = `ap-cgroup-${group.id}`;
              return (
                <div className={cx('ap-cgroup', isOpen && 'is-open')} key={group.id}>
                  <button
                    type="button"
                    className="ap-cgroup__head"
                    aria-expanded={isOpen}
                    aria-controls={bodyId}
                    onClick={() => setGroupOpen(group.id, !isOpen)}
                  >
                    <span className="ap-cgroup__title">
                      <span className="ap-cgroup__name ap-serif">{group.name}</span>
                      <span className="ap-cgroup__count">
                        {group.concerns.length} {group.concerns.length === 1 ? 'concern' : 'concerns'}
                      </span>
                    </span>
                    <span className="ap-cgroup__peek">{group.concerns.map((concern) => concern.name).join(' · ')}</span>
                    <span className="ap-cgroup__toggle" aria-hidden="true" />
                  </button>

                  <div className="ap-cgroup__body" id={bodyId} inert={!isOpen || undefined}>
                    <div className="ap-cgroup__inner">
                      {group.concerns.map((concern) => {
                        const isActive = concern.id === activeId && (!isNarrow || showInline);
                        return (
                          <Fragment key={concern.id}>
                            <button
                              ref={(node) => {
                                rowRefs.current[concern.id] = node;
                              }}
                              type="button"
                              className="ap-crow"
                              aria-expanded={isActive}
                              aria-controls={isNarrow ? 'ap-cpanel-inline' : 'ap-cpanel'}
                              onClick={() => select(concern.id, { scroll: true })}
                            >
                              <span className="ap-crow__no ap-nums">{pad2(numberOf[concern.id] + 1)}</span>
                              <span className="ap-crow__name ap-serif">{concern.name}</span>
                              <span className="ap-crow__go" aria-hidden="true">
                                <ArrowGlyph />
                              </span>
                            </button>
                            {isNarrow && isActive && (
                              <div className="ap-cpanel-inline" id="ap-cpanel-inline">
                                {panel}
                              </div>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isNarrow && (
            <div className="ap-cpanel-home" id="ap-cpanel" aria-live="polite">
              {panel}
            </div>
          )}
        </div>

        <div className="ap-treats__bridge" data-reveal>
          <p className="ap-serif">Six technologies sit behind these plans.</p>
          <a className="ap-line-link" href="#treatments">
            Meet the technology <ArrowGlyph />
          </a>
        </div>
      </div>
    </section>
  );
}

function FamilyFilter({ family, onChange }) {
  const groupRef = useRef(null);
  const pillRef = useRef(null);

  const movePill = useCallback(() => {
    const active = groupRef.current?.querySelector('[aria-pressed="true"]');
    const pill = pillRef.current;
    if (!active || !pill) return;
    Object.assign(pill.style, {
      left: `${active.offsetLeft}px`,
      top: `${active.offsetTop}px`,
      width: `${active.offsetWidth}px`,
      height: `${active.offsetHeight}px`,
    });
  }, []);

  useLayoutEffect(movePill, [family, movePill]);
  useEffect(() => {
    window.addEventListener('resize', movePill);
    document.fonts?.ready.then(movePill);
    return () => window.removeEventListener('resize', movePill);
  }, [movePill]);

  return (
    <div className="ap-filters" role="group" aria-label="Filter concerns" ref={groupRef}>
      <span className="ap-filters__pill" aria-hidden="true" ref={pillRef} />
      {FAMILIES.map((name) => (
        <button key={name} type="button" aria-pressed={name === family} onClick={() => onChange(name)}>
          {name}
          <small>{familyCount(name)}</small>
        </button>
      ))}
    </div>
  );
}

function ConcernPanel({ id, onNext }) {
  const concern = allConcerns[numberOf[id]];

  return (
    <div className="ap-cpanel" data-tone="night" key={id}>
      <div className="ap-cpanel__media">
        <img src={concernGroupImages[concern.group]} alt="" loading="lazy" decoding="async" />
        <span className="ap-cpanel__count ap-nums">
          {pad2(numberOf[id] + 1)} / {allConcerns.length}
        </span>
      </div>
      <div className="ap-cpanel__body">
        <p className="ap-dot-eyebrow">{groupName[concern.group]}</p>
        <h3 className="ap-serif">{concern.name}</h3>
        <p>{concern.description}</p>
        <p className="ap-cpanel__label">Treatments that may help</p>
        <ol>
          {concern.treatments.map((treatment, index) => {
            const option = treatmentOptions[treatment.id];
            return (
              <li key={treatment.id} style={{ '--i': index }}>
                <b>
                  <Link to={option.to} viewTransition>
                    {option.name}
                  </Link>
                  {SIGNATURE.has(treatment.id) && <i>Signature</i>}
                </b>
                <span>{treatment.reason}</span>
              </li>
            );
          })}
        </ol>
        <div className="ap-cpanel__cta">
          <PillButton to={consultationCta.to} variant="light">
            Discuss at consultation
          </PillButton>
          <button className="ap-cpanel__next" type="button" onClick={onNext}>
            Next concern <ArrowGlyph />
          </button>
        </div>
      </div>
    </div>
  );
}
