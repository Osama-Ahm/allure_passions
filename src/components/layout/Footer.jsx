import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { addressLines, clinic } from '../../content/clinic';
import { footerColumns, legalLinks } from '../../content/navigation';
import { emailHref, telHref, whatsappHref } from '../../utils/contact';
import BrandLockup from '../brand/BrandLockup';
import { ArrowLink, Container } from '../ui';
import InstagramIcon from '../ui/icons/InstagramIcon';
import './Footer.css';

const socialIcons = { instagram: InstagramIcon };

/**
 * Site footer (plan §6, Block 12): the brand and credentials on a night
 * background, four columns of links, then the legal line.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ap-footer" data-tone="night">
      <Container>
        <div className="ap-footer__brand-row">
          <Link className="ap-footer__brand" to="/" aria-label={`${clinic.name} — home`} viewTransition>
            <BrandLockup size="lg" />
          </Link>
          <p className="ap-footer__credentials">{clinic.credentialsLine}</p>
        </div>

        <div className="ap-footer__directory">
          {footerColumns.map((column) => (
            <div className="ap-footer__column" key={column.id}>
              <p className="ap-footer__column-title" id={`ap-footer-${column.id}`}>
                {column.title}
              </p>
              <ul className="ap-footer__list" aria-labelledby={`ap-footer-${column.id}`}>
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link className="ap-footer__link" to={link.to} viewTransition>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="ap-footer__column">
            <p className="ap-footer__column-title">Visit</p>
            <address className="ap-footer__visit">
              <p className="ap-footer__address">
                {addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <p className="ap-footer__hours">
                {clinic.hours.map((entry) => (
                  <span key={entry.days}>
                    {entry.days}: {entry.time}
                  </span>
                ))}
              </p>
              <ul className="ap-footer__list">
                <li>
                  <a className="ap-footer__link" href={telHref}>
                    {clinic.phone.display}
                  </a>
                </li>
                <li>
                  <a className="ap-footer__link" href={emailHref()}>
                    {clinic.email}
                  </a>
                </li>
                <li>
                  <a className="ap-footer__link" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp
                    <span className="ap-visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
              <ArrowLink className="ap-footer__directions" href={clinic.directionsUrl} external>
                Get directions
              </ArrowLink>
            </address>
          </div>
        </div>

        <div className="ap-footer__bottom">
          <p className="ap-footer__copyright">© {year} {clinic.legalName}</p>

          <ul className="ap-footer__social">
            {clinic.social.map((channel) => {
              const ChannelIcon = socialIcons[channel.id];
              return (
                <li key={channel.id}>
                  <a
                    className="ap-footer__social-link"
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${channel.label}: ${channel.handle} (opens in a new tab)`}
                  >
                    <ChannelIcon size={18} strokeWidth={1.25} absoluteStrokeWidth aria-hidden="true" focusable="false" />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                className="ap-footer__social-link"
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp (opens in a new tab)"
              >
                <MessageCircle size={18} strokeWidth={1.25} absoluteStrokeWidth aria-hidden="true" focusable="false" />
              </a>
            </li>
          </ul>

          <ul className="ap-footer__legal">
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link className="ap-footer__link" to={link.to} viewTransition>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
