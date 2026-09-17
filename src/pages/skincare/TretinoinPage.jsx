import { tretinoin } from '../../content/products';
import usePageMeta from '../../lib/usePageMeta';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import Breadcrumbs from '../../components/patterns/Breadcrumbs';
import { Button, Container, Heading, Notice, Section, Text } from '../../components/ui';
import PrescriptionQuestionnaire from './PrescriptionQuestionnaire';
import './TretinoinPage.css';

/**
 * Prescription-only medicine (plan §7.7, D5, R1). The notice comes first,
 * the information is factual, and there is no price, no offer and no basket
 * anywhere on the page.
 */
export default function TretinoinPage() {
  usePageMeta({
    title: `${tretinoin.name} (prescription skincare)`,
    description:
      'Prescription skincare at Allure Passions UK. Supplied only after a medical questionnaire and a prescriber’s confirmation, with payment and collection in clinic.',
  });

  return (
    <>
      <Section spacing="compact" className="ap-pom">
        <Container width="narrow">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Clinical skincare', to: '/skincare' },
              { label: tretinoin.name },
            ]}
          />

          <p className="ap-eyebrow ap-pom__type">{tretinoin.type}</p>
          <Heading as="h1" size="l">
            {tretinoin.name}
          </Heading>

          <Notice tone="important" title="Please read before you continue" className="ap-pom__notice">
            <p>{tretinoin.notice}</p>
          </Notice>

          <div className="ap-pom__sections">
            <section aria-labelledby="ap-pom-what">
              <h2 className="ap-pom__heading" id="ap-pom-what">
                What it is
              </h2>
              <Text>{tretinoin.what}</Text>
            </section>

            <section aria-labelledby="ap-pom-strengths">
              <h2 className="ap-pom__heading" id="ap-pom-strengths">
                Strengths dispensed
              </h2>
              <ul className="ap-pom__list">
                {tretinoin.strengths.map((strength) => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
              <Text size="small" tone="muted">
                Which strength is appropriate, if any, is the prescriber&rsquo;s decision.
              </Text>
            </section>

            <section aria-labelledby="ap-pom-not-suitable">
              <h2 className="ap-pom__heading" id="ap-pom-not-suitable">
                Who it is not suitable for
              </h2>
              <ul className="ap-pom__list">
                {tretinoin.notSuitable.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="ap-pom-side-effects">
              <h2 className="ap-pom__heading" id="ap-pom-side-effects">
                Common side effects
              </h2>
              <ul className="ap-pom__list">
                {tretinoin.sideEffects.map((effect) => (
                  <li key={effect}>{effect}</li>
                ))}
              </ul>
              <Text size="small" tone="muted">
                This page is not a substitute for the patient information leaflet supplied with the medicine.
              </Text>
            </section>

            <section aria-labelledby="ap-pom-how">
              <h2 className="ap-pom__heading" id="ap-pom-how">
                How it works
              </h2>
              <ol className="ap-pom__steps">
                {tretinoin.steps.map((step, index) => (
                  <li key={step.id}>
                    <span className="ap-pom__step-number ap-nums" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span>
                      <span className="ap-pom__step-title">{step.title}</span>
                      <span className="ap-pom__step-detail">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Button href="#questionnaire" className="ap-pom__start">
                Start the questionnaire
              </Button>
            </section>
          </div>
        </Container>
      </Section>

      <Section tone="stone" spacing="compact" aria-labelledby="ap-pom-questionnaire">
        <Container width="narrow">
          <h2 className="ap-pom__heading ap-pom__heading--large" id="ap-pom-questionnaire">
            Medical questionnaire
          </h2>
          <Text size="small">
            Your answers go to our prescriber, who decides whether this medicine is suitable for you. Completing this is
            a request for assessment; it is not a purchase, and nothing is dispensed without that assessment.
          </Text>
          <PrescriptionQuestionnaire />
        </Container>
      </Section>

      <BeginConsultation id="tretinoin-begin" />
    </>
  );
}
