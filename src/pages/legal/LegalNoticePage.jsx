import { clinic } from '../../content/clinic';
import { ArrowLink, Container, Heading, Section, Text } from '../../components/ui';
import { emailHref } from '../../utils/contact';
import usePageMeta from '../../lib/usePageMeta';
import './LegalNoticePage.css';

/**
 * Privacy notice and terms. The clinic's own wording is published here in
 * Module 14; until then the page states where things stand and how to ask.
 */
export default function LegalNoticePage({ title, description, body }) {
  usePageMeta({ title, description });

  return (
    <Section>
      <Container width="narrow" className="ap-legal">
        <Heading as="h1" size="l">
          {title}
        </Heading>
        <Text size="lede">
          {body}
        </Text>
        <Text>
          For anything you would like to ask in the meantime, email{' '}
          <a href={emailHref(`${title} enquiry`)}>{clinic.email}</a> or get in touch through the contact page.
        </Text>
        <p>
          <ArrowLink to="/contact">Contact the clinic</ArrowLink>
        </p>
      </Container>
    </Section>
  );
}
