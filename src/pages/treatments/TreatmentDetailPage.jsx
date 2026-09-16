import { Clock, Coins, Gauge, MessageCircle, Repeat, Sun } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router';
import { findConcern, concernPath } from '../../content/concerns';
import { pricingFor } from '../../content/pricing';
import { treatmentDetails } from '../../content/treatmentDetails';
import { signatureTreatments } from '../../content/treatments';
import usePageMeta from '../../lib/usePageMeta';
import { enquiryMessage, whatsappHref } from '../../utils/contact';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import Breadcrumbs from '../../components/patterns/Breadcrumbs';
import PriceTable from '../../components/patterns/PriceTable';
import TreatmentIndex from '../../components/patterns/TreatmentIndex';
import { ArrowLink, Button, Chip, Container, Heading, Icon, Section, Text } from '../../components/ui';
import NotFoundPage from '../NotFoundPage';
import './TreatmentDetailPage.css';

const SPEC_ICONS = { duration: Clock, comfort: Gauge, downtime: Sun, sessions: Repeat, from: Coins };
const SPEC_LABELS = { duration: 'Duration', comfort: 'Comfort', downtime: 'Downtime', sessions: 'Sessions', from: 'From' };

export default function TreatmentDetailPage() {
  const { slug = '' } = useParams();

  // Old underscore URLs from the previous site.
  if (slug.includes('_')) return <Navigate to={`/treatments/${slug.replaceAll('_', '-')}`} replace />;

  const treatment = signatureTreatments.find((item) => item.slug === slug);
  const detail = treatmentDetails[slug];
  if (!treatment || !detail) return <NotFoundPage />;

  return <TreatmentDetail treatment={treatment} detail={detail} />;
}

function TreatmentDetail({ treatment, detail }) {
  usePageMeta({ title: treatment.name, description: treatment.summary });

  const spec = {
    duration: detail.spec.duration,
    comfort: detail.spec.comfort,
    downtime: detail.spec.downtime,
    sessions: treatment.sessions,
    from: treatment.fromPrice,
  };
  const prices = pricingFor(treatment.slug);
  const related = signatureTreatments.filter((item) => detail.related.includes(item.slug));
  const whatsapp = whatsappHref(enquiryMessage.treatment(treatment.name));

  return (
    <>
      <Section spacing="compact" className="ap-treatment__head">
        <Container>
          <Breadcrumbs
            items={[{ label: 'Home', to: '/' }, { label: 'Treatments', to: '/treatments' }, { label: treatment.name }]}
          />

          <div className="ap-treatment__intro">
            <p className="ap-eyebrow">{treatment.type}</p>
            <Heading as="h1" size="l">
              {treatment.name}
            </Heading>
            <Text size="lede">{treatment.summary}</Text>

            <ul className="ap-treatment__concerns">
              {treatment.concerns.map((id) => (
                <li key={id}>
                  <Chip as={Link} to={concernPath(id)} viewTransition>
                    {findConcern(id).name}
                  </Chip>
                </li>
              ))}
            </ul>

            <div className="ap-treatment__cta">
              <Button to="/contact">Request a consultation</Button>
              <ArrowLink href={whatsapp} external>
                Ask about {treatment.name} on WhatsApp
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="compact" className="ap-treatment__main">
        <Container>
          <div className="ap-treatment__columns">
            <div className="ap-treatment__body">
              <section className="ap-treatment__section" aria-labelledby="ap-overview">
                <h2 className="ap-treatment__heading" id="ap-overview">
                  Overview
                </h2>
                <Text>{detail.overview}</Text>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-helps">
                <h2 className="ap-treatment__heading" id="ap-helps">
                  What it can help with
                </h2>
                <ul className="ap-treatment__concern-links">
                  {treatment.concerns.map((id) => {
                    const concern = findConcern(id);
                    return (
                      <li key={id}>
                        <ArrowLink to={concernPath(id)}>{concern.name}</ArrowLink>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-how">
                <h2 className="ap-treatment__heading" id="ap-how">
                  How it works
                </h2>
                <ol className="ap-treatment__steps">
                  {detail.howItWorks.map((step, index) => (
                    <li key={step.title}>
                      <span className="ap-treatment__step-number ap-nums" aria-hidden="true">
                        {index + 1}
                      </span>
                      <span>
                        <span className="ap-treatment__step-title">{step.title}</span>
                        <span className="ap-treatment__step-detail">{step.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-expect">
                <h2 className="ap-treatment__heading" id="ap-expect">
                  What to expect
                </h2>
                <dl className="ap-treatment__expect">
                  <dt>Before</dt>
                  <dd>{detail.expect.before}</dd>
                  <dt>During</dt>
                  <dd>{detail.expect.during}</dd>
                  <dt>After</dt>
                  <dd>{detail.expect.after}</dd>
                </dl>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-results">
                <h2 className="ap-treatment__heading" id="ap-results">
                  Sessions &amp; results
                </h2>
                <Text>{detail.results}</Text>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-suitability">
                <h2 className="ap-treatment__heading" id="ap-suitability">
                  Suitability &amp; side effects
                </h2>
                <Text>{detail.suitability}</Text>
                <p className="ap-treatment__label">Possible side effects</p>
                <ul className="ap-treatment__list">
                  {detail.sideEffects.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-aftercare">
                <h2 className="ap-treatment__heading" id="ap-aftercare">
                  Aftercare
                </h2>
                <ul className="ap-treatment__list">
                  {detail.aftercare.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="ap-treatment__section" aria-labelledby="ap-faqs">
                <h2 className="ap-treatment__heading" id="ap-faqs">
                  Questions
                </h2>
                <dl className="ap-treatment__faqs">
                  {detail.faqs.map((faq) => (
                    <div key={faq.question}>
                      <dt>{faq.question}</dt>
                      <dd>{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>

            <aside className="ap-treatment__aside" aria-labelledby="ap-spec-title">
              <div className="ap-spec">
                <p className="ap-spec__title" id="ap-spec-title">
                  Treatment details
                </p>
                <dl className="ap-spec__list">
                  {Object.entries(spec).map(([key, value]) => (
                    <div className="ap-spec__row" key={key}>
                      <dt>
                        <Icon icon={SPEC_ICONS[key]} size={18} />
                        {SPEC_LABELS[key]}
                      </dt>
                      <dd className={key === 'from' ? 'ap-nums' : undefined}>{value}</dd>
                    </div>
                  ))}
                </dl>
                <Button to="/contact" fullWidth size="sm">
                  Request a consultation
                </Button>
                <Button href={whatsapp} external variant="secondary" size="sm" fullWidth icon={MessageCircle} iconPosition="start">
                  WhatsApp us
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {prices.length > 0 && (
        <Section tone="stone" spacing="compact" aria-labelledby="ap-treatment-pricing">
          <Container>
            <h2 className="ap-treatment__heading" id="ap-treatment-pricing">
              Pricing
            </h2>
            {prices.map((category) => (
              <div className="ap-treatment__price-group" key={category.id}>
                <h3 className="ap-treatment__price-title">{category.title}</h3>
                <PriceTable category={category} />
              </div>
            ))}
            <ArrowLink to="/pricing">See the full price list</ArrowLink>
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section spacing="compact" aria-labelledby="ap-related">
          <Container>
            <h2 className="ap-treatment__heading" id="ap-related">
              Related treatments
            </h2>
            <TreatmentIndex treatments={related} />
          </Container>
        </Section>
      )}

      <BeginConsultation id="treatment-begin" />
    </>
  );
}
