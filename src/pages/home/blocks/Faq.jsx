import { Minus, MessageCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../../../content/faqs';
import { enquiryMessage, whatsappHref } from '../../../utils/contact';
import { Button, Container, Eyebrow, Heading, Icon, Section, Text } from '../../../components/ui';
import './Faq.css';

/** FAQPage structured data, so the answers can surface in search (plan §6, §9). */
function faqStructuredData() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  });
}

/**
 * Block 10 (plan §6): a sticky heading and a way to ask on the left, the
 * accordion on the right. One answer is open at a time.
 */
export default function Faq() {
  const [openId, setOpenId] = useState(faqs[0].id);

  return (
    <Section id="faq" aria-labelledby="ap-faq-title">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqStructuredData() }} />
      <Container>
        <div className="ap-faq">
          <div className="ap-faq__aside">
            <Eyebrow>Questions</Eyebrow>
            <Heading as="h2" size="l" id="ap-faq-title">
              Before you get in touch.
            </Heading>
            <Text size="small">Still have a question? Message us and we will answer it properly.</Text>
            <Button
              href={whatsappHref(enquiryMessage.general)}
              external
              variant="secondary"
              size="sm"
              icon={MessageCircle}
              iconPosition="start"
            >
              Message us
            </Button>
          </div>

          <div className="ap-faq__list">
            {faqs.map((faq) => {
              const isOpen = faq.id === openId;
              return (
                <div className="ap-faq__item" key={faq.id}>
                  <h3 className="ap-faq__heading">
                    <button
                      type="button"
                      className="ap-faq__question"
                      aria-expanded={isOpen}
                      aria-controls={`ap-faq-${faq.id}`}
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                    >
                      <span>{faq.question}</span>
                      <Icon icon={isOpen ? Minus : Plus} size={18} />
                    </button>
                  </h3>
                  <div className="ap-faq__answer" id={`ap-faq-${faq.id}`} hidden={!isOpen}>
                    <Text size="small">{faq.answer}</Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
