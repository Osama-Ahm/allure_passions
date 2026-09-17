import { clinic } from '../../content/clinic';
import { ArrowLink, Container, Heading, Notice, Section, Text } from '../../components/ui';
import { emailHref } from '../../utils/contact';
import usePageMeta from '../../lib/usePageMeta';
import './LegalNoticePage.css';

/**
 * Prose template for the legal pages (plan §7.9). It renders whatever sections
 * the content gives it; while `sections` is empty it shows the holding notice
 * and the outline the clinic's copy will fill.
 */
export default function LegalNoticePage({ title, description, pending, outline = [], sections = [] }) {
  usePageMeta({ title, description });

  return (
    <Section className="ap-legal-page">
      <Container width="narrow" className="ap-legal">
        <Heading as="h1" size="l">
          {title}
        </Heading>

        {sections.length > 0 ? (
          sections.map((section) => (
            <section className="ap-legal__section" key={section.id} aria-labelledby={`ap-legal-${section.id}`}>
              <h2 className="ap-legal__heading" id={`ap-legal-${section.id}`}>
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <Text key={paragraph}>{paragraph}</Text>
              ))}
            </section>
          ))
        ) : (
          <>
            <Notice title="Being prepared">
              <p>{pending}</p>
            </Notice>

            {outline.length > 0 && (
              <section className="ap-legal__section" aria-labelledby="ap-legal-outline">
                <h2 className="ap-legal__heading" id="ap-legal-outline">
                  What this page will cover
                </h2>
                <ul className="ap-legal__outline">
                  {outline.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

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
