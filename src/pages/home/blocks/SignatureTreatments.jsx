import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { findConcern } from '../../../content/concerns';
import { signatureTreatments, treatmentPath } from '../../../content/treatments';
import { ArrowLink, Container, Section, SectionHeader, Tag } from '../../../components/ui';
import './SignatureTreatments.css';

/**
 * Block 4 (plan §6): the six technologies as a numbered index rather than a
 * grid of cards. Each row is one link, so there is nothing to hunt for.
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

        <ol className="ap-index">
          {signatureTreatments.map((treatment, index) => (
            <li className="ap-index__item" key={treatment.slug}>
              <Link className="ap-index__row" to={treatmentPath(treatment.slug)} viewTransition>
                <span className="ap-index__number ap-nums" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="ap-index__identity">
                  <span className="ap-index__name">{treatment.name}</span>
                  <span className="ap-index__type">{treatment.type}</span>
                </span>

                <span className="ap-index__about">
                  <span className="ap-index__summary">{treatment.summary}</span>
                  <span className="ap-index__tags">
                    {treatment.concerns.map((id) => (
                      <Tag key={id}>{findConcern(id).name}</Tag>
                    ))}
                  </span>
                </span>

                <span className="ap-index__facts">
                  <span className="ap-index__fact">{treatment.sessions}</span>
                  <span className="ap-index__fact">{treatment.downtime}</span>
                  <span className="ap-index__fact ap-nums">From {treatment.fromPrice}</span>
                </span>

                <ArrowRight className="ap-index__arrow" aria-hidden="true" size={20} strokeWidth={1.25} absoluteStrokeWidth />
              </Link>
            </li>
          ))}
        </ol>

        <div className="ap-index__footer">
          <ArrowLink to="/treatments">View all treatments &amp; pricing</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
