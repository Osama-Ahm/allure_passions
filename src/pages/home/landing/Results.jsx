import { useRef, useState } from 'react';
import { resultCases } from '../../../content/media';
import BeforeAfter from '../../../components/media/BeforeAfter';
import PillButton from '../../../components/ui/PillButton';
import Chapter from './Chapter';
import './Results.css';

/**
 * 03 · Evidence. Result cases as tabs beside a draggable before/after
 * comparison. Every photograph slot here takes a genuine, consented clinic
 * photograph only (content/media.js).
 */
export default function Results() {
  const [activeId, setActiveId] = useState(resultCases[0].id);
  const tabsRef = useRef(null);
  const active = resultCases.find((item) => item.id === activeId);

  const onTabKeyDown = (event) => {
    const keys = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 };
    const index = resultCases.findIndex((item) => item.id === activeId);
    let next;
    if (event.key in keys) next = index + keys[event.key];
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = resultCases.length - 1;
    else return;
    event.preventDefault();
    const wrapped = (next + resultCases.length) % resultCases.length;
    setActiveId(resultCases[wrapped].id);
    tabsRef.current?.querySelectorAll('[role="tab"]')[wrapped]?.focus();
  };

  return (
    <section className="ap-results-lp" id="results" data-tone="night" data-chapter="evidence" aria-labelledby="ap-results-title">
      <div className="ap-wrap">
        <Chapter id="evidence" style={{ paddingTop: 'clamp(40px, 6vw, 80px)' }} />
        <div className="ap-results-lp__grid">
          <div data-reveal>
            <p className="ap-dot-eyebrow">Real results</p>
            <h2 className="ap-display ap-display--l" id="ap-results-title">
              See the <em>difference</em> for yourself.
            </h2>
            <p className="ap-lede ap-results-lp__lede">Before and after a course, photographed in clinic. Drag to compare.</p>

            <div className="ap-cases" role="tablist" aria-label="Result cases" aria-orientation="vertical" ref={tabsRef}>
              {resultCases.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`ap-case-${item.id}`}
                  className="ap-case"
                  aria-selected={item.id === activeId}
                  aria-controls="ap-case-panel"
                  tabIndex={item.id === activeId ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={onTabKeyDown}
                >
                  <b className="ap-serif">{item.tab}</b>
                  <small>
                    {item.treatment} · {item.course.toLowerCase()}
                  </small>
                </button>
              ))}
            </div>

            <PillButton href="#trust" variant="ghost">
              Who carries out the work
            </PillButton>
          </div>

          <div data-reveal style={{ '--d': '.15s' }}>
            <div className="ap-results-lp__frame" role="tabpanel" id="ap-case-panel" aria-labelledby={`ap-case-${active.id}`} data-cursor="Drag">
              <BeforeAfter
                key={active.id}
                before={active.before}
                after={active.after}
                label={`Compare before and after: ${active.tab.toLowerCase()} treated with ${active.treatment}`}
              />
            </div>
            <p className="ap-results-lp__note">
              {active.note} Unretouched, shared with the patient&rsquo;s consent. Individual results vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
