import { Mail, MessageCircle } from 'lucide-react';
import { kojivit } from '../../content/products';
import usePageMeta from '../../lib/usePageMeta';
import { emailHref, whatsappHref } from '../../utils/contact';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import Breadcrumbs from '../../components/patterns/Breadcrumbs';
import { Button, Container, Heading, Section, Text } from '../../components/ui';
import './KojivitPage.css';

export default function KojivitPage() {
  usePageMeta({ title: kojivit.name, description: kojivit.summary });

  const reserveMessage = `Hello Allure Passions UK, I would like to reserve ${kojivit.name} for collection.`;

  return (
    <>
      <Section spacing="compact" className="ap-product">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Clinical skincare', to: '/skincare' },
              { label: kojivit.name },
            ]}
          />

          <div className="ap-product__layout">
            <div className="ap-product__media">
              <img src={kojivit.image} alt={`${kojivit.name} packaging`} width="640" height="640" />
            </div>

            <div className="ap-product__body">
              <p className="ap-eyebrow">{kojivit.type}</p>
              <Heading as="h1" size="l">
                {kojivit.name}
              </Heading>
              <p className="ap-product__price ap-nums">{kojivit.price}</p>
              <Text>{kojivit.description}</Text>

              <div className="ap-product__actions">
                <Button href={whatsappHref(reserveMessage)} external icon={MessageCircle} iconPosition="start">
                  Reserve via WhatsApp
                </Button>
                <Button
                  href={`${emailHref(`${kojivit.name} reservation`)}&body=${encodeURIComponent(reserveMessage)}`}
                  variant="secondary"
                  icon={Mail}
                  iconPosition="start"
                >
                  Reserve by email
                </Button>
              </div>
              <Text size="small" tone="muted">
                {kojivit.collection}
              </Text>

              <section className="ap-product__section" aria-labelledby="ap-ingredients">
                <h2 className="ap-product__heading" id="ap-ingredients">
                  Key ingredients
                </h2>
                <ul className="ap-product__list">
                  {kojivit.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </section>

              <section className="ap-product__section" aria-labelledby="ap-how-to-use">
                <h2 className="ap-product__heading" id="ap-how-to-use">
                  How to use
                </h2>
                <ol className="ap-product__list ap-product__list--ordered">
                  {kojivit.howToUse.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <BeginConsultation id="kojivit-begin" />
    </>
  );
}
