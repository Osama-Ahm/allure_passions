import { signatureTreatments } from '../../../content/treatments';
import TreatmentIndex from '../../../components/patterns/TreatmentIndex';
import { ArrowLink, Container, Section, SectionHeader } from '../../../components/ui';

/**
 * Block 4 (plan §6): the six technologies as a numbered index rather than a
 * grid of cards.
 */
export default function SignatureTreatments() {
  return (
    <Section id="treatments" tone="stone" aria-labelledby="ap-treatments-title">
      <Container>
        <SectionHeader
          eyebrow="Signature treatments"
          title="Advanced treatments. Personalised to you."
          titleId="ap-treatments-title"
          lede="Six technologies at the heart of the clinic, each chosen for the concerns it can address."
        />

        <TreatmentIndex treatments={signatureTreatments} />

        <div className="ap-index__footer">
          <ArrowLink to="/treatments">View all treatments &amp; pricing</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
