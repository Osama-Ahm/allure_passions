import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { addressLines, clinic } from '../../../content/clinic';
import { consultationCta } from '../../../content/navigation';
import { emailHref, enquiryMessage, telHref, whatsappHref } from '../../../utils/contact';
import { Button, Container, Icon, Section, SectionHeader } from '../../../components/ui';
import './BeginConsultation.css';

const STEPS = [
  { id: 'touch', title: 'Get in touch', detail: 'Tell us what you would like to change. We reply with the next available times.' },
  { id: 'consultation', title: 'Consultation & skin assessment', detail: 'A full history and an assessment of the area concerned, in person.' },
  { id: 'plan', title: 'Your personalised plan', detail: 'What is suitable, how many sessions it typically takes, and what it costs.' },
  { id: 'treatment', title: 'Treatment & aftercare', detail: 'Treatment at your pace, with written aftercare and someone to contact.' },
];

/**
 * Block 11 (plan §6): what happens next, in four steps, and every way to
 * reach the clinic. A low-pressure close that leads with the consultation (D9).
 */
export default function BeginConsultation() {
  return (
    <Section id="begin" tone="stone" aria-labelledby="ap-begin-title">
      <Container>
        <SectionHeader
          eyebrow="Begin with a consultation"
          title="Your treatment starts with a conversation."
          titleId="ap-begin-title"
        />

        <ol className="ap-begin__steps">
          {STEPS.map((step, index) => (
            <li className="ap-begin__step" key={step.id}>
              <span className="ap-begin__node ap-nums" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="ap-begin__step-title">{step.title}</h3>
              <p className="ap-begin__step-detail">{step.detail}</p>
            </li>
          ))}
        </ol>

        <div className="ap-begin__contact">
          <div className="ap-begin__actions">
            <Button href={whatsappHref(enquiryMessage.general)} external icon={MessageCircle} iconPosition="start">
              Message us on WhatsApp
            </Button>
            <Button href={telHref} variant="secondary" icon={Phone} iconPosition="start">
              {clinic.phone.display}
            </Button>
            <Button href={emailHref()} variant="secondary" icon={Mail} iconPosition="start">
              Email the clinic
            </Button>
            <Link className="ap-begin__page-link" to={consultationCta.to} viewTransition>
              Or use the contact page
            </Link>
          </div>

          <address className="ap-begin__visit">
            <p className="ap-begin__row">
              <Icon icon={MapPin} size={18} />
              <span>
                {addressLines.map((line) => (
                  <span className="ap-begin__line" key={line}>
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="ap-begin__row">
              <Icon icon={Clock} size={18} />
              <span>
                {clinic.hours.map((entry) => (
                  <span className="ap-begin__line" key={entry.days}>
                    {entry.days}: {entry.time}
                  </span>
                ))}
              </span>
            </p>
            <a className="ap-begin__directions" href={clinic.directionsUrl} target="_blank" rel="noopener noreferrer">
              Get directions
              <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.5} absoluteStrokeWidth />
              <span className="ap-visually-hidden"> (opens in a new tab)</span>
            </a>
          </address>
        </div>
      </Container>
    </Section>
  );
}
