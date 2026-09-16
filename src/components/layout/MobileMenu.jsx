import { Clock, MapPin, MessageCircle, Minus, Phone, Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { addressText, clinic } from '../../content/clinic';
import { concernGroups, concernPath } from '../../content/concerns';
import { consultationCta, primaryLinks } from '../../content/navigation';
import { signatureTreatments, treatmentPath } from '../../content/treatments';
import cx from '../../lib/cx';
import useBodyScrollLock from '../../lib/useBodyScrollLock';
import useFocusTrap from '../../lib/useFocusTrap';
import { telHref, whatsappHref } from '../../utils/contact';
import BrandLockup from '../brand/BrandLockup';
import { ArrowLink, Button, Icon, IconButton } from '../ui';
import './MobileMenu.css';

const menuLinks = [...primaryLinks, { label: 'Contact', to: consultationCta.to }];

/**
 * Full-screen menu below 1200px (plan §5.2). Covers the whole viewport so the
 * dialog holds its own close button, traps focus, closes on Escape and returns
 * focus to the button that opened it.
 */
export default function MobileMenu({ id, isOpen, onClose }) {
  const panelRef = useRef(null);
  const [isTreatmentsOpen, setTreatmentsOpen] = useState(false);
  // The two groupings open separately, so neither list has to be scrolled past.
  const [isConcernsOpen, setConcernsOpen] = useState(false);
  const [isSignatureOpen, setSignatureOpen] = useState(false);

  useFocusTrap(panelRef, isOpen);
  useBodyScrollLock(isOpen);

  // Closing the menu collapses the accordion, so it opens fresh next time.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) {
      setTreatmentsOpen(false);
      setConcernsOpen(false);
      setSignatureOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      id={id}
      className={cx('ap-mobile-menu', isOpen && 'is-open')}
      data-tone="canvas"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="ap-mobile-menu__bar">
        <Link className="ap-mobile-menu__brand" to="/" onClick={onClose} aria-label={`${clinic.name} — home`} viewTransition>
          <BrandLockup size="sm" showPlace={false} />
        </Link>
        <IconButton icon={X} label="Close menu" variant="ghost" onClick={onClose} />
      </div>

      <div className="ap-mobile-menu__scroll">
        <nav aria-label="Site">
          <ul className="ap-mobile-menu__list">
            <li>
              <button
                type="button"
                className="ap-mobile-menu__row"
                aria-expanded={isTreatmentsOpen}
                aria-controls={`${id}-treatments`}
                onClick={() => setTreatmentsOpen((open) => !open)}
              >
                <span>Treatments</span>
                <Icon icon={isTreatmentsOpen ? Minus : Plus} size={18} />
              </button>

              <div id={`${id}-treatments`} className="ap-mobile-menu__sub" hidden={!isTreatmentsOpen}>
                <button
                  type="button"
                  className="ap-mobile-menu__sub-row"
                  aria-expanded={isConcernsOpen}
                  aria-controls={`${id}-by-concern`}
                  onClick={() => setConcernsOpen((open) => !open)}
                >
                  <span>By concern</span>
                  <Icon icon={isConcernsOpen ? Minus : Plus} size={16} />
                </button>

                <div id={`${id}-by-concern`} className="ap-mobile-menu__groups" hidden={!isConcernsOpen}>
                  {concernGroups.map((group) => (
                    <div key={group.id}>
                      <p className="ap-mobile-menu__group-title" id={`${id}-${group.id}`}>
                        {group.name}
                      </p>
                      <ul className="ap-mobile-menu__sub-list" aria-labelledby={`${id}-${group.id}`}>
                        {group.concerns.map((concern) => (
                          <li key={concern.id}>
                            <Link className="ap-mobile-menu__sub-link" to={concernPath(concern.id)} onClick={onClose} viewTransition>
                              {concern.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="ap-mobile-menu__sub-row"
                  aria-expanded={isSignatureOpen}
                  aria-controls={`${id}-signature`}
                  onClick={() => setSignatureOpen((open) => !open)}
                >
                  <span>Signature treatments</span>
                  <Icon icon={isSignatureOpen ? Minus : Plus} size={16} />
                </button>

                <ul className="ap-mobile-menu__sub-list" id={`${id}-signature`} hidden={!isSignatureOpen}>
                  {signatureTreatments.map((treatment) => (
                    <li key={treatment.slug}>
                      <Link className="ap-mobile-menu__sub-link" to={treatmentPath(treatment.slug)} onClick={onClose} viewTransition>
                        {treatment.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ArrowLink className="ap-mobile-menu__all" to="/treatments" onClick={onClose}>
                  All treatments
                </ArrowLink>
              </div>
            </li>

            {menuLinks.map((link) => (
              <li key={link.to}>
                <NavLink className="ap-mobile-menu__row" to={link.to} onClick={onClose} viewTransition>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ap-mobile-menu__contact">
          <Button href={whatsappHref()} external icon={MessageCircle} iconPosition="start" fullWidth>
            Message us on WhatsApp
          </Button>
          <Button href={telHref} variant="secondary" icon={Phone} iconPosition="start" fullWidth>
            Call the clinic
          </Button>

          <address className="ap-mobile-menu__details">
            <p>
              <Icon icon={MapPin} size={16} />
              <span>{addressText}</span>
            </p>
            <p>
              <Icon icon={Clock} size={16} />
              <span>
                {clinic.hours.map((entry) => (
                  <span className="ap-mobile-menu__hours" key={entry.days}>
                    {entry.days}: {entry.time}
                  </span>
                ))}
              </span>
            </p>
          </address>

          <ArrowLink href={clinic.directionsUrl} external>
            Get directions
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
