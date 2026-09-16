import { ArrowRight, MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { allConcerns, concernGroups, concernPath } from '../../../content/concerns';
import { treatmentOptions } from '../../../content/treatments';
import { enquiryMessage, whatsappHref } from '../../../utils/contact';
import { ArrowLink, Button, Chip, Container, Heading, Section, SectionHeader, Text } from '../../../components/ui';
import './ConcernFinder.css';

const HASH_PREFIX = '#concern-';

const groupOf = (concernId) => concernGroups.find((group) => group.concerns.some((c) => c.id === concernId));

/** A shared concern link (#concern-melasma) decides what opens first. */
function initialSelection() {
  const fromHash = typeof window !== 'undefined' && window.location.hash.startsWith(HASH_PREFIX)
    ? window.location.hash.slice(HASH_PREFIX.length)
    : '';
  const concern = allConcerns.find((item) => item.id === fromHash) ?? allConcerns[0];
  return { groupId: groupOf(concern.id).id, concernId: concern.id };
}

/**
 * Block 3 (plan §6): group tabs, concern chips and a result panel. There is
 * never an empty state — the first concern is open on arrival — and the
 * selection is written to the URL so a concern can be shared.
 */
export default function ConcernFinder() {
  const [{ groupId, concernId }, setSelection] = useState(initialSelection);
  const tabsRef = useRef(null);
  const chipsRef = useRef(null);

  const group = concernGroups.find((item) => item.id === groupId);
  const concern = allConcerns.find((item) => item.id === concernId);

  const select = (nextGroupId, nextConcernId) => {
    setSelection({ groupId: nextGroupId, concernId: nextConcernId });
    // replaceState keeps the page still; a plain hash change would jump.
    window.history.replaceState(null, '', `${HASH_PREFIX}${nextConcernId}`);
  };

  /** Arrow, Home and End keys inside a tablist or a radio group. */
  const moveWithin = (container, event, count, onMove) => {
    const keys = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
    let next = null;

    if (event.key in keys) next = event.currentTarget.dataset.index * 1 + keys[event.key];
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;

    event.preventDefault();
    const index = (next + count) % count;
    onMove(index);
    container.current?.querySelectorAll('[data-index]')[index]?.focus();
  };

  const onTabKeyDown = (event) =>
    moveWithin(tabsRef, event, concernGroups.length, (index) => {
      const nextGroup = concernGroups[index];
      select(nextGroup.id, nextGroup.concerns[0].id);
    });

  const onChipKeyDown = (event) =>
    moveWithin(chipsRef, event, group.concerns.length, (index) => select(group.id, group.concerns[index].id));

  return (
    <Section id="concerns" aria-labelledby="ap-concerns-title">
      <Container>
        <SectionHeader
          eyebrow="What we treat"
          title="What would you like to improve?"
          titleId="ap-concerns-title"
          lede="Choose a concern to see treatments that may help. Your plan is always confirmed at consultation."
        />

        <div className="ap-finder">
          <div className="ap-finder__tabs" role="tablist" aria-label="Concern groups" ref={tabsRef}>
            {concernGroups.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`ap-group-${item.id}`}
                data-index={index}
                className="ap-finder__tab"
                aria-selected={item.id === groupId}
                aria-controls={`ap-chips-${item.id}`}
                tabIndex={item.id === groupId ? 0 : -1}
                onClick={() => select(item.id, item.concerns[0].id)}
                onKeyDown={onTabKeyDown}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="ap-finder__body">
            <div
              className="ap-finder__chips"
              role="tabpanel"
              id={`ap-chips-${group.id}`}
              aria-labelledby={`ap-group-${group.id}`}
            >
              <div className="ap-finder__chip-group" role="radiogroup" aria-label={`${group.name} concerns`} ref={chipsRef}>
                {group.concerns.map((item, index) => (
                  <Chip
                    key={item.id}
                    role="radio"
                    data-index={index}
                    aria-checked={item.id === concernId}
                    selected={item.id === concernId}
                    tabIndex={item.id === concernId ? 0 : -1}
                    onClick={() => select(group.id, item.id)}
                    onKeyDown={onChipKeyDown}
                  >
                    {item.name}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="ap-finder__panel" aria-live="polite">
              <div className="ap-finder__result" key={concern.id}>
                <Heading as="h3" size="m">
                  {concern.name}
                </Heading>
                <Text>{concern.description}</Text>

                <p className="ap-finder__label" id={`ap-matches-${concern.id}`}>
                  Treatments that may help
                </p>
                <ul className="ap-finder__matches" aria-labelledby={`ap-matches-${concern.id}`}>
                  {concern.treatments.map((match) => {
                    const option = treatmentOptions[match.id];
                    return (
                      <li key={match.id}>
                        <Link className="ap-finder__match" to={option.to} viewTransition>
                          <span className="ap-finder__match-name">{option.name}</span>
                          <span className="ap-finder__match-reason">{match.reason}</span>
                          <ArrowRight className="ap-finder__match-icon" aria-hidden="true" size={18} strokeWidth={1.25} absoluteStrokeWidth />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <div className="ap-finder__actions">
                  <Button
                    href={whatsappHref(enquiryMessage.concern(concern.name.toLowerCase()))}
                    external
                    icon={MessageCircle}
                    iconPosition="start"
                  >
                    Discuss this concern
                  </Button>
                  <ArrowLink to={concernPath(concern.id)}>See all treatments for this concern</ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
