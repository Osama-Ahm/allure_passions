import { useEffect, useRef, useState } from 'react';
import { priceCategories } from '../../content/pricing';
import { programmes } from '../../content/programmes';
import usePageMeta from '../../lib/usePageMeta';
import scrollToSection from '../../lib/scrollToSection';
import BeginConsultation from '../../components/patterns/BeginConsultation';
import PriceTable from '../../components/patterns/PriceTable';
import { Container, Heading, Section, Text } from '../../components/ui';
import './PricingPage.css';

export default function PricingPage() {
  usePageMeta({
    title: 'Pricing',
    description:
      'Every treatment price at Allure Passions UK, by category, with single-session and course figures. Payment is taken in clinic.',
  });

  const [activeId, setActiveId] = useState(priceCategories[0].id);
  const railRef = useRef(null);

  // Mark the category currently in view, so the index says where you are.
  useEffect(() => {
    const sections = priceCategories
      .map((category) => document.getElementById(category.id))
      .filter(Boolean);
    if (sections.length === 0 || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -60% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Section spacing="compact" className="ap-pricing__head">
        <Container>
          <p className="ap-eyebrow">Pricing</p>
          <Heading as="h1" size="l">
            Every price, in one place.
          </Heading>
          <div className="ap-pricing__notes">
            <Text size="small">
              Treatment always begins with a consultation, where we confirm what is suitable and how many sessions it is
              likely to take. Courses are priced below the equivalent single sessions.
            </Text>
            <Text size="small">
              Payment is taken in clinic. Ask us about paying for a course or programme by instalment.
            </Text>
          </div>
        </Container>
      </Section>

      <Section spacing="compact">
        <Container>
          <div className="ap-pricing">
            <nav className="ap-pricing__index" aria-label="Price categories" ref={railRef}>
              <p className="ap-pricing__index-title">Categories</p>
              <ul>
                {priceCategories.map((category) => (
                  <li key={category.id}>
                    <a
                      className="ap-pricing__index-link"
                      href={`#${category.id}`}
                      aria-current={activeId === category.id ? 'true' : undefined}
                      onClick={(event) => {
                        if (scrollToSection(category.id)) event.preventDefault();
                      }}
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="ap-pricing__tables">
              {priceCategories.map((category) => (
                <section className="ap-pricing__category" id={category.id} key={category.id} aria-labelledby={`${category.id}-title`}>
                  <h2 className="ap-pricing__category-title" id={`${category.id}-title`}>
                    {category.title}
                  </h2>
                  <p className="ap-pricing__category-subtitle">{category.subtitle}</p>
                  <PriceTable category={category} />
                </section>
              ))}

              <section className="ap-pricing__category" id="programmes" aria-labelledby="programmes-title">
                <h2 className="ap-pricing__category-title" id="programmes-title">
                  Signature programmes
                </h2>
                <p className="ap-pricing__category-subtitle">Structured courses, priced end to end</p>
                <ul className="ap-pricing__programmes">
                  {programmes.map((programme) => (
                    <li className="ap-pricing__programme" key={programme.id}>
                      <span>
                        <span className="ap-pricing__programme-name">{programme.name}</span>
                        <span className="ap-pricing__programme-detail">
                          {programme.subtitle} · {programme.sessions}
                        </span>
                      </span>
                      <span className="ap-pricing__programme-price ap-nums">{programme.price}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </Container>
      </Section>

      <BeginConsultation id="pricing-begin" />
    </>
  );
}
