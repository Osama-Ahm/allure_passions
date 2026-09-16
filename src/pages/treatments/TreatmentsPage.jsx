import { useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { allConcerns, concernGroups } from '../../content/concerns';
import { priceCategories } from '../../content/pricing';
import { programmes } from '../../content/programmes';
import { signatureTreatments } from '../../content/treatments';
import usePageMeta from '../../lib/usePageMeta';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import ConcernPanel from '../../components/patterns/ConcernPanel';
import TreatmentIndex from '../../components/patterns/TreatmentIndex';
import { ArrowLink, Chip, Container, Heading, Section, Text } from '../../components/ui';
import './TreatmentsPage.css';

const VIEWS = [
  { id: 'concern', label: 'By concern' },
  { id: 'treatment', label: 'By treatment' },
];

/** Price categories that no signature treatment already covers. */
const otherCategories = priceCategories.filter((category) => category.treatments.length === 0);

export default function TreatmentsPage() {
  usePageMeta({
    title: 'Treatments',
    description:
      'Every treatment at Allure Passions UK, by concern or by technology, with what each one addresses and what it costs.',
  });

  const [params, setParams] = useSearchParams();
  const requested = params.get('concern');
  const initial = allConcerns.find((item) => item.id === requested) ?? allConcerns[0];

  const [view, setView] = useState('concern');
  const [concernId, setConcernId] = useState(initial.id);
  const tabsRef = useRef(null);

  const concern = allConcerns.find((item) => item.id === concernId) ?? allConcerns[0];

  const selectConcern = (id) => {
    setConcernId(id);
    setParams({ concern: id }, { replace: true, preventScrollReset: true });
  };

  const onViewKeyDown = (event) => {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (VIEWS.findIndex((item) => item.id === view) + step + VIEWS.length) % VIEWS.length;
    setView(VIEWS[next].id);
    tabsRef.current?.querySelectorAll('[role="tab"]')[next]?.focus();
  };

  return (
    <>
      <Section spacing="compact" className="ap-treatments__head">
        <Container>
          <p className="ap-eyebrow">Treatments</p>
          <Heading as="h1" size="l">
            Find your treatment.
          </Heading>
          <Text size="lede">
            Start from what you would like to change, or from the technology you have read about. Either way, the plan is
            confirmed at consultation.
          </Text>

          <div className="ap-treatments__tabs" role="tablist" aria-label="Browse treatments" ref={tabsRef}>
            {VIEWS.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ap-view-${item.id}`}
                className="ap-treatments__tab"
                aria-selected={view === item.id}
                aria-controls={`ap-view-panel-${item.id}`}
                tabIndex={view === item.id ? 0 : -1}
                onClick={() => setView(item.id)}
                onKeyDown={onViewKeyDown}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        spacing="compact"
        id={`ap-view-panel-${view}`}
        role="tabpanel"
        aria-labelledby={`ap-view-${view}`}
        tabIndex={-1}
      >
        <Container>
          {view === 'concern' ? (
            <div className="ap-treatments__concerns">
              <div className="ap-treatments__groups">
                {concernGroups.map((group) => (
                  <div className="ap-treatments__group" key={group.id}>
                    <p className="ap-treatments__group-title" id={`ap-group-${group.id}`}>
                      {group.name}
                    </p>
                    <div className="ap-treatments__chips" role="radiogroup" aria-labelledby={`ap-group-${group.id}`}>
                      {group.concerns.map((item) => (
                        <Chip
                          key={item.id}
                          role="radio"
                          aria-checked={item.id === concernId}
                          selected={item.id === concernId}
                          onClick={() => selectConcern(item.id)}
                        >
                          {item.name}
                        </Chip>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="ap-treatments__panel" aria-live="polite">
                <ConcernPanel concern={concern} headingLevel="h2" showAllLink={false} key={concern.id} />
              </div>
            </div>
          ) : (
            <>
              <h2 className="ap-treatments__heading">Signature technologies</h2>
              <TreatmentIndex treatments={signatureTreatments} />

              <h2 className="ap-treatments__heading ap-treatments__heading--spaced">Also at the clinic</h2>
              <ul className="ap-treatments__others">
                {otherCategories.map((category) => (
                  <li key={category.id}>
                    <Link className="ap-treatments__other" to={`/pricing#${category.id}`} viewTransition>
                      <span className="ap-treatments__other-name">{category.title}</span>
                      <span className="ap-treatments__other-detail">{category.subtitle}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Container>
      </Section>

      <Section tone="stone" spacing="compact" aria-labelledby="ap-treatments-programmes">
        <Container>
          <h2 className="ap-treatments__heading" id="ap-treatments-programmes">
            Signature programmes
          </h2>
          <ul className="ap-treatments__programmes">
            {programmes.map((programme) => (
              <li key={programme.id}>
                <Link className="ap-treatments__programme" to="/pricing#body" viewTransition>
                  <span className="ap-treatments__other-name">{programme.name}</span>
                  <span className="ap-treatments__other-detail">
                    {programme.subtitle} · {programme.sessions}
                  </span>
                  <span className="ap-treatments__programme-price ap-nums">{programme.price}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ArrowLink to="/pricing">See the full price list</ArrowLink>
        </Container>
      </Section>

      <BeginConsultation id="treatments-begin" />
    </>
  );
}
