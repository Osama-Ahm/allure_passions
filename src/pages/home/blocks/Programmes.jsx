import { MessageCircle } from 'lucide-react';
import { programmes } from '../../../content/programmes';
import { enquiryMessage, whatsappHref } from '../../../utils/contact';
import { ArrowLink, Button, Container, Section, SectionHeader } from '../../../components/ui';
import './Programmes.css';

/**
 * Block 8 (plan §6): four tier-style columns divided by hairlines, no images.
 * Each enquiry opens WhatsApp with the programme already named.
 */
export default function Programmes() {
  return (
    <Section id="programmes" aria-labelledby="ap-programmes-title">
      <Container>
        <SectionHeader
          eyebrow="Signature programmes"
          title="Structured courses, planned end to end."
          titleId="ap-programmes-title"
          lede="Where a concern needs a course rather than a session, this is what that looks like and what it costs."
        />

        <ul className="ap-programmes">
          {programmes.map((programme) => (
            <li className="ap-programme" key={programme.id}>
              <h3 className="ap-programme__name">{programme.name}</h3>
              <p className="ap-programme__subtitle">{programme.subtitle}</p>

              <p className="ap-programme__price">
                <span className="ap-programme__amount ap-nums">{programme.price}</span>
                <span className="ap-programme__terms">
                  {programme.sessions} · {programme.singlePrice}
                </span>
              </p>

              <p className="ap-programme__label">Includes</p>
              <ul className="ap-programme__includes">
                {programme.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="ap-programme__actions">
                <Button
                  href={whatsappHref(enquiryMessage.programme(programme.name))}
                  external
                  variant="secondary"
                  size="sm"
                  icon={MessageCircle}
                  iconPosition="start"
                >
                  Enquire
                </Button>
                <ArrowLink to="/pricing">See pricing</ArrowLink>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
