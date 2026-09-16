import { Link } from 'react-router';
import { concernGroups, concernPath } from '../../content/concerns';
import { signatureTreatments, treatmentPath } from '../../content/treatments';
import cx from '../../lib/cx';
import { ArrowLink, Container } from '../ui';
import './MegaMenu.css';

/**
 * The Treatments panel (plan §5.2): concerns on the left, the six signature
 * technologies on the right. Always in the DOM so `aria-controls` stays valid;
 * `visibility: hidden` keeps it out of the tab order and the accessibility tree
 * while it is closed.
 */
export default function MegaMenu({ id, isOpen, onNavigate }) {
  return (
    <div id={id} className={cx('ap-mega', isOpen && 'is-open')} data-tone="canvas">
      <Container className="ap-mega__inner">
        <div className="ap-mega__concerns">
          <p className="ap-mega__label" id={`${id}-concerns`}>
            By concern
          </p>
          <div className="ap-mega__groups">
            {concernGroups.map((group) => (
              <div className="ap-mega__group" key={group.id}>
                <p className="ap-mega__group-title" id={`${id}-${group.id}`}>
                  {group.name}
                </p>
                <ul className="ap-mega__list" aria-labelledby={`${id}-${group.id}`}>
                  {group.concerns.map((concern) => (
                    <li key={concern.id}>
                      <Link className="ap-mega__link" to={concernPath(concern.id)} onClick={onNavigate} viewTransition>
                        {concern.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ap-mega__signature">
          <p className="ap-mega__label" id={`${id}-signature`}>
            Signature treatments
          </p>
          <ul className="ap-mega__list" aria-labelledby={`${id}-signature`}>
            {signatureTreatments.map((treatment) => (
              <li key={treatment.slug}>
                <Link
                  className="ap-mega__link ap-mega__link--treatment"
                  to={treatmentPath(treatment.slug)}
                  onClick={onNavigate}
                  viewTransition
                >
                  <span className="ap-mega__treatment-name">{treatment.name}</span>
                  <span className="ap-mega__treatment-type">{treatment.type}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="ap-mega__actions">
            <ArrowLink to="/treatments" onClick={onNavigate}>
              All treatments
            </ArrowLink>
            <ArrowLink to="/pricing" onClick={onNavigate}>
              Pricing
            </ArrowLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
