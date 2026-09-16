import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { concernPath } from '../../content/concerns';
import { treatmentOptions } from '../../content/treatments';
import { enquiryMessage, whatsappHref } from '../../utils/contact';
import { ArrowLink, Button, Heading, Text } from '../ui';
import './ConcernPanel.css';

/**
 * One concern: what it is, the treatments that may help and why, and two ways
 * to go further. Shared by the homepage finder and the treatments page, so a
 * concern reads the same wherever it is opened.
 */
export default function ConcernPanel({ concern, headingLevel = 'h3', showAllLink = true }) {
  return (
    <div className="ap-concern-panel" key={concern.id}>
      <Heading as={headingLevel} size="m">
        {concern.name}
      </Heading>
      <Text>{concern.description}</Text>

      <p className="ap-concern-panel__label" id={`ap-matches-${concern.id}`}>
        Treatments that may help
      </p>
      <ul className="ap-concern-panel__matches" aria-labelledby={`ap-matches-${concern.id}`}>
        {concern.treatments.map((match) => {
          const option = treatmentOptions[match.id];
          return (
            <li key={match.id}>
              <Link className="ap-concern-panel__match" to={option.to} viewTransition>
                <span className="ap-concern-panel__match-name">{option.name}</span>
                <span className="ap-concern-panel__match-reason">{match.reason}</span>
                <ArrowRight className="ap-concern-panel__match-icon" aria-hidden="true" size={18} strokeWidth={1.25} absoluteStrokeWidth />
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="ap-concern-panel__actions">
        <Button
          href={whatsappHref(enquiryMessage.concern(concern.name.toLowerCase()))}
          external
          icon={MessageCircle}
          iconPosition="start"
        >
          Discuss this concern
        </Button>
        {showAllLink && <ArrowLink to={concernPath(concern.id)}>See all treatments for this concern</ArrowLink>}
      </div>
    </div>
  );
}
