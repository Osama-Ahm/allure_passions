import { Clock, Mail, MapPin, MessageCircle, Phone, TrainFront } from 'lucide-react';
import { addressLines, clinic } from '../../content/clinic';
import { ArrowLink, Button, Container, Heading, Icon, Section, Text } from '../../components/ui';
import { emailHref, telHref, whatsappHref } from '../../utils/contact';
import usePageMeta from '../../lib/usePageMeta';
import EnquiryForm from './EnquiryForm';
import './ContactPage.css';

/**
 * Contact and consultation requests (plan §7.8): the direct channels and the
 * clinic's details first, then an enquiry form that composes a message rather
 * than posting anywhere.
 */
export default function ContactPage() {
  usePageMeta({
    title: 'Request a consultation',
    description: `Request a consultation at ${clinic.name}, ${clinic.address.area}, London. Message us on WhatsApp, call the clinic or email us.`,
  });

  return (
    <Section className="ap-contact">
      <Container>
        <div className="ap-contact__intro">
          <p className="ap-eyebrow">Request a consultation</p>
          <Heading as="h1" size="l">
            Your treatment starts with a conversation.
          </Heading>
          <Text size="lede">
            Tell us what you would like to improve. We will arrange a consultation and skin assessment, then set out the
            options that may suit you and what each one involves.
          </Text>
        </div>

        <div className="ap-contact__grid">
          <div className="ap-contact__actions">
            <Button href={whatsappHref()} external icon={MessageCircle} iconPosition="start">
              Message us on WhatsApp
            </Button>
            <Button href={telHref} variant="secondary" icon={Phone} iconPosition="start">
              Call the clinic
            </Button>
            <Button href={emailHref()} variant="secondary" icon={Mail} iconPosition="start">
              Email the clinic
            </Button>
            <Text size="small" tone="muted">
              Please do not include medical details you would rather not send by message. We will take a full history at
              your consultation.
            </Text>
          </div>

          <address className="ap-contact__visit">
            <p className="ap-contact__row">
              <Icon icon={MapPin} size={18} />
              <span>
                {addressLines.map((line) => (
                  <span className="ap-contact__line" key={line}>
                    {line}
                  </span>
                ))}
              </span>
            </p>
            <p className="ap-contact__row">
              <Icon icon={Clock} size={18} />
              <span>
                {clinic.hours.map((entry) => (
                  <span className="ap-contact__line" key={entry.days}>
                    {entry.days}: {entry.time}
                  </span>
                ))}
              </span>
            </p>
            <p className="ap-contact__row">
              <Icon icon={TrainFront} size={18} />
              <span>Nearest stations: {clinic.stations.join(' and ')}</span>
            </p>
            <ArrowLink href={clinic.directionsUrl} external>
              Get directions
            </ArrowLink>
          </address>
        </div>

        <EnquiryForm />
      </Container>
    </Section>
  );
}
