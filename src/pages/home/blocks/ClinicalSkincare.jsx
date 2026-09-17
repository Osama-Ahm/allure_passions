import { kojivit, prescriptionRoute } from '../../../content/products';
import { Button, Container, Heading, Section, SectionHeader, Text } from '../../../components/ui';
import './ClinicalSkincare.css';

/**
 * Block 9 (plan §6): the at-home side of the clinic. Kojivit is described in
 * cosmetic terms; the prescription route is described by what happens, never by
 * the medicine's name (D5, P5).
 */
export default function ClinicalSkincare() {
  return (
    <Section id="skincare" tone="stone" aria-labelledby="ap-skincare-title">
      <Container>
        <SectionHeader
          eyebrow="Clinical skincare"
          title="What you use at home matters too."
          titleId="ap-skincare-title"
          lede="In-clinic treatment works better alongside the right routine. Both routes below start with a conversation."
        />

        <div className="ap-skincare">
          <article className="ap-skincare__panel">
            <img
              className="ap-skincare__packshot"
              src={kojivit.image}
              alt={`${kojivit.name} cream`}
              width="480"
              height="480"
              loading="lazy"
            />
            <div className="ap-skincare__body">
              <Heading as="h3" size="title">
                {kojivit.name}
              </Heading>
              <Text size="small">{kojivit.summary}</Text>
              <p className="ap-skincare__price ap-nums">{kojivit.price}</p>
              <Button to={`/skincare/${kojivit.slug}`} variant="secondary" size="sm">
                View product
              </Button>
            </div>
          </article>

          <article className="ap-skincare__panel ap-skincare__panel--flow">
            <div className="ap-skincare__body">
              <Heading as="h3" size="title">
                Prescription skincare
              </Heading>
              <p className="ap-skincare__notice">{prescriptionRoute.notice}</p>

              <ol className="ap-skincare__steps">
                {prescriptionRoute.steps.map((step, index) => (
                  <li className="ap-skincare__step" key={step.id}>
                    <span className="ap-skincare__step-number ap-nums" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="ap-skincare__step-text">
                      <span className="ap-skincare__step-title">{step.title}</span>
                      <span className="ap-skincare__step-detail">{step.detail}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <Button to="/skincare/tretinoin" size="sm">
                Start your consultation
              </Button>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  );
}
