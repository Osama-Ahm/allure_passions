import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { kojivit, tretinoin } from '../../content/products';
import usePageMeta from '../../lib/usePageMeta';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import { Container, Eyebrow, Heading, Notice, Section, Text } from '../../components/ui';
import './SkincarePage.css';

const COLLECTION = [
  { id: 'reserve', title: 'Reserve', detail: 'Tell us what you would like, by WhatsApp or email.' },
  { id: 'confirm', title: 'We confirm', detail: 'We check availability and reply with a time to collect.' },
  { id: 'collect', title: 'Collect and pay', detail: 'Payment and collection happen in clinic, in person.' },
];

const FAQS = [
  {
    question: 'Can I buy either of these online?',
    answer: 'No. Both are reserved in advance and paid for in clinic. Prescription medicine can never be sold online.',
  },
  {
    question: 'Do I need an appointment to collect?',
    answer: 'Not for a cosmetic product — we agree a time that suits you. Prescription items are handed over in person after the prescriber has confirmed suitability.',
  },
  {
    question: 'Can you post it to me?',
    answer: 'No. Everything is collected from the clinic.',
  },
];

export default function SkincarePage() {
  usePageMeta({
    title: 'Clinical skincare',
    description:
      'Clinical skincare at Allure Passions UK: a cosmetic brightening cream, and a consultation-led route to prescription skincare. Everything is collected and paid for in clinic.',
  });

  return (
    <>
      <Section spacing="compact" className="ap-skincare-page__head">
        <Container>
          <Eyebrow>Clinical skincare</Eyebrow>
          <Heading as="h1" size="l">
            What you use at home.
          </Heading>
          <Text size="lede">
            Two routes: a cosmetic cream you can reserve today, and a prescription route that begins with a medical
            assessment. Both are collected and paid for in clinic.
          </Text>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="ap-skincare-products">
        <Container>
          <h2 className="ap-visually-hidden" id="ap-skincare-products">
            Products
          </h2>

          <ul className="ap-skincare-page__rows">
            <li>
              <Link className="ap-skincare-page__row" to={`/skincare/${kojivit.slug}`} viewTransition>
                <img src={kojivit.image} alt="" width="320" height="320" loading="lazy" />
                <span className="ap-skincare-page__row-body">
                  <span className="ap-skincare-page__row-type">{kojivit.type}</span>
                  <span className="ap-skincare-page__row-name">{kojivit.name}</span>
                  <span className="ap-skincare-page__row-summary">{kojivit.summary}</span>
                  <span className="ap-skincare-page__row-price ap-nums">{kojivit.price}</span>
                </span>
                <ArrowRight className="ap-skincare-page__row-arrow" aria-hidden="true" size={20} strokeWidth={1.25} absoluteStrokeWidth />
              </Link>
            </li>
            <li>
              <Link className="ap-skincare-page__row" to={`/skincare/${tretinoin.slug}`} viewTransition>
                <span className="ap-skincare-page__row-body">
                  <span className="ap-skincare-page__row-type">{tretinoin.type}</span>
                  <span className="ap-skincare-page__row-name">{tretinoin.name}</span>
                  <span className="ap-skincare-page__row-summary">
                    Available only after a medical questionnaire and a prescriber&rsquo;s confirmation. Payment and
                    collection take place in clinic.
                  </span>
                </span>
                <ArrowRight className="ap-skincare-page__row-arrow" aria-hidden="true" size={20} strokeWidth={1.25} absoluteStrokeWidth />
              </Link>
            </li>
          </ul>

          <Notice tone="important" title="Prescription-only medicine" className="ap-skincare-page__notice">
            <p>{tretinoin.notice}</p>
          </Notice>
        </Container>
      </Section>

      <Section tone="stone" spacing="compact" aria-labelledby="ap-skincare-collection">
        <Container>
          <h2 className="ap-skincare-page__heading" id="ap-skincare-collection">
            How collection works
          </h2>
          <ol className="ap-skincare-page__steps">
            {COLLECTION.map((step, index) => (
              <li key={step.id}>
                <span className="ap-skincare-page__step-number ap-nums" aria-hidden="true">
                  {index + 1}
                </span>
                <span>
                  <span className="ap-skincare-page__step-title">{step.title}</span>
                  <span className="ap-skincare-page__step-detail">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section spacing="compact" aria-labelledby="ap-skincare-faq">
        <Container width="narrow">
          <h2 className="ap-skincare-page__heading" id="ap-skincare-faq">
            Questions
          </h2>
          <dl className="ap-skincare-page__faqs">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <BeginConsultation id="skincare-begin" />
    </>
  );
}
