import { Link } from 'react-router';
import { addressLines, clinic } from '../../content/clinic';
import { consultationCta, footerColumns, legalLinks } from '../../content/navigation';
import { emailHref, telHref, whatsappHref } from '../../utils/contact';
import PillButton from '../ui/PillButton';
import './Footer.css';

/**
 * Site footer (plan §6, Block 12, in the homepage design's form): a night
 * panel with rounded top corners, a column to get in touch, the site's links
 * and the visit details, the clinic's name set large, and the legal line.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ap-footer" data-tone="night">
      <div className="ap-footer__inner">
        <div className="ap-footer__grid">
          <div className="ap-footer__lead">
            <p className="ap-footer__title">Talk to us</p>
            <p className="ap-footer__blurb">Every plan starts with a conversation. Message us and a practitioner will reply.</p>
            <PillButton to={consultationCta.to} variant="light" className="ap-footer__cta">
              {consultationCta.label}
            </PillButton>
            <ul className="ap-footer__list ap-footer__contact">
              <li>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp · {clinic.phone.display}
                  <span className="ap-visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={telHref}>Call the clinic</a>
              </li>
              <li>
                <a href={emailHref()}>{clinic.email}</a>
              </li>
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav className="ap-footer__column" key={column.id} aria-labelledby={`ap-footer-${column.id}`}>
              <p className="ap-footer__title" id={`ap-footer-${column.id}`}>
                {column.title}
              </p>
              <ul className="ap-footer__list">
                {column.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} viewTransition>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="ap-footer__column">
            <p className="ap-footer__title">Visit</p>
            <address className="ap-footer__list">
              {addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <span>{clinic.stations.join(' · ')}</span>
              {clinic.hours.map((entry) => (
                <span key={entry.days}>
                  {entry.days} · {entry.time}
                </span>
              ))}
              <a href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions ↗<span className="ap-visually-hidden"> (opens in a new tab)</span>
              </a>
            </address>
          </div>
        </div>

        <p className="ap-footer__word" aria-hidden="true">
          Allure Passions
        </p>

        <div className="ap-footer__legal">
          <p>
            © {year} {clinic.legalName} · {clinic.credentialsLine}
          </p>
          <ul>
            {legalLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} viewTransition>
                  {link.label}
                </Link>
              </li>
            ))}
            {clinic.social.map((channel) => (
              <li key={channel.id}>
                <a href={channel.href} target="_blank" rel="noopener noreferrer">
                  {channel.label} ↗<span className="ap-visually-hidden"> {channel.handle} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
